import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { UserContext } from "../context/userContext";
import logo from "../images/logo.png";
import { db } from "../context/firebase";
import { collection, getDocs } from "firebase/firestore";

function Navbar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const role = user?.role ? "admin" : "junior-officer";
  const [menuOpen, setMenuOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const deptCollectionRef = collection(db, "departments");
        const snapshot = await getDocs(deptCollectionRef);
        const deptList = snapshot.docs.map(doc => doc.data().departmentName);
        deptList.sort();
        setDepartments(deptList);
      } catch (error) {
        console.error("Error fetching departments: ", error);
      }
    };

    fetchDepartments();
  }, []);

  const formatDeptPath = (name) => {
    return name
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
  };

  const itemsPerColumn = Math.ceil(departments.length / 3);
  const col1 = departments.slice(0, itemsPerColumn);
  const col2 = departments.slice(itemsPerColumn, itemsPerColumn * 2);
  const col3 = departments.slice(itemsPerColumn * 2);

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Urban Setu Logo" className="logo-clickable" />
      </div>

      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        <div className="dropdown">
          <a className="dropdown-toggle">Departments</a>
          <div className="dropdown-content">
            <div className="dropdown-section">
              {col1.map((dept) => (
                <Link
                  key={dept}
                  to={`/department/${formatDeptPath(dept)}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {dept}
                </Link>
              ))}
            </div>

            <div className="dropdown-section">
              {col2.map((dept) => (
                <Link
                  key={dept}
                  to={`/department/${formatDeptPath(dept)}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {dept}
                </Link>
              ))}
            </div>
            
            <div className="dropdown-section">
              {col3.map((dept) => (
                <Link
                  key={dept}
                  to={`/department/${formatDeptPath(dept)}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {dept}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link to="/training" onClick={() => setMenuOpen(false)}>Training</Link>
        <Link to="/forum" onClick={() => setMenuOpen(false)}>Forum</Link>
        <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>

        {!user?.userId ? (
          <Link to="/login" className="navbar-online-services" onClick={() => setMenuOpen(false)}>
            Log In
          </Link>
        ) : (
          <Link
            to={`/dashboard/${role}/${user.department}/${user.userId}`}
            className="navbar-online-services"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;