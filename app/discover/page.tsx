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
  StarIcon,
} from "@heroicons/react/24/solid";

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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidError, setBidError] = useState("");
  const [bidSuccess, setBidSuccess] = useState("");
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);

  const categories = [
    "All",
    "Tech",
    "Lifestyle",
    "Gaming",
    "Beauty",
    "Education",
    "Entertainment",
    "Business",
    "Health",
    "Food",
    "Travel",
    "Fashion",
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

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:4000/api/clients/projects"
        );
        const data = await response.json();

        if (response.ok) {
          setProjects(data.projects || []);
        } else {
          setError("Failed to fetch projects");
        }
      } catch (err) {
        setError("Error connecting to server");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch project details by ID
  const fetchProjectDetails = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/clients/projects/id/${projectId}`
      );
      const data = await response.json();

      if (response.ok) {
        return data.project;
      } else {
        console.error("Failed to fetch project details");
        return null;
      }
    } catch (err) {
      console.error("Error fetching project details:", err);
      return null;
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (project.niches &&
        project.niches.includes(selectedCategory.toLowerCase()));

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description &&
        project.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const budgetValue = project.budgetMin || 0;

    const matchesBudget =
      selectedBudget === "All" ||
      (selectedBudget === "$100 - $500" &&
        budgetValue >= 100 &&
        budgetValue <= 500) ||
      (selectedBudget === "$500 - $1000" &&
        budgetValue >= 500 &&
        budgetValue <= 1000) ||
      (selectedBudget === "$1000 - $5000" &&
        budgetValue >= 1000 &&
        budgetValue <= 5000) ||
      (selectedBudget === "$5000+" && budgetValue >= 5000);

    // Simplified date filtering - would need proper date handling in production
    const matchesDate = selectedDate === "All";

    return matchesCategory && matchesSearch && matchesBudget && matchesDate;
  });

  const handleProjectClick = async (project) => {
    const projectDetails = await fetchProjectDetails(project._id);
    setSelectedProject(projectDetails || project);
    setShowBidForm(false);
    setBidData({
      price: "",
      message: "",
      duration: "",
    });
    setBidError("");
    setBidSuccess("");
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingBid(true);
    setBidError("");
    setBidSuccess("");

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setBidError("You need to be logged in to submit a bid");
        setIsSubmittingBid(false);
        return;
      }

      const response = await fetch(
        "http://localhost:4000/api/influencers/bids",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: selectedProject._id,
            amount: parseInt(bidData.price),
            message: bidData.message,
            duration: bidData.duration,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setBidSuccess("Bid submitted successfully!");
        setBidData({
          price: "",
          message: "",
          duration: "",
        });
        setTimeout(() => {
          setShowBidForm(false);
          setBidSuccess("");
        }, 2000);
      } else {
        setBidError(data.message || "Failed to submit bid");
      }
    } catch (err) {
      setBidError("Error connecting to server");
      console.error("Error submitting bid:", err);
    } finally {
      setIsSubmittingBid(false);
    }
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
    setBidError("");
    setBidSuccess("");
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBudget("All");
    setSelectedDate("All");
    setSearchQuery("");
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatBudget = (project) => {
    if (project.budgetMin && project.budgetMax) {
      return `$${project.budgetMin} - $${project.budgetMax}`;
    } else if (project.budgetMin) {
      return `$${project.budgetMin}+`;
    } else {
      return "Budget not specified";
    }
  };

  if (loading) {
    return (
      <main className="mt-20 bg-white text-gray-800 font-sans min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading projects...</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mt-20 bg-white text-gray-800 font-sans min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-red-500">{error}</div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="mt-20 bg-white text-gray-800 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-slate-900/80 via-gray-800/80 to-black/80 text-white relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('/ibanner1.jpg')", opacity: 0.5 }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6">
            Discover Exclusive Projects
          </h1>
          <p className="text-xl text-white font-bold max-w-3xl mx-auto mb-8">
            Find and bid on premium freelance opportunities tailored to your
            expertise and desired compensation.
          </p>
        </div>
        <div className="max-w-4xl mx-auto mt-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects by keywords or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg placeholder-gray-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Filters and Projects Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-100 rounded-2xl shadow-lg p-8 sticky top-32 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  <FunnelIcon className="h-6 w-6 mr-3 text-purple-600" />
                  Filters
                </h3>

                {/* Date Filter */}
                <div className="mb-8">
                  <label className="block text-md font-semibold text-gray-700 mb-4 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-3 text-gray-600" />
                    Date Posted
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-5 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                  <label className="block text-md font-semibold text-gray-700 mb-4 flex items-center">
                    <CurrencyDollarIcon className="h-5 w-5 mr-3 text-gray-600" />
                    Budget
                  </label>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full px-5 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                  <label className="block text-md font-semibold text-gray-700 mb-4 flex items-center">
                    <DocumentTextIcon className="h-5 w-5 mr-3 text-gray-600" />
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-5 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                  className="w-full px-6 py-3 text-sm font-semibold text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Projects List */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">
                  Showing {filteredProjects.length} of {projects.length}{" "}
                  Projects
                </h2>
                <div className="flex gap-4 items-center">
                  <span className="text-gray-700">Sort by:</span>
                  <select className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Latest</option>
                    <option>Budget (High to Low)</option>
                    <option>Budget (Low to High)</option>
                  </select>
                </div>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    No projects found matching your criteria.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProjects.map((project) => (
                    <div
                      key={project._id}
                      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 cursor-pointer hover:shadow-xl hover:border-purple-500 transition-all duration-300"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mb-4 text-sm">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.niches &&
                              project.niches.map((niche, index) => (
                                <span
                                  key={index}
                                  className="px-4 py-1 bg-purple-100 text-purple-800 text-xs rounded-full border border-purple-200"
                                >
                                  {niche}
                                </span>
                              ))}
                            {project.platforms &&
                              project.platforms.map((platform, index) => (
                                <span
                                  key={index}
                                  className="px-4 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200"
                                >
                                  {platform}
                                </span>
                              ))}
                          </div>
                        </div>
                        <div className="text-right ml-8">
                          <div className="text-3xl font-bold text-purple-600 mb-1">
                            {formatBudget(project)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(project.createdAt)}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <UserIcon className="h-4 w-4" />
                            <span className="font-medium text-gray-700">
                              Client:
                            </span>{" "}
                            {project.client?.name || "Unknown Client"}
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4" />
                            <span className="font-medium text-gray-700">
                              Status:
                            </span>{" "}
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                project.status === "open"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {project.status?.charAt(0).toUpperCase() +
                                project.status?.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <button className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors duration-300">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {filteredProjects.length > 0 && (
                <div className="text-center mt-12">
                  <button className="px-8 py-3 text-sm font-semibold text-gray-700 border border-gray-300 rounded-xl hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white transition-colors duration-300">
                    Load More Projects
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="p-8 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
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
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Project Description
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-gray-700">
                    <p className="whitespace-pre-line leading-relaxed">
                      {selectedProject.description ||
                        "No description provided."}
                    </p>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Project Details
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.niches &&
                      selectedProject.niches.map((niche, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-purple-100 text-purple-800 text-sm rounded-full border border-purple-200 font-medium"
                        >
                          {niche}
                        </span>
                      ))}
                    {selectedProject.platforms &&
                      selectedProject.platforms.map((platform, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200 font-medium"
                        >
                          {platform}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-700">Posted:</span>{" "}
                    {formatDate(selectedProject.createdAt)}
                  </div>
                  <button
                    onClick={() => setShowBidForm(!showBidForm)}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors duration-300"
                  >
                    {showBidForm ? "Hide Bid Form" : "Bid Now"}
                  </button>
                </div>
              </div>

              {/* Right Column - Info Panel */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-6">
                  {/* Project Summary */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                      Project Summary
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-5 w-5 text-gray-600 mr-3" />
                        <span>
                          Budget:{" "}
                          <span className="font-semibold text-gray-800">
                            {formatBudget(selectedProject)}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-gray-600 mr-3" />
                        <span>
                          Status:{" "}
                          <span className="font-semibold text-gray-800">
                            {selectedProject.status?.charAt(0).toUpperCase() +
                              selectedProject.status?.slice(1)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Client Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                      Client Information
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-600 mr-3" />
                        <span>
                          Client:{" "}
                          <span className="font-semibold text-gray-800">
                            {selectedProject.client?.name || "Unknown Client"}
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
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    Submit Your Bid
                  </h3>

                  {/* Success/Error Messages */}
                  {bidSuccess && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                      {bidSuccess}
                    </div>
                  )}

                  {bidError && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                      {bidError}
                    </div>
                  )}

                  <form onSubmit={handleBidSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Your Bid Price ($)
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={bidData.price}
                          onChange={handleBidChange}
                          placeholder="Enter your bid amount"
                          className="w-full px-5 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-gray-500"
                          required
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Estimated Duration
                        </label>
                        <select
                          name="duration"
                          value={bidData.duration}
                          onChange={handleBidChange}
                          className="w-full px-5 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Proposal Message
                      </label>
                      <textarea
                        name="message"
                        value={bidData.message}
                        onChange={handleBidChange}
                        rows={5}
                        placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                        className="w-full px-5 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-gray-500"
                        required
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        disabled={isSubmittingBid}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors duration-300 disabled:opacity-50"
                      >
                        {isSubmittingBid ? "Submitting..." : "Submit Bid"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBidForm(false)}
                        className="px-8 py-3 text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300"
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
