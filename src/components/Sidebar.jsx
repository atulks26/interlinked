import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Sidebar = ({ type }) => {
    const location = useLocation();
    const { setUser, user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
    };

    const capitalizeWords = (str) => {
        if (!str) return;

        return str
            .toLowerCase() // Convert the entire string to lowercase
            .replace(/-/g, " ") // Replace hyphens with spaces
            .split(" ") // Split the string into words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(" "); // Join the words back into a single string
    };

    const userDepartment = capitalizeWords(user?.department);

    const renderAdminOptions = () => (
        <>
            <li className="mb-4">
                <Link
                    to={`/dashboard/admin/${user?.department}/${user?.userId}`}
                    className="hover:text-gray-400"
                >
                    Manage Junior Officers
                </Link>
            </li>
            <li className="mb-4">
                <Link
                    to={`/dashboard/admin/${user?.department}/${user?.userId}`}
                    className="hover:text-gray-400"
                >
                    Department Tasks
                </Link>
            </li>
            <li className="mb-4">
                <Link
                    to={`/dashboard/${user?.department}/department-forum`}
                    className="hover:text-gray-400"
                >
                    Intra-department Forum
                </Link>
            </li>
            <li className="mb-4">
                <Link
                    to={`/inter-department-forum`}
                    className="hover:text-gray-400"
                >
                    Inter-department Forum
                </Link>
            </li>
            <li className="mb-4">
                <Link
                    to={`/resource-sharing`}
                    className="hover:text-gray-400"
                >
                    Resource Sharing
                </Link>
            </li>
            <li className="mb-4">

                <Link
                    to={`/projectspage`}
                    className="hover:text-gray-400"
                >
                    Projects Page
                </Link>
            </li>
            {/* Add more admin options as needed */}
        </>
    );

    const renderEmployeeOptions = () => (
        <>
            <li className="mb-4">
                <Link
                    to={`/dashboard/junior-officer/${user?.department}/${user?.userId}`}
                    className="hover:text-gray-400"
                >
                    View Tasks
                </Link>
            </li>
            <li className="mb-4">
                <Link
                    to={`/dashboard/junior-officer/${user?.department}/${user?.userId}/profile`}
                    className="hover:text-gray-400"
                >
                    Profile
                </Link>
            </li>
            <li className="mb-4">
                <Link
                    to={`/dashboard/${user?.department}/department-forum`}
                    className="hover:text-gray-400"
                >
                    Intra-department Forum
                </Link>
            </li>
            <li className="mb-4">
                <Link
                    to={`/inter-department-forum`}
                    className="hover:text-gray-400"
                >
                    Inter-department Forum
                </Link>
            </li>
            {/* Add more employee options as needed */}
        </>
    );

    return (
        <div className="relative flex flex-col w-64 bg-gray-800 text-white min-h-screen p-4">
            <h1 className="text-2xl font-bold text-yellow-400">
                {user?.user_name}
            </h1>
            <p>{type === "admin" ? "Administrator" : "Junior Officer"}</p>
            <p className="mb-10 text-sm">{userDepartment}</p>
            <ul>
                {type === "admin"
                    ? renderAdminOptions()
                    : renderEmployeeOptions()}
            </ul>
            <uli
                className="py-10 text-red-400 font-bold cursor-pointer"
                onClick={handleLogout}
            >
                LOGOUT
            </uli>
        </div>
    );
};

export default Sidebar;
