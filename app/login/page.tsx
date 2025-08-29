"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.VITE_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token in cookie
      Cookies.set("token", data.token, {
        expires: formData.rememberMe ? 7 : 1, // 7 days if remember me is checked, otherwise 1 day
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Store user data
      Cookies.set("user", JSON.stringify(data.user));
      Cookies.set("role", data.user.role);

      // Redirect based on user role
      if (data.user.role === "influencer") {
        router.push("/influencerdashboard");
      } else if (data.user.role === "client") {
        router.push("/clientdashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-10 mt-20">
            {/* <Link
              href="/"
              className="flex items-center justify-center space-x-2 mb-8"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-300 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-slate-900 font-bold text-xl">I</span>
              </div>
              <span className="text-3xl font-bold text-white font-cormorant">
                InfluenceHub
              </span>
            </Link> */}

            <h2 className="text-4xl font-bold text-white mb-2 font-cormorant">
              Welcome Back
            </h2>
            <p className="text-gray-400 font-light">
              Sign in to your exclusive account
            </p>
          </div>

          {/* Form Box */}
          <div className="bg-black backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-400/20 text-red-300 rounded-lg text-sm">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
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
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/30 text-white placeholder-gray-500 transition-colors duration-300"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
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
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/30 text-white placeholder-gray-500 transition-colors duration-300"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-gold-500 focus:ring-gold-500 border-white/10 rounded bg-white/5"
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    Remember me
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-gold-400 hover:text-gold-300 transition-colors duration-300"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-3 px-4 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-gold"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
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
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* <div className="mt-8">
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
      
                <button className="w-full inline-flex justify-center py-2.5 px-4 border border-white/10 rounded-lg shadow-sm bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors duration-300">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="ml-2">Google</span>
                </button>

  
                <button className="w-full inline-flex justify-center py-2.5 px-4 border border-white/10 rounded-lg shadow-sm bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors duration-300">
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
            </div> */}

            <div className="mt-8 text-center">
              <p className="text-sm text-white">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-300 hover:text-gold-300 font-medium transition-colors duration-300"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Terms & Privacy */}
          {/* <div className="text-center mt-6">
            <p className="text-xs text-white">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="text-gold-400 hover:text-gold-300 transition-colors duration-300"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-gold-400 hover:text-gold-300 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </p>
          </div> */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
