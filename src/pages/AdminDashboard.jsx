import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import ProfileImg from "../images/profile.png";
import {
  FaUsers,
  FaTasks,
  FaSignOutAlt,
  FaProjectDiagram,
  FaShareAlt,
  FaPlus,
  FaClipboardList,
  FaSpinner,
  FaExclamationTriangle,
  FaBars,
  FaTimes,
  FaSearch,
  FaTimesCircle,
  FaCheckCircle,
  FaCommentDots,
  FaHome
} from "react-icons/fa";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { db } from "../context/firebase"; 
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  where,
  orderBy,
  limit
} from "firebase/firestore"; 

Chart.register(ArcElement, Tooltip, Legend);

const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Just now';
    const now = new Date();
    const date = timestamp.toDate();
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

const OfficerListItem = ({ officer }) => (
    <div className="flex items-center justify-between border-b py-2 hover:bg-gray-50 rounded transition-colors px-2">
      <div className="flex items-center gap-3 min-w-0">
        <img src={ProfileImg} alt={officer.user_name} className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{officer.user_name}</p>
          <p className="text-sm text-gray-500 truncate">{officer.subdepartment || 'N/A'}</p>
        </div>
      </div>
      <Link 
        to={`/dashboard/admin/${officer.department}/${officer.userId}/officers`} 
        className="text-sm border border-gray-300 bg-white px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        View
      </Link>
    </div>
  );

const AdminSidebar = ({ user, handleLogout, isOpen, toggleSidebar }) => {
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str.toLowerCase().replace(/-/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  const userDepartment = capitalizeWords(user?.department);

  const navGroups = [
    {
      title: "Main",
      options: [
        { name: "Home", path: `/dashboard/admin/${user?.department}/${user?.userId}`, icon: <FaHome /> },
      ]
    },
    {
      title: "Tools",
      options: [
        { name: "Manage Junior Officers", path: `/dashboard/admin/${user?.department}/${user?.userId}/officers`, icon: <FaUsers /> },
        { name: "Department Tasks", path: `/dashboard/${user?.department}/tasks`, icon: <FaTasks /> },
        { name: "Projects Page", path: `/projectspage`, icon: <FaProjectDiagram /> },
      ]
    },
    {
      title: "Communicate",
      options: [
        { name: "Department Forum", path: `/dashboard/admin/${user?.department}/${user?.userId}/inter-department-forum`, icon: <FaShareAlt /> },
      ]
    }
  ];
  const activeLinkStyle = "bg-gray-700 text-white";
  const inactiveLinkStyle = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <div className={`bg-gray-800 text-white p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-20"} flex flex-col min-h-screen flex-shrink-0 relative`}>
      <button onClick={toggleSidebar} className={`p-2 rounded-md text-gray-300 hover:bg-gray-700 transition-all mb-4 ${isOpen ? "self-end" : "self-center"}`}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`flex flex-col mb-4 pb-4 border-b border-gray-700 ${isOpen ? "items-start" : "items-center"}`}>
        <img src={ProfileImg} alt="Profile" className={`rounded-full ${isOpen ? 'w-16 h-16' : 'w-10 h-10'} transition-all`} />
        {isOpen && (
          <div className="mt-2">
            <h1 className="text-xl font-bold text-yellow-400">{user?.user_name}</h1>
            <p className="text-sm text-gray-400">Administrator</p>
            <p className="text-xs text-gray-500">{userDepartment}</p>
          </div>
        )}
      </div>
      <nav className="flex-1">
        {navGroups.map((group, index) => (
          <div key={index} className="mb-2">
            {isOpen && (<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">{group.title}</h3>)}
            <ul className="flex flex-col gap-1">
              {group.options.map((opt) => (
                <li key={opt.name} className="relative group"> 
                  <NavLink
                    to={opt.path}
                    end={opt.name === "Home"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-md transition-colors ${isActive ? activeLinkStyle : inactiveLinkStyle} ${!isOpen ? "justify-center" : ""}`
                    }
                  >
                    <span className="text-xl">{opt.icon}</span>
                    {isOpen && <span>{opt.name}</span>}
                  </NavLink>
                  {!isOpen && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-sm rounded-md px-3 py-1 shadow-lg z-50 whitespace-nowrap">
                      {opt.name}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button onClick={handleLogout} className={`flex items-center gap-3 p-2 rounded-md w-full transition-colors text-red-400 hover:bg-red-900 hover:text-white ${!isOpen ? "justify-center" : ""}`}>
          <span className="text-xl"><FaSignOutAlt /></span>
          {isOpen && <span className="font-bold">LOGOUT</span>}
        </button>
      </div>
    </div>
  );
};

  const AdminDashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]); 
  const [selectedTask, setSelectedTask] = useState(null);
  const [officers, setOfficers] = useState([]); 
  
  const [activities, setActivities] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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

  useEffect(() => {
    if (!user || !user.department) {
        setIsLoading(true);
        return;
    }
    
    setIsLoading(true);
    const department = user.department;

    const tasksRef = collection(db, "departments", department, "tasks");
    const qTasks = query(tasksRef, orderBy("createdAt", "desc"));
    const unsubTasks = onSnapshot(qTasks, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error("Error fetching tasks: ", error));

    const usersRef = collection(db, "users");
    const qOfficers = query(
      usersRef,
      where("department", "==", department),
      where("role", "==", "junior-officer")
    );
    const unsubOfficers = onSnapshot(qOfficers, (snapshot) => {
      setOfficers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error("Error fetching officers: ", error));

    const activitiesRef = collection(db, "departments", department, "activities");
    const qActivities = query(activitiesRef, orderBy("timestamp", "desc"), limit(10));
    const unsubActivities = onSnapshot(qActivities, (snapshot) => {
        setActivities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
    }, (error) => {
        console.error("Error fetching activities: ", error);
        setIsLoading(false);
    });

    return () => {
      unsubTasks();
      unsubOfficers();
      unsubActivities();
    };
  }, [user]); 

  const handleAddOrEditTask = async (taskDataFromModal) => {
    const authorId = user?.userId;
    if (!authorId || !user?.department) {
        alert("Error: User data incomplete.");
        return;
    }
    
    const tasksColRef = collection(db, "departments", user.department, "tasks");

    try {
      if (taskDataFromModal.id) {
        const dataToUpdate = {
          title: taskDataFromModal.title,
          desc: taskDataFromModal.desc,
          status: taskDataFromModal.status,
          progress: taskDataFromModal.progress,
          updatedAt: serverTimestamp(),
          updatedBy: authorId
        };
        const taskRef = doc(db, "departments", user.department, "tasks", taskDataFromModal.id);
        await updateDoc(taskRef, dataToUpdate);
        
        await logActivity("updated_task", taskDataFromModal.title, taskDataFromModal.id);
        
      } else {
        const newTask = {
          ...taskDataFromModal,
          authorId: authorId,
          createdBy: authorId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          department: user.department
        };
        const docRef = await addDoc(tasksColRef, newTask);
        
        await logActivity("created_task", taskDataFromModal.title, docRef.id);
      }
      setShowTaskModal(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
      alert(`Failed to save task: ${error.message}`);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <AdminSidebar user={user} handleLogout={handleLogout} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 p-4 md:p-8 overflow-x-auto">
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.user_name || "Admin"}!</p>
          </div>
          <button 
            onClick={() => { setEditingTask({}); setShowTaskModal(true); }} 
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center sm:w-auto w-full"
          >
            <FaPlus />
            <span>New Task</span>
          </button>
        </div>

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
                    <StatCard title="Total Staff" value={officers.length} icon={<FaUsers />} color="bg-green-100 text-green-600" />
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
                                    <p className="text-gray-500 text-center">No tasks found for this filter.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-xl font-semibold mb-4">Junior Officers</h2>
                            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
                                {officers.length > 0 ? (
                                officers.map((officer) => (
                                    <OfficerListItem key={officer.id} officer={officer} />
                                ))
                                ) : (
                                <p className="text-gray-500 text-center">No junior officers found.</p>
                                )}
                            </div>
                        </div>
                        
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
      
      {/* Add/Edit Task Modal */}
      {showTaskModal && (
        <TaskModal
          task={editingTask || {}}
          onClose={() => { setShowTaskModal(false); setEditingTask(null); }}
          onSave={handleAddOrEditTask}
        />
      )}
    </div>
  );
};

export default AdminDashboard;