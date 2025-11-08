import React from "react";
import ProfileImg from "../images/profile.png";

const AdminSideListItem = ({ EmployeeName }) => {
  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition-colors">
      {/* Profile Image */}
      <img
        src={ProfileImg}
        alt={EmployeeName}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-300"
      />

      {/* Employee Name */}
      <p className="flex-1 text-sm md:text-base font-medium ml-2">
        {EmployeeName}
      </p>

      {/* Profile Button */}
      <button className="text-sm md:text-base px-3 py-1 border border-gray-300 rounded-lg bg-white hover:bg-blue-50 transition-colors">
        Profile
      </button>
    </div>
  );
};

export default AdminSideListItem;
