import React, { useState } from "react";

const NgoRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone_no: "",
    location: "",
    isCertified: false,
  });

  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [isPhoneOtpSent, setIsPhoneOtpSent] = useState(false);
  const [isPhoneOtpVerified, setIsPhoneOtpVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSendEmailOtp = async () => {
    if (!formData.email) {
      setMessage("Please enter your email first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/ngo/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setIsOtpSent(true);
      setMessage("OTP sent to your email.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const verifyEmailOtp = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ngo/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setIsOtpVerified(true);
      setMessage("Email OTP verified successfully.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleSendPhoneOtp = async () => {
    if (!formData.phone_no) {
      setMessage("Please enter your phone number first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/ngo/send-phone-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_no: formData.phone_no }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setIsPhoneOtpSent(true);
      setMessage("OTP sent to your phone.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const verifyPhoneOtp = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ngo/verify-phone-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_no: formData.phone_no, otp: phoneOtp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setIsPhoneOtpVerified(true);
      setMessage("Phone OTP verified successfully.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpVerified || !isPhoneOtpVerified) {
      setMessage("Please verify both Email and Phone OTPs before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/ngo/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("NGO registered successfully!");
      setFormData({
        name: "",
        email: "",
        address: "",
        phone_no: "",
        location: "",
        isCertified: false,
      });
      setOtp("");
      setPhoneOtp("");
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setIsPhoneOtpSent(false);
      setIsPhoneOtpVerified(false);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">NGO Registration</h2>

      {message && <p className="text-sm text-center text-red-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="NGO Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />

        <div className="flex space-x-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <button
            type="button"
            onClick={handleSendEmailOtp}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Send Email OTP
          </button>
        </div>

        {isOtpSent && !isOtpVerified && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter Email OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded-md w-full"
              required
            />
            <button
              type="button"
              onClick={verifyEmailOtp}
              className="bg-blue-600 text-white px-4 py-1 rounded-md w-full"
            >
              Verify Email OTP
            </button>
          </div>
        )}

        {isOtpVerified && (
          <p className="text-green-600 text-sm text-center">✅ Email OTP Verified</p>
        )}

        <div className="flex space-x-2">
          <input
            type="tel"
            name="phone_no"
            placeholder="Phone Number"
            value={formData.phone_no}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <button
            type="button"
            onClick={handleSendPhoneOtp}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Send Phone OTP
          </button>
        </div>

        {isPhoneOtpSent && !isPhoneOtpVerified && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter Phone OTP"
              value={phoneOtp}
              onChange={(e) => setPhoneOtp(e.target.value)}
              className="border p-2 rounded-md w-full"
              required
            />
            <button
              type="button"
              onClick={verifyPhoneOtp}
              className="bg-blue-600 text-white px-4 py-1 rounded-md w-full"
            >
              Verify Phone OTP
            </button>
          </div>
        )}

        {isPhoneOtpVerified && (
          <p className="text-green-600 text-sm text-center">✅ Phone OTP Verified</p>
        )}

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isCertified"
            checked={formData.isCertified}
            onChange={handleChange}
          />
          <label htmlFor="isCertified">Certified NGO</label>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default NgoRegistration;
