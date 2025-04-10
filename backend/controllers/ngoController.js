const Ngo = require("../models/Ngo");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmailToAdmin = require("../utils/notifyEmail");
const Otp = require("../models/Otp");
const { getSessionId, sendSmsOtp } = require("../utils/sendSmsOtp");
const { verifySmsOtp } = require("../utils/verifySmsOtp");
const FoodDonation = require("../models/FoodDonation");

// ✅ Register NGO
const registerNgo = async (req, res) => {
  const { name, email, location, phone_no, isCertified,address } = req.body;

  try {
    const existingNgo = await Ngo.findOne({ email });
    if (existingNgo) {
      return res.status(400).json({ message: "NGO already registered" });
    }

    // ✅ 1. Check Email is verified
    const validEmailOtp = await Otp.findOne({ email, verified: true, type: "email" });
    if (!validEmailOtp) {
      return res.status(400).json({ message: "Email not verified" });
    }

    // ✅ 2. Check Phone is verified
    const validPhoneOtp = await Otp.findOne({ phone_no, verified: true, type: "phone" });
    if (!validPhoneOtp) {
      return res.status(400).json({ message: "Phone number not verified" });
    }

    // ✅ 3. Clean up verified OTPs
    await Otp.deleteMany({ $or: [{ email }, { phone_no }] });

    // ✅ 4. Create NGO (No password)
    const newNgo = new Ngo({
      name,
      email,
      location,
      phone_no,
      isCertified,address,
      adminApprovalStatus: "Pending"
    });

    await newNgo.save();

    // ✅ 5. Notify admin
    const adminEmail = "saloni45055@gmail.com";
    const subject = "New NGO Registration Pending Approval";
    const message = `Dear Admin,

A new NGO has registered and is awaiting approval. Please review the details:

🔹 NGO Name: ${name}
🔹 Email: ${email}
🔹 Location: ${location}
🔹 Phone Number: ${phone_no}
🔹 Certified: ${isCertified ? "Yes" : "No"}

Please log in to the admin panel to approve.

Regards,
System Notification Team`;

    await sendEmailToAdmin(adminEmail, subject, message);

    res.status(201).json({ message: "NGO registered, awaiting admin approval" });
  } catch (error) {
    console.error("Register NGO error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Login NGO
const loginNgo = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ngo = await Ngo.findOne({ email, adminApprovalStatus: "Approved" });
    if (!ngo) {
      return res.status(401).json({ message: "Invalid email or NGO not approved" });
    }

    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: ngo._id, email: ngo.email }, // 👈 'id' is used in JWT payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      ngo: {
        _id: ngo._id,
        name: ngo.name,
        email: ngo.email,
        location: ngo.location,
        phone_no: ngo.phone_no,
        isCertified: ngo.isCertified
      }
    });
  } catch (error) {
    console.error("Error in loginNgo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Send Phone OTP
const sendPhoneOtp = async (req, res) => {
  const { phone_no } = req.body;

  try {
    await sendSmsOtp(phone_no);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Phone OTP Send Error:", err);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

// ✅ Verify Phone OTP
const verifyPhoneOtp = async (req, res) => {
  const { phone_no, otp } = req.body;

  try {
    const sessionId = getSessionId(phone_no);
    if (!sessionId) {
      return res.status(400).json({ message: "Session not found. Please request a new OTP." });
    }

    const isValid = await verifySmsOtp(sessionId, otp);
    if (!isValid) {
      return res.status(400).json({ message: "Incorrect or expired OTP" });
    }

    // ✅ Mark phone as verified
    await Otp.updateOne(
      { phone_no, type: "phone" },
      { verified: true },
      { upsert: true }
    );

    res.status(200).json({ message: "Phone number verified successfully" });
  } catch (err) {
    console.error("Phone OTP Verification Error:", err);
    res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
};

// ✅ Get accepted donations for a particular NGO
 // Adjust path as needed

const getAcceptedDonationsByNgo = async (req, res) => {
  try {
    console.log("✅ Authenticated User:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User ID not found in request" });
    }

    const ngoObjectId = new mongoose.Types.ObjectId(req.user.id);

    const acceptedDonations = await FoodDonation.find({
      assignedNGO: ngoObjectId,
      status: "Accepted",
    })
      .populate("resortId")
      .populate("assignedNGO");

    console.log("✅ Accepted Donations found:", acceptedDonations.length);

    if (acceptedDonations.length === 0) {
      return res.status(404).json({ message: "No accepted donations found" });
    }

    return res.status(200).json(acceptedDonations);
  } catch (error) {
    console.error(" Error fetching accepted donations:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = getAcceptedDonationsByNgo;


// ✅ Export all controllers
module.exports = {
  registerNgo,
  loginNgo,
  sendPhoneOtp,
  verifyPhoneOtp,
  getAcceptedDonationsByNgo
};