import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaInbox, FaFileAlt, FaAt, FaHashtag, FaPlusCircle, FaUser } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';

import "../styles/DepartmentForum.css";

const DepartmentSidebar = () => {
  return (
    <div className="department-sidebar">
      {/* Profile Section */}
      <div className="profile-section">
        <img 
          src="https://randomuser.me/api/portraits/men/75.jpg" 
          alt="Profile" 
          className="profile-pic" 
        />
        <div className="profile-info">
          <h4>User Name</h4>
          <p>Department Name</p>
        </div>
      </div>

    

      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        <ul>
          <li><NavLink to="/all-dms"><FaInbox className="icon" /> All DMs</NavLink></li>
          <li><NavLink to="/drafts"><FaFileAlt className="icon" /> Drafts</NavLink></li>
          <li><NavLink to="/mentions"><FaAt className="icon" /> Mentions & Reactions</NavLink></li>
          <li><NavLink to="/more"><FaUser className="icon" /> More</NavLink></li>
        </ul>
      </div>

      {/* Channels Section */}
      <div className="channels-section">
        <h3>Channels</h3>
        <ul>
          <li><NavLink to="/forum/intra-department"><FaHashtag className="icon" /> #intra-department</NavLink></li>
          <li><NavLink to="/forum/inter-department"><FaHashtag className="icon" /> #inter-department</NavLink></li>
          <li><NavLink to="/forum/public"><FaHashtag className="icon" /> #public</NavLink></li>
          <li><NavLink to="/forum/tech"><FaHashtag className="icon" /> #tech</NavLink></li>
          <li><NavLink to="/forum/marketing"><FaHashtag className="icon" /> #marketing</NavLink></li>
        </ul>
      </div>

      {/* Add Channel Button */}
      <div className="add-channel">
        <FaPlusCircle /> Add Channel
      </div>
    </div>
  );
};

export default DepartmentSidebar;
