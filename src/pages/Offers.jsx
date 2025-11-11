import React, { useState, useEffect } from "react";

import Technical from "../images/technical.avif";
import resource from "../images/resource.avif";
import ongoingproject from "../images/ongoingproject.jpeg";
import interdepartment from "../images/interdepartment.jpg";
import ProjectPhasing from "../images/projectphasing.jpg";
import workshop from "../images/seminar-workshop.jpg";
import discussionforum from "../images/discussionforum.jpeg";
import taskscheduler from "../images/task-scheduler.png";

const WhatWeOffer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);

    const offers = [
        {
            title: "Technical Expertise",
            description:
                "Access to technical experts from multiple departments to aid in project execution.",
            image: Technical,
        },
        {
            title: "Resource Sharing",
            description:
                "Unified access to machinery, technology, and human resources across departments.",
            image: resource,
        },
        {
            title: "Ongoing Projects",
            description:
                "Monitor and track ongoing and upcoming projects in real-time.",
            image: ongoingproject,
        },
        {
            title: "Interdepartmental Collaboration",
            description:
                "Organize meetings and collaboration between departments to streamline projects.",
            image: interdepartment,
        },
        {
            title: "Unified Project Phasing",
            description:
                "Reduce costs by planning and executing projects with inter-departmental coordination.",
            image: ProjectPhasing,
        },
        {
            title: "Workshops & Seminars",
            description:
                "Training and capacity-building exercises for staff across departments.",
            image: workshop,
        },
        {
            title: "Discussion Forums",
            description:
                "Interactive discussion forums for intra-department, inter-department, and public forums.",
            image: discussionforum,
        },
        {
            title: "Task Scheduling",
            description:
                "Tools to help you schedule and assign tasks between different departments for seamless execution.",
            image: taskscheduler,
        },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setSlidesToShow(1);
            else if (window.innerWidth < 1024) setSlidesToShow(2);
            else setSlidesToShow(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [offers.length]);

    const getVisibleSlides = () => {
        const slides = [];
        for (let i = 0; i < slidesToShow; i++) {
            slides.push(offers[(currentIndex + i) % offers.length]);
        }
        return slides;
    };

    return (
        <div className="w-full flex flex-col items-center justify-center my-10 py-10 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">What We Offer</h2>

            <div className="relative w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 z-10">
                    <button
                        className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow"
                        onClick={() =>
                            setCurrentIndex(
                                (currentIndex - 1 + offers.length) % offers.length
                            )
                        }
                    >
                        ‹
                    </button>

                    <button
                        className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow"
                        onClick={() =>
                            setCurrentIndex((currentIndex + 1) % offers.length)
                        }
                    >
                        ›
                    </button>
                </div>

                <div className="w-full flex justify-center items-center my-10 transition-transform duration-700 ease-in-out">
                    <div
                        className={`w-full flex flex-wrap sm:flex-nowrap justify-center items-center gap-4 px-4`}
                    >
                        {getVisibleSlides().map((offer, idx) => (
                            <div
                                key={idx}
                                className="flex-1 min-w-[250px] max-w-[350px] text-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                            >
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    {offer.title}
                                </h3>
                                <p className="mt-2 text-sm sm:text-base text-gray-700">
                                    {offer.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex space-x-2 mt-4">
                {offers.map((_, idx) => (
                    <button
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
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
