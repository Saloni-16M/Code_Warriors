const FoodDonation = require("../models/FoodDonation");

// NGO confirms pickup
const confirmPickupByNgo = async (req, res) => {
  try {
    const { donationId } = req.params;
    const donation = await FoodDonation.findById(donationId);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    donation.pickupConfirmedByNGO = true;
    await donation.save();
    res.status(200).json({ message: "Pickup confirmed by NGO" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Resort confirms pickup
const confirmPickupByResort = async (req, res) => {
  try {
    const { donationId } = req.params;
    const donation = await FoodDonation.findById(donationId);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    donation.pickupConfirmedByResort = true;
    await donation.save();
    res.status(200).json({ message: "Pickup confirmed by Resort" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Mark donation as fully picked (optional logic to use only when both have confirmed)
const markAsPicked = async (req, res) => {
  try {
    const { donationId } = req.params;
    const donation = await FoodDonation.findById(donationId);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    if (!donation.pickupConfirmedByNGO || !donation.pickupConfirmedByResort) {
      return res.status(400).json({ message: "Both parties must confirm pickup" });
    }

    donation.pickupStatus = "Picked";
    donation.pickupDate = new Date();
    await donation.save();

    res.status(200).json({ message: "Donation marked as picked", donation });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  confirmPickupByNgo,
  confirmPickupByResort,
  markAsPicked,
};