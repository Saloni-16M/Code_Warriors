import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { useState } from "react";

const Resort = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const donationHistory = [
    { id: 1, date: "2024-03-20", food: "Rice & Curry", quantity: "50 Packs", status: "Delivered" },
    { id: 2, date: "2024-03-22", food: "Sandwiches", quantity: "30 Packs", status: "Pending" },
    { id: 3, date: "2024-03-25", food: "Fruits", quantity: "20 Baskets", status: "Delivered" },
  ];

  const trackingStatus = [
    { id: 101, food: "Bread & Butter", quantity: "40 Packs", location: "On the way" },
    { id: 102, food: "Milk Packets", quantity: "25 Liters", location: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-[#F0FAF4] p-6">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-[#F0FAF4] p-4 ">
        <div>
          <h1 className="text-xl font-bold">
            Welcome <span className="text-purple-600">[Resort Name]!</span>
          </h1>
          <p className="italic text-gray-600">"No food should go to waste when someone is hungry."</p>
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


      {/* Status Tracking */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Status Tracking</h2>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {trackingStatus.map((item) => (
            <li key={item.id} className="border-b py-2">
              <span className="font-semibold">{item.food}</span> - {item.quantity} -
              <span className="text-blue-500"> {item.location}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* History Section */}
      <div className="mt-6">
        <h2 className="text-lg font-bold">Donation History</h2>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {donationHistory.map((item) => (
            <li key={item.id} className="border-b py-2">
              <span className="font-semibold">{item.date}</span> - {item.food} - {item.quantity} -
              <span className={`text-${item.status === "Delivered" ? "green" : "red"}-500`}> {item.status}</span>
              </li>
          ))}
        </ul>
      </div>

      {/* Food Donation Form */}
      <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-semibold">Donate Food</h3>
        <form className="flex flex-col gap-4 mt-4">
          <input type="text" placeholder="Food Name" className="border p-2 rounded-md" />
          <input type="number" placeholder="Quantity" className="border p-2 rounded-md" />
          <input type="text" placeholder="Food Type" className="border p-2 rounded-md" />
          <input type="datetime-local" className="border p-2 rounded-md" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Resort;