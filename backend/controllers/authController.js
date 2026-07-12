import User from "../models/User.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import resend from "../config/resend.js";

dotenv.config();

/* ======================
   CREATE ADMIN
====================== */
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;

    if (!name || !email || !password || !secret) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: "Invalid admin secret" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const admin = await User.create({
      name,
      email,
      password, // hashed by model middleware
      role: "admin",
    });

    res.status(201).json({
      message: "Admin created successfully",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
   REGISTER USER
====================== */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password, // 👈 plain password ONLY
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ======================
   LOGIN
====================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
  // Update last login
  // user.lastLogin = new Date();
  // await user.save();


    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// password reset 

export const resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid or expired token",
    });
  }
user.password = req.body.password;

  user.resetToken = undefined;
  user.resetTokenExpire = undefined;

  await user.save();

  res.json({
    message: "Password updated successfully.",
  });
};
// Get profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || "",
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};


// resend 



export const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;


    const user = await User.findOne({ email });


    if (!user) {
      return res.json({
        message: "If the email exists, a reset link has been sent."
      });
    }


    const token = crypto.randomBytes(32).toString("hex");


    user.resetToken = token;

    user.resetTokenExpire =
      Date.now() + 15 * 60 * 1000;


    await user.save();


const resetUrl =
`http://localhost:5173/reset-password/${token}`;



    await resend.emails.send({

      from: "HomeDecorim <onboarding@resend.dev>",

      to: [user.email],

      subject: "Reset Your Password",

      html: `
        <div style="font-family:Arial;padding:20px">

          <h2>Password Reset Request</h2>

          <p>
            You requested to reset your password.
          </p>

          <p>
            Click the button below:
          </p>


          <a 
          href="${resetUrl}"
          style="
          background:#0d6efd;
          color:white;
          padding:12px 20px;
          border-radius:6px;
          text-decoration:none;
          ">
          Reset Password
          </a>


          <p>
          This link expires in 15 minutes.
          </p>


        </div>
      `

    });



    res.json({
      message:"Password reset link sent to your email."
    });


  } catch(error){

    console.log(error);

    res.status(500).json({
      message:"Email sending failed"
    });

  }

};