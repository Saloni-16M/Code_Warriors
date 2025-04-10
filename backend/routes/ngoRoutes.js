const express = require("express");
const {
  registerNgo,
  loginNgo,
  sendPhoneOtp,
  verifyPhoneOtp,
} = require("../controllers/ngoController");

const { sendOtpController } = require("../controllers/sendOtpController"); // ✅ Add this line!
const { verifyEmailOtp } = require("../utils/verifyOtp");
const router = express.Router();

router.post("/register", registerNgo);
router.post("/login", loginNgo);
router.post("/send-otp", sendOtpController); // ✅ Add this

// Route to verify OTP
router.post("/verify-otp", verifyEmailOtp);
router.post("/send-phone-otp", sendPhoneOtp);
router.post("/verify-phone-otp", verifyPhoneOtp);

module.exports = router;
