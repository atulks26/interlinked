import React from "react";
import DepartmentContent2 from "./DepartmentContent2";
import "../styles/DepartmentForum.css";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const InterDepartmentForum = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="department-forum-page">
            <DepartmentContent2 />
        </div>
    );
};

export default InterDepartmentForum;
