import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ResortCard from "./ResortCard";

const NGO = () => {
  const navigate = useNavigate();

  const resorts = [
    {
      name: "Resort 1",
      food: "Rice & Curry",
      quantity: "50 plates",
      expiry: "2 hours",
      location: "Downtown",
      foodType: "Veg",
    },
    {
      name: "Resort 2",
      food: "Bread & Soup",
      quantity: "30 plates",
      expiry: "4 hours",
      location: "Uptown",
      foodType: "Non-Veg",
    },
    {
      name: "Resort 3",
      food: "Pasta",
      quantity: "40 plates",
      expiry: "3 hours",
      location: "Midtown",
      foodType: "Veg",
    },
  ];

  const donationHistory = [
    { id: 1, date: "2024-03-20", quantity: "50 plates", donor: "John Doe" },
    { id: 2, date: "2024-03-18", quantity: "30 plates", donor: "Resort A" },
    { id: 3, date: "2024-03-15", quantity: "40 plates", donor: "Jane Smith" },
  ];

  return (
    <div className="min-h-screen bg-[#F0FAF4] p-4">
      {/* Navbar Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">
          Welcome <span className="text-purple-800">[NGO Name]!</span>
          <p className="text-gray-700">Nourishing lives, reducing waste</p>
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/guideline")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Guideline
          </button>
          <div className="relative">
            <FaBell className="text-xl text-black cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
              0
            </span>
          </div>
          <div className="flex items-center border border-gray-400 rounded-full px-3 py-1 bg-white">
            <input type="text" placeholder="Search" className="outline-none bg-transparent" />
            <FaSearch className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Available Food Donations Section */}
      <h2 className="mt-6 text-2xl font-bold text-center">Available Food Donations</h2>
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        {resorts.map((resort, index) => (
          <ResortCard key={index} {...resort} />
        ))}
      </div>

      {/* Donation History Section */}
      <h2 className="mt-8 text-2xl font-bold text-center text-green-700 border-b-4 border-green-500 pb-2">
        Donation History
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse border border-black text-center">
          <thead className="bg-gray-300">
            <tr>
              <th className="border border-black px-4 py-2">S.No.</th>
              <th className="border border-black px-4 py-2">Date</th>
              <th className="border border-black px-4 py-2">Quantity</th>
              <th className="border border-black px-4 py-2">Donor</th>
            </tr>
          </thead>
          <tbody>
            {donationHistory.map((donation, index) => (
              <tr key={donation.id} className="bg-white">
                <td className="border border-black px-4 py-2">{index + 1}</td>
                <td className="border border-black px-4 py-2">{donation.date}</td>
                <td className="border border-black px-4 py-2">{donation.quantity}</td>
                <td className="border border-black px-4 py-2">{donation.donor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NGO;