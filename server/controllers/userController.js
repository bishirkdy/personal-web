import User from "../models/userModel.js";
import { CustomError } from "../utils/errorUtils.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { sendOtp } from "../utils/sendMail.js";
import { generateToken } from "../utils/createUser.js";
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new CustomError("User already exists", 400));
    }
    if (password.length < 5 || password.length > 16) {
      return next(
        new CustomError("Password must be between 5 and 16 characters", 400)
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 1 * 60 * 1000);
    const otpCreatedAt = new Date();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      otpCreatedAt,
    });

    await newUser.save();
    await sendOtp(email, otp, name);

    res.status(201).json({
      message: "User registered. OTP sent to your email.",
      data: { email },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    next(new CustomError("Registration failed", 500));
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomError("User not fount", 401));
    }
    const isValidate = await bcryptjs.compare(password, user.password);
    if (!isValidate) {
      return next(new CustomError("Invalid password", 401));
    }
    generateToken(res, user._id , user.role);
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role : user.role
      },
    });
  } catch (error) {
    next(new CustomError("Failed to login", 500));
  }
};

export const verifyMail = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    if (user.isVerified) {
      return next(new CustomError("User already verified", 400));
    }

    if (user.otp !== otp) {
      return next(new CustomError("Invalid OTP", 400));
    }

    if (user.otpExpiry < Date.now()) {
      return next(new CustomError("OTP expired. Please register again.", 400));
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    user.otpCreatedAt = null;
    await user.save();

    generateToken(res, user._id , user.role);
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role : user.role
      },
    });
  } catch (error) {
    next(new CustomError("Verification failed", 500));
  }
};

export const resendOtp = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    if (user.isVerified) {
      return next(new CustomError("User already verified", 400));
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 1 * 60 * 1000);
    const otpCreatedAt = new Date();

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    user.otpCreatedAt = otpCreatedAt;

    await user.save();
    await sendOtp(email, otp, user.name);

    res.status(200).json({
      message: "New OTP sent to email.",
      data: { email },
    });
  } catch (error) {
    next(new CustomError("Failed to resend OTP", 500));
  }
};

export const getUser = async (req , res, next) => {
  try {
    const user = await User.find()
      .select("-password -otp -otpExpiry -otpCreatedAt")
      .sort({ createdAt: -1 });
    if (!user) {
      return next(new CustomError("No users found", 404));
    }
    res.status(200).json({
      message: "Users retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(new CustomError("Failed to get user", 500));
  }
}

export const editUser = async (req, res, next) => {
  const { _id } = req.params;

  try {
    if (!_id) {
      return next(new CustomError("User ID is required", 400));    
    }

    const { name, email, role } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;

    const user = await User.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    res.status(200).json({
      message: "User updated successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    next(new CustomError("Failed to edit user", 500));
  }
};

export const deleteUser = async (req, res, next) => {
  const { _id } = req.body;

  try {
    if (!_id) {
      return next(new CustomError("User ID is required", 400));
    }

    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: { id: user._id },
    });
  } catch (error) {
    next(new CustomError("Failed to delete user", 500));
  }
};