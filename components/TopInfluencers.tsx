"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const getTierColor = (tier) => {
  const colors = {
    Diamond: "from-blue-600 to-purple-600",
    Platinum: "from-gray-400 to-gray-600",
    Gold: "from-yellow-400 to-yellow-600",
    Silver: "from-gray-300 to-gray-500",
  };
  return colors[tier] || "from-gray-300 to-gray-500";
};

const getTierIcon = (tier) => {
  switch (tier) {
    case "Diamond":
      return "💎";
    case "Platinum":
      return "🏆";
    case "Gold":
      return "🥇";
    case "Silver":
      return "🥈";
    default:
      return "⭐";
  }
};

// Helper function to format numbers with K/M suffixes
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const TopInfluencers = () => {
  const [influencers, setInfluencers] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Map API data to match our expected format
        const mappedInfluencers = data.influencers.map((influencer, index) => ({
          id: influencer._id,
          name: influencer.name,
          handle: `@${influencer.slug}`,
          niche:
            influencer.niches.length > 0 ? influencer.niches[0] : "General",
          followers: formatNumber(influencer.stats.followers),
          engagement: `${influencer.stats.engagementRate || 0}%`,
          earnings: "$0", // Not provided in API
          avatar: `https://images.unsplash.com/photo-${
            index % 2 === 0
              ? "1494790108755-2616b612b786"
              : "1507003211169-0a1dd7228f2d"
          }?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80`,
          verified: index % 2 === 0, // Random verification status
          tier: ["Diamond", "Platinum", "Gold", "Silver"][index % 4],
          growth: `+${(Math.random() * 15 + 5).toFixed(1)}%`, // Random growth
        }));

        setInfluencers(mappedInfluencers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="text-white text-xl">Loading influencers...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="text-white text-xl">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Top Influencers
            </span>
          </h2>

          <div className="mt-10">
            <Link href="/influencers">
              <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-blue-700 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                <span>Explore All Creators</span>
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </div>

        {/* Influencer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {influencers.slice(0, 3).map((influencer) => (
            <div
              key={influencer.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(influencer.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Glow Effect */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${getTierColor(
                  influencer.tier
                )} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-all duration-500`}
              ></div>

              {/* Main Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:transform group-hover:scale-[1.02]">
                {/* Profile Section */}
                <div className="flex items-center mb-8">
                  <div className="relative">
                    {/* Avatar Glow */}
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${getTierColor(
                        influencer.tier
                      )} rounded-full blur opacity-60`}
                    ></div>

                    {/* Avatar */}
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white/20">
                      <img
                        src={influencer.avatar}
                        alt={influencer.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Verification Badge */}
                    {influencer.verified && (
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg">
                        <svg
                          className="w-4 h-4 text-white"
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
                  </div>

                  <div className="ml-5">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {influencer.name}
                    </h3>
                    <p className="text-white/60 text-lg">{influencer.handle}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="space-y-4">
                  {/* <div className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-white/70 font-medium">Category</span>
                    <span className="text-white font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {influencer.niche}
                    </span>
                  </div> */}

                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-white/70 font-medium">Followers</span>
                    <span className="text-white font-bold text-lg">
                      {influencer.followers}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-white/70 font-medium">
                      Engagement
                    </span>
                    <span className="text-emerald-400 font-bold text-lg">
                      {influencer.engagement}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-white/70 font-medium">Growth</span>
                    <span className="text-green-400 font-bold text-lg">
                      {influencer.growth}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-400/20">
                    <span className="text-white/70 font-medium">
                      Monthly Revenue
                    </span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      {influencer.earnings}
                    </span>
                  </div>
                </div>

                {/* Floating particles effect on hover */}
                {hoveredCard === influencer.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-8 right-8 w-1 h-1 bg-blue-400 rounded-full animate-ping animation-delay-300"></div>
                    <div className="absolute top-1/2 left-8 w-1 h-1 bg-emerald-400 rounded-full animate-ping animation-delay-700"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </section>
  );
};

export default TopInfluencers;
