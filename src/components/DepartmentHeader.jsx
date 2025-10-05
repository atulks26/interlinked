import React from "react";
import { FaCog } from "react-icons/fa"; // Importing a settings icon
import "../styles/DepartmentForum.css";

const DepartmentHeader = () => {
    return (
        <div className="department-header">
            <div className="header-left">
                <h2>Forum</h2>
                <span className="member-count">3 Members</span>
            </div>
            <div className="header-right">
                <FaCog className="settings-icon" />
                {/* Add more interactive elements if needed */}
            </div>
        </div>
    );
};

export default DepartmentHeader;
