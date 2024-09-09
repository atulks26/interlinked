import React, { useState, useEffect } from "react";

const WhatWeOffer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extended data for the offers
  const offers = [
    {
      title: "Technical Expertise",
      description: "Access to technical experts from multiple departments to aid in project execution.",
      image: "https://via.placeholder.com/150", // Placeholder image for Offer 1
    },
    {
      title: "Resource Sharing",
      description: "Unified access to machinery, technology, and human resources across departments.",
      image: "https://via.placeholder.com/150", // Placeholder image for Offer 2
    },
    {
      title: "Ongoing Projects",
      description: "Monitor and track ongoing and upcoming projects in real-time.",
      image: "https://via.placeholder.com/150", // Placeholder image for Offer 3
    },
    {
      title: "Interdepartmental Collaboration",
      description: "Organize meetings and collaboration between departments to streamline projects.",
      image: "https://via.placeholder.com/150", // Placeholder image for Offer 4
    },
    {
      title: "Unified Project Phasing",
      description: "Reduce costs by planning and executing projects with inter-departmental coordination.",
      image: "https://via.placeholder.com/150", // Placeholder image for Offer 5
    },
    {
      title: "Workshops & Seminars",
      description: "Training and capacity-building exercises for staff across departments.",
      image: "https://via.placeholder.com/150", // Placeholder image for Offer 6
    },
    {
      title: "Discussion Forums",
      description: "Interactive discussion forums for intra-department, inter-department, and public forums.",
      image: "https://via.placeholder.com/150", // Placeholder image for Offer 7
    },
    {
      title: "Task Scheduling",
      description: "Tools to help you schedule and assign tasks between different departments for seamless execution.",
      image: "https://via.placeholder.com/150", // Placeholder image for Offer 8
    },
  ];
  const slidesToShow = 3; 
  // Auto slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (offers.length - slidesToShow + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <div className="w-full flex flex-col items-center justify-center my-10">
      <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
      <div className="relative w-full max-w-5xl h-64 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-between px-4">
          {/* Previous button */}
          <button
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            onClick={() =>
              setCurrentIndex(
                (currentIndex - 1 + (offers.length - slidesToShow + 1)) % (offers.length - slidesToShow + 1)
              )
            }
          >
            ‹
          </button>

          {/* Next button */}
          <button
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            onClick={() => setCurrentIndex((currentIndex + 1) % (offers.length - slidesToShow + 1))}
          >
            ›
          </button>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full flex space-x-4 px-6">
            {offers.slice(currentIndex, currentIndex + slidesToShow).map((offer, idx) => (
              <div key={idx} className="flex-1 text-center p-4 bg-gray-100 rounded-lg">
                <img src={offer.image} alt={offer.title} className="mb-4 mx-auto" />
                <h3 className="text-xl font-semibold">{offer.title}</h3>
                <p className="mt-2">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots for navigation */}
      <div className="flex space-x-2 mt-4">
        {[...Array(offers.length - slidesToShow + 1)].map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;
