import React, { useState, useEffect, useRef } from "react";
import ngo1 from "../assets/ngo1.jpg";
import ngo2 from "../assets/ngo2.jpg";
import ngo3 from "../assets/ngo3.jpg";

// Define an array of image paths for the auto-sliding carousel
const images = ["ngo1.jpg", "ngo2.jpg", "ngo3.jpg"];

const Home = () => {
  // State to keep track of the current image index in the carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State to manage whether the dropdown menu is open or not
  const [isDrop, setIsDrop] = useState(false);
  
  // Reference for detecting clicks outside the dropdown
  const dropdownRef = useRef(null);

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

  // Effect to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDrop(false);
      }
    };

    // Listen for clicks anywhere on the document
    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup function to remove the event listener when component unmounts
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

          {/* Signup Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            {/* Button to toggle dropdown visibility */}
            <button
              className="text-gray-700 hover:text-green-700 transition"
              onClick={() => setIsDrop(!isDrop)}
            >
              Signup ▼
            </button>

            {/* Dropdown menu (only shown when isDrop is true) */}
            {isDrop && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden">
                {/* Signup options */}
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Signup as NGO
                </button>
                <button className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Signup as Resort
                </button>
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