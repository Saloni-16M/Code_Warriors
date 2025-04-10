import React from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";

const ActiveRequests = () => {
  const location = useLocation();
  const requestDetails = location.state || {};

  const currentDate = new Date().toLocaleDateString("en-GB");

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Food Pickup Receipt", 70, 20);

    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 20, 30);
    doc.text(`Resort Name: ${requestDetails.name}`, 20, 40);
    doc.text(`Food Name: ${requestDetails.food}`, 20, 50);
    doc.text(`Quantity: ${requestDetails.quantity}`, 20, 60);
    doc.text(`Food Type: ${requestDetails.foodType}`, 20, 70);
    doc.text(`Status: Accepted`, 20, 80);

    doc.save(`Receipt_${currentDate}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F0FAF4] p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-green-700">Pending & Active Request</h2>
      <p className="text-lg font-semibold mt-2">You have 1 Active pickup</p>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4 w-80 text-center">
        <h3 className="text-xl font-semibold">{requestDetails.name}</h3>
        <p><strong>Food:</strong> {requestDetails.food}</p>
        <p><strong>Quantity:</strong> {requestDetails.quantity}</p>
        <p><strong>Type:</strong> {requestDetails.foodType}</p>
        <p><strong>Date:</strong> {currentDate}</p>
        <p><strong>Status:</strong> Accepted</p>

        <button
          onClick={generatePDF}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Confirm Receipt
        </button>
      </div>
    </div>
  );
};

export default ActiveRequests;
