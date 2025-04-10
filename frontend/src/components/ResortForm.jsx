import React, { useState } from "react";

const ResortForm = () => {
  const [formData, setFormData] = useState({
    resortName: "XYZ Resort", // Assuming resort is logged in
    foodName: "",
    quantity: "",
    expiry: "",
    foodType: "Vegetarian",
    location: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Food donation request submitted!");
    // Send formData to backend
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Food Donation Form</h2>
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <label className="block">
          <span className="text-gray-700">Resort Name:</span>
          <input 
            type="text" 
            name="resortName" 
            value={formData.resortName} 
            disabled 
            className="block w-full mt-1 p-2 border rounded-md bg-gray-200"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Food Name:</span>
          <input 
            type="text" 
            name="foodName" 
            value={formData.foodName} 
            onChange={handleChange} 
            required 
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Quantity (plates/kg):</span>
          <input 
            type="number" 
            name="quantity" 
            value={formData.quantity} 
            onChange={handleChange} 
            required 
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Expiry Time:</span>
          <input 
            type="datetime-local" 
            name="expiry" 
            value={formData.expiry} 
            onChange={handleChange} 
            required 
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Food Type:</span>
          <select 
            name="foodType" 
            value={formData.foodType} 
            onChange={handleChange} 
            className="block w-full mt-1 p-2 border rounded-md"
          >
            <option>Vegetarian</option>
            <option>Non-Vegetarian</option>
            <option>Vegan</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Pickup Location:</span>
          <input 
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            required 
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Special Notes (Optional):</span>
          <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResortForm;