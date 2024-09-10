import React from "react";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
    return (
        <div className="flex">
            <Sidebar type="admin" />
            <div className="flex-1 p-8 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">
                            Manage Employees
                        </h2>
                        {/* Content for Manage Employees */}
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">
                            Department Tasks
                        </h2>
                        {/* Content for Department Tasks */}
                    </div>
                    {/* Add more containers as needed */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
