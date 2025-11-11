import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Forum from "./pages/forum";
import Projects from "./pages/Projects";
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Training from "./pages/Training";
import RegistrationForm from "./pages/Register";
import EmployeeProfile from "./pages/EmployeeProfile";
import InterDepartmentForum from "./components/InterDepartmentForum";
import ProjectsPage from "./components/ProjectsPage";
import ManageJunior from "./pages/ManageJunior";
import DepartmentTasksPage from "./pages/DepartmentTasksPage";

function App() {
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
                    <Route path="/register" element={<RegistrationForm />} />

                    <Route
                        path="/dashboard/admin/:department/:id/inter-department-forum"
                        element={<InterDepartmentForum/>}
                    />
                    <Route
                        path="/dashboard/junior-officer/:department/:id/profile"
                        element={<EmployeeProfile />}
                    />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
