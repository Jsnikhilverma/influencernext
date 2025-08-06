"use client";

import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Browse Projects", href: "/discover" },
    { name: "Discover Influencers", href: "/influencers" },
    { name: "Brands", href: "/brands" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold font-serif text-white">
                InfluenceHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-pink-300 px-3 py-2 text-base font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Link
              href="/login"
              className="text-gray-300 hover:text-amber-500 font-medium transition-colors duration-200"
            >
              Sign In
            </Link> */}
            <Link href="/login">
              <button className="px-5 py-2 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200">
                Sign In
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-amber-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 border-t border-gray-700">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-amber-500 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                {/* <Link
                  href="/login"
                  className="text-gray-300 hover:text-amber-500 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link> */}
                <Link href="/login" className="block w-full">
                  <button
                    className="w-full text-center px-4 py-2 text-white bg-amber-500 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
