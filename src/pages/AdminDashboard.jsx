import React from "react";
import Sidebar from "../components/Sidebar";
import AdminSideListItem from "../components/AdminSideListItem";
import AdminTaskItem from "../components/AdminTaskItem";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const AdminDashboard = () => {
    const user = useContext(UserContext);

    return (
        <div className="flex">
            <Sidebar type="admin" />
            <div className="flex-1 p-8 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <div className="flex gap-4">
                    <div className="flex flex-col h-fit gap-4 bg-white rounded shadow w-[70%]">
                        <div className="bg-white p-6 rounded shadow">
                            <h2 className="text-xl m-0 font-semibold mb-2">
                                Department Tasks
                            </h2>
                            <AdminTaskItem />
                            <AdminTaskItem />
                            <AdminTaskItem />
                            <AdminTaskItem />
                            <AdminTaskItem />
                        </div>
                    </div>
                    <div className="flex flex-col h-fit gap-4 bg-white rounded shadow w-[30%]">
                        <div className="bg-white p-6 rounded shadow">
                            <h2 className="text-xl m-0 font-semibold">
                                Manage Junior Officers
                            </h2>
                        </div>
                        <div className="flex flex-col gap-2">
                            <AdminSideListItem EmployeeName={"Priyanshu"} />
                            <AdminSideListItem EmployeeName={"Atul"} />
                            <AdminSideListItem EmployeeName={"Ankur"} />
                            <AdminSideListItem EmployeeName={"Nehal"} />
                            <AdminSideListItem EmployeeName={"Garv"} />
                        </div>
                    </div>
                    {/* Add more containers as needed */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
