import React, { useState, useEffect, useContext } from "react";
import profileImg from "../images/profile.png";
import { UserContext } from "../context/userContext";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom"; 
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { db } from "../context/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend);

const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return timestamp.toDate().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const Card = ({ name, members, status, link }) => {
    const navigate = useNavigate();

    const handleStatusClick = () => {
        if (link) {
            navigate(link);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "text-green-500";
            case "overdue":
                return "text-red-500";
            case "inprogress":
                return "text-yellow-500";
            default:
                return "text-gray-500";
        }
    };
    
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
            <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2">{name}</div>
                <p className="text-gray-700 text-sm">Created: {members}</p>
                <p
                    className={`text-sm font-semibold cursor-pointer ${getStatusColor(status)}`}
                    onClick={handleStatusClick}
                >
                    Status: {capitalize(status)}
                </p>
            </div>
        </div>
    );
};


const EmployeeProfile = () => {
    const [departmentTasks, setDepartmentTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const { user } = useContext(UserContext);
    
    useEffect(() => {
        if (!user || !user.department) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const tasksRef = collection(db, "departments", user.department, "tasks");
        const q = query(tasksRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedTasks = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setDepartmentTasks(fetchedTasks);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching tasks: ", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const totalCompletedTasks = departmentTasks.filter(
        (task) => task.status === "completed"
    ).length;
    const totalOngoingTasks = departmentTasks.filter(
        (task) => task.status !== "completed"
    ).length;

    const data = {
        labels: ["Completed Tasks", "Ongoing Tasks"],
        datasets: [
            {
                data: [totalCompletedTasks, totalOngoingTasks],
                backgroundColor: ["#4caf50", "#ffeb3b"],
            },
        ],
    };

    const capitalizeWords = (str) => {
        if (!str) return;

        return str
            .toLowerCase()
            .replace(/-/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };


    return (
        <div className="flex justify-between">
            <Sidebar type={"employee"} /> 
            <div className="flex flex-col gap-2 w-[80%]">
                <div className="flex gap-2 justify-center shadow">
                    <div className="w-48">
                        <img src={profileImg} alt="Profile" />
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
                        <p>Joined: {formatDate(user?.createdAt)}</p>
                    </div>
                    <div className="flex flex-col justify-center align-center text-[18px] w-[20%]">
                        <p>User ID: {user?.userId.substring(0, 10)}...</p>
                        <p>Email: {user?.email}</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center p-10 font-semibold text-lg">Loading profile data...</div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <div className="flex w-[50%]">
                                <div className="container mx-auto p-4">
                                    <h1 className="text-3xl font-bold mb-4 text-center">
                                        Department Task List
                                    </h1>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                                        {departmentTasks.length > 0 ? (
                                            departmentTasks.map((task) => (
                                                <Card
                                                    key={task.id}
                                                    name={task.title}
                                                    members={formatDate(task.createdAt)} 
                                                    status={task.status}
                                                />
                                            ))
                                        ) : (
                                            <p className="col-span-3 text-center text-gray-500">No tasks found for this department.</p>
                                        )}
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
                )}
            </div>
        </div>
    );
};

export default EmployeeProfile;