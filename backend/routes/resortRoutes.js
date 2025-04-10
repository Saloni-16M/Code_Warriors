const express = require("express");
const {
  registerResort,
  loginResort,
} = require("../controllers/resortController");

const {
  createFoodDonation,
  getAllFoodDonationsByResort,
  getSingleDonation,
  updateDonationStatus,
  getResortDonationTracking
} = require("../controllers/foodDonationController"); // You'll need to create this controller

const router = express.Router();

// 🌟 Resort Auth Routes
router.post("/register", registerResort);
router.post("/login", loginResort);

// 🍱 Food Donation Routes
router.post("/donate", createFoodDonation); // Resort food donation route
router.get("/donations/:resortId", getAllFoodDonationsByResort); // Get all donations by one resort
router.get("/donation/:donationId", getSingleDonation); // View single donation
router.patch("/donation/:donationId/status", updateDonationStatus); // Admin/NGO updates donation status (Pending/Accepted/Rejected)
router.get("/donations/:resortId/track",getResortDonationTracking );
module.exports = router;