"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Fashion & Beauty",
    icon: "👗",
    description: "Style, makeup, and lifestyle content",
    color: "from-pink-500 via-rose-400 to-rose-600",
    href: "/influencers",
    slug: "fashion-beauty",
  },
  {
    name: "Technology",
    icon: "💻",
    description: "Tech reviews, tutorials, and gadgets",
    color: "from-blue-500 via-indigo-400 to-indigo-600",
    href: "/influencers",
    slug: "technology",
  },
  {
    name: "Fitness & Health",
    icon: "💪",
    description: "Workouts, nutrition, and wellness",
    color: "from-green-500 via-emerald-400 to-emerald-600",
    href: "/influencers",
    slug: "fitness-health",
  },
  {
    name: "Gourmet & Culinary",
    icon: "🍳",
    description: "Recipes, cooking tips, and food reviews",
    color: "from-amber-500 via-orange-400 to-orange-600",
    href: "/influencers",
    slug: "food-cooking",
  },
  {
    name: "Luxury Travel",
    icon: "✈️",
    description: "Exclusive destinations and premium experiences",
    color: "from-cyan-500 via-blue-400 to-blue-600",
    href: "/influencers",
    slug: "travel",
  },
  {
    name: "Gaming",
    icon: "🎮",
    description: "Game reviews, streams, and esports",
    color: "from-purple-500 via-pink-400 to-pink-600",
    href: "/influencers",
    slug: "gaming",
  },
  {
    name: "Wealth & Finance",
    icon: "💼",
    description: "Entrepreneurship, investing, and exclusive tips",
    color: "from-yellow-500 via-amber-400 to-amber-600",
    href: "/influencers",
    slug: "business-finance",
  },
  {
    name: "Elite Education",
    icon: "📚",
    description: "Premium tutorials, courses, and learning",
    color: "from-teal-500 via-cyan-400 to-cyan-600",
    href: "/influencers",
    slug: "education",
  },
];

const stats = [
  {
    value: "$50K+",
    label: "Average Monthly Earnings",
    icon: "💎",
  },
  {
    value: "95%",
    label: "Satisfaction Rate",
    icon: "🌟",
  },
  {
    value: "24/7",
    label: "Concierge Support",
    icon: "🛎️",
  },
  {
    value: "50+",
    label: "Countries Served",
    icon: "🌍",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Categories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Calculate how many cards to show based on viewport
  const cardsToShow = 5;
  const maxIndex = Math.ceil(categories.length / cardsToShow) - 1;

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Calculate the transform value for the slider
  const transformValue = `-${currentIndex * (100 / cardsToShow)}%`;

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Categories Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-white">
              Elevate Your Content
            </span>
          </h2>
        </motion.div>

        {/* Categories Carousel Container */}
        <div className="relative mb-16">
          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors duration-300"
              aria-label="Previous categories"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors duration-300"
              aria-label="Next categories"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Categories Carousel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="overflow-hidden"
          >
            <div
              ref={scrollContainerRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${transformValue})` }}
            >
              {categories.map((category) => (
                <motion.div
                  key={category.name}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  className="group flex-shrink-0"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <Link href={`${category.href}?${category.slug}`}>
                    <div className="h-full bg-white rounded-xl p-6 mx-2 border border-gray-200 hover:border-primary-300 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-300 shadow-md`}
                      >
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center group-hover:text-primary-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-600 text-center font-light line-clamp-2 flex-grow">
                        {category.description}
                      </p>
                      <div className="mt-3 text-center">
                        <span className="text-xs font-medium text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          EXPLORE →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20 mt-20 bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300"
              >
                <div className="flex justify-center items-center mb-3">
                  <span className="text-2xl mr-2">{stat.icon}</span>
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                    {stat.value}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
