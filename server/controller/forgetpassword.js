
 // SEND OPT

const Admin = require('../models/Admin')
const sendEmail = require("../utils/sendEmail");

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  admin.resetOTP = otp;
  admin.otpExpiry = Date.now() + 10 * 60 * 1000;
  await admin.save();

  await sendEmail(email, "Your OTP for Password Reset", `Your OTP is: ${otp}`);
  res.json({ message: "OTP sent to your email" });
};


// VERIFY OTP

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin || admin.resetOTP.toString() !== otp.toString()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (Date.now() > admin.otpExpiry) {
    return res.status(400).json({ message: "OTP expired" });
  }

  res.json({ message: "OTP verified" });
};


//RESET PASSWORD

 const bcrypt = require("bcrypt");

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    admin.resetOTP = null;
    admin.otpExpiry = null;
    await admin.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error while resetting password" });
  }
};

