// File: components/Hero.jsx
"use client";

import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaFilter,
  FaGasPump,
  FaCarSide,
  FaCog,
  FaWallet,
} from "react-icons/fa";

const Hero = () => {
  const [carType, setCarType] = useState("new");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of background images
  const backgroundImages = [
    "/m1.jpg",
    "/m2.jpg",
    "/m3.jpg",
    "/m4.jpg",
    "/m5.jpg",
  ];

  // Effect to change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative w-full h-[70vh] mt-20 overflow-hidden">
      {/* Background Images Container */}
      <div className="absolute w-full h-full">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Car showcase ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Search Box */}
      {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl bg-white rounded-xl shadow-xl p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Find Your Right Car
          </h2>
          <div className="flex items-center text-sm text-gray-500 cursor-pointer">
            <FaMapMarkerAlt className="mr-1" />
            <span className="underline">Select City</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setCarType("new")}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                carType === "new"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-600"
              }`}
            >
              New
            </button>
            <button
              onClick={() => setCarType("used")}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                carType === "used"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Used
            </button>
          </div>

          <input
            type="text"
            placeholder="Type to select car name"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition">
            Search
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <FilterButton icon={<FaWallet />} label="Budget" />
          <FilterButton icon={<FaCarSide />} label="Body Type" />
          <FilterButton icon={<FaGasPump />} label="Fuel Type" />
          <FilterButton icon={<FaCog />} label="Transmission" />
          <FilterButton icon={<FaFilter />} label="All Filters" />
        </div>
      </div> */}
    </section>
  );
};

const FilterButton = ({ icon, label }) => (
  <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-full text-sm text-gray-700">
    {icon}
    {label}
  </button>
);

export default Hero;
