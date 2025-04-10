import React, { useState } from "react";
import { registerNgo } from "../services/apiService"; // Import API function
import "../index.css"; // Import the CSS file

const NgoRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    phone_no:"",
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
      console.log("Form Data:", formData); 
      await registerNgo(formData);
      alert("NGO registered successfully!");
    } catch (error) {
      alert(error.message || "Registration failed.");
    }
  };

  return (
    <div className="form-container">
      <h1>NGO Registration</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="NGO Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="phone_no" placeholder="ContactNumber" onChange={handleChange} required />

        <label className="checkbox-label">
          <input type="checkbox" name="isCertified" checked={formData.isCertified} onChange={handleCheckboxChange} />
          Certified?
        </label>

        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default NgoRegistration;