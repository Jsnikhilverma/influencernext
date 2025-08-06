"use client";

import React, { useState } from "react";
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
  if (typeof followers !== "string") return 0;
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

  const categories = [
    "All",
    "Fashion",
    "Beauty",
    "Lifestyle",
    "Travel",
    "Fitness",
    "Food",
    "Tech",
    "Gaming",
    "Parenting",
    "Business",
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

  const influencers = [
    {
      id: 1,
      name: "Emma Johnson",
      category: "Fashion",
      followers: "250K",
      engagement: "4.8%",
      description: "Fashion influencer specializing in sustainable brands",
      fullDescription:
        "Emma Johnson is a sustainable fashion influencer with a passion for eco-friendly brands. She creates content around ethical fashion choices, thrifting tips, and how to build a sustainable wardrobe. With 5 years of experience in the fashion industry, she partners with brands that align with her values of sustainability and ethical production.",
      platforms: ["Instagram", "TikTok", "YouTube"],
      location: "Los Angeles, USA",
      contactEmail: "emma.johnson@example.com",
      contactPhone: "+1 (555) 123-4567",
      website: "www.emmajohnsonstyle.com",
      verified: true,
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
      audienceDemographics: {
        age: "18-34",
        gender: "85% Female",
        topLocations: ["USA", "UK", "Canada"],
      },
      rates: {
        instagramPost: "$1,200",
        instagramStory: "$800",
        tiktokVideo: "$1,500",
        youtubeVideo: "$3,000",
      },
      contentExamples: [
        "Sustainable outfit challenges",
        "Thrift shopping vlogs",
        "Brand collaborations",
      ],
    },
    {
      id: 2,
      name: "Alex Chen",
      category: "Tech",
      followers: "420K",
      engagement: "5.2%",
      description: "Tech reviewer and gadget enthusiast",
      fullDescription:
        "Alex Chen provides honest tech reviews and gadget tutorials. His content focuses on helping consumers make informed decisions about their tech purchases. Specializing in smartphones, laptops, and smart home devices, Alex has built a reputation for thorough, unbiased reviews.",
      platforms: ["YouTube", "Twitter", "Instagram"],
      location: "San Francisco, USA",
      contactEmail: "alex.chen@example.com",
      contactPhone: "+1 (555) 987-6543",
      website: "www.alextechreviews.com",
      verified: true,
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
      audienceDemographics: {
        age: "18-45",
        gender: "70% Male",
        topLocations: ["USA", "India", "Germany"],
      },
      rates: {
        youtubeVideo: "$4,500",
        sponsoredPost: "$2,000",
        productFeature: "$1,800",
      },
      contentExamples: [
        "In-depth product reviews",
        "Tech comparison videos",
        "How-to guides",
      ],
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      category: "Travel",
      followers: "1.2M",
      engagement: "6.1%",
      description: "Luxury travel influencer and photographer",
      fullDescription:
        "Sophia Rodriguez showcases luxury travel destinations around the world through stunning photography and engaging vlogs. Her content highlights hidden gems, luxury resorts, and unique cultural experiences. With partnerships with major tourism boards and hotel chains, Sophia creates aspirational yet accessible travel content.",
      platforms: ["Instagram", "YouTube", "Blog"],
      location: "Miami, USA",
      contactEmail: "sophia.travel@example.com",
      contactPhone: "+1 (555) 456-7890",
      website: "www.sophiaspassport.com",
      verified: true,
      profileImage: "https://randomuser.me/api/portraits/women/63.jpg",
      audienceDemographics: {
        age: "25-45",
        gender: "65% Female",
        topLocations: ["USA", "UK", "Australia"],
      },
      rates: {
        instagramPost: "$3,500",
        youtubeVideo: "$6,000",
        blogFeature: "$2,500",
      },
      contentExamples: [
        "Hotel and resort tours",
        "Destination guides",
        "Travel photography tips",
      ],
    },
    {
      id: 4,
      name: "James Wilson",
      category: "Fitness",
      followers: "780K",
      engagement: "5.5%",
      description: "Fitness coach and nutrition expert",
      fullDescription:
        "James Wilson is a certified personal trainer and nutrition coach who creates science-based fitness content. His programs focus on sustainable weight loss, muscle building, and overall wellness. James partners with fitness apparel and supplement brands that align with his evidence-based approach to health.",
      platforms: ["Instagram", "TikTok", "YouTube"],
      location: "Toronto, Canada",
      contactEmail: "james.fitness@example.com",
      contactPhone: "+1 (416) 555-1234",
      website: "www.jamesfit.com",
      verified: false,
      profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
      audienceDemographics: {
        age: "18-40",
        gender: "60% Male",
        topLocations: ["Canada", "USA", "UK"],
      },
      rates: {
        instagramPost: "$2,000",
        tiktokVideo: "$2,500",
        programPromotion: "$3,500",
      },
      contentExamples: [
        "Workout routines",
        "Nutrition guides",
        "Transformation stories",
      ],
    },
    {
      id: 5,
      name: "Priya Patel",
      category: "Beauty",
      followers: "350K",
      engagement: "7.2%",
      description: "Makeup artist and skincare specialist",
      fullDescription:
        "Priya Patel is a professional makeup artist specializing in bridal and editorial looks. Her content focuses on makeup tutorials, product reviews, and skincare routines for diverse skin types. Priya partners with beauty brands that prioritize inclusivity and quality ingredients.",
      platforms: ["Instagram", "YouTube", "Pinterest"],
      location: "London, UK",
      contactEmail: "priya.beauty@example.com",
      contactPhone: "+44 20 7946 0958",
      website: "www.priyasbeautydiary.com",
      verified: true,
      profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
      audienceDemographics: {
        age: "18-35",
        gender: "95% Female",
        topLocations: ["UK", "USA", "India"],
      },
      rates: {
        instagramPost: "$1,800",
        youtubeTutorial: "$2,800",
        productReview: "$1,500",
      },
      contentExamples: [
        "Makeup tutorials",
        "Skincare routines",
        "Product comparisons",
      ],
    },
    {
      id: 6,
      name: "Marcus Lee",
      category: "Gaming",
      followers: "2.5M",
      engagement: "8.3%",
      description: "Professional gamer and esports commentator",
      fullDescription:
        "Marcus Lee is a professional gamer known for his expertise in FPS games. He streams regularly, provides game analysis, and competes in esports tournaments. Marcus partners with gaming hardware brands and game developers to create authentic content for his engaged audience.",
      platforms: ["Twitch", "YouTube", "Twitter"],
      location: "Seoul, South Korea",
      contactEmail: "marcus.gaming@example.com",
      contactPhone: "+82 2 312 3456",
      website: "www.marcusplays.com",
      verified: true,
      profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
      audienceDemographics: {
        age: "16-30",
        gender: "80% Male",
        topLocations: ["South Korea", "USA", "Brazil"],
      },
      rates: {
        twitchStream: "$5,000",
        youtubeVideo: "$4,000",
        tournamentAppearance: "$10,000",
      },
      contentExamples: [
        "Gameplay streams",
        "Esports commentary",
        "Hardware reviews",
      ],
    },
  ];

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedFollowerRange("All");
    setSelectedDate("All");
    setSearchQuery("");
  };

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesCategory =
      selectedCategory === "All" || influencer.category === selectedCategory;

    const matchesSearch =
      influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFollowerRange = () => {
      const followerCount = parseFollowerCount(influencer.followers);
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

  const handleInfluencerClick = (influencer) => {
    setSelectedInfluencer(influencer);
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

  return (
    <main className="mt-20 bg-gray-100 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              Discover Influencers
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find the perfect influencers to elevate your brand's presence
            </p>
          </div>

          {/* Search Bar */}
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
                      key={influencer.id}
                      className="bg-grya-800 rounded-xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200"
                      onClick={() => handleInfluencerClick(influencer)}
                    >
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={influencer.profileImage}
                              alt={influencer.name}
                              className="h-16 w-16 rounded-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  influencer.name
                                )}&background=random&size=64`;
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <h3 className="text-xl font-semibold text-gray-900 truncate">
                                {influencer.name}
                              </h3>
                              {influencer.verified && (
                                <CheckBadgeIcon className="h-6 w-6 text-blue-500 ml-2" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {influencer.category} • {influencer.followers}{" "}
                              followers
                            </p>
                            <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                              {influencer.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {influencer.platforms.map((platform, index) => (
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
                          {influencer.engagement}
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
                <img
                  src={selectedInfluencer.profileImage}
                  alt={selectedInfluencer.name}
                  className="h-20 w-20 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      selectedInfluencer.name
                    )}&background=random&size=80`;
                  }}
                />
                <div>
                  <div className="flex items-center">
                    <h2 className="text-3xl font-bold font-serif text-gray-900 mr-2">
                      {selectedInfluencer.name}
                    </h2>
                    {selectedInfluencer.verified && (
                      <CheckBadgeIcon className="h-7 w-7 text-blue-500" />
                    )}
                  </div>
                  <p className="text-gray-600 mt-1 text-base">
                    {selectedInfluencer.category} •{" "}
                    {selectedInfluencer.followers} followers •{" "}
                    {selectedInfluencer.engagement} engagement
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
                    {selectedInfluencer.fullDescription}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="h-5 w-5 text-amber-500 mr-3" />
                      Location:{" "}
                      <span className="font-semibold ml-2">
                        {selectedInfluencer.location}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <UserIcon className="h-5 w-5 text-amber-500 mr-3" />
                      Platforms:{" "}
                      <span className="font-semibold ml-2">
                        {selectedInfluencer.platforms.join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <LinkIcon className="h-5 w-5 text-amber-500 mr-3" />
                      Website:{" "}
                      <a
                        href={`https://${selectedInfluencer.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-colors"
                      >
                        {selectedInfluencer.website}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Audience & Rates
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 shadow-sm">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Audience Demographics
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>
                        <span className="font-medium">Age:</span>{" "}
                        {selectedInfluencer.audienceDemographics.age}
                      </li>
                      <li>
                        <span className="font-medium">Gender:</span>{" "}
                        {selectedInfluencer.audienceDemographics.gender}
                      </li>
                      <li>
                        <span className="font-medium">Top Locations:</span>{" "}
                        {selectedInfluencer.audienceDemographics.topLocations.join(
                          ", "
                        )}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Rates
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      {Object.entries(selectedInfluencer.rates).map(
                        ([type, rate]) => (
                          <li key={type}>
                            <span className="font-medium capitalize">
                              {type}:
                            </span>{" "}
                            {rate}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-600">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="font-medium">Email:</span>{" "}
                    {selectedInfluencer.contactEmail}
                    <PhoneIcon className="h-5 w-5 text-gray-400 ml-4 mr-2" />
                    <span className="font-medium">Phone:</span>{" "}
                    {selectedInfluencer.contactPhone}
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
