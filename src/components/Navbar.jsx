import React from 'react';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="path_to_mcd_logo.png" alt="MCD Logo" />
        <h1>Municipal Corporation of Delhi</h1>
      </div>

      <div className="navbar-links">
        <a href="#home">Home Page</a>
        <a href="#about">About Us</a>

        {/* Dropdown for Departments */}
        <div className="dropdown">
          <a href="#departments" className="dropdown-toggle">Departments</a>
          <div className="dropdown-content">
            <div className="dropdown-section">
              <h4>Column 1</h4>
              <a href="#">ADVERTISEMENT</a>
              <a href="#">ARCHITECTURE DEPARTMENT</a>
              <a href="#">ASSESSMENT AND COLLECTION DEPARTMENT</a>
              <a href="#">AYUSH DEPARTMENT</a>
              <a href="#">BUILDING DEPARTMENT</a>
              <a href="#">CENTRAL ESTABLISHMENT</a>
              <a href="#">COMMITTEE AND CORPORATION</a> 
              <a href="#">MUNICIPAL SECRETARY OFFICE</a>
              <a href="#">Organization and Method department</a>
              <a href="#">COMMUNITY SERVICES</a>
            </div>
            <div className="dropdown-section">
              <h4>Column 2</h4>
              <a href="#">DIRECTORATE OF INQUIRY</a>
              <a href="#">DIRECTORATE OF PRESS AND INFORMATION</a>
              <a href="#">Department of Environmental Management</a>
              <a href="#">EDUCATION</a>
              <a href="#">ELECTION DEPARTMENT</a>
              <a href="#">ENGINEERING DEPARTMENT</a>
              <a href="#">Electrical And Mechanical Department</a>
              <a href="#">PUBLIC HEALTH DEPARTMENT</a>
              <a href="#">REMUNERATIVE PROJECT CELL</a>
              <a href="#">STATUTORY AUDIT DEPARTMENT</a>
              <a href="#">FACTORY LICENSE</a>
              <a href="#">FINANCE DEPARTMENT</a>
              
            </div>
            <div className="dropdown-section">
              <h4>Column 3</h4>
              <a href="#">HACKNEY CARRIAGE</a>
              <a href="#">HORTICULTURE DEPARTMENT</a>
              <a href="#">HOSPITAL ADMINISTRATION</a>
              <a href="#">INFORMATION TECHNOLOGY</a>
              <a href="#">LABOUR WELFARE DEPARTMENT</a>
              <a href="#">LAND AND ESTATE</a>
              <a href="#">LANGUAGE DEPARTMENT</a>
              <a href="#">LAW DEPARTMENT</a>
              <a href="#">LICENSING DEPARTMENT</a>
              <a href="#">TOWN PLANNING</a>
              <a href="#">Toll Tax</a>
              <a href="#">VETERINARY</a>
              <a href="#">VIGILANCE</a>
            </div>
          </div>
        </div>

        <a href="#zones">Zones</a>
        <a href="#downloads">Downloads</a>
        <a href="#tenders">Tenders</a>
      </div>

      <div className="navbar-flag">
        <img src="path_to_india_flag.png" alt="Indian Flag" />
      </div>

      <a href="#online-services" className="navbar-online-services">Online Services</a>
    </nav>
  );
}

export default Navbar;