"use client";

import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Influencer",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    content:
      "InfluenceHub completely transformed my career. I went from making $500/month to over $15,000/month in just 6 months. The platform is incredibly user-friendly and the brand opportunities are amazing!",
    rating: 5,
    followers: "2.1M",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Tech Content Creator",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    content:
      "The analytics and insights provided by InfluenceHub helped me understand my audience better and optimize my content strategy. My engagement rate increased by 40% in the first quarter.",
    rating: 5,
    followers: "1.8M",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Fitness Influencer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    content:
      "I love how easy it is to connect with brands that align with my values. The payment system is seamless and I always get paid on time. Highly recommend!",
    rating: 5,
    followers: "950K",
  },
  {
    id: 4,
    name: "Nike Marketing Team",
    role: "Brand Partner",
    avatar:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    content:
      "InfluenceHub has been instrumental in helping us find authentic influencers for our campaigns. The quality of creators and the ROI we've seen is outstanding.",
    rating: 5,
    campaigns: "25+",
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Travel Influencer",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    content:
      "The platform made it so easy to monetize my travel content. I've worked with amazing brands and the support team is always there when I need help.",
    rating: 5,
    followers: "1.5M",
  },
  {
    id: 6,
    name: "Apple Marketing",
    role: "Brand Partner",
    avatar:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    content:
      "InfluenceHub's vetting process ensures we only work with high-quality influencers. The campaign management tools are excellent and save us so much time.",
    rating: 5,
    campaigns: "15+",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            What Our Community Says
          </h2>
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from influencers and brands who have found success on our
            platform
          </p> */}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card-hover bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  {testimonial.followers
                    ? `${testimonial.followers} followers`
                    : `${testimonial.campaigns} campaigns`}
                </span>
                <span>Verified</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 bg-gray-50 rounded-full px-8 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">10K+</div>
              <div className="text-sm text-gray-600">Happy Influencers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-gray-600">Brand Partners</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
