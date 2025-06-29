const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP, resetPassword } = require("../controller/forgetpassword");

router.post("/forgot-password", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

module.exports = router;
