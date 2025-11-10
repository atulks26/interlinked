import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Sidebar from "../components/Sidebar"; // The universal sidebar
import ProfileImg from "../images/profile.png";
import {
  FaUsers,
  FaTasks,
  FaClipboardList,
  FaSpinner,
  FaExclamationTriangle,
  FaTimesCircle,
  FaCheckCircle,
  FaCommentDots,
  FaPlus // Import FaPlus
} from "react-icons/fa";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { db } from "../context/firebase"; 
import {
  collection,
  query,
  onSnapshot,
  doc,
  orderBy,
  limit // Import limit
} from "firebase/firestore"; 

Chart.register(ArcElement, Tooltip, Legend);

// --- START: Time Ago Helper Function ---
const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Just now';
    const now = new Date();
    const date = timestamp.toDate(); // Convert Firestore Timestamp to JS Date
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
};
// --- END: Time Ago Helper Function ---

// --------------------------- TaskChart Component (Copied from Admin) ---------------------------
const TaskChart = ({ tasks }) => {
  const statusCounts = {
    pending: tasks.filter(t => t.status === 'pending').length,
    inprogress: tasks.filter(t => t.status === 'inprogress').length,
    overdue: tasks.filter(t => t.status === 'overdue').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };
  const data = {
    labels: ['Pending', 'In Progress', 'Overdue', 'Completed'],
    datasets: [
      {
        label: 'Tasks by Status',
        data: [statusCounts.pending, statusCounts.inprogress, statusCounts.overdue, statusCounts.completed],
        backgroundColor: ['#E5E7EB', '#FBBF24', '#EF4444', '#10B981'],
        borderColor: '#F9FAFB',
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: false },
    },
  };
  return <div className="max-w-[250px] mx-auto mb-4"><Doughnut data={data} options={options} /></div>;
};

// --------------------------- StatCard Component (Copied from Admin) ---------------------------
const StatCard = ({ title, value, icon, color, onClick }) => (
  <div className={`bg-white rounded-lg shadow p-4 flex items-center gap-4 ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`} onClick={onClick}>
    <div className={`text-3xl p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

// --------------------------- TaskItem Component (Copied from Admin) ---------------------------
const TaskItem = ({ task, onOpen }) => (
  <div className="flex flex-col border-2 border-gray-200 rounded-lg shadow-sm p-4 bg-white hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start gap-4 flex-wrap">
      <div className="flex flex-col flex-1 min-w-[60%]">
        <div className="text-lg font-semibold">{task.title}</div>
        <div className="text-gray-600 text-sm">{task.desc}</div>
      </div>
      <button 
        onClick={() => onOpen(task)}
        className="text-sm border-2 border-gray-300 bg-gray-100 p-2 rounded hover:bg-yellow-400 hover:text-gray-800 transition-colors"
      >
        Open
      </button>
    </div>
    <div className="mt-3 w-full bg-gray-200 h-2 rounded">
      <div className="h-2 rounded bg-yellow-400" style={{ width: `${task.progress}%` }}></div>
    </div>
    <p className="text-sm text-gray-500 mt-1">{task.progress}% Completed</p>
  </div>
);

// --------------------------- UserProfileCard Component (Request #6) ---------------------------
const UserProfileCard = ({ user }) => {
    const capitalizeWords = (str) => {
        if (!str) return 'N/A';
        return str.toLowerCase().replace(/-/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    };

    return (
        <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>
            <div className="flex flex-col items-center gap-3">
                <img src={ProfileImg} alt="Profile" className="w-24 h-24 rounded-full" />
                <h3 className="text-lg font-bold">{user?.user_name || 'Officer'}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <div className="mt-4 space-y-2 border-t pt-4">
                <div className="flex justify-between">
                    <span className="text-gray-600">Designation:</span>
                    <span className="font-medium">Junior Officer</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span className="font-medium">{capitalizeWords(user?.department)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Sub-Dept:</span>
                    <span className="font-medium">{capitalizeWords(user?.subdepartment)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Admin:</span>
                    <span className="font-medium">{user?.admin || 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};

// --------------------------- ActivityFeedItem Component (Updated) ---------------------------
const ActivityFeedItem = ({ activity }) => {
  const { user_name, action, target_name, timestamp } = activity; 
  
  const iconMap = {
    completed_task: <FaCheckCircle className="text-green-500" />,
    created_task: <FaPlus className="text-blue-500" />,
    updated_task: <FaTasks className="text-yellow-500" />,
    created_officer: <FaUsers className="text-indigo-500" />,
  };

   const actionTextMap = {
    completed_task: "completed",
    created_task: "created task",
    updated_task: "updated task",
    created_officer: "added officer",
    deleted_officer: "deleted officer",
    updated_officer: "updated officer",
  };

  return (
    <div className="flex gap-3 py-3 border-b border-gray-200 last:border-b-0">
      <div className="mt-1">{iconMap[action] || <FaCheckCircle />}</div>
      <div>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{user_name || 'User'}</span>
          {" "}{actionTextMap[action] || action}{" "}
          <span className="font-semibold">{target_name}</span>
        </p>
        <p className="text-xs text-gray-400">{formatTimeAgo(timestamp)}</p>
      </div>
    </div>
  );
};

// --------------------------- EmployeeDashboard Component ---------------------------
const EmployeeDashboard = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    
    const [tasks, setTasks] = useState([]); 
    const [selectedTask, setSelectedTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // --- NEW: Real activity state ---
    const [activities, setActivities] = useState([]); 

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // --- Combined useEffect for all data fetching ---
    useEffect(() => {
        if (!user || !user.department) {
            setIsLoading(true);
            return;
        }

        setIsLoading(true);
        const department = user.department;

        // 1. Fetch Tasks
        const tasksRef = collection(db, "departments", department, "tasks");
        const qTasks = query(tasksRef, orderBy("createdAt", "desc"));
        const unsubTasks = onSnapshot(qTasks, (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }, (error) => console.error("Error fetching tasks: ", error));

        // 2. Fetch Activities (NEW)
        const activitiesRef = collection(db, "departments", department, "activities");
        const qActivities = query(activitiesRef, orderBy("timestamp", "desc"), limit(10));
        const unsubActivities = onSnapshot(qActivities, (snapshot) => {
            setActivities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setIsLoading(false); // Set loading to false after last query
        }, (error) => {
            console.error("Error fetching activities: ", error);
            setIsLoading(false);
        });

        // Cleanup all listeners
        return () => {
            unsubTasks();
            unsubActivities();
        };
    }, [user]); 

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return task.status === filter;
    });

    return (
        <div className="flex flex-row min-h-screen bg-gray-100">
            <Sidebar type="employee" handleLogout={handleLogout} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 p-4 md:p-8 overflow-x-auto">
                
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Officer Dashboard</h1>
                        <p className="text-gray-600">Welcome back, {user?.user_name || "Officer"}!</p>
                    </div>
                </div>

                {/* --- Show loader while fetching --- */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <FaSpinner className="animate-spin text-4xl text-gray-500" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <StatCard title="Total Tasks" value={tasks.length} icon={<FaClipboardList />} color="bg-blue-100 text-blue-600" onClick={() => setFilter('all')} />
                            <StatCard title="In Progress" value={tasks.filter(t => t.status === 'inprogress').length} icon={<FaSpinner />} color="bg-yellow-100 text-yellow-600" onClick={() => setFilter('inprogress')} />
                            <StatCard title="Overdue" value={tasks.filter(t => t.status === 'overdue').length} icon={<FaExclamationTriangle />} color="bg-red-100 text-red-600" onClick={() => setFilter('overdue')} />
                            <StatCard title="Completed" value={tasks.filter(t => t.status === 'completed').length} icon={<FaCheckCircle />} color="bg-green-100 text-green-600" onClick={() => setFilter('completed')} />
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1 flex flex-col gap-4">
                                <div className="bg-white rounded shadow p-4">
                                    <h2 className="text-xl font-semibold mb-4">Department Tasks ({filter === 'all' ? 'All' : filter})</h2>
                                    <TaskChart tasks={tasks} />
                                    <div className="flex flex-col gap-4 mt-4 max-h-96 overflow-y-auto">
                                        {filteredTasks.length > 0 ? (
                                            filteredTasks.map(task => (
                                                <TaskItem key={task.id} task={task} onOpen={setSelectedTask} />
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center">No tasks for this filter.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/3 flex flex-col gap-4">
                                <UserProfileCard user={user} />

                                {/* --- NEW: Real Activity Feed --- */}
                                <div className="bg-white rounded shadow p-4">
                                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                                    <div className="flex flex-col">
                                        {activities.length > 0 ? (
                                            activities.map(activity => (
                                                <ActivityFeedItem key={activity.id} activity={activity} />
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-center text-sm">No recent activity.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* View Task Modal */}
            {selectedTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg relative">
                        <button onClick={() => setSelectedTask(null)} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-600">
                            <FaTimesCircle />
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{selectedTask.title}</h2>
                        <p className="text-gray-600 mb-4">{selectedTask.desc}</p>
                        <p><strong>Status:</strong> {selectedTask.status}</p>
                        <p><strong>Progress:</strong> {selectedTask.progress}%</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeDashboard;