const mongoose = require("mongoose");

const FoodDonation = require("../models/FoodDonation");

const Resort = require("../models/Resort");

// POST /donate
const createFoodDonation = async (req, res) => {
  try {
    const {
      resortId,
      foodName,
      quantity,
      type,
      foodMadeDate,
      pickupAddress,
      imageUrl,
      additionalInfo,
    } = req.body;

    // Check for missing resortId
    if (!resortId || !mongoose.Types.ObjectId.isValid(resortId)) {
      return res.status(400).json({ message: "Invalid or missing resort ID" });
    }

    // Optional: Check if resort exists and is approved
    const resort = await Resort.findOne({
      _id: resortId,
      adminApprovalStatus: "Approved",
    });
    if (!resort) {
      return res
        .status(404)
        .json({ message: "Resort not found or not approved" });
    }

    const donation = new FoodDonation({
      resortId,
      foodName,
      quantity,
      type,
      foodMadeDate,
      pickupAddress,
      imageUrl,
      additionalInfo,
    });

    await donation.save();
    res
      .status(201)
      .json({ message: "Food donation submitted successfully", donation });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /donations/:resortId
const getAllFoodDonationsByResort = async (req, res) => {
  try {
    const { resortId } = req.params;
     // Check if resortId is valid
     if (!mongoose.Types.ObjectId.isValid(resortId)) {
      return res.status(400).json({ message: "Invalid resort ID format" });
    }

    const donations = await FoodDonation.find({ resortId }).sort({
      createdAt: -1,
    });

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /donation/:donationId
const getSingleDonation = async (req, res) => {
  try {
    const { donationId } = req.params;

    const donation = await FoodDonation.findById(donationId).populate(
      "resortId",
      "name email location"
    );
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json(donation);
  } catch (error) {
    console.error("Error fetching donation:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /donation/:donationId/status
const sendEmailToResort = require("../utils/sendResortEmail");

const updateDonationStatus = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { status, ngoComments, assignedNGO } = req.body;

    const validStatuses = ["Pending", "Accepted", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Ensure assignedNGO is passed when status is Accepted
    if (status === "Accepted" && !assignedNGO) {
      return res
        .status(400)
        .json({
          message: "Assigned NGO is required when accepting a donation",
        });
    }

    // Prepare update object
    const updateFields = { status, ngoComments };
    if (assignedNGO) {
      updateFields.assignedNGO = assignedNGO;
    }
    // If status is Accepted, set the acceptedDate
    if (status === "Accepted") {
      updateFields.acceptedDate = new Date();
    }

    const updatedDonation = await FoodDonation.findByIdAndUpdate(
      donationId,
      updateFields,
      { new: true }
    )
      .populate("resortId", "name email location")
      .populate("assignedNGO", "name email location phone_no");

    if (!updatedDonation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // ✅ Safe access with fallback values
    if (status === "Accepted" && updatedDonation.resortId?.email) {
      const email = updatedDonation.resortId.email;
      const subject = "NGO Accepted Your Donation Request";
      const message = `
Dear ${updatedDonation.resortId.name || "Resort"},

Your donation for "${updatedDonation.foodName}" has been accepted by an NGO.

🔹 NGO Name: ${updatedDonation.assignedNGO?.name || "N/A"}  
🔹 Location: ${updatedDonation.assignedNGO?.location || "N/A"}  
🔹 Phone: ${updatedDonation.assignedNGO?.phone_no || "N/A"}  
🔹 Comments: ${ngoComments || "N/A"}

Please prepare the package for pickup.

Regards,  
Donation Platform Team
      `;

      await sendEmailToResort(email, subject, message);
    }

    res
      .status(200)
      .json({ message: "Donation updated", donation: updatedDonation });
  } catch (error) {
    console.error("Error updating donation status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /donations/pending
const getAllPendingDonationsForNGO = async (req, res) => {
  try {
    const donations = await FoodDonation.find({ status: "Pending" })
      .populate("resortId", "name email location") // to show resort info
      .sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching pending donations:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getResortDonationTracking = async (req, res) => {
  try {
    const { resortId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(resortId)) {
      return res.status(400).json({ message: "Invalid resort ID." });
    }

    const donations = await FoodDonation.find({ resortId })
      .sort({ createdAt: -1 })
      .select("foodName quantity type foodMadeDate status pickupStatus pickupDate assignedNGO imageUrl createdAt")
      .populate("assignedNGO", "name email phoneNumber") // only selected fields from NGO
      .exec();

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: "No donations found." });
    }

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error tracking donations:", error);
    res.status(500).json({ message: "Server error while tracking donations" });
  }
};
module.exports = {
  createFoodDonation,
  getAllFoodDonationsByResort,
  getSingleDonation,
  updateDonationStatus,
  getAllPendingDonationsForNGO,
  getResortDonationTracking,
};