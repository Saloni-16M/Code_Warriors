const mongoose = require("mongoose");

const foodDonationSchema = new mongoose.Schema({
  resortId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resort",
    required: true,
  },
  foodName: { type: String, required: true },
  quantity: { type: String, required: true },
  type: {
    type: String,
    enum: ["Vegetarian", "Non-Vegetarian"],
    required: true,
  },
  foodMadeDate: { type: Date, required: true },
  pickupAddress: { type: String, required: true },

  imageUrl: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  ngoComments: { type: String },

  // ✅ Add assigned NGO
  assignedNGO: { type: mongoose.Schema.Types.ObjectId, ref: "Ngo" },

  // Date when the donation is accepted
  acceptedDate: { type: Date },

  notifiedNGOs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ngo" }],

  // ✅ Track the pickup status and date
  pickupStatus: {
    type: String,
    enum: ["Not Picked", "Picked"],
    default: "Not Picked",
  },
  pickupDate: { type: Date },

  pickupConfirmedByNGO: { type: Boolean, default: false },
  pickupConfirmedByResort: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FoodDonation", foodDonationSchema);
