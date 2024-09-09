import { React, useEffect } from "react";
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
                <img src="path_to_mcd_logo.png" />
                <h1>App Name</h1>
            </div>

            <div className="navbar-links">
                <a href="/">Home</a>
                <a href="/what-we-offer">Offers</a>

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

                <a href="/training">Training</a>
                <a href="/discussion-forum">Forum</a>
                <a href="#projects">Projects</a>
            </div>

            {/* <div className="navbar-flag">
                <img src="path_to_india_flag.png" alt="Indian Flag" />
            </div> */}

            <a href="#online-services" className="navbar-online-services">
                Log In
            </a>
        </nav>
    );
}

export default Navbar;
