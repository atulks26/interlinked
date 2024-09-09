import { React, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/Navbar.css";

function Navbar() {
    const DropdownMenu = () => {
        useEffect(() => {
            const links = document.querySelectorAll(".dropdown-content a");
            links.forEach((link) => {
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    const department = this.textContent
                        .trim()
                        .toLowerCase()
                        .replace(/&/g, "and")
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9\-]/g, "");

                    window.location.href = `/department/${department}`;
                });
            });

            return () => {
                links.forEach((link) =>
                    link.removeEventListener("click", () => {})
                );
            };
        }, []);
    };

    DropdownMenu();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="path_to_mcd_logo.png" alt="Logo" />
                <h1>App Name</h1>
            </div>

            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/what-we-offer">Offers</Link>

                {/* Dropdown for Departments */}
                <div className="dropdown">
                    <a href="#departments" className="dropdown-toggle">
                        Departments
                    </a>
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

                <Link to="/training">Training</Link>
                <Link to="/discussion-forum">Forum</Link>
                <Link to="#projects">Projects</Link>
            </div>

            {/* Log In Link */}
            <Link to="/login" className="navbar-online-services">
                Log In
            </Link>
        </nav>
    );
}

export default Navbar;
