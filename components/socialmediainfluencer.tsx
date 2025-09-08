"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const InfluencerSelector = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch(
          `${process.env.VITE_BASE_URL}/influencers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch influencers");
        }
        const data = await response.json();
        setInfluencers(data.influencers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInfluencers();
  }, []);

  // Filter influencers by platform
  const filterInfluencersByPlatform = (platform) => {
    if (platform === "all") return influencers;
    return influencers.filter(
      (influencer) =>
        influencer.platforms &&
        influencer.platforms.some((p) => {
          const platformLower = p.toLowerCase();
          const filterLower = platform.toLowerCase();
          if (filterLower === "facebook") {
            return (
              platformLower.includes("facebook") || platformLower.includes("fb")
            );
          }
          return platformLower.includes(filterLower);
        })
    );
  };

  // Format numbers with K/M suffixes
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  // Static platform list
  const platforms = ["all", "facebook", "instagram", "youtube"];

  // Platform icons
  const platformIcons = {
    facebook: "📘",
    instagram: "📸",
    youtube: "▶️",
    all: "🌟",
  };

  // Get platform display name
  const getPlatformDisplayName = (platform) => {
    const platformMap = {
      facebook: "Facebook",
      instagram: "Instagram",
      youtube: "YouTube",
      all: "All Platforms",
    };
    return (
      platformMap[platform] ||
      platform.charAt(0).toUpperCase() + platform.slice(1)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-black text-xl">Loading influencers...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-red-600 text-xl">Error: {error}</div>
      </div>
    );
  }

  const filteredInfluencers = filterInfluencersByPlatform(selectedPlatform);

  // Get unique influencers (no duplicates) and limit to 3
  const uniqueInfluencers = Array.from(
    new Map(filteredInfluencers.map((item) => [item._id, item])).values()
  ).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto rounded-3xl p-8 md:p-12 border border-gray-200 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              Influencer Showcase
            </span>
          </h2>
        </div>

        {/* Platform selection buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-16">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedPlatform === platform
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-pink-300/40"
                  : "bg-white text-black border border-gray-300 hover:border-purple-400"
              }`}
            >
              <span className="text-xl">{platformIcons[platform] || "🌐"}</span>
              <span>{getPlatformDisplayName(platform)}</span>
            </button>
          ))}
        </div>

        {/* Influencer cards */}
        {uniqueInfluencers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {uniqueInfluencers.map((influencer) => (
              <div
                key={influencer._id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group"
              >
                {/* Profile image with gradient border */}
                <div className="relative mx-auto w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                    {influencer.avatarUrl ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_IMG}${influencer.avatarUrl}`}
                        alt={influencer.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-pink-500">
                        {influencer.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-black text-center mb-2">
                  {influencer.name}
                </h3>

                {/* Display platform badges */}
                <div className="flex justify-center gap-2 mb-4">
                  {influencer.platforms &&
                    influencer.platforms.map((platform, index) => {
                      let platformKey = platform.toLowerCase();
                      if (
                        platformKey.includes("facebook") ||
                        platformKey.includes("fb")
                      ) {
                        platformKey = "facebook";
                      }
                      return (
                        <span
                          key={index}
                          className="text-xs px-3 py-1 rounded-full bg-gray-100 text-black border border-gray-300 flex items-center"
                        >
                          <span className="mr-1">
                            {platformIcons[platformKey] || "🌐"}
                          </span>
                          {platformKey === "facebook" ? "Facebook" : platform}
                        </span>
                      );
                    })}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">Followers</span>
                  <span className="text-pink-600 font-medium text-lg">
                    {formatNumber(influencer.stats.followers)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">Engagement</span>
                  <span className="text-green-600 font-medium text-lg">
                    {influencer.stats.engagementRate}%
                  </span>
                </div>
                {influencer.niches && influencer.niches.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-full px-4 py-2 text-center mb-5 border border-pink-100">
                    <p className="text-sm text-purple-700 font-semibold tracking-wide uppercase">
                      {influencer.niches[0].split(",")[0]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mb-12 text-lg">
            No influencers found for {getPlatformDisplayName(selectedPlatform)}.
          </div>
        )}

        {/* View All button */}
        <div className="text-center">
          <Link href="/influencers">
            <button className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl border border-transparent hover:shadow-lg hover:shadow-pink-400/40 transition-all duration-300 group">
              <span className="flex items-center justify-center space-x-2">
                <span>View All Influencers</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfluencerSelector;
