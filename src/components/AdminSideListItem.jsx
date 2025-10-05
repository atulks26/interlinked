import React from "react";
import ProfileImg from "../images/profile.png";

const AdminSideListItem = ({ EmployeeName }) => {
    return (
        <div className="flex gap-2 pl-2 pr-2">
            <img src={ProfileImg} alt="emp_photo" className="w-14 h-14" />
            <p className="mr-auto mt-auto mb-auto text-">{EmployeeName}</p>
            <button className="text-sm border-2 p-4 pt-1 pb-1 mt-auto mb-auto mr-2">
                Profile
            </button>
        </div>
    );
};

export default AdminSideListItem;
