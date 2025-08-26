"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const brands = [
  {
    id: 1,
    name: "Nike",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Luxury Sportswear",
    budget: "$5K - $50K",
    opportunities: 12,
    verified: true,
    exclusive: true,
  },
  {
    id: 2,
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "Premium Technology",
    budget: "$10K - $100K",
    opportunities: 8,
    verified: true,
    exclusive: true,
  },
  {
    id: 3,
    name: "Sephora",
    logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "Luxury Beauty",
    budget: "$3K - $25K",
    opportunities: 15,
    verified: true,
    exclusive: false,
  },
  {
    id: 4,
    name: "Uber Eats",
    logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1081&q=80",
    category: "Gourmet Delivery",
    budget: "$2K - $20K",
    opportunities: 20,
    verified: true,
    exclusive: false,
  },
  {
    id: 5,
    name: "Airbnb Luxe",
    logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Luxury Travel",
    budget: "$5K - $40K",
    opportunities: 10,
    verified: true,
    exclusive: true,
  },
  {
    id: 6,
    name: "Spotify",
    logo: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Premium Audio",
    budget: "$3K - $30K",
    opportunities: 18,
    verified: true,
    exclusive: false,
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

const Brands = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              Exclusive Brand Partnerships
            </span>
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Connect with verified luxury brands seeking elite influencers for
            premium collaborations and high-value campaigns.
          </p> */}
        </motion.div>

        {/* Brands Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 transition-all duration-300 flex flex-col shadow-sm hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-16 h-16 rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                    />
                    {brand.verified && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center shadow-sm">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {brand.exclusive && (
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs px-2 py-0.5 rounded-full">
                        EXCLUSIVE
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-light">
                      {brand.category}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">
                      Budget Range
                    </span>
                    <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
                      {brand.budget}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">
                      Opportunities
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {brand.opportunities}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200 group-hover:border-primary-100 transition-colors duration-300">
                  <Link
                    href={`/brand/${brand.id}`}
                    className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:scale-[1.02]"
                  >
                    View Opportunities
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/brands"
            className="inline-flex items-center px-8 py-3.5 border border-gray-300 text-gray-900 font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50"
          >
            Discover All Premium Brands
            <svg
              className="ml-3 h-5 w-5 text-gray-400"
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;
