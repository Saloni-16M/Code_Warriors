const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  phone_no: {
    type: String,
    required: true,
    unique: true,

  },
  isCertified: { type: Boolean, required: true },
  isVerified: { type: Boolean, default: false }, // Admin verification status
  adminApprovalStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  }, 
  // Admin approval status
  adminComments: { type: String, default: "" }, // Admin comments
  loginId: { type: String },
  password: { type: String },
  
});

module.exports = mongoose.model("Ngo", ngoSchema);
