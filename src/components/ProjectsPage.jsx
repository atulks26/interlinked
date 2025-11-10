import React, { useState, useEffect, useContext } from 'react';
import Sidebar from './Sidebar';
import { FaEye, FaEdit, FaPlus, FaTimes, FaBars, FaSpinner } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { UserContext } from '../context/userContext';
import { db } from '../context/firebase';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
} from 'firebase/firestore';

Chart.register(ArcElement, Tooltip, Legend);

const Card = ({ project, onView, onEdit, isAdmin }) => {
    const statusColor =
        project.status === 'Completed'
            ? 'text-green-500'
            : project.status === 'Ongoing'
            ? 'text-yellow-500'
            : 'text-gray-500';

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between">
            <div className="flex flex-col flex-1">
                <h2 className="font-bold text-xl mb-2">{project.name}</h2>
                <p className="text-gray-700 text-sm mb-1">{project.desc}</p>
                <p className="text-gray-600 text-sm mb-1">Members: {project.members}</p>
                <p className="text-gray-500 text-sm mb-2">
                    Duration: {project.startDate?.toDate ? project.startDate.toDate().toLocaleDateString() : project.startDate} - 
                                {project.endDate?.toDate ? project.endDate.toDate().toLocaleDateString() : project.endDate}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                        className={`h-3 rounded-full ${
                            project.status === 'Completed'
                                ? 'bg-green-500'
                                : project.status === 'Ongoing'
                                ? 'bg-yellow-400'
                                : 'bg-gray-400'
                        }`}
                        style={{ width: `${project.progress}%` }}
                    ></div>
                </div>
                <p className={`text-sm font-semibold ${statusColor}`}>Status: {project.status}</p>
            </div>

            <div className="flex justify-end gap-2 mt-3">
                <button
                    onClick={() => onView(project)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    <FaEye /> View
                </button>
                
                {isAdmin && (
                    <button
                        onClick={() => onEdit(project)}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    >
                        <FaEdit /> Edit
                    </button>
                )}
            </div>
        </div>
    );
};

const ProjectsPage = () => {
    const { user } = useContext(UserContext); 
    const isAdmin = user?.role === 'admin'; 

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filter, setFilter] = useState('All');
    
    const [projects, setProjects] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectModal, setProjectModal] = useState(null); 

    useEffect(() => {
        if (!user || !user.department) {
            setIsLoading(true);
            return;
        }

        setIsLoading(true);
        const projectsCollectionRef = collection(db, "departments", user.department, "projects");
        const q = query(projectsCollectionRef, orderBy("startDate", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedProjects = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProjects(fetchedProjects);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching projects: ", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const getChartData = (project) => ({
        labels: ['Completed', 'Ongoing', 'Pending'],
        datasets: [
            {
                data: [
                    project.tasks.filter((t) => t.status === 'Completed').length,
                    project.tasks.filter((t) => t.status === 'Ongoing').length,
                    project.tasks.filter((t) => t.status === 'Pending').length,
                ],
                backgroundColor: ['#10B981', '#FBBF24', '#EF4444'],
                borderColor: '#F9FAFB',
                borderWidth: 2,
            },
        ],
    });

    const handleSaveProject = async (e) => {
        e.preventDefault();
        if (!isAdmin) {
            alert("You do not have permission to perform this action.");
            return;
        }
        if (!user || !user.department) {
            alert("Error: User department not found. Cannot save project.");
            return;
        }

        try {
            if (projectModal.id) {
                const projectDocRef = doc(db, "departments", user.department, "projects", projectModal.id);
                const { id, ...dataToSave } = projectModal;
                await updateDoc(projectDocRef, {
                    ...dataToSave,
                    updatedAt: serverTimestamp(), 
                });
            } else {
                const projectsCollectionRef = collection(db, "departments", user.department, "projects");
                await addDoc(projectsCollectionRef, {
                    ...projectModal,
                    department: user.department,
                    tasks: projectModal.tasks || [], 
                    createdAt: serverTimestamp(), 
                });
            }
            setProjectModal(null); 
        } catch (error) {
            console.error("Error saving project: ", error);
            alert("Failed to save project. See console for details.");
        }
    };

    const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.status === filter);

    return (
        <div className="flex min-h-screen bg-gray-100 relative">
            <div
                className={`fixed z-50 h-full transform transition-transform duration-300 bg-white ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:relative md:translate-x-0`}
            >
                <Sidebar type={user?.role || "employee"} />
            </div>

            {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

            <div className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold">Projects</h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="md:hidden p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                        >
                            <FaBars size={20} />
                        </button>
                        
                        {isAdmin && (
                            <button
                                onClick={() => setProjectModal({})} 
                                className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                <FaPlus /> Add Project
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 mb-4 flex-wrap">
                    {['All', 'Ongoing', 'Completed', 'Pending'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-3 py-1 rounded ${
                                filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <FaSpinner className="animate-spin text-4xl text-gray-500" />
                        <p className="ml-3 text-gray-600">Loading projects...</p>
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProjects.map((project) => (
                            <Card
                                key={project.id}
                                project={project}
                                onView={(p) => setSelectedProject(p)}
                                onEdit={(p) => setProjectModal({ ...p })}
                                isAdmin={isAdmin} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-gray-600">No projects found for this filter.</p>
                    </div>
                )}


                {selectedProject && (
                    <ProjectViewModal project={selectedProject} onClose={() => setSelectedProject(null)} getChartData={getChartData} />
                )}
                
                {projectModal && (
                    <ProjectEditModal 
                        project={projectModal} 
                        onClose={() => setProjectModal(null)} 
                        onSave={handleSaveProject} 
                        setProjectModal={setProjectModal} 
                    />
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;

const ProjectViewModal = ({ project, onClose, getChartData }) => (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
        <div
            className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <button onClick={onClose}>
                    <FaTimes />
                </button>
            </div>
            <p className="text-gray-700 mb-1">{project.desc}</p>
            <p className="text-gray-600 mb-1">Members: {project.members}</p>
            <p className="text-gray-500 mb-3">
                Duration: {project.startDate?.toDate ? project.startDate.toDate().toLocaleDateString() : project.startDate} - 
                            {project.endDate?.toDate ? project.endDate.toDate().toLocaleDateString() : project.endDate}
            </p>
            <div className="mb-4">
                {project.tasks && project.tasks.length > 0 ? (
                    <Doughnut data={getChartData(project)} />
                ) : (
                    <p className="text-center text-gray-500">No task data to display.</p>
                )}
            </div>

            <p className="text-sm font-semibold mb-1">Overall Progress:</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                    className={`h-3 rounded-full ${
                        project.status === 'Completed'
                            ? 'bg-green-500'
                            : project.status === 'Ongoing'
                            ? 'bg-yellow-400'
                            : 'bg-gray-400'
                    }`}
                    style={{ width: `${project.progress}%` }}
                ></div>
            </div>
            <p className="text-sm text-gray-500 mb-4">{project.progress}% Completed</p>

            <p className="text-sm font-semibold mb-2">Tasks:</p>
            <div className="overflow-x-auto mb-4">
                {project.tasks && project.tasks.length > 0 ? (
                    <table className="w-full text-sm text-left border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-2 py-1 border">Name</th>
                                <th className="px-2 py-1 border">Status</th>
                                <th className="px-2 py-1 border">Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {project.tasks.map((task) => (
                                <tr key={task.id} className="border-t">
                                    <td className="px-2 py-1 border">{task.name}</td>
                                    <td className="px-2 py-1 border">{task.status}</td>
                                    <td className="px-2 py-1 border">{task.progress}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                     <p className="text-center text-gray-500">No tasks have been added to this project yet.</p>
                )}
            </div>

            <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
            >
                Back
            </button>
        </div>
    </div>
);

const ProjectEditModal = ({ project, onClose, onSave, setProjectModal }) => (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
        <form
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-y-auto max-h-[90vh]"
            onSubmit={onSave}
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-2xl font-bold mb-4">{project.id ? 'Edit Project' : 'Add Project'}</h2>

            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
                type="text"
                className="w-full mb-3 border rounded p-2"
                value={project.name || ''}
                onChange={(e) => setProjectModal({ ...project, name: e.target.value })}
                required
            />

            <label className="block mb-2 text-sm font-medium">Description</label>
            <textarea
                className="w-full mb-3 border rounded p-2"
                value={project.desc || ''}
                onChange={(e) => setProjectModal({ ...project, desc: e.target.value })}
                required
            />

            <label className="block mb-2 text-sm font-medium">Members</label>
            <input
                type="number"
                className="w-full mb-3 border rounded p-2"
                value={project.members || 0}
                onChange={(e) => setProjectModal({ ...project, members: Number(e.target.value) })}
                required
            />

            <label className="block mb-2 text-sm font-medium">Progress (%)</label>
            <input
                type="number"
                className="w-full mb-3 border rounded p-2"
                value={project.progress || 0}
                onChange={(e) => setProjectModal({ ...project, progress: Number(e.target.value) })}
                min="0"
                max="100"
                required
            />

            <label className="block mb-2 text-sm font-medium">Status</label>
            <select
                className="w-full mb-3 border rounded p-2"
                value={project.status || 'Ongoing'}
                onChange={(e) => setProjectModal({ ...project, status: e.target.value })}
            >
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Pending</option>
            </select>

            <label className="block mb-2 text-sm font-medium">Start Date</label>
            <input
                type="date"
                className="w-full mb-3 border rounded p-2"
                // Handle both string (from input) and Firestore Timestamp (from db)
                value={project.startDate?.toDate ? project.startDate.toDate().toISOString().split('T')[0] : project.startDate || ''}
                onChange={(e) => setProjectModal({ ...project, startDate: e.target.value })}
                required
            />

            <label className="block mb-2 text-sm font-medium">End Date</label>
            <input
                type="date"
                className="w-full mb-3 border rounded p-2"
                value={project.endDate?.toDate ? project.endDate.toDate().toISOString().split('T')[0] : project.endDate || ''}
                onChange={(e) => setProjectModal({ ...project, endDate: e.target.value })}
                required
            />

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
);