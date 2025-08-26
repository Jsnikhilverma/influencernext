"use client";

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import {
  LinkIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import {
  CheckBadgeIcon,
  RocketLaunchIcon as RocketLaunchOutline,
} from "@heroicons/react/24/outline";

const AboutPage = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former influencer with 2M+ followers. Built InfluenceHub to solve the problems she faced in the industry.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      linkedin: "#",
    },
    {
      name: "Mike Chen",
      role: "CTO",
      bio: "Tech veteran with 15+ years building scalable platforms. Previously at Google and Facebook.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB4eHBfaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      linkedin: "#",
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Marketing",
      bio: "Marketing expert specializing in influencer partnerships. Helped scale multiple D2C brands.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      linkedin: "#",
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "Product leader focused on user experience. Previously led product teams at Airbnb and Uber.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      linkedin: "#",
    },
  ];

  const stats = [
    { number: "15,000+", label: "Active Influencers" },
    { number: "500+", label: "Brand Partners" },
    { number: "$2M+", label: "Paid Out Monthly" },
    { number: "50+", label: "Countries Served" },
  ];

  const values = [
    {
      title: "Authenticity",
      description:
        "We believe in genuine connections between influencers and brands that share values.",
      icon: (
        <CheckBadgeIcon className="w-12 h-12 text-amber-500 mx-auto mb-4" />
      ),
    },
    {
      title: "Transparency",
      description: "Clear pricing, honest communication, and no hidden fees.",
      icon: <SparklesIcon className="w-12 h-12 text-amber-500 mx-auto mb-4" />,
    },
    {
      title: "Innovation",
      description:
        "Constantly improving our platform with cutting-edge technology.",
      icon: (
        <RocketLaunchOutline className="w-12 h-12 text-amber-500 mx-auto mb-4" />
      ),
    },
    {
      title: "Community",
      description: "Building a supportive ecosystem for creators and brands.",
      icon: <LinkIcon className="w-12 h-12 text-amber-500 mx-auto mb-4" />,
    },
  ];

  return (
    <main className="mt-20 bg-gray-100 font-sans text-gray-800">
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
            About us
          </h1>
          <p className="text-xl text-black font-bold max-w-3xl mx-auto mb-8">
            We're on a mission to democratize influence marketing and create
            opportunities for creators worldwide to build sustainable careers
            doing what they love.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  InfluenceHub was born from a simple observation: the
                  influencer marketing industry was fragmented, opaque, and
                  often unfair to creators. Our founder, Sarah Johnson,
                  experienced this firsthand as an influencer with over 2
                  million followers.
                </p>
                <p>
                  She struggled with inconsistent payments, unclear contracts,
                  and difficulty finding brands that aligned with her values.
                  The existing platforms were either too expensive, too
                  complicated, or didn't prioritize creator success.
                </p>
                <p>
                  In 2023, Sarah teamed up with tech veterans Mike Chen and
                  David Kim to build **InfluenceHub** - a platform that puts
                  creators first while delivering exceptional value to brands.
                </p>
                <p>
                  Today, we're proud to serve over 15,000 influencers and 500+
                  brands worldwide, facilitating millions of dollars in creator
                  earnings while maintaining the highest standards of
                  transparency and authenticity.
                </p>
              </div>
            </div>
            <div className="order-1 w-full h-full lg:order-2">
              <img
                src="/iabou.jpg"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl w-full h-full transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-serif text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">Numbers that tell our story</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 font-serif">
                  {stat.number}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-serif text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.cloneElement(value.icon, {
                    className: "w-8 h-8 text-white",
                  })}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-serif text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind InfluenceHub
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200 transition-all duration-300 group-hover:border-pink-500 group-hover:scale-105"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent  font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent  hover:text-amber-600 font-medium transition-colors duration-200"
                >
                  View LinkedIn →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            To democratize influence marketing by creating a transparent, fair,
            and accessible platform where creators can build sustainable careers
            and brands can find authentic partnerships that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200 shadow-lg">
                Join Our Mission
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 shadow-lg">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
