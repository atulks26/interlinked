import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ type }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Construct dynamic URLs based on the current path
    const viewTasksUrl = `${currentPath}/view-tasks`;
    const updateProfileUrl = `${currentPath}/update-profile`;

    const renderAdminOptions = () => (
        <>
            <li className="mb-2">
                <Link
                    to={`${currentPath}/manage-employees`}
                    className="hover:text-gray-400"
                >
                    Manage Employees
                </Link>
            </li>
            <li className="mb-2">
                <Link
                    to={`${currentPath}/department-tasks`}
                    className="hover:text-gray-400"
                >
                    Department Tasks
                </Link>
            </li>
            {/* Add more admin options as needed */}
        </>
    );

    const renderEmployeeOptions = () => (
        <>
            <li className="mb-2">
                <Link to={viewTasksUrl} className="hover:text-gray-400">
                    View Tasks
                </Link>
            </li>
            <li className="mb-2">
                <Link to={updateProfileUrl} className="hover:text-gray-400">
                    Update Profile
                </Link>
            </li>
            {/* Add more employee options as needed */}
        </>
    );

    return (
        <div className="w-64 bg-gray-800 text-white h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">
                {type === "admin" ? "Admin Dashboard" : "Employee Dashboard"}
            </h1>
            <ul>
                {type === "admin"
                    ? renderAdminOptions()
                    : renderEmployeeOptions()}
            </ul>
        </div>
    );
};

export default Sidebar;
