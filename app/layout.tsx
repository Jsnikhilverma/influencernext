import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InfluenceHub - Connect Influencers with Brands",
  description:
    "The premier platform for influencers to connect with brands, discover opportunities, and grow their influence. Join thousands of creators and brands on InfluenceHub.",
  keywords:
    "influencer, platform, brands, collaboration, social media, marketing",
  authors: [{ name: "InfluenceHub Team" }],
  openGraph: {
    title: "InfluenceHub - Connect Influencers with Brands",
    description:
      "The premier platform for influencers to connect with brands, discover opportunities, and grow their influence.",
    url: "https://influencehub.com",
    siteName: "InfluenceHub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "InfluenceHub - Connect Influencers with Brands",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InfluenceHub - Connect Influencers with Brands",
    description:
      "The premier platform for influencers to connect with brands, discover opportunities, and grow their influence.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
