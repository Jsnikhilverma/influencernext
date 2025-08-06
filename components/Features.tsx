"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  GlobeAltIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: CurrencyDollarIcon,
    title: "Monetize Your Influence",
    description:
      "Earn substantial income through exclusive brand partnerships, premium sponsored content, and curated affiliate programs. Our secure payment system ensures timely, professional transactions.",
    color: "from-emerald-500 via-green-400 to-green-600",
  },
  {
    icon: UserGroupIcon,
    title: "Elite Brand Connections",
    description:
      "Access our vetted network of luxury brands seeking authentic influencers. Filter by prestige level, audience demographics, and exclusive collaboration types.",
    color: "from-blue-500 via-indigo-400 to-indigo-600",
  },
  {
    icon: ShieldCheckIcon,
    title: "Premium Protection",
    description:
      "Your data and earnings are safeguarded with institutional-grade security. We professionally manage all contracts, payments, and negotiations on your behalf.",
    color: "from-purple-500 via-pink-400 to-pink-600",
  },
  {
    icon: ChartBarIcon,
    title: "Advanced Analytics",
    description:
      "Track your growth, engagement metrics, and earnings with our sophisticated dashboard. Gain insights into what premium content resonates most with your audience.",
    color: "from-amber-500 via-orange-400 to-orange-600",
  },
  {
    icon: GlobeAltIcon,
    title: "Global Luxury Network",
    description:
      "Connect with elite brands worldwide. Our platform supports multiple languages, currencies, and international payment methods for seamless global collaborations.",
    color: "from-cyan-500 via-blue-400 to-blue-600",
  },
  {
    icon: CogIcon,
    title: "Effortless Management",
    description:
      "Streamline all your collaborations, contracts, and payments through our elegant dashboard. Automated invoicing, payment tracking, and calendar integration.",
    color: "from-teal-500 via-cyan-400 to-cyan-600",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              Premium Tools for Elite Creators
            </span>
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Our exclusive platform provides luxury-grade tools to amplify your
            influence, connect with premium brands, and build a sustainable
            high-end income stream.
          </p> */}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full bg-white rounded-xl p-8 border border-gray-200 hover:border-primary-300 transition-all duration-300 flex flex-col shadow-sm hover:shadow-lg">
                <div
                  className={`w-16 h-16 mb-6 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {feature.description}
                </p>
                <div className="mt-6 pt-4 border-t border-gray-100 group-hover:border-primary-100 transition-colors duration-300">
                  <span className="text-xs font-medium text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    PREMIUM FEATURE
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-400 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Access Premium Features
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Exclusive invitation-only membership available
          </p>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Features;
