"use client";
import { useState } from "react";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaBullhorn,
  FaLanguage,
  FaVideo,
  FaRobot,
  FaMusic,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";

const categories = [
  { id: 1, name: "Programming & Tech", icon: <FaLaptopCode /> },
  { id: 2, name: "Graphics & Design", icon: <FaPaintBrush /> },
  { id: 3, name: "Digital Marketing", icon: <FaBullhorn /> },
  { id: 4, name: "Writing & Translation", icon: <FaLanguage /> },
  { id: 5, name: "Video & Animation", icon: <FaVideo /> },
  { id: 6, name: "AI Services", icon: <FaRobot /> },
  { id: 7, name: "Music & Audio", icon: <FaMusic /> },
  { id: 8, name: "Business", icon: <FaBriefcase /> },
  //   { id: 9, name: "Consulting", icon: <FaUserTie /> },
];

export default function CategoriesSection() {
  const [active, setActive] = useState(5); // Default active (Video & Animation)

  return (
    <div className="flex flex-wrap justify-center gap-4 p-6  bg-gradient-to-r from-purple-600 to-pink-600">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => setActive(cat.id)}
          className={`flex mt-20 flex-col items-center justify-center w-40 h-36 rounded-xl border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md
            ${
              active === cat.id
                ? "bg-green-50 border-green-300 shadow-lg"
                : "bg-white border-gray-200"
            }
          `}
        >
          <div className="text-3xl text-gray-700">{cat.icon}</div>
          <p className="mt-3 text-center text-gray-800 font-medium">
            {cat.name}
          </p>
        </div>
      ))}
    </div>
  );
}
