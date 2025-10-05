import React from "react";
import DepartmentHeader from "./DepartmentHeader";
import MessageInput from "./MessageInput";
import MessageList2 from "./MessageList2";
import "../styles/DepartmentForum.css";

const DepartmentContent = () => {
    return (
        <div className="department-content">
            <DepartmentHeader />
            <MessageList2 />
            <MessageInput />
        </div>
    );
};

export default DepartmentContent;
