// pages/influencer-dashboard.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function InfluencerDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [availableProjects, setAvailableProjects] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchUserData();
    fetchAvailableProjects();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = getCookie("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        `${process.env.VITE_BASE_URL}/influencers/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableProjects = async () => {
    try {
      const token = getCookie("token");
      if (!token) return;

      const response = await fetch(
        `${process.env.VITE_BASE_URL}/influencers/me/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch available projects");

      const data = await response.json();
      setAvailableProjects(data.projects || []);
    } catch (err) {
      setError("Failed to load available projects");
    }
  };

  const uploadAvatar = async (file) => {
    try {
      const token = getCookie("token");
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(
        `${process.env.VITE_BASE_URL}/influencers/me/avatar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload avatar");
      }

      const data = await response.json();
      return data.avatarUrl;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = getCookie("token");
      const formData = new FormData(e.target);
      const bio = formData.get("bio");
      const niches = formData.getAll("niches");
      const platforms = formData.getAll("platforms");

      // Upload avatar first if a new file was selected
      let avatarUrl = user.avatarUrl;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
      }

      // Update profile with new data including the avatar URL
      const response = await fetch(
        `${process.env.VITE_BASE_URL}/influencers/me`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bio, niches, platforms, avatarUrl }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await response.json();
      setUser(data.user);
      setAvatarFile(null);
      setSuccess("Profile updated successfully");
      setActiveTab("profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
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
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <p className="text-gray-300">Please log in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 font-sans">
      <Header />

      {/* Navigation Tabs */}
      <div className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === "profile"
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-500"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("availableProjects")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === "availableProjects"
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-500"
              }`}
            >
              Available Projects
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded relative mb-8 shadow-lg">
            <span className="block sm:inline">{error}</span>
            <button
              onClick={() => setError("")}
              className="absolute top-0 right-0 p-3"
            >
              <span className="text-red-300">&times;</span>
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded relative mb-8 shadow-lg">
            <span className="block sm:inline">{success}</span>
            <button
              onClick={() => setSuccess("")}
              className="absolute top-0 right-0 p-3"
            >
              <span className="text-green-300">&times;</span>
            </button>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && user && (
          <div className="bg-[#1e1e1e] shadow-lg overflow-hidden rounded-lg">
            <div className="px-6 py-8 sm:px-8 flex justify-between items-center border-b border-gray-700">
              <h3 className="text-2xl leading-6 font-medium text-gray-100">
                Profile Information
              </h3>
              <button
                onClick={() => setActiveTab("editProfile")}
                className="bg-amber-500 hover:bg-amber-600 text-[#121212] font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Edit Profile
              </button>
            </div>
            <div className="py-8">
              <dl>
                <div className="bg-[#1e1e1e] px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 border-b border-gray-700">
                  <dt className="text-lg font-medium text-gray-400">
                    Full name
                  </dt>
                  <dd className="mt-1 text-lg text-gray-200 sm:mt-0 sm:col-span-2">
                    {user.name}
                  </dd>
                </div>
                <div className="bg-[#1e1e1e] px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 border-b border-gray-700">
                  <dt className="text-lg font-medium text-gray-400">Slug</dt>
                  <dd className="mt-1 text-lg text-gray-200 sm:mt-0 sm:col-span-2">
                    {user.slug}
                  </dd>
                </div>
                <div className="bg-[#1e1e1e] px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 border-b border-gray-700">
                  <dt className="text-lg font-medium text-gray-400">Bio</dt>
                  <dd className="mt-1 text-lg text-gray-200 sm:mt-0 sm:col-span-2">
                    {user.bio || "No bio provided"}
                  </dd>
                </div>
                <div className="bg-[#1e1e1e] px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 border-b border-gray-700">
                  <dt className="text-lg font-medium text-gray-400">
                    Category
                  </dt>
                  <dd className="mt-1 text-lg text-gray-200 sm:mt-0 sm:col-span-2">
                    {user.niches?.join(", ") || "Not specified"}
                  </dd>
                </div>
                <div className="bg-[#1e1e1e] px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 border-b border-gray-700">
                  <dt className="text-lg font-medium text-gray-400">
                    Platforms
                  </dt>
                  <dd className="mt-1 text-lg text-gray-200 sm:mt-0 sm:col-span-2">
                    {user.platforms?.join(", ") || "Not specified"}
                  </dd>
                </div>
                <div className="bg-[#1e1e1e] px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8">
                  <dt className="text-lg font-medium text-gray-400">Avatar</dt>
                  <dd className="mt-1 text-lg text-gray-200 sm:mt-0 sm:col-span-2">
                    {user.avatarUrl ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_IMG}${user.avatarUrl}`}
                        alt="Avatar"
                        className="h-24 w-24 rounded-full border-2 border-amber-400 shadow-md"
                      />
                    ) : (
                      "No avatar provided"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {/* Edit Profile Tab */}
        {activeTab === "editProfile" && user && (
          <div className="bg-[#1e1e1e] shadow-lg overflow-hidden rounded-lg">
            <div className="px-6 py-8 sm:px-8 border-b border-gray-700">
              <h3 className="text-2xl leading-6 font-medium text-gray-100">
                Edit Profile
              </h3>
            </div>
            <div className="px-6 py-8 sm:px-8">
              <form onSubmit={handleUpdateProfile}>
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      defaultValue={user.bio}
                      rows={3}
                      className="mt-2 block w-full bg-[#252525] border border-gray-700 rounded-md shadow-sm p-3 focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="niches"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Category (comma separated)
                    </label>
                    <input
                      type="text"
                      id="niches"
                      name="niches"
                      defaultValue={user.niches?.join(", ")}
                      className="mt-2 block w-full bg-[#252525] border border-gray-700 rounded-md shadow-sm p-3 focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm"
                      placeholder="tech, lifestyle, fashion"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="platforms"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Platforms (comma separated)
                    </label>
                    <input
                      type="text"
                      id="platforms"
                      name="platforms"
                      defaultValue={user.platforms?.join(", ")}
                      className="mt-2 block w-full bg-[#252525] border border-gray-700 rounded-md shadow-sm p-3 focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm"
                      placeholder="youtube, instagram, tiktok"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="avatar"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Avatar
                    </label>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      onChange={handleAvatarChange}
                      className="mt-2 block w-full bg-[#252525] border border-gray-700 rounded-md shadow-sm p-3 focus:ring-amber-500 focus:border-amber-500 text-gray-200 sm:text-sm"
                      accept="image/*"
                    />
                    {avatarFile && (
                      <p className="mt-2 text-sm text-amber-400">
                        Selected file: {avatarFile.name}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("profile");
                        setAvatarFile(null);
                      }}
                      className="bg-[#1e1e1e] py-3 px-6 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 hover:bg-[#252525] transition-colors duration-200 focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-[#121212] bg-amber-500 hover:bg-amber-600 transition-colors duration-200 disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Available Projects Tab */}
        {activeTab === "availableProjects" && (
          <div className="bg-[#1e1e1e] shadow-lg overflow-hidden rounded-lg">
            <div className="px-6 py-8 sm:px-8 border-b border-gray-700">
              <h3 className="text-2xl leading-6 font-medium text-gray-100">
                Available Projects
              </h3>
            </div>
            <div className="border-t border-gray-700">
              {availableProjects.length === 0 ? (
                <div className="px-6 py-8 sm:px-8">
                  <p className="text-gray-400">
                    No available projects at the moment.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-[#252525]">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Budget
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Platforms
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        >
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#1e1e1e] divide-y divide-gray-700">
                      {availableProjects.map((project) => (
                        <tr
                          key={project.id}
                          className="hover:bg-[#252525] transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-100">
                              {project.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            ₹{project.budgetMin} - ₹{project.budgetMax}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {project.niches.join(", ")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {project.platforms.join(", ")}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {project.description &&
                              project.description.substring(0, 100)}
                            {project.description &&
                            project.description.length > 100
                              ? "..."
                              : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
