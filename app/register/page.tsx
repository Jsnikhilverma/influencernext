"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<"influencer" | "client">(
    "influencer"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "influencer",
    agreeToTerms: false,
    newsletter: false,

    company: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters with uppercase, lowercase, and number"
      );
      setIsLoading(false);
      return;
    }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      setIsLoading(false);
      return;
    }

    // Prepare data for API
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const role = userType === "influencer" ? "influencer" : "client";

    const apiData = {
      name: fullName,
      email: formData.email,
      password: formData.password,
      role: role,
    };

    try {
      const response = await fetch(
        `${process.env.VITE_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        setSuccess(true);
        router.push("/login");
        // You might want to store the token and user data (e.g., in context or localStorage)
        console.log("Registration successful:", data);

        // Redirect or perform other actions upon successful registration
      } else {
        // Handle API errors
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // If registration was successful, show success message

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Column - Benefits */}
          <div className="w-full lg:w-2/5 bg-black backdrop-blur-md p-10 border border-white">
            <div className="flex items-center space-x-2 mb-10">
              <div className="w-10 h-10 bg-gradient-to-r from-gold-500 to-gold-300 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-slate-900 font-bold text-xl">I</span>
              </div>
              <span className="text-2xl font-bold text-white font-cormorant">
                InfluenceHub
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6 font-cormorant">
              Join the Premier <br />
              Influence Network
            </h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-0.5">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    Exclusive Partnerships
                  </h4>
                  <p className="text-sm text-purple-200 mt-1 font-light">
                    Connect with premium brands and top-tier influencers
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-0.5">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    Advanced Analytics
                  </h4>
                  <p className="text-sm text-purple-200 mt-1 font-light">
                    Data-driven insights to maximize your campaign performance
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-0.5">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    Secure Transactions
                  </h4>
                  <p className="text-sm text-purple-200 mt-1 font-light">
                    Protected payments and contract management
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black/20 p-6 rounded-xl border border-white/5">
              <p className="text-sm text-purple-200 italic mb-3">
                "InfluenceHub delivered exceptional ROI for our luxury brand
                campaigns. The quality of creators is unmatched."
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full mr-3"></div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    Elena Rodriguez
                  </p>
                  <p className="text-xs text-purple-300">
                    Marketing Director, LuxeBrands
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-3/5 bg-black backdrop-blur-md p-10 border border-white">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 font-cormorant">
                Create Your Account
              </h2>
              <p className="text-gray-400 font-light">
                Join our exclusive community of influencers and brands
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border-l-4 border-red-400 p-4 rounded-md mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* User Type Selection */}
            <div className="mb-6">
              {/* <label className="block text-sm font-medium text-gray-300 mb-3">
                I am a...
              </label> */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setUserType("influencer");
                    setFormData((prev) => ({
                      ...prev,
                      userType: "influencer",
                    }));
                  }}
                  className={`py-3 px-4 rounded-lg border font-medium transition-all duration-300 ${
                    userType === "influencer"
                      ? "border-gold-500 bg-gold-500/10 text-white shadow-gold-sm"
                      : "border-white/10 text-gray-400 hover:border-white/20 bg-white/5"
                  }`}
                >
                  <div className="text-xl mb-1">👤</div>
                  Influencer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUserType("client");
                    setFormData((prev) => ({ ...prev, userType: "client" }));
                  }}
                  className={`py-3 px-4 rounded-lg border font-medium transition-all duration-300 ${
                    userType === "client"
                      ? "border-gold-500 bg-gold-500/10 text-white shadow-gold-sm"
                      : "border-white/10 text-gray-400 hover:border-white/20 bg-white/5"
                  }`}
                >
                  <div className="text-xl mb-1">🏢</div>
                  Client
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/30 text-white placeholder-gray-500 transition-colors duration-300"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/30 text-white placeholder-gray-500 transition-colors duration-300"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/30 text-white placeholder-gray-500 transition-colors duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/30 text-white placeholder-gray-500 transition-colors duration-300 pr-12"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters with uppercase, lowercase, and
                  number
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/30 text-white placeholder-gray-500 transition-colors duration-300 pr-12"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Conditional fields based on user type */}
              {/* {userType === "influencer" && (
                <div>
                  <label
                    htmlFor="niche"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="niche"
                    name="niche"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/30 text-white transition-colors duration-300"
                    value={formData.niche}
                    onChange={handleChange}
                  >
                    <option value="">Select your Category</option>
                    <option value="fashion-beauty">Fashion & Beauty</option>
                    <option value="technology">Technology</option>
                    <option value="fitness-health">Fitness & Health</option>
                    <option value="food-cooking">Food & Cooking</option>
                    <option value="travel">Travel</option>
                    <option value="gaming">Gaming</option>
                    <option value="business-finance">Business & Finance</option>
                    <option value="education">Education</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>
              )} */}

              {userType === "client" && (
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Company name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/30 text-white placeholder-gray-500 transition-colors duration-300"
                    placeholder="Enter company name"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-white/10 rounded mt-1 bg-white/5"
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="ml-2 block text-sm text-gray-300"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-gold-400 hover:text-gold-300 font-medium"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-gold-400 hover:text-gold-300 font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* <div className="flex items-start">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-white/10 rounded mt-1 bg-white/5"
                  />
                  <label
                    htmlFor="newsletter"
                    className="ml-2 block text-sm text-gray-300"
                  >
                    Send me updates about new features and opportunities
                  </label>
                </div> */}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 shadow-gold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    "Create account"
                  )}
                </button>
              </div>
            </form>

            {/* Social Registration */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-500 font-light">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-white/10 rounded-md shadow-sm bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2">Google</span>
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-white/10 rounded-md shadow-sm bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                  <span className="ml-2">Twitter</span>
                </button>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-gold-400 hover:text-gold-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
