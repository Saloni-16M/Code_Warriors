const bcrypt = require("bcryptjs");
const Ngo = require("../models/Ngo");
const Resort = require("../models/Resort");
const sendApprovalEmail = require("../utils/ngoApprovalMail");
const sendApprovalEmailResort=require('../config/emailService');//for resort



const Admin = require("../models/Admin");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: { id: admin._id, email: admin.email }
    });

  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/**
 * Controller to get all registered NGOs
 */
const getAllNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find().lean();
    res.status(200).json({ success: true, ngos });
  } catch (error) {
    console.error("Error fetching NGOs:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller to get all registered Resorts
 */
const getAllResorts = async (req, res) => {
  try {
    const resorts = await Resort.find().lean();
    res.status(200).json({ success: true, resorts });
  } catch (error) {
    console.error("Error fetching Resorts:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Approve or reject an NGO
 */
const approveNgo = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const { isApproved, adminComments } = req.body;

    if (!ngoId || typeof isApproved !== "boolean") {
      return res.status(400).json({ success: false, message: "Invalid request parameters" });
    }

    const existingNgo = await Ngo.findById(ngoId);
    if (!existingNgo) {
      return res.status(404).json({ success: false, message: "NGO not found" });
    }

    if (existingNgo.adminApprovalStatus === "Approved") {
      return res.status(400).json({ success: false, message: "NGO is already approved" });
    }

    if (isApproved) {
      const loginId = existingNgo.email;
      const password = Math.random().toString(36).slice(-8);
      console.log(password);
      const hashedPassword = await bcrypt.hash(password, 10);

      existingNgo.loginId = loginId;
      existingNgo.password = hashedPassword;
      existingNgo.adminApprovalStatus = "Approved";
      await sendApprovalEmail(existingNgo.email, loginId, password);
    } else {
      existingNgo.adminApprovalStatus = "Rejected";
    }

    if (adminComments) {
      existingNgo.adminComments = adminComments;
    }

    await existingNgo.save();
    res.status(200).json({ success: true, message: "NGO status updated successfully", ngo: existingNgo });
  } catch (error) {
    console.error("Error in approveNgo:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Approve or reject a Resort
 */
const approveResort = async (req, res) => {
  try {
    const { resortId } = req.params;
    const { isApproved, adminComments } = req.body;

    if (!resortId || typeof isApproved !== "boolean") {
      return res.status(400).json({ success: false, message: "Invalid request parameters" });
    }

    const existingResort = await Resort.findById(resortId);
    if (!existingResort) {
      return res.status(404).json({ success: false, message: "Resort not found" });
    }

    if (existingResort.adminApprovalStatus === "Approved") {
      return res.status(400).json({ success: false, message: "Resort is already approved" });
    }

    if (isApproved) {
      const loginId = existingResort.email;
      const password = Math.random().toString(36).slice(-8);
      console.log(password);
      const hashedPassword = await bcrypt.hash(password, 10);

      existingResort.loginId = loginId;
      existingResort.password = hashedPassword;
      existingResort.adminApprovalStatus = "Approved";
      await sendApprovalEmailResort(existingResort.email, loginId, password);
    } else {
      existingResort.adminApprovalStatus = "Rejected";
    }

    if (adminComments) {
      existingResort.adminComments = adminComments;
    }

    await existingResort.save();
    res.status(200).json({ success: true, message: "Resort status updated successfully", resort: existingResort });
  } catch (error) {
    console.error("Error in approveResort:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Update NGO comments
 */
const updateNgo = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const { adminComments } = req.body;

    if (!ngoId || !adminComments) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    const updatedNgo = await Ngo.findByIdAndUpdate(
      ngoId,
      { $set: { adminComments } },
      { new: true, runValidators: true }
    );

    if (!updatedNgo) {
      return res.status(404).json({ success: false, message: "NGO not found" });
    }

    res.status(200).json({ success: true, message: "Comment updated successfully", ngo: updatedNgo });
  } catch (error) {
    console.error("Error in updateNgo:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Update Resort comments
 */
const updateResort = async (req, res) => {
  try {
    const { resortId } = req.params;
    const { adminComments } = req.body;

    if (!resortId || !adminComments) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    const updatedResort = await Resort.findByIdAndUpdate(
      resortId,
      { $set: { adminComments } },
      { new: true, runValidators: true }
    );

    if (!updatedResort) {
      return res.status(404).json({ success: false, message: "Resort not found" });
    }

    res.status(200).json({ success: true, message: "Comment updated successfully", resort: updatedResort });
  } catch (error) {
    console.error("Error in updateResort:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllNgos,
  getAllResorts,
  approveNgo,
  approveResort,
  updateNgo,
  updateResort,
  loginAdmin,
};