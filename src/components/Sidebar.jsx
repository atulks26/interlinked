import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ProfileImg from "../images/profile.png";
import { UserContext } from "../context/userContext";
import {
  FaUsers,
  FaTasks,
  FaSignOutAlt,
  FaProjectDiagram,
  FaShareAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaUserAlt,
} from "react-icons/fa";

const Sidebar = ({ type = "admin", handleLogout }) => {
  const { user } = useContext(UserContext); 
  const [isOpen, setIsOpen] = React.useState(true); 
  const toggleSidebar = () => setIsOpen(!isOpen);

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

  const adminNavGroups = [
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
          name: "Department Forum",
          path: `/dashboard/admin/${user?.department}/${user?.userId}/inter-department-forum`,
          icon: <FaShareAlt />,
        },
      ],
    },
  ];

  const employeeNavGroups = [
    {
      title: "Main",
      options: [
        {
          name: "Home",
          path: `/dashboard/junior-officer/${user?.department}/${user?.userId}`,
          icon: <FaHome />,
        },
        {
          name: "My Profile",
          path: `/dashboard/junior-officer/${user?.department}/${user?.userId}/profile`,
          icon: <FaUserAlt />,
        },
      ],
    },
    {
      title: "Tools",
      options: [
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
          name: "Department Forum",
          path: `/dashboard/admin/${user?.department}/${user?.userId}/inter-department-forum`,
          icon: <FaShareAlt />,
        },
      ],
    },
  ];

  const navGroups = type === "admin" ? adminNavGroups : employeeNavGroups;
  const userRole = type === "admin" ? "Administrator" : "Junior Officer";

  const activeLinkStyle = "bg-gray-700 text-white";
  const inactiveLinkStyle = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <div
      className={`bg-gray-800 text-white p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col min-h-screen flex-shrink-0 relative`}
    >
      <button
        onClick={toggleSidebar}
        className={`p-2 rounded-md text-gray-300 hover:bg-gray-700 transition-all mb-4 ${
          isOpen ? "self-end" : "self-center"
        }`}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className={`flex flex-col mb-4 pb-4 border-b border-gray-700 ${
          isOpen ? "items-start" : "items-center"
        }`}
      >
        <img
          src={ProfileImg}
          alt="Profile"
          className={`rounded-full ${
            isOpen ? "w-16 h-16" : "w-10 h-10"
          } transition-all`}
        />
        {isOpen && (
          <div className="mt-2">
            <h1 className="text-xl font-bold text-yellow-400">
              {user?.user_name}
            </h1>
            <p className="text-sm text-gray-400">{userRole}</p>
            <p className="text-xs text-gray-500">{userDepartment}</p>
          </div>
        )}
      </div>

      <nav className="flex-1">
        {navGroups.map((group, index) => (
          <div key={index} className="mb-2">
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
                    end={opt.name === "Home"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-md transition-colors ${
                        isActive ? activeLinkStyle : inactiveLinkStyle
                      } ${!isOpen ? "justify-center" : ""}`
                    }
                  >
                    <span className="text-xl">{opt.icon}</span>
                    {isOpen && <span>{opt.name}</span>}
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

      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 p-2 rounded-md w-full transition-colors text-red-400 hover:bg-red-900 hover:text-white ${
            !isOpen ? "justify-center" : ""
          }`}
        >
          <span className="text-xl">
            <FaSignOutAlt />
          </span>
          {isOpen && <span className="font-bold">LOGOUT</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;