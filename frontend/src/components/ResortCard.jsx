import { useNavigate } from "react-router-dom";

const ResortCard = ({ name, food, quantity, expiry, location, foodType }) => {
  const navigate = useNavigate(); // ✅ Define navigate here

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center w-64">
      <h3 className="text-lg font-bold border-2 border-purple-500 p-1 rounded-md">
        {name}
      </h3>
      <p className="font-semibold mt-2">Food</p>
      <p>{food}</p>
      <p className="font-semibold mt-2">Quantity</p>
      <p>{quantity}</p>
      <p className="font-semibold mt-2">Expiry Time</p>
      <p>{expiry}</p>
      <p className="font-semibold mt-2">Location</p>
      <p>{location}</p>
      <p className="mt-2 text-sm font-semibold">Food Type - {foodType}</p>
      
      {/* Fix: Pass all data using state */}
      <button
        onClick={() =>
          navigate("/active-requests", {
            state: { name, food, quantity, expiry, location, foodType }
          })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Request Pickup
      </button>
    </div>
  );
};

export default ResortCard;