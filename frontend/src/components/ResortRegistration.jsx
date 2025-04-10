import React, { useState } from "react";
import { registerResort } from "../services/apiService"; // ✅ Import API function
import "../index.css"; // ✅ Import CSS

const ResortRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    isCertified: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, isCertified: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerResort(formData); // ✅ Use API function
      alert("Resort registered successfully!");
    } catch (error) {
      alert(error.message || "Registration failed.");
    }
  };

  return (
    <div className="form-container"> {/* ✅ Apply CSS */}
      <h1>Resort Registration</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Resort Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />

        <label className="checkbox-label">
          <input type="checkbox" name="isCertified" checked={formData.isCertified} onChange={handleCheckboxChange} />
          Certified?
        </label>

        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default ResortRegistration;