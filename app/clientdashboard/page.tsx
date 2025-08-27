"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedProject, setSelectedProject] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchUserData();
    fetchProjects();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = getCookie("token");
      const response = await fetch(`${process.env.VITE_BASE_URL}/clients/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const token = getCookie("token");
      const response = await fetch(
        `${process.env.VITE_BASE_URL}/clients/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch projects");

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError("Failed to load projects");
    }
  };

  const fetchProjectBids = async (projectId) => {
    try {
      const token = getCookie("token");
      const response = await fetch(
        `${process.env.VITE_BASE_URL}/projects/${projectId}/bids`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch bids");

      const data = await response.json();
      setBids(data.bids || []);
    } catch (err) {
      setError("Failed to load bids");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getCookie("token");
      const formData = new FormData(e.target);
      const bio = formData.get("bio");
      const avatarUrl = formData.get("avatarUrl");

      const response = await fetch(`${process.env.VITE_BASE_URL}/clients/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio, avatarUrl }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const data = await response.json();
      setUser(data.user);
      setSuccess("Profile updated successfully");
      setActiveTab("profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostProject = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getCookie("token");
      const formData = new FormData(e.target);

      const projectData = {
        title: formData.get("title"),
        description: formData.get("description"),
        budgetMin: parseInt(formData.get("budgetMin")),
        budgetMax: parseInt(formData.get("budgetMax")),
        niches: formData
          .get("niches")
          .split(",")
          .map((niche) => niche.trim()),
        platforms: formData
          .get("platforms")
          .split(",")
          .map((platform) => platform.trim()),
      };

      const response = await fetch("http:///api/clients/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error("Failed to post project");

      const data = await response.json();
      setProjects([...projects, data.project]);
      setSuccess("Project posted successfully");
      e.target.reset();
      setActiveTab("projects");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBid = async (bidId) => {
    try {
      const token = getCookie("token");
      const response = await fetch(
        `${process.env.VITE_BASE_URL}/bids/${bidId}/accept`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ BID_ID: bidId }),
        }
      );

      if (!response.ok) throw new Error("Failed to accept bid");

      setSuccess("Bid accepted successfully");
      // Refresh bids
      if (selectedProject) {
        fetchProjectBids(selectedProject._id);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRejectBid = async (bidId) => {
    try {
      const token = getCookie("token");
      const response = await fetch(
        `${process.env.VITE_BASE_URL}/bids/${bidId}/reject`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ BID_ID: bidId }),
        }
      );

      if (!response.ok) throw new Error("Failed to reject bid");

      setSuccess("Bid rejected successfully");
      // Refresh bids
      if (selectedProject) {
        fetchProjectBids(selectedProject._id);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const viewProjectDetails = async (project) => {
    setSelectedProject(project);
    setActiveTab("projectDetails");
    await fetchProjectBids(project._id);
  };

  const getCookie = (name) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />

      {/* Navigation Tabs */}
      <div className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                activeTab === "profile"
                  ? "border-gold text-gold"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500"
              }`}
            >
              <i className="fas fa-user mr-2"></i>Profile
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                activeTab === "projects"
                  ? "border-gold text-gold"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500"
              }`}
            >
              <i className="fas fa-briefcase mr-2"></i>My Projects
            </button>
            <button
              onClick={() => setActiveTab("postProject")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                activeTab === "postProject"
                  ? "border-gold text-gold"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500"
              }`}
            >
              <i className="fas fa-plus-circle mr-2"></i>Post New Project
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6 backdrop-blur-sm">
            <span className="block sm:inline">{error}</span>
            <button
              onClick={() => setError("")}
              className="absolute top-0 right-0 p-3 text-red-300 hover:text-white transition-colors"
            >
              <span className="text-xl">&times;</span>
            </button>
          </div>
        )}

        {success && (
          <div className="bg-emerald-900/30 border border-emerald-700 text-emerald-200 px-4 py-3 rounded-lg relative mb-6 backdrop-blur-sm">
            <span className="block sm:inline">{success}</span>
            <button
              onClick={() => setSuccess("")}
              className="absolute top-0 right-0 p-3 text-emerald-300 hover:text-white transition-colors"
            >
              <span className="text-xl">&times;</span>
            </button>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && user && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
            <div className="px-6 py-5 flex justify-between items-center border-b border-gray-700/50">
              <h3 className="text-xl font-semibold text-white">
                <i className="fas fa-user-circle mr-2 text-gold"></i>Profile
                Information
              </h3>
              <button
                onClick={() => setActiveTab("editProfile")}
                className="bg-white hover:from-gold-dark hover:to-gold text-gray-900 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-gold/20"
              >
                <i className="fas fa-edit mr-2"></i>Edit Profile
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-8">
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt="Avatar"
                  className="h-24 w-24 rounded-full border-2 border-gold shadow-lg"
                />
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <p className="text-gray-400">@{user.slug}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/30 p-5 rounded-xl border border-gray-700/30">
                  <h4 className="text-gold font-medium mb-2">Bio</h4>
                  <p className="text-gray-300">
                    {user.bio || "No bio provided"}
                  </p>
                </div>

                <div className="bg-gray-800/30 p-5 rounded-xl border border-gray-700/30">
                  <h4 className="text-gold font-medium mb-2">Account Type</h4>
                  <p className="text-gray-300">Premium Client</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile Tab */}
        {activeTab === "editProfile" && user && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
            <div className="px-6 py-5 border-b border-gray-700/50">
              <h3 className="text-xl font-semibold text-white">
                <i className="fas fa-user-edit mr-2 text-gold"></i>Edit Profile
              </h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleUpdateProfile}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      defaultValue={user.bio}
                      rows={4}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="avatarUrl"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Avatar URL
                    </label>
                    <input
                      type="text"
                      id="avatarUrl"
                      name="avatarUrl"
                      defaultValue={user.avatarUrl}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all duration-300"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab("profile")}
                      className="px-6 py-3 bg-gray-700/50 hover:bg-gray-700/70 text-white rounded-lg font-medium transition-all duration-300 border border-gray-600/50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-white hover:from-gold-dark hover:to-gold text-gray-900 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-gold/20"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
            <div className="px-6 py-5 border-b border-gray-700/50">
              <h3 className="text-xl font-semibold text-white">
                <i className="fas fa-briefcase mr-2 text-gold"></i>My Projects
              </h3>
            </div>
            <div className="p-6">
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-folder-open text-4xl text-gray-500 mb-4"></i>
                  <p className="text-gray-400">
                    You haven't posted any projects yet.
                  </p>
                  <button
                    onClick={() => setActiveTab("postProject")}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-gray-900 rounded-lg font-medium transition-all duration-300"
                  >
                    Post Your First Project
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project._id}
                      className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30 hover:border-gold/30 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold text-white truncate">
                          {project.title}
                        </h4>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.status === "open"
                              ? "bg-emerald-900/30 text-emerald-300 border border-emerald-700/50"
                              : "bg-gray-700/50 text-gray-300 border border-gray-600/50"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="mb-4">
                        <p className="text-gold font-medium">
                          Budget:{" "}
                          <span className="text-white">
                            ₹{project.budgetMin} - ₹{project.budgetMax}
                          </span>
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <span className="text-xs text-gray-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => viewProjectDetails(project)}
                          className="text-sm bg-gray-700/50 hover:bg-gray-700/70 text-white px-3 py-1 rounded-lg transition-all duration-300 border border-gray-600/50"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Project Details Tab */}
        {activeTab === "projectDetails" && selectedProject && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
            <div className="px-6 py-5 flex justify-between items-center border-b border-gray-700/50">
              <h3 className="text-xl font-semibold text-white">
                <i className="fas fa-folder-open mr-2 text-gold"></i>Project
                Details
              </h3>
              <button
                onClick={() => setActiveTab("projects")}
                className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700/70 text-white rounded-lg font-medium transition-all duration-300 border border-gray-600/50"
              >
                <i className="fas fa-arrow-left mr-2"></i>Back to Projects
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-gold font-medium mb-2">Title</h4>
                    <p className="text-white text-lg">
                      {selectedProject.title}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-gold font-medium mb-2">Description</h4>
                    <p className="text-gray-300">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-gold font-medium mb-2">Budget Range</h4>
                    <p className="text-white">
                      ₹{selectedProject.budgetMin} - ₹
                      {selectedProject.budgetMax}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-gold font-medium mb-2">Niches</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.niches.map((niche, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600/50"
                        >
                          {niche}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gold font-medium mb-2">Platforms</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.platforms.map((platform, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600/50"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gold font-medium mb-2">Status</h4>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        selectedProject.status === "open"
                          ? "bg-emerald-900/30 text-emerald-300 border border-emerald-700/50"
                          : "bg-gray-700/50 text-gray-300 border border-gray-600/50"
                      }`}
                    >
                      {selectedProject.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-gold font-medium mb-2">Created At</h4>
                    <p className="text-gray-300">
                      {new Date(selectedProject.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bids Section */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-white mb-6 border-b border-gray-700/50 pb-3">
                  <i className="fas fa-gavel mr-2 text-gold"></i>Bids for this
                  Project
                </h3>

                {bids.length === 0 ? (
                  <div className="text-center py-8 bg-gray-800/30 rounded-xl border border-gray-700/30">
                    <i className="fas fa-inbox text-4xl text-gray-500 mb-4"></i>
                    <p className="text-gray-400">
                      No bids yet for this project.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {bids.map((bid) => (
                      <div
                        key={bid._id}
                        className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30 hover:border-gold/30 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white">
                              {bid.influencer?.name || "Unknown Influencer"}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              @{bid.influencer?.slug || "unknown"}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              bid.status === "pending"
                                ? "bg-amber-900/30 text-amber-300 border border-amber-700/50"
                                : bid.status === "accepted"
                                ? "bg-emerald-900/30 text-emerald-300 border border-emerald-700/50"
                                : bid.status === "rejected" ||
                                  bid.status === "withdrawn"
                                ? "bg-red-900/30 text-red-300 border border-red-700/50"
                                : "bg-gray-700/50 text-gray-300 border border-gray-600/50"
                            }`}
                          >
                            {bid.status}
                          </span>
                        </div>

                        <div className="mb-4">
                          <p className="text-gold font-medium">
                            Bid Amount:{" "}
                            <span className="text-white">₹{bid.amount}</span>
                          </p>
                        </div>

                        <div className="mb-4">
                          <h5 className="text-gold font-medium mb-1">
                            Message
                          </h5>
                          <p className="text-gray-300">{bid.message}</p>
                        </div>

                        {bid.status === "pending" && (
                          <div className="flex space-x-3 pt-4 border-t border-gray-700/30">
                            <button
                              onClick={() => handleAcceptBid(bid._id)}
                              className="px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-300 rounded-lg font-medium transition-all duration-300 border border-emerald-700/50 hover:border-emerald-500/50"
                            >
                              Accept Bid
                            </button>
                            <button
                              onClick={() => handleRejectBid(bid._id)}
                              className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 rounded-lg font-medium transition-all duration-300 border border-red-700/50 hover:border-red-500/50"
                            >
                              Reject Bid
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Post Project Tab */}
        {activeTab === "postProject" && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
            <div className="px-6 py-5 border-b border-gray-700/50">
              <h3 className="text-xl font-semibold text-white">
                <i className="fas fa-plus-circle mr-2 text-gold"></i>Post a New
                Project
              </h3>
            </div>
            <div className="p-6">
              <form onSubmit={handlePostProject}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Project Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all duration-300"
                      placeholder="Enter project title"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Project Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all duration-300"
                      placeholder="Describe your project in detail"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="budgetMin"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Minimum Budget (₹)
                      </label>
                      <input
                        type="number"
                        id="budgetMin"
                        name="budgetMin"
                        required
                        min="0"
                        className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all duration-300"
                        placeholder="Min budget"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="budgetMax"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Maximum Budget (₹)
                      </label>
                      <input
                        type="number"
                        id="budgetMax"
                        name="budgetMax"
                        required
                        min="0"
                        className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all duration-300"
                        placeholder="Max budget"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="niches"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Niches (comma separated)
                    </label>
                    <input
                      type="text"
                      id="niches"
                      name="niches"
                      required
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all duration-300"
                      placeholder="tech, marketing, lifestyle"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="platforms"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Platforms (comma separated)
                    </label>
                    <input
                      type="text"
                      id="platforms"
                      name="platforms"
                      required
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all duration-300"
                      placeholder="youtube, instagram, tiktok"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-white hover:from-gold-dark hover:to-gold text-gray-900 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-gold/20"
                    >
                      Post Project
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />

      {/* Add Font Awesome for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Custom CSS for gold color and other enhancements */}
      <style jsx global>{`
        :root {
          --gold: #d4af37;
          --gold-dark: #b8860b;
        }

        .text-gold {
          color: #d4af37;
        }

        .bg-gold {
          background-color: #d4af37;
        }

        .bg-gold-dark {
          background-color: #b8860b;
        }

        .border-gold {
          border-color: #d4af37;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }

        .backdrop-blur-md {
          backdrop-filter: blur(8px);
        }

        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
