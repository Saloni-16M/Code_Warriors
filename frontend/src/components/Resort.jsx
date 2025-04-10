import React, { useState, useEffect } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import axios from "axios";
import ResortForm from "./ResortForm";
import ResortCard from "./ResortCard";

const Resort = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [donationData, setDonationData] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("resortToken"); // Adjust if different
        const resortId = localStorage.getItem("resortId");
        const response = await axios.get(`http://localhost:5000/api/resort/donations/${resortId}/track`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        setDonationData(response.data.donations || []); // Adjust based on API response
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  const filteredDonations = donationData.filter((donation) =>
    donation.food.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F0FAF4] p-6">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-[#F0FAF4] p-4">
        <div>
          <h1 className="text-xl font-bold">
            Welcome <span className="text-purple-600">[Resort Name]!</span>
          </h1>
          <p className="italic text-gray-600">
            "No food should go to waste when someone is hungry."
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
            Guidelines
          </button>
          <div className="relative">
            <FaBell className="text-black text-xl cursor-pointer" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">0</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 px-4 py-2 pl-10 rounded-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Dynamic Donation Cards */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Your Food Donations</h2>
        <div className="flex flex-wrap gap-4">
          {filteredDonations.length > 0 ? (
            filteredDonations.map((donation) => (
              <ResortCard
             
              key={donation._id}
              donationId={donation._id}
              name={donation?.assignedNGO?.name || "Not Assigned"}
              food={donation.foodName}
              quantity={donation.quantity}
              expiry={new Date(donation.foodMadeDate).toLocaleDateString()}
              location={donation.pickupAddress}
              foodType={donation.type}
              status={donation.status}
              pickupStatus={donation.pickupStatus}
            
            
              />
            ))
          ) : (
            <p className="text-gray-600 italic">No donations found.</p>
          )}
        </div>
      </div>

      {/* Food Donation Form */}
      <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-semibold">Donate Food</h3>
        <ResortForm />
      </div>
    </div>
  );
};

export default Resort;