import React from "react";
import { NavLink } from "react-router-dom";
import ProfileImg from "../images/profile.png";
import {
  FaUsers,
  FaTasks,
  FaSignOutAlt,
  FaProjectDiagram,
  FaShareAlt,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";

const AdminSidebar = ({ user, handleLogout, isOpen, toggleSidebar }) => {
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const userDepartment = capitalizeWords(user?.department);

  const navGroups = [
    {
      title: "Main",
      options: [
        {
          name: "Home",
          path: `/dashboard/admin/${user?.department}/${user?.userId}`,
          icon: <FaHome />,
        },
      ],
    },
    {
      title: "Tools",
      options: [
        {
          name: "Manage Junior Officers",
          path: `/dashboard/admin/${user?.department}/${user?.userId}/officers`,
          icon: <FaUsers />,
        },
        {
          name: "Department Tasks",
          path: `/dashboard/${user?.department}/tasks`,
          icon: <FaTasks />,
        },
        {
          name: "Projects Page",
          path: `/projectspage`,
          icon: <FaProjectDiagram />,
        },
      ],
    },
    {
  title: "Communicate",
  options: [
    {
      name: "Intra-Department Forum",
      path: user?.department
        ? `/dashboard/${user.department}/department-forum`
        : "#",
      icon: <FaShareAlt />,
    },
    {
      name: "Inter-Department Forum",
      path: "/inter-department-forum",
      icon: <FaShareAlt />,
    },
    {
      name: "Resource Sharing",
      path: "/resource-sharing",
      icon: <FaShareAlt />,
    },
  ],
},
];

  const activeLinkStyle = "bg-gray-700 text-white";
  const inactiveLinkStyle =
    "text-gray-300 hover:bg-gray-700 hover:text-white transition-all";

  return (
    <div
      className={`bg-gray-800 text-white p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col min-h-screen flex-shrink-0 relative shadow-lg`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`p-2 rounded-md text-gray-300 hover:bg-gray-700 transition-all mb-4 ${
          isOpen ? "self-end" : "self-center"
        }`}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Profile Section */}
      <div
        className={`flex flex-col mb-6 pb-4 border-b border-gray-700 ${
          isOpen ? "items-start" : "items-center"
        }`}
      >
        <img
          src={ProfileImg}
          alt="Profile"
          className={`rounded-full ${
            isOpen ? "w-16 h-16" : "w-10 h-10"
          } transition-all shadow-md`}
        />
        {isOpen && (
          <div className="mt-2">
            <h1 className="text-lg font-bold text-yellow-400 leading-tight">
              {user?.user_name || "Admin User"}
            </h1>
            <p className="text-sm text-gray-400">Administrator</p>
            <p className="text-xs text-gray-500">{userDepartment}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {navGroups.map((group, index) => (
          <div key={index} className="mb-4">
            {isOpen && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                {group.title}
              </h3>
            )}
            <ul className="flex flex-col gap-1">
              {group.options.map((opt) => (
                <li key={opt.name} className="relative group">
                  <NavLink
                    to={opt.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-md transition-all ${
                        isActive ? activeLinkStyle : inactiveLinkStyle
                      } ${!isOpen ? "justify-center" : ""}`
                    }
                  >
                    <span className="text-lg">{opt.icon}</span>
                    {isOpen && (
                      <span className="truncate text-sm">{opt.name}</span>
                    )}
                  </NavLink>

                  {!isOpen && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-sm rounded-md px-3 py-1 shadow-lg z-50 whitespace-nowrap">
                      {opt.name}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 p-2 rounded-md w-full transition-all text-red-400 hover:bg-red-900 hover:text-white ${
            !isOpen ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">
            <FaSignOutAlt />
          </span>
          {isOpen && <span className="font-semibold">LOGOUT</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
