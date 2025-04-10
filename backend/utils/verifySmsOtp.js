const axios = require("axios");

const verifySmsOtp = async (sessionId, otp) => {
  const apiKey = process.env.TWO_FACTOR_API_KEY;

  try {
    const response = await axios.get(`https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`);
    const { Status, Details } = response.data;

    if (Status === "Success" && Details === "OTP Matched") {
        console.log("success otp matched")
      return true;
    } else {
      console.error("Error verifying OTP:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.response?.data || error.message);
    return false;
  }
};

module.exports = {verifySmsOtp};
