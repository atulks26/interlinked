import React, { useEffect, useState } from 'react';
import '../styles/Footer.css'; // Import the CSS file
import logo1 from '../images/digitalindia.png';
import logo2 from '../images/g20.png';
import logo3 from '../images/madeinindia.jpg';
import logo4 from '../images/india.png';
import logo5 from '../images/india2.png';
const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');

  // Simulate dynamic visitor number
  useEffect(() => {
    // You can replace this with actual visitor count from API
    const randomVisitorNumber = Math.floor(Math.random() * 100000000) + 1;
    setVisitorCount(randomVisitorNumber);

    // Set today's date as the last updated date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    setLastUpdated(formattedDate);
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        {/* Row for logos */}
        <div className="row logo-row">
          <div className="flex gap-2 col-md-12 text-center justify-evenly " >
            <img src={logo1} alt="Logo 1" className="footer-logo" />
            <img src={logo2} alt="Logo 2" className="footer-logo" />
            <img src={logo3}alt="Logo 3" className="footer-logo" />
            <img src={logo4} alt="Logo 4" className="footer-logo" />
            <img src={logo5} alt="Logo 5" className="footer-logo" />
          </div>
        </div>

        <hr />

        {/* Row for visitor count, info, and contact */}
        <div className="row footer-info">
          {/* Left column for visitor count */}
          <div className="col-md-4 text-left">
            <p>Visitor No. {visitorCount}</p>
            <p>Last Updated: {lastUpdated}</p>
          </div>

          {/* Center column for content management info */}
          <div className="col-md-4 text-center">
            <p>Website Content Managed by Urban Setu, Web Information Manager</p>
            <p>Designed, Developed, and Hosted by Alt F4</p>
            <p>Copyright © {new Date().getFullYear()}</p>
            <p>Compatible Browsers: Chrome, Firefox, Edge, Safari</p>
          </div>

          {/* Right column for contact info */}
          <div className="col-md-4 text-right">
            <p>Contact Information:</p>
            <p>Toll-Free: 1800-123-4567</p>
            <p>Toll-Free: 1800-987-6543</p>
            <p>Email: support@urban-setu.com</p>
            <p>Email: info@urban-setu.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
