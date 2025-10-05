import React from "react";
import Sidebar from "../components/Sidebar";
import EmployeeTaskItem from "../components/EmployeeTaskItem";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfileImg from "../images/profile.png";

const EmployeeDashboard = () => {
    const { user } = useContext(UserContext);

    const capitalizeWords = (str) => {
        if (!str) return;

        return str
            .toLowerCase() // Convert the entire string to lowercase
            .replace(/-/g, " ") // Replace hyphens with spaces
            .split(" ") // Split the string into words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(" "); // Join the words back into a single string
    };

    return (
        <div className="flex">
            <Sidebar type="employee" />
            <div className="flex-1 p-8 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Member Dashboard</h1>
                <div className="flex gap-4">
                    <div className="flex flex-col h-fit gap-4 bg-white rounded shadow w-[70%]">
                        <div className="bg-white p-6 rounded shadow">
                            <h2 className="text-xl m-0 font-semibold mb-2">
                                Assigned Tasks
                            </h2>
                            <EmployeeTaskItem />
                            <EmployeeTaskItem />
                            <EmployeeTaskItem />
                            <EmployeeTaskItem />
                            <EmployeeTaskItem />
                        </div>
                    </div>
                    <div className="flex flex-col h-fit gap-4 bg-white rounded shadow w-[30%]">
                        <div className="bg-white p-6 rounded shadow">
                            <h2 className="text-xl m-0 font-semibold">
                                Profile
                            </h2>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-center align-center">
                                <img src={ProfileImg} className="w-48" />
                            </div>
                            <div className="flex flex-col pl-2 gap-1 m-2 border-2">
                                <p className="pt-2">NAME: {user.user_name}</p>
                                <p>DESIGNATION: Junior Officer</p>
                                <p>
                                    DEPARTMENT:{" "}
                                    {capitalizeWords(user?.department)}
                                </p>
                                <p className="pb-2">
                                    DEPARTMENT ADMIN: {user.admin}
                                </p>
                            </div>
                            <div className="flex flex-col pl-2 gap-1 m-2 border-2">
                                <p className="pt-2">Total Assigned Tasks: 13</p>
                                <p>Total Completed Tasks: 8</p>
                                <p>Total Ongoing Tasks: 3</p>
                                <p className="pb-2">Total Overdue Tasks: 2</p>
                            </div>
                        </div>
                    </div>
                    {/* Add more containers as needed */}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
