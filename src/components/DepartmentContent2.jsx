import React from "react";
import DepartmentHeader from "./DepartmentHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import "../styles/DepartmentForum.css";

const DepartmentContent2 = () => {
    return (
        <div className="department-content">
            <DepartmentHeader />
            <MessageList />
            <MessageInput />
        </div>
    );
};

export default DepartmentContent2;
