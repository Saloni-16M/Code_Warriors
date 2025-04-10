import React from "react";
import { useNavigate } from "react-router-dom";

const Guideline = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-[#F0FAF4]">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-600 text-white px-4 py-2 rounded-lg mb-4"
      >
        Back
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Guidelines for NGOs Regarding Food and Their Organization
        </h2>

        <h3 className="text-xl font-semibold mt-4">
          1. Food Safety & Quality Standards
        </h3>
        <ul className="list-disc ml-6">
          <li>Ensure food is safe, fresh, and consumable.</li>
          <li>Perishable food should be consumed within a recommended time.</li>
          <li>Label food with preparation date, type, and allergens.</li>
          <li>Avoid spoiled, stale, or contaminated food.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">
          2. Collection & Distribution Process
        </h3>
        <ul className="list-disc ml-6">
          <li>Collect food on time to prevent wastage.</li>
          <li>Ensure fair and efficient food distribution.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">3. Hygiene & Handling</h3>
        <ul className="list-disc ml-6">
          <li>Follow basic hygiene practices (clean hands, gloves, etc.).</li>
          <li>Store food in clean, appropriate conditions.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">
          4. Transparency & Accountability
        </h3>
        <ul className="list-disc ml-6">
          <li>Maintain records of received and distributed food.</li>
          <li>Update the platform regularly on food donations.</li>
          <li>Submit reports for fair and effective food distribution.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">
          5. Compliance with Local Laws
        </h3>
        <ul className="list-disc ml-6">
          <li>Follow food safety and local government regulations.</li>
          <li>NGOs should be registered and verified.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">
          6. NGO Registration & Verification
        </h3>
        <ul className="list-disc ml-6">
          <li>Provide legal documents like registration certificates.</li>
          <li>Admin verification is required before accepting donations.</li>
        </ul>
      </div>
    </div>
  );
};

export default Guideline;
