"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  XMarkIcon,
  UserIcon,
  MapPinIcon,
  ClockIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

// Helper function to parse follower count string to a number
const parseFollowerCount = (followers) => {
  if (typeof followers !== "string" && typeof followers !== "number") return 0;

  if (typeof followers === "number") return followers;

  if (followers.endsWith("M")) {
    return parseFloat(followers) * 1_000_000;
  }
  if (followers.endsWith("K")) {
    return parseFloat(followers) * 1_000;
  }
  return parseFloat(followers);
};

const InfluencerPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFollowerRange, setSelectedFollowerRange] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    "All",
    "Tech",
    "Fashion",
    "Beauty",
    "Lifestyle",
    "Travel",
    "Fitness",
    "Food",
    "Gaming",
    "Parenting",
    "Business",
    "Reviews",
  ];

  const followerRanges = [
    "All",
    "Nano (1K-10K)",
    "Micro (10K-50K)",
    "Mid-tier (50K-500K)",
    "Macro (500K-1M)",
    "Mega (1M+)",
  ];

  const dateFilters = ["All", "Recently Active", "Last Week", "Last Month"];

  // Fetch influencers from API
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.VITE_BASE_URL}/influencers`
        );
        const data = await response.json();

        if (data.influencers) {
          setInfluencers(data.influencers);
        } else {
          setError("No influencers found");
        }
      } catch (err) {
        setError("Failed to fetch influencers");
        console.error("Error fetching influencers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  // Fetch detailed influencer data by slug
  const fetchInfluencerDetails = async (slug) => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await fetch(
        `${process.env.VITE_BASE_URL}/influencers/slug/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.influencer) {
        return data.influencer;
      } else {
        throw new Error("Influencer details not found");
      }
    } catch (err) {
      console.error("Error fetching influencer details:", err);
      return null;
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedFollowerRange("All");
    setSelectedDate("All");
    setSearchQuery("");
  };

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (influencer.niches &&
        influencer.niches.includes(selectedCategory.toLowerCase()));

    const matchesSearch =
      influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (influencer.bio &&
        influencer.bio.toLowerCase().includes(searchQuery.toLowerCase()));

    const followerCount = influencer.stats?.followers || 0;

    const matchesFollowerRange = () => {
      switch (selectedFollowerRange) {
        case "Nano (1K-10K)":
          return followerCount >= 1000 && followerCount <= 10000;
        case "Micro (10K-50K)":
          return followerCount > 10000 && followerCount <= 50000;
        case "Mid-tier (50K-500K)":
          return followerCount > 50000 && followerCount <= 500000;
        case "Macro (500K-1M)":
          return followerCount > 500000 && followerCount <= 1000000;
        case "Mega (1M+)":
          return followerCount > 1000000;
        default:
          return true;
      }
    };

    return matchesCategory && matchesSearch && matchesFollowerRange();
  });

  const handleInfluencerClick = async (influencer) => {
    // Fetch detailed influencer data
    const detailedInfluencer = await fetchInfluencerDetails(influencer.slug);

    if (detailedInfluencer) {
      setSelectedInfluencer(detailedInfluencer);
    } else {
      // Fallback to basic data if detailed fetch fails
      setSelectedInfluencer(influencer);
    }

    setShowContactForm(false);
    setContactData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact submitted:", contactData);
    // In a real application, you'd send this data to a backend API
    setShowContactForm(false);
    setContactData({
      name: "",
      email: "",
      message: "",
    });
    alert(`Your message to ${selectedInfluencer.name} has been sent!`);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setSelectedInfluencer(null);
    setShowContactForm(false);
    setContactData({
      name: "",
      email: "",
      message: "",
    });
  };

  // Format follower count for display
  const formatFollowerCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <main className="mt-20 bg-gray-100 font-sans min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading influencers...</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mt-20 bg-gray-100 font-sans min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-red-500">{error}</div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="mt-20 bg-gray-100 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-slate-900/80 via-gray-800/80 to-black/80 text-white relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('/ibanner1.jpg')", opacity: 50 }}
        ></div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-black mb-6">
            Discover Influencers
          </h1>
          <p className="text-xl text-black font-bold max-w-3xl mx-auto mb-8">
            Find the perfect influencers to elevate your brand's presence
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg text-white placeholder-gray-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Filters and Influencers Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 text-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-6 flex items-center border-b pb-4">
                  <FunnelIcon className="h-5 w-5 mr-2 text-white" />
                  Filters
                </h3>

                {/* Date Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-white" />
                    Activity
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                  >
                    {dateFilters.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Followers Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-3 flex items-center">
                    <UserIcon className="h-4 w-4 mr-2 text-white" />
                    Follower Range
                  </label>
                  <select
                    value={selectedFollowerRange}
                    onChange={(e) => setSelectedFollowerRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 transition-colors"
                  >
                    {followerRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-3">
                    By Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filter Button */}
                <button
                  onClick={handleClearFilters}
                  className="w-full px-4 py-2 text-sm font-medium text-white border border-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Influencers List */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Showing: {filteredInfluencers.length} of {influencers.length}{" "}
                  influencers
                </h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                    Sort by: Popularity
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredInfluencers.length > 0 ? (
                  filteredInfluencers.map((influencer) => (
                    <div
                      key={influencer._id || influencer.id}
                      className="bg-grya-800 rounded-xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200"
                      onClick={() => handleInfluencerClick(influencer)}
                    >
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                              <UserIcon className="h-8 w-8 text-gray-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <h3 className="text-xl font-semibold text-gray-900 truncate">
                                {influencer.name}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-600">
                              {influencer.niches && influencer.niches.length > 0
                                ? influencer.niches.join(", ")
                                : "No category specified"}{" "}
                              •{" "}
                              {formatFollowerCount(
                                influencer.stats?.followers || 0
                              )}{" "}
                              followers
                            </p>
                            <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                              {influencer.bio || "No description available"}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {influencer.platforms &&
                                influencer.platforms.map((platform, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                                  >
                                    {platform}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Engagement:</span>{" "}
                          {influencer.stats?.engagementRate
                            ? `${influencer.stats.engagementRate}%`
                            : "N/A"}
                        </div>
                        <button className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-colors">
                          View Profile →
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 text-gray-500">
                    No influencers found matching your criteria.
                  </div>
                )}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-8">
                <button className="px-8 py-3 text-sm font-medium text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-sm">
                  Load More Influencers
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Influencer Details Modal */}
      {selectedInfluencer && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform scale-95 transition-transform duration-300">
            <div className="p-8 border-b border-gray-200 flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h2 className="text-3xl font-bold font-serif text-gray-900 mr-2">
                      {selectedInfluencer.name}
                    </h2>
                  </div>
                  <p className="text-gray-600 mt-1 text-base">
                    {selectedInfluencer.niches &&
                    selectedInfluencer.niches.length > 0
                      ? selectedInfluencer.niches.join(", ")
                      : "No category specified"}{" "}
                    •{" "}
                    {formatFollowerCount(
                      selectedInfluencer.stats?.followers || 0
                    )}{" "}
                    followers •{" "}
                    {selectedInfluencer.stats?.engagementRate
                      ? `${selectedInfluencer.stats.engagementRate}%`
                      : "N/A"}{" "}
                    engagement
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 ml-4"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedInfluencer.bio || "No description available"}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <UserIcon className="h-5 w-5 text-amber-500 mr-3" />
                      Platforms:{" "}
                      <span className="font-semibold ml-2">
                        {selectedInfluencer.platforms
                          ? selectedInfluencer.platforms.join(", ")
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Audience & Stats
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 shadow-sm">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Statistics
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>
                        <span className="font-medium">Followers:</span>{" "}
                        {formatFollowerCount(
                          selectedInfluencer.stats?.followers || 0
                        )}
                      </li>
                      <li>
                        <span className="font-medium">Avg. Views:</span>{" "}
                        {selectedInfluencer.stats?.avgViews
                          ? formatFollowerCount(
                              selectedInfluencer.stats.avgViews
                            )
                          : "N/A"}
                      </li>
                      <li>
                        <span className="font-medium">Engagement Rate:</span>{" "}
                        {selectedInfluencer.stats?.engagementRate
                          ? `${selectedInfluencer.stats.engagementRate}%`
                          : "N/A"}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Content Niches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedInfluencer.niches &&
                        selectedInfluencer.niches.map((niche, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full"
                          >
                            {niche}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Member since:{" "}
                    {new Date(
                      selectedInfluencer.createdAt
                    ).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => setShowContactForm(!showContactForm)}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-200 shadow-md"
                  >
                    {showContactForm ? "Hide Form" : "Contact Influencer"}
                  </button>
                </div>

                {/* Contact Form in Modal */}
                {showContactForm && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-inner">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Contact {selectedInfluencer.name}
                    </h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={contactData.name}
                          onChange={handleContactChange}
                          placeholder="Enter your name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={contactData.email}
                          onChange={handleContactChange}
                          placeholder="Enter your email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          value={contactData.message}
                          onChange={handleContactChange}
                          rows={4}
                          placeholder={`Describe your collaboration proposal for ${selectedInfluencer.name}...`}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                          required
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors duration-200"
                        >
                          Send Message
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowContactForm(false)}
                          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default InfluencerPage;
