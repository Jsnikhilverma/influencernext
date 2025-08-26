"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Fashion & Beauty",
    icon: "👗",
    description: "Style, makeup, and lifestyle content",
    color: "from-pink-500 via-rose-400 to-rose-600",
    href: "/categories/fashion-beauty",
  },
  {
    name: "Technology",
    icon: "💻",
    description: "Tech reviews, tutorials, and gadgets",
    color: "from-blue-500 via-indigo-400 to-indigo-600",
    href: "/categories/technology",
  },
  {
    name: "Fitness & Health",
    icon: "💪",
    description: "Workouts, nutrition, and wellness",
    color: "from-green-500 via-emerald-400 to-emerald-600",
    href: "/categories/fitness-health",
  },
  {
    name: "Gourmet & Culinary",
    icon: "🍳",
    description: "Recipes, cooking tips, and food reviews",
    color: "from-amber-500 via-orange-400 to-orange-600",
    href: "/categories/food-cooking",
  },
  {
    name: "Luxury Travel",
    icon: "✈️",
    description: "Exclusive destinations and premium experiences",
    color: "from-cyan-500 via-blue-400 to-blue-600",
    href: "/categories/travel",
  },
  {
    name: "Gaming",
    icon: "🎮",
    description: "Game reviews, streams, and esports",
    color: "from-purple-500 via-pink-400 to-pink-600",
    href: "/categories/gaming",
  },
  {
    name: "Wealth & Finance",
    icon: "💼",
    description: "Entrepreneurship, investing, and exclusive tips",
    color: "from-yellow-500 via-amber-400 to-amber-600",
    href: "/categories/business-finance",
  },
  {
    name: "Elite Education",
    icon: "📚",
    description: "Premium tutorials, courses, and learning",
    color: "from-teal-500 via-cyan-400 to-cyan-600",
    href: "/categories/education",
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
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 ">
        {/* Stats Section */}
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

        {/* Categories Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              Elevate Your Content
            </span>
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Discover exclusive opportunities in premium categories and connect
            with luxury brands that match your elite content
          </p> */}
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={category.href}>
                <div className="h-full bg-white rounded-xl p-8 border border-gray-200 hover:border-primary-300 transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center group-hover:text-primary-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center font-light line-clamp-2 flex-grow">
                    {category.description}
                  </p>
                  <div className="mt-4 text-center">
                    <span className="text-xs font-medium text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      EXPLORE →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-400 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Join Our Exclusive Network
          </button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Categories;
