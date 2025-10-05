import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

const projectsData = [
    {
        id: 1,
        name: "Project A",
        status: "ongoing",
        progress: {
            completed: 70,
            ongoing: 30,
        },
        tasks: [
            { name: "Task 1", status: "completed" },
            { name: "Task 2", status: "ongoing" },
        ],
    },
    {
        id: 2,
        name: "Project B",
        status: "completed",
    },
    {
        id: 3,
        name: "Project C",
        status: "upcoming",
    },
    {
        id: 4,
        name: "Project D",
        status: "completed",
    },
];

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleTraceProgress = (project) => {
        setSelectedProject(project);
    };

    const renderProgressChart = (project) => {
        const data = {
            labels: ["Completed", "Ongoing"],
            datasets: [
                {
                    data: [
                        project.progress.completed,
                        project.progress.ongoing,
                    ],
                    backgroundColor: ["#36A2EB", "#FFCE56"],
                },
            ],
        };

        return (
            <div>
                <Pie data={data} />
                <h4>Tasks:</h4>
                <ul>
                    {project.tasks.map((task, index) => (
                        <li key={index}>
                            {task.name} - {task.status}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <h1>Projects Page</h1>
            <div>
                {projectsData.map((project) => (
                    <div
                        key={project.id}
                        style={{
                            border: "1px solid black",
                            padding: "10px",
                            margin: "10px",
                        }}
                    >
                        <h2>{project.name}</h2>
                        {project.status === "ongoing" && (
                            <span style={{ color: "orange" }}>Ongoing</span>
                        )}
                        {project.status === "completed" && (
                            <span style={{ color: "green" }}>Completed</span>
                        )}
                        {project.status === "upcoming" && (
                            <span style={{ color: "blue" }}>Upcoming</span>
                        )}
                        {project.status === "ongoing" && (
                            <button
                                onClick={() => handleTraceProgress(project)}
                            >
                                Trace Progress
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {selectedProject && (
                <div>
                    <h3>Project Progress: {selectedProject.name}</h3>
                    {renderProgressChart(selectedProject)}
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;
