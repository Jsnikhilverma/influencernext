"use client";

import React, { useState } from "react";
import Link from "next/link";

const influencers = [
  {
    id: 1,
    name: "Sarah Johnson",
    handle: "@sarahjohnson",
    niche: "Fashion & Beauty",
    followers: "2.1M",
    engagement: "8.5%",
    earnings: "$45K",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    verified: true,
    tier: "Diamond",
    growth: "+12.3%",
  },
  {
    id: 2,
    name: "Mike Chen",
    handle: "@mikechen_tech",
    niche: "Technology",
    followers: "1.8M",
    engagement: "12.3%",
    earnings: "$38K",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    verified: true,
    tier: "Platinum",
    growth: "+8.7%",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    handle: "@emmafitness",
    niche: "Fitness & Health",
    followers: "950K",
    engagement: "15.7%",
    earnings: "$32K",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    verified: true,
    tier: "Gold",
    growth: "+15.2%",
  },
  {
    id: 4,
    name: "Alex Thompson",
    handle: "@alexcooks",
    niche: "Food & Cooking",
    followers: "1.2M",
    engagement: "9.2%",
    earnings: "$28K",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    verified: false,
    tier: "Silver",
    growth: "+6.1%",
  },
  {
    id: 5,
    name: "Lisa Park",
    handle: "@lisatravels",
    niche: "Travel",
    followers: "1.5M",
    engagement: "11.8%",
    earnings: "$35K",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    verified: true,
    tier: "Platinum",
    growth: "+9.4%",
  },
  {
    id: 6,
    name: "David Kim",
    handle: "@davidgaming",
    niche: "Gaming",
    followers: "2.3M",
    engagement: "13.4%",
    earnings: "$52K",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    verified: true,
    tier: "Diamond",
    growth: "+11.8%",
  },
];

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

const TopInfluencers = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-6">
            <span className="text-2xl">👑</span>
            <span className="text-sm font-medium text-white/80 tracking-wide uppercase">
              Elite Creators
            </span>
          </div> */}

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Top Influencers
            </span>
          </h2>

          {/* <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Meet the visionaries shaping the future of digital influence and
            creativity
          </p> */}

          {/* View All Button */}

          <div className="mt-10">
            <Link href="/influencers">
              <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
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
          {influencers.map((influencer) => (
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
                {/* Tier Badge */}
                {/* <div className="absolute top-6 right-6">
                  <div
                    className={`flex items-center gap-2 bg-gradient-to-r ${getTierColor(
                      influencer.tier
                    )} px-3 py-1 rounded-full text-white text-sm font-semibold shadow-lg`}
                  >
                    <span>{getTierIcon(influencer.tier)}</span>
                    <span>{influencer.tier}</span>
                  </div>
                </div> */}

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
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-white/70 font-medium">Niche</span>
                    <span className="text-white font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {influencer.niche}
                    </span>
                  </div>

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

                {/* Action Button */}
                {/* <div className="mt-8 pt-6 border-t border-white/10">
                  <button className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600 hover:to-blue-600 border border-purple-400/30 hover:border-transparent text-white hover:text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Profile
                      <svg
                        className="w-5 h-5 transition-transform group-hover/btn:translate-x-1"
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
                    </span>
                  </button>
                </div> */}

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

        {/* Bottom CTA */}
        {/* <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-4">
            <span className="text-white/70">
              Want to join our elite creators?
            </span>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
              Apply Now
            </button>
          </div>
        </div> */}
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
