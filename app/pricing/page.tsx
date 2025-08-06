"use client";

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CheckIcon } from "@heroicons/react/24/solid";

const PricingPage = () => {
  const influencerPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Basic profile creation",
        "Browse opportunities",
        "Apply to 5 campaigns/month",
        "Basic analytics",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Creator",
      price: "$29",
      period: "per month",
      description: "For growing influencers",
      features: [
        "Everything in Free",
        "Unlimited campaign applications",
        "Advanced analytics dashboard",
        "Priority support",
        "Custom profile customization",
        "Direct messaging with brands",
        "Campaign performance insights",
      ],
      popular: true,
    },
    {
      name: "Pro",
      price: "$99",
      period: "per month",
      description: "For established influencers",
      features: [
        "Everything in Creator",
        "Featured profile placement",
        "Exclusive brand opportunities",
        "Dedicated account manager",
        "Advanced reporting tools",
        "Contract negotiation support",
        "Priority campaign matching",
        "API access for integrations",
      ],
      popular: false,
    },
  ];

  const brandPlans = [
    {
      name: "Starter",
      price: "$199",
      period: "per month",
      description: "For small brands",
      features: [
        "Access to 1,000+ influencers",
        "Basic campaign creation",
        "Standard reporting",
        "Email support",
        "5 active campaigns",
      ],
      popular: false,
    },
    {
      name: "Business",
      price: "$499",
      period: "per month",
      description: "For growing brands",
      features: [
        "Everything in Starter",
        "Access to 10,000+ influencers",
        "Advanced campaign tools",
        "Detailed analytics",
        "Priority support",
        "Unlimited campaigns",
        "Custom influencer matching",
        "Campaign optimization tools",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large brands",
      features: [
        "Everything in Business",
        "Full platform access",
        "Dedicated success manager",
        "Custom integrations",
        "White-label solutions",
        "Advanced security features",
        "Custom reporting",
        "24/7 phone support",
      ],
      popular: false,
    },
  ];

  return (
    <main className="mt-20 bg-gray-100 font-sans text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your needs. Start free and upgrade as
            you grow. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Influencer Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-serif text-gray-900 mb-4">
              Plans for Influencers
            </h2>
            <p className="text-xl text-gray-600">
              Start your journey for free and unlock more features as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {influencerPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-10 border-2 transition-all duration-300 ${
                  plan.popular
                    ? "border-purple-500 shadow-2xl scale-[1.03] shadow-pink-200"
                    : "border-gray-200 hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2 text-lg">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors duration-200 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Plans */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-serif text-gray-900 mb-4">
              Plans for Brands
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect influencers for your campaigns
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {brandPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-10 border-2 transition-all duration-300 ${
                  plan.popular
                    ? "border-purple-500 shadow-2xl scale-[1.03] shadow-pink-200"
                    : "border-gray-200 hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2 text-lg">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors duration-200 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:bg-amber-600"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change my plan anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes
                take effect immediately.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a setup fee?
              </h3>
              <p className="text-gray-600">
                No setup fees. You only pay for the plan you choose, with no
                hidden costs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for
                enterprise plans.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel anytime. No long-term contracts or
                cancellation fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of influencers and brands already using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition-colors duration-200 shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 shadow-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PricingPage;
