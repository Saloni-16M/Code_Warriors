import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ResortRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    location: "",
    isCertified: false,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/resort/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed!");

      setMessage("✅ Registration successful! Awaiting admin approval.");
      setShowModal(true);
    } catch (error) {
      setMessage(`⚠️ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0FAF4] p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Resort Registration</h2>

        {message && (
          <p
            className={`text-center text-sm ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Resort Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="tel"
            name="phone_no"
            placeholder="Phone Number"
            value={formData.phone_no}
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
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              name="isCertified"
              checked={formData.isCertified}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Certified Resort</span>
          </label>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md w-full font-semibold"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/resort/login" className="text-blue-600 font-semibold">
            Login here
          </a>
        </p>
      </div>

      {/* Custom Tailwind Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h4 className="text-green-600 font-semibold text-lg">Registration Successful!</h4>
            <p className="text-gray-600 mt-2">Awaiting admin approval. Mail will be sent to you!</p>
            <button
              onClick={handleClose}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResortRegistration;