import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import Sidebar from "../components/Sidebar";
import {
    FaClipboardList,
    FaSpinner,
    FaExclamationTriangle,
    FaCheckCircle,
    FaPlus,
    FaTimesCircle,
} from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { db } from "../context/firebase"; 
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
    orderBy,
} from "firebase/firestore"; 
import { useNavigate } from "react-router-dom"; 

Chart.register(ArcElement, Tooltip, Legend);

// ---------------- Chart Component (Unchanged) ----------------
const TaskChart = ({ tasks }) => {
    const statusCounts = {
        pending: tasks.filter((t) => t.status === "pending").length,
        inprogress: tasks.filter((t) => t.status === "inprogress").length,
        overdue: tasks.filter((t) => t.status === "overdue").length,
        completed: tasks.filter((t) => t.status === "completed").length,
    };
    const data = {
        labels: ["Pending", "In Progress", "Overdue", "Completed"],
        datasets: [
            {
                data: [
                    statusCounts.pending,
                    statusCounts.inprogress,
                    statusCounts.overdue,
                    statusCounts.completed,
                ],
                backgroundColor: ["#E5E7EB", "#FBBF24", "#EF4444", "#10B981"],
                borderColor: "#F9FAFB",
                borderWidth: 2,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
        },
    };
    return (
        <div className="max-w-[250px] mx-auto mb-4">
            <Doughnut data={data} options={options} />
        </div>
    );
};

// ---------------- Task Modal (Unchanged) ----------------
const TaskModal = ({ task, onClose, onSave }) => {
    const [title, setTitle] = useState(task?.title || "");
    const [desc, setDesc] = useState(task?.desc || "");
    const [status, setStatus] = useState(task?.status || "pending");
    const [progress, setProgress] = useState(task?.progress || 0);

    const handleSave = () => {
        if (!title || !desc) return alert("Please fill all fields");
        onSave({ ...task, title, desc, status, progress: Number(progress) });
        onClose();
    };

    if (!task) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-600"
                >
                    <FaTimesCircle />
                </button>
                <h2 className="text-2xl font-bold mb-4">{task.id ? "Edit Task" : "Add Task"}</h2>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                    placeholder="Task Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full border rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex gap-3 mb-3 flex-wrap">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="overdue">Overdue</option>
                        <option value="completed">Completed</option>
                    </select>
                    <input
                        type="number"
                        value={progress}
                        onChange={(e) => setProgress(Number(e.target.value))}
                        className="w-24 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Progress %"
                        max="100"
                        min="0"
                    />
                </div>
                <div className="flex justify-end gap-3 flex-wrap">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

// ---------------- Stat Card (Unchanged) ----------------
const StatCard = ({ title, value, icon, color, onClick }) => (
    <div className={`bg-white rounded-lg shadow p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition`} onClick={onClick}>
        <div className={`text-3xl p-3 rounded-full ${color}`}>{icon}</div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

// ---------------- Task Card (Updated) ----------------
const TaskCard = ({ task, onEdit }) => (
    <div className="flex flex-col border-2 border-gray-200 rounded-lg shadow-sm p-4 bg-white hover:shadow-lg transition">
        <div className="flex justify-between items-start gap-4 flex-wrap">
            <div className="flex flex-col flex-1 min-w-[60%]">
                <div className="text-lg font-semibold">{task.title}</div>
                <div className="text-gray-600 text-sm">{task.desc}</div>
            </div>
            {/* Show edit button only if user is admin */}
            {task.role === 'admin' && (
                <button
                    onClick={() => onEdit(task)}
                    className="text-sm border-2 border-gray-300 bg-gray-100 p-2 rounded hover:bg-yellow-400 hover:text-gray-800 transition-colors"
                >
                    Edit
                </button>
            )}
        </div>
        <div className="mt-3 w-full bg-gray-200 h-2 rounded">
            <div className="h-2 rounded bg-yellow-400" style={{ width: `${task.progress}%` }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{task.progress}% Completed</p>
        <span className={`mt-2 text-sm font-semibold px-2 py-1 rounded-full self-start ${ 
            task.status === "overdue"
                ? "bg-red-100 text-red-700"
                : task.status === "inprogress"
                    ? "bg-yellow-100 text-yellow-700"
                    : task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
            }`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
    </div>
);

// ---------------- Main Page ----------------
const DepartmentTasksPage = () => {
    const { user, setUser } = useContext(UserContext); 
    const navigate = useNavigate(); 
    
    const [tasks, setTasks] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [filter, setFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    
    const userRole = user?.role || "employee";

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
    };

    // --- NEW: Activity Logger Function ---
    const logActivity = async (action, target_name, target_id = null) => {
        if (!user || !user.department) return;
        try {
            const activitiesRef = collection(db, "departments", user.department, "activities");
            await addDoc(activitiesRef, {
                user_name: user.user_name,
                user_id: user.userId,
                action: action, 
                target_name: target_name,
                target_id: target_id,
                timestamp: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error logging activity:", error);
        }
    };

    // --- FETCH TASKS FROM FIRESTORE ---
    useEffect(() => {
        if (!user || !user.department) {
            setIsLoading(true); 
            return;
        }

        setIsLoading(true);
        const tasksRef = collection(db, "departments", user.department, "tasks");
        const q = query(tasksRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedTasks = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                role: userRole 
            }));
            setTasks(fetchedTasks);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching tasks: ", error);
            setIsLoading(false);
        });

        return () => unsubscribe(); 
    }, [user, userRole]); 

    // --- ADD/EDIT TASK IN FIRESTORE (Updated to log) ---
    const handleAddOrEditTask = async (taskDataFromModal) => {
        const authorId = user?.userId;
        if (!authorId || !user?.department) {
            alert("Error: User data incomplete.");
            return;
        }
        
        const tasksColRef = collection(db, "departments", user.department, "tasks");

        try {
            if (taskDataFromModal.id) { // Editing
                const taskRef = doc(db, "departments", user.department, "tasks", taskDataFromModal.id);
                await updateDoc(taskRef, {
                    title: taskDataFromModal.title,
                    desc: taskDataFromModal.desc,
                    status: taskDataFromModal.status,
                    progress: taskDataFromModal.progress,
                    updatedAt: serverTimestamp(),
                    updatedBy: authorId
                });
                // --- Log Activity ---
                await logActivity("updated_task", taskDataFromModal.title, taskDataFromModal.id);

            } else { // Adding
                const docRef = await addDoc(tasksColRef, {
                    ...taskDataFromModal,
                    authorId: authorId,
                    createdBy: authorId,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                    department: user.department
                });
                // --- Log Activity ---
                await logActivity("created_task", taskDataFromModal.title, docRef.id);
            }
            setShowModal(false);
            setEditingTask(null);
        } catch (error) {
            console.error("Error saving task:", error);
            alert(`Failed to save task: ${error.message}`);
        }
    };

    const filteredTasks = filter === "all" ? tasks : tasks.filter(t => t.status === filter);

    return (
        <div className="flex min-h-screen bg-gray-100 relative">
            <Sidebar type={userRole} handleLogout={handleLogout} />

            <main className="flex-1 p-4 md:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-3xl font-bold">Department Tasks</h1>
                            <p className="text-gray-600 text-sm">
                                Overview of ongoing tasks — Welcome, {user?.user_name || "User"}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {userRole === 'admin' && (
                            <button onClick={() => { setEditingTask({}); setShowModal(true); }} className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 flex items-center gap-2">
                                <FaPlus /> Add Task
                            </button>
                        )}
                        {["all", "pending", "inprogress", "overdue", "completed"].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`py-2 px-3 rounded ${filter === f ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-500 hover:text-white transition`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <FaSpinner className="animate-spin text-4xl text-gray-500" />
                    </div>
                ) : (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                            <StatCard title="Total Tasks" value={tasks.length} icon={<FaClipboardList />} color="bg-blue-100 text-blue-600" />
                            <StatCard title="In Progress" value={tasks.filter(t => t.status === "inprogress").length} icon={<FaSpinner />} color="bg-yellow-100 text-yellow-600" />
                            <StatCard title="Overdue" value={tasks.filter(t => t.status === "overdue").length} icon={<FaExclamationTriangle />} color="bg-red-100 text-red-600" />
                            <StatCard title="Completed" value={tasks.filter(t => t.status === "completed").length} icon={<FaCheckCircle />} color="bg-green-100 text-green-600" />
                        </div>

                        {/* Chart + Task List */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3 bg-white rounded shadow p-4">
                                <TaskChart tasks={tasks} />
                            </div>

                            <div className="md:w-2/3 flex flex-col gap-4">
                                {filteredTasks.length > 0 ? (
                                    filteredTasks.map(task => (
                                        <TaskCard 
                                            key={task.id} 
                                            task={task} 
                                            onEdit={(t) => { setEditingTask(t); setShowModal(true); }} 
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center">No tasks found for this filter.</p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </main>

            {showModal && userRole === 'admin' && (
                <TaskModal
                    task={editingTask}
                    onClose={() => {setShowModal(false); setEditingTask(null);}}
                    onSave={handleAddOrEditTask}
                />
            )}
        </div>
    );
};

export default DepartmentTasksPage;