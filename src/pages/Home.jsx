import React from 'react';
import { Link } from 'react-router-dom';
import WhatWeOffer from './Offers';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-200 p-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Streamlining Interdepartmental Cooperation</h1>
        <p className="text-xl mb-6">Collaborate, Coordinate, and Optimize Resources Across Multiple Departments</p>
        <div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full mr-4">Register Your Department</button>
          <button className="bg-gray-800 text-white px-6 py-2 rounded-full">Learn More</button>
        </div>
      </div>

      {/* What We Offer Section */}
      <WhatWeOffer/>

      {/* Training & Workshops Section */}
      <div className="bg-gray-100 p-16">
        <h2 className="text-3xl font-bold text-center mb-8">Training & Capacity Building</h2>
        <p className="text-center mb-6">Explore workshops and seminars to enhance your skills and knowledge.</p>
        <div className="text-center">
          <Link to="/training-workshops" className="bg-blue-600 text-white px-6 py-3 rounded-full">Explore Training</Link>
        </div>
      </div>

      {/* Discussion Forum Section */}
      <div className="bg-white p-16">
        <h2 className="text-3xl font-bold text-center mb-8">Discussion Forum</h2>
        <p className="text-center mb-6">Facilitate dialogues across departments and with the public.</p>
        <div className="text-center">
          <Link to="/discussion-forum" className="bg-green-600 text-white px-6 py-3 rounded-full">Join the Forum</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
