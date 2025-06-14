import jwt from "jsonwebtoken";

export const generateToken = (res, userId , role) => {
  try {
    const token = jwt.sign({ userId , role }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token" , token , {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
    return token;
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
