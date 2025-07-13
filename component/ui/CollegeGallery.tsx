/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React, { useState } from "react";

const galleryImage = [
  "/gallery/1.jpg",
  "/gallery/22.jpg",
  "/gallery/33.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
  "/gallery/7.jpg",
  "/gallery/8.jpg",
  "/gallery/9.jpg",
  "/gallery/10.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
];

export default function CollegeGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const closeModal = () => setSelectedImage(null);

  return (
    <section className="py-12 bg-gray-50">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Graduates' Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImage.map((src, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(src)}
              className="rounded-lg overflow-hidden shadow-md transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <Image
                src={src}
                alt={`Graduate Group ${idx + 1}`}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div className="relative max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white text-2xl font-bold bg-red-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600"
              >
                &times;
              </button>
              <Image
                src={selectedImage}
                alt="Selected Graduate"
                width={1000}
                height={600}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
