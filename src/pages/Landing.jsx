import React from "react";
import { Link } from "react-router-dom";
import WhatWeOffer from "./Offers";

const Landing = () => {
    return (
        <div className="w-full overflow-hidden">
            {/* Hero Section */}
            <div className="bg-gray-200 px-6 py-16 md:py-20 text-center flex flex-col items-center justify-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight max-w-3xl">
                    Streamlining Interdepartmental Cooperation
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 max-w-2xl">
                    Collaborate, Coordinate, and Optimize Resources Across Multiple Departments
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                    <Link
                        to="/register"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base transition-all"
                    >
                        Department Registration
                    </Link>
                    <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base transition-all">
                        Learn More
                    </button>
                </div>
            </div>

            {/* What We Offer Section */}
            <div className="w-full">
                <WhatWeOffer />
            </div>

            {/* Training & Workshops Section */}
            <div className="bg-gray-100 px-6 py-16 md:py-20 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                    Training & Capacity Building
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                    Explore workshops and seminars to enhance your skills and knowledge.
                </p>
                <Link
                    to="/training"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base transition-all"
                >
                    Explore Training
                </Link>
            </div>

            {/* Discussion Forum Section */}
            <div className="bg-white px-6 py-16 md:py-20 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                    Discussion Forum
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                    Facilitate dialogues across departments and with the public.
                </p>
                <Link
                    to="/forum"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base transition-all"
                >
                    Join the Forum
                </Link>
            </div>
        </div>
    );
};

export default Landing;
