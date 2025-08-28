import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Categories from "../components/Categories";
import TopInfluencers from "../components/TopInfluencers";
import Brands from "../components/Brands";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import CategoriesSection from "../components/Categorystates";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <Hero />
      <CategoriesSection />
      <Categories />
      <Features />
      <TopInfluencers />
      <Brands />
      <Testimonials />
      <Footer />
    </main>
  );
}
