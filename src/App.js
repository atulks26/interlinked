import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import WhatWeOffer from "./pages/Offers";
import Forum from "./pages/forum";
import TopicDetail from "./components/TopicDetail";
import Projects from "./pages/Projects";
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Department from "./pages/Department";
import Training from "./pages/Training";
import DepartmentForum from "./components/DepartmentForum"; // Intra-Department Forum
import RegistrationForm from "./pages/Register";
import EmployeeProfile from "./pages/EmployeeProfile";
import InterDepartmentForum from "./components/InterDepartmentForum";

import ProjectsPage from "./components/ProjectsPage";
import StatusPage from "./components/ProjectDetails";
import OngoingStatusPage from "./components/OngoingStatusPage";
import ProjectForm from './pages/ProjectForm';
import ChatBotIframe from "./components/cahtbot";

// Import ManageJunior
import ManageJunior from "./pages/ManageJunior";
import DepartmentTasksPage from "./pages/DepartmentTasksPage";

function App() {
    // Temporary simulated user (replace later with real logged-in data)
    const user = {
        userId: "admin123",
        user_name: "Ankur Sharma",
        department: "engineering",
    };

    const handleLogout = () => {
        alert("You have been logged out.");
    };

    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/dashboard/admin/:department/:id"
                        element={<AdminDashboard />}
                    />
                    <Route
                        path="/dashboard/admin/:department/:id/officers"
                        element={<ManageJunior />}
                    />
                    <Route
                        path="/dashboard/junior-officer/:department/:id"
                        element={<EmployeeDashboard />}
                    />
                    <Route
                        path="/dashboard/:department/tasks"
                        element={<DepartmentTasksPage />}
                    />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/training" element={<Training />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/projectspage" element={<ProjectsPage />} />
                    <Route path="/statuspage" element={<StatusPage />} />
                    <Route path="/forum/topic/:id" element={<TopicDetail />} />
                    <Route path="/register" element={<RegistrationForm />} />

                    {/* ✅ Intra-Department Forum */}
                    <Route
                        path="/dashboard/:department/department-forum"
                        element={<DepartmentForum />}
                    />

                    {/* ✅ Inter-Department Forum */}
                    <Route
                        path="/inter-department-forum"
                        element={<InterDepartmentForum user={user} handleLogout={handleLogout} />}
                    />

                    <Route
                        path="/statuspage"
                        element={<OngoingStatusPage />}
                    />
                    <Route path="/project-form" element={<ProjectForm />} />
                    <Route
                        path="/dashboard/junior-officer/:department/:id/profile"
                        element={<EmployeeProfile />}
                    />
                </Routes>
                <ChatBotIframe />
                <Footer />
            </Router>
        </div>
    );
}

export default App;
