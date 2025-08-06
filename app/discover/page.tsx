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
  StarIcon,
} from "@heroicons/react/24/solid"; // Changed to solid icons for a bolder look

const DiscoverPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidData, setBidData] = useState({
    price: "",
    message: "",
    duration: "",
  });

  const categories = [
    "All",
    "Web Development",
    "SEO",
    "Internet of Things",
    "AI",
    "Graphics & Design",
    "Digital Marketing",
    "App Development",
    "Video & Animation",
    "Writing & Translation",
    "Influencer Marketing",
    "Social Media Marketing",
  ];

  const budgetRanges = [
    "All",
    "Low to High",
    "High to Low",
    "$100 - $500",
    "$500 - $1000",
    "$1000 - $5000",
    "$5000+",
  ];

  const dateFilters = ["All", "Last 24 hr", "Last Week", "Last Month"];

  const projects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      category: "Web Development",
      budget: "$2400",
      datePosted: "12 Oct 2024",
      description:
        "Need a modern e-commerce website with payment integration and inventory management system.",
      fullDescription:
        "We are looking for an experienced web developer to create a modern e-commerce website for our retail business. The website should include:\n\n• User authentication and registration\n• Product catalog with search and filtering\n• Shopping cart and checkout system\n• Payment gateway integration (Stripe/PayPal)\n• Inventory management system\n• Admin dashboard for product management\n• Mobile responsive design\n• SEO optimization\n\nWe prefer someone with experience in React, Node.js, and MongoDB. The project should be completed within 2-3 months.",
      client: "Anthe Lile",
      proposals: 3,
      skills: ["React", "Node.js", "MongoDB", "Stripe"],
      location: "United States",
      duration: "2-3 months",
      experience: "Intermediate",
      projectType: "Fixed Price",
      clientRating: 4.8,
      totalSpent: "$15,000+",
      avgHourlyRate: "$25/hr",
    },
    {
      id: 2,
      title: "Mobile App for Food Delivery",
      category: "App Development",
      budget: "$3500",
      datePosted: "11 Oct 2024",
      description:
        "Looking for an experienced developer to create a food delivery app with real-time tracking.",
      fullDescription:
        "We need a food delivery mobile application with the following features:\n\n• User registration and login\n• Restaurant listing and menu Browse\n• Food ordering and payment\n• Real-time order tracking\n• Push notifications\n• Driver app for delivery personnel\n• Restaurant admin panel\n• Payment integration\n• Rating and review system\n\nExperience with React Native, Firebase, and Google Maps API is required. The app should be available on both iOS and Android.",
      client: "Mike Chen",
      proposals: 5,
      skills: ["React Native", "Firebase", "Google Maps API"],
      location: "Canada",
      duration: "3-4 months",
      experience: "Expert",
      projectType: "Fixed Price",
      clientRating: 4.9,
      totalSpent: "$25,000+",
      avgHourlyRate: "$35/hr",
    },
    {
      id: 3,
      title: "AI-Powered Chatbot Development",
      category: "AI",
      budget: "$1800",
      datePosted: "10 Oct 2024",
      description:
        "Need a chatbot for customer service with natural language processing capabilities.",
      fullDescription:
        "We require an AI-powered chatbot for our customer service department with the following capabilities:\n\n• Natural language processing\n• Integration with our existing CRM system\n• Multi-language support (English, Spanish)\n• 24/7 availability\n• Ticket creation and escalation\n• Knowledge base integration\n• Analytics and reporting\n• Custom training on our business processes\n\nExperience with Python, TensorFlow, and NLP is essential. The chatbot should be able to handle common customer inquiries and escalate complex issues to human agents.",
      client: "Sarah Johnson",
      proposals: 2,
      skills: ["Python", "TensorFlow", "NLP", "API Integration"],
      location: "United Kingdom",
      duration: "1-2 months",
      experience: "Intermediate",
      projectType: "Fixed Price",
      clientRating: 4.7,
      totalSpent: "$8,000+",
      avgHourlyRate: "$30/hr",
    },
    {
      id: 4,
      title: "Social Media Marketing Campaign",
      category: "Digital Marketing",
      budget: "$1200",
      datePosted: "9 Oct 2024",
      description:
        "Looking for a marketing expert to run a 3-month social media campaign for our startup.",
      fullDescription:
        "We are a startup looking for an experienced social media marketer to run a comprehensive 3-month campaign across multiple platforms:\n\n• Facebook and Instagram advertising\n• Content creation and curation\n• Community management\n• Influencer partnerships\n• Performance tracking and reporting\n• A/B testing and optimization\n• Brand voice development\n• Lead generation strategies\n\nWe are targeting young professionals aged 25-35. The campaign should focus on brand awareness and lead generation.",
      client: "Emma Rodriguez",
      proposals: 8,
      skills: ["Facebook Ads", "Instagram Marketing", "Content Creation"],
      location: "Australia",
      duration: "3 months",
      experience: "Intermediate",
      projectType: "Fixed Price",
      clientRating: 4.6,
      totalSpent: "$12,000+",
      avgHourlyRate: "$20/hr",
    },
    {
      id: 5,
      title: "Logo and Brand Identity Design",
      category: "Graphics & Design",
      budget: "$800",
      datePosted: "8 Oct 2024",
      description:
        "Need a professional logo design and complete brand identity package for our tech company.",
      fullDescription:
        "We are a new tech startup and need a complete brand identity package including:\n\n• Primary and secondary logo designs\n• Logo variations (horizontal, vertical, icon only)\n• Brand color palette\n• Typography guidelines\n• Business card design\n• Letterhead and envelope design\n• Social media templates\n• Brand style guide\n\nWe are looking for a modern, professional design that reflects innovation and trust. Our target audience is B2B clients in the technology sector.",
      client: "David Kim",
      proposals: 12,
      skills: ["Logo Design", "Brand Identity", "Adobe Creative Suite"],
      location: "Germany",
      duration: "2 weeks",
      experience: "Intermediate",
      projectType: "Fixed Price",
      clientRating: 4.8,
      totalSpent: "$5,000+",
      avgHourlyRate: "$25/hr",
    },
    {
      id: 6,
      title: "SEO Optimization for E-commerce",
      category: "SEO",
      budget: "$1500",
      datePosted: "7 Oct 2024",
      description:
        "Need SEO expert to optimize our e-commerce website for better search engine rankings.",
      fullDescription:
        "We have an existing e-commerce website that needs comprehensive SEO optimization:\n\n• Technical SEO audit and fixes\n• Keyword research and optimization\n• On-page SEO improvements\n• Content optimization\n• Local SEO setup\n• Google My Business optimization\n• Schema markup implementation\n• Performance optimization\n• Monthly reporting and recommendations\n\nWe are targeting high-value keywords in the fashion industry. The website is built on Shopify and we need someone with experience in e-commerce SEO.",
      client: "Lisa Park",
      proposals: 4,
      skills: ["SEO", "Google Analytics", "Keyword Research"],
      location: "Netherlands",
      duration: "2 months",
      experience: "Expert",
      projectType: "Fixed Price",
      clientRating: 4.9,
      totalSpent: "$20,000+",
      avgHourlyRate: "$40/hr",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBudget =
      selectedBudget === "All" ||
      (selectedBudget === "$100 - $500" &&
        parseInt(project.budget.replace(/[$,]/g, "")) >= 100 &&
        parseInt(project.budget.replace(/[$,]/g, "")) <= 500) ||
      (selectedBudget === "$500 - $1000" &&
        parseInt(project.budget.replace(/[$,]/g, "")) >= 500 &&
        parseInt(project.budget.replace(/[$,]/g, "")) <= 1000) ||
      (selectedBudget === "$1000 - $5000" &&
        parseInt(project.budget.replace(/[$,]/g, "")) >= 1000 &&
        parseInt(project.budget.replace(/[$,]/g, "")) <= 5000) ||
      (selectedBudget === "$5000+" &&
        parseInt(project.budget.replace(/[$,]/g, "")) >= 5000);

    // This is a simplified date filter logic. You would need to use a date library for production.
    const matchesDate =
      selectedDate === "All" || project.datePosted.includes(selectedDate);

    return matchesCategory && matchesSearch && matchesBudget && matchesDate;
  });

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowBidForm(false);
    setBidData({
      price: "",
      message: "",
      duration: "",
    });
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    console.log("Bid submitted:", bidData);
    // Handle bid submission logic here
    setShowBidForm(false);
    setBidData({
      price: "",
      message: "",
      duration: "",
    });
  };

  const handleBidChange = (e) => {
    const { name, value } = e.target;
    setBidData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowBidForm(false);
    setBidData({
      price: "",
      message: "",
      duration: "",
    });
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBudget("All");
    setSelectedDate("All");
    setSearchQuery("");
  };

  return (
    <main className="mt-20 bg-white text-gray-200 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Discover <span className="text-white">Exclusive Projects</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Find and bid on premium freelance opportunities tailored to your
              expertise and desired compensation.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects by keywords or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg placeholder-gray-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Projects Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 sticky top-32 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <FunnelIcon className="h-6 w-6 mr-3 text-gradient-to-r from-purple-600 to-pink-600" />
                  Filters
                </h3>

                {/* Date Filter */}
                <div className="mb-8">
                  <label className="block text-md font-semibold text-gray-300 mb-4 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-3 text-gray-400" />
                    Date Posted
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-5 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    {dateFilters.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Filter */}
                <div className="mb-8">
                  <label className="block text-md font-semibold text-gray-300 mb-4 flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 mr-3 text-gray-400" />
                    Budget
                  </label>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full px-5 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    {budgetRanges.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <label className="block text-md font-semibold text-gray-300 mb-4 flex items-center">
                    <DocumentTextIcon className="h-5 w-5 mr-3 text-gray-400" />
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-5 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
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
                  onClick={clearFilters}
                  className="w-full px-6 py-3 text-sm font-semibold text-gray-300 border border-gray-700 rounded-xl hover:bg-gray-700 hover:text-white transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Projects List */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">
                  Showing {filteredProjects.length} of {projects.length}+
                  Projects
                </h2>
                <div className="flex gap-4 items-center">
                  <span className="text-gray-800 border-black">Sort by:</span>
                  <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>Latest</option>
                    <option>Budget (High to Low)</option>
                    <option>Budget (Low to High)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8 cursor-pointer hover:shadow-xl hover:border-primary-500 transition-all duration-300"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 mb-4 text-sm">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-4 py-1 bg-primary-900/50 text-white text-xs rounded-full border border-primary-500/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-8">
                        <div className="text-3xl font-bold text-white mb-1">
                          {project.budget}
                        </div>
                        <div className="text-sm text-gray-500">
                          {project.datePosted}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-gray-700">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <UserIcon className="h-4 w-4" />
                          <span className="font-medium text-gray-300">
                            Client:
                          </span>{" "}
                          {project.client}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          <span className="font-medium text-gray-300">
                            Location:
                          </span>{" "}
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          <span className="font-medium text-gray-300">
                            Duration:
                          </span>{" "}
                          {project.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-gray-300">
                            Proposals:
                          </span>{" "}
                          {project.proposals}
                        </div>
                      </div>
                      <div className="ml-4">
                        <button className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:bg-primary-700 transition-colors duration-300">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <button className="px-8 py-3 text-sm font-semibold  text-gray-800 border border-gray-700 rounded-xl hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white transition-colors duration-300">
                  Load More Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gray-900 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700 transform scale-95 animate-zoom-in">
            <div className="p-8 border-b border-gray-700">
              <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold text-white leading-tight">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-white transition-colors duration-200"
                >
                  <XMarkIcon className="h-8 w-8" />
                </button>
              </div>
            </div>

            <div className="p-8 grid md:grid-cols-3 gap-8">
              {/* Left Column - Details */}
              <div className="md:col-span-2">
                {/* Project Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Project Description
                  </h3>
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-gray-300">
                    <p className="whitespace-pre-line leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary-900/50 text-white text-sm rounded-full border border-primary-500/20 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-700">
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-400">
                      Proposals:
                    </span>{" "}
                    {selectedProject.proposals} •{" "}
                    <span className="font-semibold text-gray-400 ml-2">
                      Posted:
                    </span>{" "}
                    {selectedProject.datePosted}
                  </div>
                  <button
                    onClick={() => setShowBidForm(!showBidForm)}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-300"
                  >
                    {showBidForm ? "Hide Bid Form" : "Bid Now"}
                  </button>
                </div>
              </div>

              {/* Right Column - Info Panel */}
              <div className="md:col-span-1">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 space-y-6">
                  {/* Project Summary */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">
                      Project Summary
                    </h3>
                    <div className="space-y-3 text-gray-400">
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-5 w-5 text-gray-500 mr-3" />
                        <span>
                          Budget:{" "}
                          <span className="font-semibold text-white">
                            {selectedProject.budget}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 text-gray-500 mr-3" />
                        <span>
                          Duration:{" "}
                          <span className="font-semibold text-white">
                            {selectedProject.duration}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-500 mr-3" />
                        <span>
                          Experience Level:{" "}
                          <span className="font-semibold text-white">
                            {selectedProject.experience}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-gray-500 mr-3" />
                        <span>
                          Project Type:{" "}
                          <span className="font-semibold text-white">
                            {selectedProject.projectType}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Client Information */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">
                      Client Information
                    </h3>
                    <div className="space-y-3 text-gray-400">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-500 mr-3" />
                        <span>
                          Client:{" "}
                          <span className="font-semibold text-white">
                            {selectedProject.client}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-5 w-5 text-gray-500 mr-3" />
                        <span>
                          Location:{" "}
                          <span className="font-semibold text-white">
                            {selectedProject.location}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400 mr-3" />
                        <span>
                          Rating:{" "}
                          <span className="font-semibold text-white">
                            {selectedProject.clientRating}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-5 w-5 text-gray-500 mr-3" />
                        <span>
                          Total Spent:{" "}
                          <span className="font-semibold text-white">
                            {selectedProject.totalSpent}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bid Form in Modal */}
            {showBidForm && (
              <div className="p-8 pt-0">
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Submit Your Bid
                  </h3>
                  <form onSubmit={handleBidSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Your Bid Price ($)
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={bidData.price}
                          onChange={handleBidChange}
                          placeholder="Enter your bid amount"
                          className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors placeholder-gray-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Estimated Duration
                        </label>
                        <select
                          name="duration"
                          value={bidData.duration}
                          onChange={handleBidChange}
                          className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                          required
                        >
                          <option value="">Select duration</option>
                          <option value="Less than 1 week">
                            Less than 1 week
                          </option>
                          <option value="1-2 weeks">1-2 weeks</option>
                          <option value="2-4 weeks">2-4 weeks</option>
                          <option value="1-2 months">1-2 months</option>
                          <option value="2-3 months">2-3 months</option>
                          <option value="3+ months">3+ months</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Proposal Message
                      </label>
                      <textarea
                        name="message"
                        value={bidData.message}
                        onChange={handleBidChange}
                        rows={5}
                        placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                        className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors placeholder-gray-500"
                        required
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-300"
                      >
                        Submit Bid
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBidForm(false)}
                        className="px-8 py-3 text-gray-300 font-semibold border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default DiscoverPage;
