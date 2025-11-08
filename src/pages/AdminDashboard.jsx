import React, { useContext, useState } from "react";
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
} from "react-icons/fa";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ManageJunior from "../pages/ManageJunior"; // Added import for ManageJunior page

Chart.register(ArcElement, Tooltip, Legend);

// --------------------------- TaskChart Component ---------------------------
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

// --------------------------- TaskModal Component ---------------------------
const TaskModal = ({ task, onClose }) => {
  if (!task) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-600">
          <FaTimesCircle />
        </button>
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <p className="text-gray-600 mb-4">{task.desc}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            task.status === 'overdue' ? 'bg-red-100 text-red-700' :
            task.status === 'inprogress' ? 'bg-yellow-100 text-yellow-700' :
            task.status === 'completed' ? 'bg-green-100 text-green-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-gray-500">Progress:</span>
          <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${task.progress}%` }}></div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors">
            Update Status
          </button>
          <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --------------------------- ActivityFeedItem Component ---------------------------
const ActivityFeedItem = ({ activity }) => {
  const { user, action, target, time } = activity;
  const iconMap = {
    completed: <FaCheckCircle className="text-green-500" />,
    commented: <FaCommentDots className="text-blue-500" />,
    assigned: <FaUsers className="text-indigo-500" />,
  };
  return (
    <div className="flex gap-3 py-3 border-b border-gray-200 last:border-b-0">
      <div className="mt-1">{iconMap[action] || <FaCheckCircle />}</div>
      <div>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{user}</span>
          {action === 'completed' ? ' completed ' : action === 'commented' ? ' commented on ' : ' was assigned '}
          <span className="font-semibold">{target}</span>
        </p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
};

// --------------------------- StatCard Component ---------------------------
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

// --------------------------- AdminTaskItem Component ---------------------------
const AdminTaskItem = ({ task, onOpen }) => (
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

// --------------------------- AdminSideListItem Component ---------------------------
const AdminSideListItem = ({ EmployeeName }) => (
  <div className="flex items-center justify-between border-b py-2 hover:bg-gray-50 rounded transition-colors px-2">
    <div className="flex items-center gap-2">
      <img src={ProfileImg} alt="emp_photo" className="w-12 h-12 rounded-full" />
      <p className="font-medium">{EmployeeName}</p>
    </div>
    <button className="text-sm border-2 border-gray-300 bg-gray-100 p-2 rounded hover:bg-yellow-400 hover:text-gray-800 transition-colors">
      Profile
    </button>
  </div>
);

// --------------------------- AdminSidebar Component ---------------------------
const AdminSidebar = ({ user, handleLogout, isOpen, toggleSidebar }) => {
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str.toLowerCase().replace(/-/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  const userDepartment = capitalizeWords(user?.department);
  const navGroups = [
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
        { name: "Intra-department Forum", path: `/dashboard/${user?.department}/department-forum`, icon: <FaShareAlt /> },
        { name: "Inter-department Forum", path: `/inter-department-forum`, icon: <FaShareAlt /> },
        { name: "Resource Sharing", path: `/resource-sharing`, icon: <FaShareAlt /> },
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
                  <NavLink to={opt.path} className={({ isActive }) => `flex items-center gap-3 p-2 rounded-md transition-colors ${isActive ? activeLinkStyle : inactiveLinkStyle} ${!isOpen ? "justify-center" : ""}`}>
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

// --------------------------- AdminDashboard Component ---------------------------
const AdminDashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Mock Data
  const mockTasks = [
    { id: 1, title: "Prepare Report", desc: "Monthly department report", progress: 80, status: 'inprogress' },
    { id: 2, title: "Audit Review", desc: "Quarterly audit review", progress: 45, status: 'inprogress' },
    { id: 3, title: "Team Meeting", desc: "Discuss project milestones", progress: 60, status: 'pending' },
    { id: 4, title: "Onboard New Hire", desc: "Prepare docs for new hire", progress: 10, status: 'overdue' },
    { id: 5, title: "Finalize Budget", desc: "Finalize Q4 budget", progress: 90, status: 'completed' },
  ];

  const mockEmployees = ["Priyanshu", "Atul", "Ankur", "Nehal", "Garv", "Sonia", "Rahul"];

  const mockActivity = [
    { id: 1, user: 'Priyanshu', action: 'completed', target: 'Prepare Report', time: '2 hours ago' },
    { id: 2, user: 'Atul', action: 'commented', target: 'Audit Review', time: '3 hours ago' },
    { id: 3, user: 'Ankur', action: 'assigned', target: 'Finalize Budget', time: '1 day ago' },
    { id: 4, user: 'Admin', action: 'commented', target: 'Prepare Report', time: '2 days ago' },
  ];

  const filteredTasks = mockTasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const filteredEmployees = mockEmployees.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <AdminSidebar user={user} handleLogout={handleLogout} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 p-4 md:p-8 overflow-x-auto">
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.user_name || "Admin"}!</p>
          </div>
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center sm:w-auto w-full">
            <FaPlus />
            <span>New Task</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Tasks" value={mockTasks.length} icon={<FaClipboardList />} color="bg-blue-100 text-blue-600" onClick={() => setFilter('all')} />
          <StatCard title="In Progress" value={mockTasks.filter(t => t.status === 'inprogress').length} icon={<FaSpinner className="animate-spin" />} color="bg-yellow-100 text-yellow-600" onClick={() => setFilter('inprogress')} />
          <StatCard title="Overdue" value={mockTasks.filter(t => t.status === 'overdue').length} icon={<FaExclamationTriangle />} color="bg-red-100 text-red-600" onClick={() => setFilter('overdue')} />
          <StatCard title="Total Staff" value={mockEmployees.length} icon={<FaUsers />} color="bg-green-100 text-green-600" />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-4">Department Tasks ({filter === 'all' ? 'All' : filter})</h2>
              <TaskChart tasks={mockTasks} />
              <div className="flex flex-col gap-4 mt-4">
                {filteredTasks.map(task => (
                  <AdminTaskItem key={task.id} task={task} onOpen={setSelectedTask} />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-4">Manage Junior Officers</h2>
              <div className="relative mb-4">
                <input
                  type="search"
                  placeholder="Find an officer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex flex-col gap-2">
                {filteredEmployees.map((name, i) => (
                  <AdminSideListItem key={i} EmployeeName={name} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="flex flex-col">
                {mockActivity.map(activity => (
                  <ActivityFeedItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

export default AdminDashboard;
