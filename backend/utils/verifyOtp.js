const Otp = require("../models/Otp");

const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const existingOtp = await Otp.findOne({ email, otp, type: "email" });

    if (!existingOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const now = new Date();
    const expiryTime = new Date(existingOtp.createdAt);
    expiryTime.setMinutes(expiryTime.getMinutes() + 10); // 10 min expiry

    if (now > expiryTime) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ✅ Mark as verified
    existingOtp.verified = true;
    await existingOtp.save();

    return res.status(200).json({ message: "Email OTP verified" });
  } catch (err) {
    console.error("Error verifying email OTP:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { verifyEmailOtp };
