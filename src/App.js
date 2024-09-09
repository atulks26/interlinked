import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import WhatWeOffer from "./pages/Offers";
import TrainingWorkshops from "./pages/Workshop";
// import DiscussionForum from './pages/DiscussionForum';
import Projects from "./pages/ProjectSlider";
import LoginPage from "./components/login"; // Ensure correct path to Login.js

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/what-we-offer" element={<WhatWeOffer />} />
                    <Route path="/login" element={<LoginPage />} /> {/* Add Login route */}
                    {/* <Route path="/training-workshops" element={<TrainingWorkshops />} />
                    <Route path="/discussion-forum" element={<DiscussionForum />} />
                    <Route path="/projects" element={<Projects />} /> */}
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
