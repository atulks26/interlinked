import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg">Interdepartmental Platform</div>
        <ul className="flex space-x-4 text-white">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/what-we-offer">What We Offer</Link></li>
          <li><Link to="/training-workshops">Training & Workshops</Link></li>
          <li><Link to="/discussion-forum">Discussion Forum</Link></li>
          <li><Link to="/projects">Projects</Link></li>
        </ul>
        <div className="flex space-x-4">
          <button className="text-white bg-blue-600 px-4 py-2 rounded">Login</button>
          <button className="text-white bg-green-600 px-4 py-2 rounded">Register</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
