import React, { useState, useContext, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSpinner, 
} from "react-icons/fa";
import ProfileImg from "../images/profile.png";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/userContext";
import { db, app } from "../context/firebase";
import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  addDoc 
} from "firebase/firestore";

const ManageJunior = () => {
  const { user } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [officers, setOfficers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

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
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("department", "==", user.department),
      where("role", "==", "junior-officer")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOfficers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOfficers(fetchedOfficers);
      setIsLoading(false); 
    }, (error) => {
      console.error("Error fetching officers: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]); 

  const handleAddOfficer = async (e) => {
    e.preventDefault();
    if (!user || !user.department) {
        alert("Cannot add officer: Admin user data not loaded.");
        return;
    }

    const formData = new FormData(e.target);
    const name = formData.get("name").trim();
    const subdepartment = formData.get("subdepartment").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (!name || !subdepartment || !email || !password) {
      alert("Please fill all fields.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const tempAppConfig = app.options;
    const tempAppName = `temp-user-creation-${Date.now()}`;
    let tempApp;
    let tempAuth;

    try {
      tempApp = initializeApp(tempAppConfig, tempAppName);
      tempAuth = getAuth(tempApp);

      const userCredential = await createUserWithEmailAndPassword(
        tempAuth,
        email,
        password
      );
      const newAuthUser = userCredential.user;

      const userDocRef = doc(db, "users", newAuthUser.uid);
      await setDoc(userDocRef, {
        userId: newAuthUser.uid,
        user_name: name,
        email: email,
        department: user.department, 
        subdepartment: subdepartment,
        role: "junior-officer",
        admin: user.user_name,
        createdAt: serverTimestamp(),
      });
      
      await logActivity("created_officer", name, newAuthUser.uid);

      setShowAddModal(false);
      e.target.reset();
      alert("Officer added successfully!");

    } catch (error) {
      console.error("Error adding officer:", error);
      alert(`Failed to add officer: ${error.message}`);
    } finally {
      try {
        if (tempAuth) {
          await signOut(tempAuth); 
        }
        if (tempApp) {
          await deleteApp(tempApp); 
        }
      } catch (cleanupError) {
        console.error("Error cleaning up temp auth app:", cleanupError);
      }
    }
  };

  const filteredOfficers = officers
    .filter(
      (e) =>
        e.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.subdepartment && e.subdepartment.toLowerCase().includes(searchTerm.toLowerCase())) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? a.user_name.localeCompare(b.user_name)
        : b.user_name.localeCompare(a.user_name)
    );

  return (
    <div className="flex">
      <Sidebar type="admin" />
      <div className="container mx-auto p-6 flex-1">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <h1 className="text-3xl font-bold">Manage Junior Officers</h1>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-gray-800 flex items-center gap-2"
            >
              <FaPlus /> Add Officer
            </button>
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded flex items-center gap-2"
            >
              {sortAsc ? <FaSortAlphaDown /> : <FaSortAlphaUp />} Sort
            </button>
          </div>
        </div>

        <div className="mb-4 relative w-full max-w-md">
          <input
            type="search"
            placeholder="Search officer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-gray-500" />
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOfficers.length > 0 ? (
                filteredOfficers.map((emp) => (
                <div
                    key={emp.id}
                    className="bg-white shadow rounded p-4 flex flex-col items-center gap-2 hover:shadow-lg transition"
                >
                    <img
                    src={ProfileImg}
                    alt={emp.user_name}
                    className="w-16 h-16 rounded-full"
                    />
                    <h2 className="font-semibold text-lg">{emp.user_name}</h2>
                    <p className="text-sm text-gray-500">
                    <strong>Sub-dept:</strong> {emp.subdepartment || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500 break-all">
                    <strong>Email:</strong> {emp.email}
                    </p>

                    <div className="flex gap-2 mt-2">
                    </div>
                </div>
                ))
            ) : (
                <p className="text-gray-500">No junior officers found.</p>
            )}
            </div>
        )}
      </div>

      {showAddModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <form
            onSubmit={handleAddOfficer}
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add New Officer</h2>
            <input
              name="name"
              placeholder="Name"
              required
              className="w-full mb-3 border rounded p-2"
            />
            <input
              name="subdepartment"
              placeholder="Sub-department"
              required
              className="w-full mb-3 border rounded p-2"
            />
            <input
              name="email"
              placeholder="Email ID"
              type="email"
              required
              className="w-full mb-3 border rounded p-2"
            />
            <input
              name="password"
              placeholder="Password (min. 6 chars)"
              type="password"
              required
              className="w-full mb-3 border rounded p-2"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default ManageJunior;