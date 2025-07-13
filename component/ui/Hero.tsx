"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/bg.jpg",
  "/bg2.jpg",
  "/bg33.jpg", // Replace with actual images
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="pt-[80px] relative min-h-screen bg-cover bg-center flex items-center justify-center text-white transition-all duration-1000"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4 max-w-3xl"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-blue-400"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome to CampusBondhu
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Your trusted guide to college admissions, services, and more!
        </motion.p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg text-white font-semibold">
            More About Us
          </button>
          <button className="px-6 py-3 bg-white text-blue-700 hover:bg-gray-100 transition rounded-lg font-semibold">
            Our Services
          </button>
        </div>
      </motion.div>
    </section>
  );
}
