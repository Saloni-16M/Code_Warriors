const express = require("express");
const {
  registerResort,
  loginResort,
} = require("../controllers/resortController");

const router = express.Router();

// Resort Auth Routes
router.post("/register", registerResort);
router.post("/login", loginResort);

module.exports = router;
