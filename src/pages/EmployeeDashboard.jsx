import React from "react";
import Sidebar from "../components/Sidebar";

const EmployeeDashboard = () => {
    return (
        <div className="flex">
            <Sidebar type="employee" />
            <div className="flex-1 p-8 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">
                            View Tasks
                        </h2>
                        {/* Content for View Tasks */}
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">
                            Update Profile
                        </h2>
                        {/* Content for Update Profile */}
                    </div>
                    {/* Add more containers as needed */}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
