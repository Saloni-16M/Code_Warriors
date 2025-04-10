import React, { useState, useEffect } from "react";

const ResortForm = () => {
  const [formData, setFormData] = useState({
    resortId: "", // to be set via localStorage or props
    foodName: "",
    quantity: "",
    foodMadeDate: "",
    type: "Vegetarian",
    pickupAddress: "",
    additionalInfo: "",
    imageUrl: "" // optional
  });

  // Example: Assume resortId is stored in localStorage after login
  useEffect(() => {
    const storedResortId = localStorage.getItem("resortId");
    if (storedResortId) {
      setFormData((prev) => ({ ...prev, resortId: storedResortId }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/resort/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // You can add Authorization header if token-based auth is used
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        alert("Food donation request submitted successfully!");
        console.log("Submitted:", data);
        setFormData({
          resortId: formData.resortId,
          foodName: "",
          quantity: "",
          foodMadeDate: "",
          type: "Vegetarian",
          pickupAddress: "",
          additionalInfo: "",
          imageUrl: ""
        });
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Food Donation Form</h2>
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
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
          <span className="text-gray-700">Food Made Date/Time:</span>
          <input 
            type="datetime-local" 
            name="foodMadeDate" 
            value={formData.foodMadeDate} 
            onChange={handleChange} 
            required 
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Food Type:</span>
          <select 
            name="type" 
            value={formData.type} 
            onChange={handleChange} 
            className="block w-full mt-1 p-2 border rounded-md"
          >
            <option>Vegetarian</option>
            <option>Non-Vegetarian</option>
            <option>Vegan</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Pickup Address:</span>
          <input 
            type="text" 
            name="pickupAddress" 
            value={formData.pickupAddress} 
            onChange={handleChange} 
            required 
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Special Notes (Optional):</span>
          <textarea 
            name="additionalInfo" 
            value={formData.additionalInfo} 
            onChange={handleChange} 
            className="block w-full mt-1 p-2 border rounded-md"
          />
        </label>

        {/* Optional image URL input */}
        <label className="block">
          <span className="text-gray-700">Image URL (Optional):</span>
          <input 
            type="text" 
            name="imageUrl" 
            value={formData.imageUrl} 
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
