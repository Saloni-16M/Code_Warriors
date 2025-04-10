const express = require("express");
const { getAllNgos, getAllResorts,updateNgo, approveNgo, approveResort, updateResort } = require("../controllers/adminController");

const router = express.Router();

// Get all registered NGOs & Resorts
router.get("/ngos", getAllNgos);
router.get("/resorts", getAllResorts);

// Approve or reject NGOs & Resorts
router.put("/ngos/:ngoId/approve", approveNgo);
router.put("/ngos/update/:ngoId", updateNgo);
router.put("/resorts/:resortId/approve", approveResort);
router.put("/resorts/update/:resortId", updateResort);

module.exports = router;
