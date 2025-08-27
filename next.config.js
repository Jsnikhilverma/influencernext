/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  env: {
    VITE_BASE_URL: process.env.VITE_BASE_URL,
  },
};
require("dotenv").config();

module.exports = nextConfig;
