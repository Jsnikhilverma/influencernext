"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon, // Added for office hours, if applicable
  PaperAirplaneIcon, // For send button
} from "@heroicons/react/24/outline";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // In a real application, you would send this data to your backend API
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="mt-20 bg-gray-100 font-sans text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            We're here to help! Whether you have a question, need support, or
            want to partner with us, our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Contact Information and Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-8">
                Reach Out to Us
              </h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <EnvelopeIcon className="h-8 w-8 text-pink-500 flex-shrink-0 mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      Email Us
                    </h3>
                    <p className="text-gray-600">
                      Our friendly team is here to help.
                    </p>
                    <a
                      href="mailto:support@influencehub.com"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent  hover:text-amber-800 font-medium transition-colors"
                    >
                      support@influencehub.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <PhoneIcon className="h-8 w-8 text-pink-500 flex-shrink-0 mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      Call Us
                    </h3>
                    <p className="text-gray-600">
                      Mon-Fri from 9am to 5pm EST.
                    </p>
                    <a
                      href="tel:+1 (555) 123-4567"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent  hover:text-amber-800 font-medium transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPinIcon className="h-8 w-8 text-pink-500 flex-shrink-0 mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      Visit Us
                    </h3>
                    <p className="text-gray-600">
                      InfluenceHub HQ, 123 Global Street, Suite 400, New York,
                      NY 10001, USA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Regarding a partnership opportunity..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-200 shadow-md"
                >
                  <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif text-gray-900 mb-8">
            Find Us on the Map
          </h2>
          <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg aspect-w-16 aspect-h-9 w-full h-96 flex items-center justify-center text-gray-500 text-lg">
            
            <p>Map Placeholder</p>
          </div>
        </div>
      </section> */}

      <Footer />
    </main>
  );
};

export default ContactPage;
