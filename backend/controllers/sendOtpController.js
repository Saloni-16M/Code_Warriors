const Otp = require("../models/Otp");
const { sendOtpToEmail } = require("../utils/sendOtp");

const sendOtpController = async (req, res) => {
  const { email } = req.body;

  try {
    const existingOtp = await Otp.findOne({ email });

    if (existingOtp) {
      const now = new Date();
      const timeDiff = (now - existingOtp.createdAt) / 1000;

      if (timeDiff < 60) {
        return res.status(429).json({
          message: `Please wait ${Math.ceil(60 - timeDiff)} seconds before requesting a new OTP.`,
        });
      }

      await Otp.deleteMany({ email });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // ✅ Pass type
    const newOtp = new Otp({ email, otp, type: "email" });
    await newOtp.save();

    await sendOtpToEmail(email, otp);
    res.status(200).json({ message: "OTP sent to your email", otp });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
};

module.exports = { sendOtpController };
