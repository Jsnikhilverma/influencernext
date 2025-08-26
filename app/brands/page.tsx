"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  MagnifyingGlassIcon,
  CheckBadgeIcon,
  FunnelIcon,
  StarIcon,
  BoltIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const BrandsPage = () => {
  const brands = [
    {
      id: 1,
      name: "Nike",
      logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Sports & Fitness",
      budget: "$5K - $50K",
      opportunities: 12,
      verified: true,
      rating: 4.8,
      description:
        "Leading sports brand looking for fitness and lifestyle influencers",
    },
    {
      id: 2,
      name: "Apple",
      logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Technology",
      budget: "$10K - $100K",
      opportunities: 8,
      verified: true,
      rating: 4.9,
      description: "Premium tech brand seeking innovative content creators",
    },
    {
      id: 3,
      name: "Sephora",
      logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      category: "Beauty & Cosmetics",
      budget: "$3K - $25K",
      opportunities: 15,
      verified: true,
      rating: 4.7,
      description: "Beauty retailer looking for authentic beauty influencers",
    },
    {
      id: 4,
      name: "Uber Eats",
      logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1081&q=80",
      category: "Food & Delivery",
      budget: "$2K - $20K",
      opportunities: 20,
      verified: true,
      rating: 4.6,
      description: "Food delivery platform seeking food and lifestyle creators",
    },
    {
      id: 5,
      name: "Airbnb",
      logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Travel & Hospitality",
      budget: "$5K - $40K",
      opportunities: 10,
      verified: true,
      rating: 4.8,
      description:
        "Travel platform looking for adventure and lifestyle influencers",
    },
    {
      id: 6,
      name: "Spotify",
      logo: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Entertainment",
      budget: "$3K - $30K",
      opportunities: 18,
      verified: true,
      rating: 4.7,
      description:
        "Music streaming service seeking music and entertainment creators",
    },
    {
      id: 7,
      name: "Netflix",
      logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "Entertainment",
      budget: "$8K - $60K",
      opportunities: 6,
      verified: true,
      rating: 4.9,
      description:
        "Streaming giant looking for entertainment and lifestyle influencers",
    },
    {
      id: 8,
      name: "Tesla",
      logo: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Technology",
      budget: "$15K - $100K",
      opportunities: 4,
      verified: true,
      rating: 4.9,
      description:
        "Electric vehicle company seeking tech and lifestyle influencers",
    },
  ];

  const categories = [
    "All Categories",
    "Sports & Fitness",
    "Technology",
    "Beauty & Cosmetics",
    "Food & Delivery",
    "Travel & Hospitality",
    "Entertainment",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      brand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="mt-20 bg-gray-100 font-sans">
      <Header />

      {/* Hero Section */}
      {/* <section className="pt-20 pb-12 bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6"></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"></p>

          
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg text-white placeholder-gray-500 transition-colors"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-6 py-4 border border-gray-700 bg-gray-900 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="pt-20 pb-16 bg-gradient-to-br from-slate-900/80 via-gray-800/80 to-black/80 text-white relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('/ibanner1.jpg')", opacity: 50 }}
        ></div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-black mb-6">
            Partner with Top Brands
          </h1>
          <p className="text-xl text-black font-bold max-w-3xl mx-auto mb-8">
            Connect with verified brands looking for authentic influencers to
            promote their products and services. Find opportunities that align
            with your values and audience.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Brands
            </h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                Sort by: Rating
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  <div className="flex items-start mb-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-100"
                      />
                      {brand.verified && (
                        <CheckBadgeIcon className="absolute -top-2 -right-2 w-6 h-6 text-blue-500 bg-white rounded-full p-[2px] shadow" />
                      )}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {brand.category}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 fill-current ${
                                i < Math.floor(brand.rating)
                                  ? "text-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">
                          {brand.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 text-sm line-clamp-2">
                    {brand.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-gray-600">
                      <span className="text-sm font-medium">Budget Range</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {brand.budget}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span className="text-sm font-medium">
                        Active Opportunities
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {brand.opportunities}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-200 shadow-md">
                    View Opportunities
                  </button>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3 text-center py-10 text-gray-500">
                No brands found matching your criteria.
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-sm">
              Load More Brands
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif text-gray-900 mb-4">
              Why Brands Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              We connect brands with authentic, engaged influencers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckBadgeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verified Influencers
              </h3>
              <p className="text-gray-600">
                All influencers are pre-vetted for quality and authenticity
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BoltIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                High ROI
              </h3>
              <p className="text-gray-600">
                Average 300% return on investment for brand campaigns
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quick Setup
              </h3>
              <p className="text-gray-600">
                Get campaigns running in as little as 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BrandsPage;
