import React, { useState } from "react";

const ResortLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/resort/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // ✅ Save token and resortId
      localStorage.setItem("resortToken", data.token);
      localStorage.setItem("resortId", data.resort._id); // <-- Store resortId for later use

      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        window.location.href = "/resort"; // Redirect to Resort Dashboard
      }, 1500);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0FAF4] p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Resort Login</h2>

        {message && (
          <p
            className={`text-center text-sm ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Not registered?{" "}
          <a href="/resort/register" className="text-blue-600 font-semibold">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResortLogin;
