const axios = require("axios");

const otpSessionStore = new Map(); // temporary store in memory

const sendSmsOtp = async (phone_no) => {
  const apiKey = process.env.TWO_FACTOR_API_KEY;

  try {
    const response = await axios.get(`https://2factor.in/API/V1/${apiKey}/SMS/${phone_no}/AUTOGEN`);
    const { Status, Details } = response.data;

    if (Status === "Success") {
      otpSessionStore.set(phone_no, Details); // Store session ID
    } else {
      throw new Error("OTP sending failed");
    }
  } catch (error) {
    console.error("Error sending OTP:", error.response?.data || error.message);
    throw new Error("Failed to send OTP");
  }
};

const getSessionId = (phone_no) => otpSessionStore.get(phone_no);

module.exports = { sendSmsOtp, getSessionId };
