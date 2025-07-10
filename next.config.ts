import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["example.com", "images.unsplash.com"], // Add more allowed domains here
  },
};

export default nextConfig;
