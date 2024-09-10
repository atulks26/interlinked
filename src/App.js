import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import WhatWeOffer from "./pages/Offers";
import TrainingWorkshops from "./pages/Workshop";
// import DiscussionForum from './pages/DiscussionForum';
import Projects from "./pages/Projects";
import LoginPage from "./pages/Login";
import { UserProvider } from "./context/userContext";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Department from "./pages/Department";

function App() {
    return (
        <div>
            <Router>
                <UserProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route
                            path="/what-we-offer"
                            element={<WhatWeOffer />}
                        />
                        <Route path="/login" element={<LoginPage />} />{" "}
                        <Route
                            path="/dashboard/admin/:department"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/dashboard/employee/:department"
                            element={<EmployeeDashboard />}
                        />
                        <Route
                            path="/department/:department"
                            element={<Department />}
                        />
                        {/* <Route path="/training-workshops" element={<TrainingWorkshops />} />
                        <Route path="/discussion-forum" element={<DiscussionForum />} /> */}
                        <Route path="/projects" element={<Projects />} />
                    </Routes>
                    <Footer />
                </UserProvider>
            </Router>
        </div>
    );
}

export default App;
