import React from "react";
import profileImg from "../images/profile.png";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeeProfile = () => {
    const ongoingProjects = [
        { name: "Project 1", completedTasks: 3, ongoingTasks: 1 },
    ];

    const totalCompletedTasks = ongoingProjects.reduce(
        (total, project) => total + project.completedTasks,
        0
    );
    const totalOngoingTasks = ongoingProjects.reduce(
        (total, project) => total + project.ongoingTasks,
        0
    );

    const data = {
        labels: ["Completed Tasks", "Ongoing Tasks"],
        datasets: [
            {
                data: [totalCompletedTasks, totalOngoingTasks],
                backgroundColor: ["#4caf50", "#ffeb3b"],
            },
        ],
    };

    useEffect(() => {
        // Cleanup code if necessary
        return () => {
            // Perform any necessary cleanup here
        };
    }, []);

    const Card = ({ name, members, status, link }) => {
        const navigate = useNavigate();

        const handleStatusClick = () => {
            if (link) {
                navigate(link);
            }
        };

        return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
                <div className="px-6 py-4">
                    <div className="font-bold text-2xl mb-2">{name}</div>
                    <p className="text-gray-700 text-sm">Deadline: {members}</p>
                    <p
                        className={`text-sm font-semibold cursor-pointer ${
                            status === "Ongoing"
                                ? "text-yellow-500"
                                : "text-green-500"
                        }`}
                        onClick={handleStatusClick}
                    >
                        Status: {status}
                    </p>
                </div>
            </div>
        );
    };

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

    const projects = [
        { name: "Task 1", members: "15 Sep 2024", status: "Ongoing" },
        { name: "Task 2", members: "13 Sep 2024", status: "Completed" },
        { name: "Task 3", members: "7 Sep 2024", status: "Completed" },
        { name: "Task 4", members: "5 Sep 2024", status: "Completed" },
    ];

    return (
        <div className="flex justify-between">
            <Sidebar type={"employee"} />
            <div className="flex flex-col gap-2 w-[80%]">
                <div className="flex gap-2 justify-center shadow">
                    <div className="w-48">
                        <img src={profileImg} />
                    </div>
                    <div className="w-[20%] flex flex-col justify-center align-center text-center ">
                        <p className="text-3xl font-bold">
                            {user?.user_name.toUpperCase()}
                        </p>
                        <p className="text-2xl">
                            {capitalizeWords(user?.department)}
                        </p>
                    </div>
                    <div className="flex flex-col justify-center align-center text-[18px] w-[20%]">
                        <p>Designation: Junior Officer</p>
                        <p>Department Admin: {user?.admin}</p>
                        <p>Joined: 02 June 2024</p>
                    </div>
                    <div className="flex flex-col justify-center align-center text-[18px] w-[20%]">
                        <p>User ID: {user?.userId}</p>
                        <p>Email: priyanshukansal15@gmail.com</p>
                        <p>Contact: 7237823635</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <div className="flex">
                            <div className="container mx-auto p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {projects.map((project, index) => (
                                        <Card
                                            key={index}
                                            name={project.name}
                                            members={project.members}
                                            status={project.status}
                                            link={project.link}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="w-[50%] container mx-auto p-4 flex flex-col justify-center">
                            <h1 className="text-3xl font-bold mb-4 text-center">
                                Task Statistics
                            </h1>
                            <div className="gap-4 m-auto w-[60%]">
                                <div>
                                    <Pie data={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
