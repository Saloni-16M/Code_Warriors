const Resort = require("../models/Resort");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// Resort Registration
const registerResort = async (req, res) => {
  const { name, email, location,phone_no, isCertified ,address} = req.body;

  try {
    const existingResort = await Resort.findOne({ email });
    if (existingResort) return res.status(400).json({ message: "Resort already registered" });

    const newResort = new Resort({ name, email, location,phone_no, isCertified,address });
    await newResort.save();

    // Send email notification to the admin
    const adminEmail = "saloni45055@gmail.com";
    const subject = "New Resort Registration Pending Approval";
    const message = `Dear Admin,

      A new Resort has registered and is awaiting approval. Please review the details:

      🔹 **NGO Name:** ${name}
      🔹 **Email:** ${email}
      🔹 **Location:** ${location}
      🔹 **Phone Number:** ${phone_no}
      🔹 **Certified:** ${isCertified ? "Yes" : "No"}

      Please log in to the admin panel to approve.

      Regards,
      System Notification Team`;

    await sendEmailToAdmin(adminEmail, subject, message);


    res.status(201).json({ message: "Resort registered, awaiting admin approval" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const loginResort = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the NGO exists and is approved
    const resort = await Resort.findOne({ email, adminApprovalStatus: "Approved" });
    if (!resort) {
      return res
        .status(401)
        .json({ message: "Invalid email or RESORT not approved" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, resort.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: resort._id, email: resort.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", token,resort: {
      _id: resort._id,
      name: resort.name,
      email: resort.email,
      location: resort.location,
      phone_no: resort.phone_no,
      isCertified: resort.isCertified
    } });
  } catch (error) {
    console.error("Error in loginNgo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports={loginResort,registerResort}