import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Define an array of image paths for the auto-sliding carousel
const images = ["ngo.jpeg", "resort.jpeg", "community.jpeg"];

const Home = () => {
  // State to keep track of the current image index in the carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State to manage whether the dropdown menu is open or not
  const [isSignupDrop, setIsSignupDrop] = useState(false);
  const [isLoginDrop, setIsLoginDrop] = useState(false);  
  // Reference for detecting clicks outside the dropdown
  const signupDropdownRef = useRef(null);
  const loginDropdownRef = useRef(null);
  // Auto-slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Update index, looping back to 0 when reaching the last image
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 3 seconds

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

 // Effect to close dropdowns when clicking outside
 useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      signupDropdownRef.current &&
      !signupDropdownRef.current.contains(event.target)
    ) {
      setIsSignupDrop(false);
    }
    if (
      loginDropdownRef.current &&
      !loginDropdownRef.current.contains(event.target)
    ) {
      setIsLoginDrop(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  // Function to smoothly scroll to a section with the given id
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#F0FAF4] min-h-screen flex flex-col items-center">
      {/* Navbar Section */}
      <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        {/* Website Title */}
        <h1 className="text-2xl font-bold text-green-700">SurplusSmile</h1>
        
        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {/* Button to scroll to the Mission section */}
          <button
            className="text-gray-700 hover:text-green-700 transition"
            onClick={() => scrollToSection("mission")}
          >
            Mission
          </button>

          {/* Button to scroll to the About Us section */}
          <button
            className="text-gray-700 hover:text-green-700 transition"
            onClick={() => scrollToSection("about-us")}
          >
            About Us
          </button>


          {/* Signup Dropdown */}
          <div className="relative" ref={signupDropdownRef}>
            <button
              className="text-gray-700 hover:text-green-700 transition"
              onClick={() => {
                setIsSignupDrop(!isSignupDrop);
                setIsLoginDrop(false); // Close login dropdown when opening signup
              }}
            >
              Signup ▼
            </button>

            {isSignupDrop && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden">
                <Link to="/ngo/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Signup as NGO
                </Link>
                <Link to="/resort/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Signup as Resort
                </Link>
              </div>
            )}
          </div>

          {/* Login Dropdown */}
          <div className="relative" ref={loginDropdownRef}>
            <button
              className="text-gray-700 hover:text-green-700 transition"
              onClick={() => {
                setIsLoginDrop(!isLoginDrop);
                setIsSignupDrop(false); // Close signup dropdown when opening login
              }}
            >
              Login ▼
            </button>

            {isLoginDrop && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden">
                <Link to="/ngo/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Login as NGO
                </Link>
                <Link to="/resort/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Login as Resort
                </Link>
              </div>
            )}
          
          </div>
        </div>
      </nav>

      {/* Image Carousel Section */}
      <div className="relative flex items-center justify-center w-full my-6">
        {/* Previous Image Button */}
        <button
          className="absolute left-4 text-gray-600 text-3xl px-4 bg-white rounded-full shadow-md"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? images.length - 1 : prevIndex - 1
            )
          }
        >
          ❮
        </button>

        {/* Image Display */}
        <div className="w-96 h-60 overflow-hidden rounded-lg shadow-lg">
          <img
            src={images[currentIndex]} // Show current image from array
            alt="NGO-Resort"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Next Image Button */}
        <button
          className="absolute right-4 text-gray-600 text-3xl px-4 bg-white rounded-full shadow-md"
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === images.length - 1 ? 0 : prevIndex + 1
            )
          }
        >
          ❯
        </button>
      </div>

      {/* Title & Call to Action */}
      <h2 className="text-green-700 text-2xl font-semibold mb-4">
        NGO-Resort Connect
      </h2>
    

      {/* Mission Section */}
      <div id="mission" className="w-full max-w-3xl p-6 bg-white shadow-md rounded-lg mt-10">
        {/* Mission Title */}
        <h3 className="text-xl font-bold text-green-700">Our Mission</h3>
        
        {/* Mission Description */}
        <p className="text-gray-700 mt-2">
          Our mission is to bridge the gap between NGOs and Resorts by fostering partnerships that
          drive meaningful social impact. We believe in creating sustainable solutions through collaboration.
        </p>
      </div>

      {/* About Us Section */}
      <div id="about-us" className="w-full max-w-3xl p-6 bg-white shadow-md rounded-lg mt-10">
        {/* About Us Title */}
        <h3 className="text-xl font-bold text-green-700">About Us</h3>
        
        {/* About Us Description */}
        <p className="text-gray-700 mt-2">
          SurplusSmile is an initiative to connect NGOs with resorts, ensuring that surplus resources
          find their way to those in need. We strive to build a network of compassionate businesses
          and organizations working towards a better world.
        </p>
      </div>
    </div>
  );
};

export default Home;
