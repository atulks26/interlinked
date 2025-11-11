import React, { useEffect, useState } from "react";
import "../styles/Footer.css";
import logo1 from "../images/digitalindia.png";
import logo2 from "../images/g20.png";
import logo3 from "../images/madeinindia.jpg";
import logo4 from "../images/india.png";
import logo5 from "../images/india2.png";

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const randomVisitorNumber = Math.floor(Math.random() * 100000000) + 1;
    setVisitorCount(randomVisitorNumber);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setLastUpdated(formattedDate);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logos">
          {[logo1, logo2, logo3, logo4, logo5].map((logo, index) => (
            <img key={index} src={logo} alt={`Logo ${index + 1}`} className="footer-logo" />
          ))}
        </div>

        <hr className="footer-divider" />

        <div className="footer-content">
          <div className="footer-section">
            <h4>Visitor Info</h4>
            <p>Visitor No. <strong>{visitorCount}</strong></p>
            <p>Last Updated: {lastUpdated}</p>
          </div>

          <div className="footer-section center">
            <h4>About</h4>
            <p>Website Content Managed by <strong>Interlinked</strong></p>
            <p>Designed & Developed by <strong>Priyanshu & Atul </strong></p>
            <p>© {new Date().getFullYear()} All Rights Reserved</p>
            <p>Compatible Browsers: Chrome, Firefox, Edge, Safari</p>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Toll-Free: 1800-123-4567</p>
            <p>Toll-Free: 1800-987-6543</p>
            <p>Email: support@interlinked.com</p>
            <p>Email: info@interlinked.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
