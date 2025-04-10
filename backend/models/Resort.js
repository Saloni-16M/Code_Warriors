const mongoose = require("mongoose");

const resortSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  phone_no: {
    type: String,
    required: true,
    unique: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"],
  },
  isVerified: { type: Boolean, default: false },
  loginId: { type: String },
  password: { type: String },
  adminApprovalStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  }, // Admin approval status
  adminComments: { type: String, default: "" }, // Admin comments
});

module.exports = mongoose.model("Resort", resortSchema);
