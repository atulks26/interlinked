import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { UserContext } from "../context/userContext";
import logo from "../images/logo.png";

function Navbar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const role = user?.role ? "admin" : "junior-officer";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const links = document.querySelectorAll(".dropdown-content a");
    links.forEach((link) => {
      const handleClick = (event) => {
        event.preventDefault();
        const department = link.textContent
          .trim()
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "");
        window.location.href = `/department/${department}`;
      };
      link.addEventListener("click", handleClick);
      return () => link.removeEventListener("click", handleClick);
    });
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Urban Setu Logo" className="logo-clickable" />
      </div>

      {/* Hamburger icon */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar Links */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        <div className="dropdown">
          <a className="dropdown-toggle">Departments</a>
          <div className="dropdown-content">
            <div className="dropdown-section">
              <a>Architecture Department</a>
              <a>Advertisement</a>
              <a>Assessment and Collection Department</a>
              <a>Ayush Department</a>
              <a>Building Department</a>
              <a>Central Establishment</a>
              <a>Committee and Corporation</a>
              <a>Municipal Secretary Office</a>
              <a>Organization and Method Department</a>
              <a>Community Services</a>
            </div>
            <div className="dropdown-section">
              <a>Directorate of Inquiry</a>
              <a>Directorate of Press and Information</a>
              <a>Department of Environmental Management</a>
              <a>Education</a>
              <a>Election Department</a>
              <a>Engineering Department</a>
              <a>Electrical and Mechanical Department</a>
              <a>Public Health Department</a>
              <a>Remunerative Project Cell</a>
              <a>Statutory Audit Department</a>
              <a>Factory License</a>
              <a>Finance Department</a>
            </div>
            <div className="dropdown-section">
              <a>Hackney Carriage</a>
              <a>Horticulture Department</a>
              <a>Hospital Administration</a>
              <a>Information Technology</a>
              <a>Labour Welfare Department</a>
              <a>Land and Estate</a>
              <a>Language Department</a>
              <a>Law Department</a>
              <a>Licensing Department</a>
              <a>Town Planning</a>
              <a>Toll Tax</a>
              <a>Veterinary</a>
              <a>Vigilance</a>
            </div>
          </div>
        </div>

        <Link to="/training" onClick={() => setMenuOpen(false)}>Training</Link>
        <Link to="/forum" onClick={() => setMenuOpen(false)}>Forum</Link>
        <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>

        {!user?.userId ? (
          <Link to="/login" className="navbar-online-services" onClick={() => setMenuOpen(false)}>
            Log In
          </Link>
        ) : (
          <Link
            to={`/dashboard/${role}/${user.department}/${user.userId}`}
            className="navbar-online-services"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
