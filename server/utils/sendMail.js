import nodemailer from "nodemailer";

const transportation = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendOtp = async (email, otp, name) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `${name}, Please Verify Your Email for bishir kdy`,

    text: `Hi ${name},

Welcome to bishir kdy!

To complete your registration and secure your account, please verify your email address by entering the One-Time Password (OTP) below:

🔐 OTP: ${otp}

This code is valid for the next 1 minute. For your security, please do not share this code with anyone.

If you did not request this verification, you can safely ignore this email.

Thank you,  
bishir kdy Support Team
`,
  };
  try {
    await transportation.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};
