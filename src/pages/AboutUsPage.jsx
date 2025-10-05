import React from 'react';
import '../styles/AboutUsPage.css'; // Importing the CSS for styling

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
        <p>Welcome to our platform dedicated to transforming urban governance through innovative technology.</p>
      </header>

      <section className="about-us-content">
        <div className="about-us-text">
          <h2>Our Vision</h2>
          <p>
            Our platform addresses critical challenges in urban governance by enhancing interdepartmental cooperation. We tackle issues like resource underutilization and project delays through advanced solutions for data sharing, resource management, and project coordination. Our technology offers tools for task scheduling, unified project planning, and effective communication to foster collaboration.
          </p>
          <h2>Key Features</h2>
          <ul>
            <li>User Management System</li>
            <li>Data and Resource Exchange</li>
            <li>Task Management and Scheduling</li>
            <li>Unified Project Planning</li>
            <li>Discussion Forums and Training Modules</li>
          </ul>
          <p>
            Our platform is designed to be mobile-friendly, integrates with existing systems, and emphasizes performance optimization for a seamless user experience.
          </p>
        </div>
        
        <div className="about-us-images">
          <img src="https://via.placeholder.com/600x400" alt="Project Dashboard" className="about-us-img" />
          <img src="https://via.placeholder.com/600x400" alt="Team Collaboration" className="about-us-img" />
        </div>
      </section>

      <section className="about-us-team">
        <h2>Meet Our Team</h2>
        <p>
          Our team consists of experienced professionals passionate about improving urban governance. With diverse expertise in technology and urban management, we are committed to delivering innovative solutions for effective governance.
        </p>
        <div className="team-members">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" className="team-img" />
            <p>Jane Doe - CEO</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" className="team-img" />
            <p>John Smith - CTO</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;