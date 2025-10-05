import React from "react";
import DepartmentContent from "./DepartmentContent";
import "../styles/DepartmentForum.css";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const DepartmentForum = () => {
    const { user } = useContext(UserContext);
    const role = user?.role ? "admin" : "employee";

    return (
        <div className="department-forum-page">
            {/* <DepartmentSidebar /> */}
            <Sidebar type={role} />
            <DepartmentContent />
        </div>
    );
};

export default DepartmentForum;
