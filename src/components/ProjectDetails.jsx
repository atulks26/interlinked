// StatusPage.js
// OngoingStatusPage.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const OngoingStatusPage = () => {
    const ongoingProjects = [
        { name: 'Resource Extraction', completedTasks: 5, ongoingTasks: 3, delayedTasks: 3 },
        { name: 'Delivery', completedTasks: 7, ongoingTasks: 2, delayedTasks: 1 },
        { name: 'Finance Budgeting', completedTasks: 1, ongoingTasks: 8, delayedTasks: 5 },
        { name: 'Land Grading', completedTasks: 2, ongoingTasks: 4, delayedTasks: 2 },
        { name: 'Demolition', completedTasks: 9, ongoingTasks: 1, delayedTasks: 0 },
    ];

    const totalCompletedTasks = ongoingProjects.reduce((total, project) => total + project.completedTasks, 0);
    const totalOngoingTasks = ongoingProjects.reduce((total, project) => total + project.ongoingTasks, 0);
    const totalDelayedTasks = ongoingProjects.reduce((total, project) => total + project.delayedTasks, 0);

    const data = {
        labels: ['Completed Tasks', 'Ongoing Tasks', 'Tasks Beyond Deadline'],
        datasets: [
            {
                data: [totalCompletedTasks, totalOngoingTasks, totalDelayedTasks],
                backgroundColor: ['#4caf50', '#ffeb3b', '#c30010'],
            },
        ],
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Ongoing Projects Status</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Project Tasks</h2>
                    {ongoingProjects.map((project, index) => (
                        <div key={index} className="mb-4 p-4 rounded shadow-lg bg-white">
                            <h3 className="text-xl font-semibold">{project.name}</h3>
                            <h4 className="text-lg font-bold mb-2 text-blue-800">SubTasks status</h4>
                            <p>Completed Tasks: {project.completedTasks}</p>
                            <p>Ongoing Tasks: {project.ongoingTasks}</p>
                            <p>Tasks Beyond Deadline: {project.delayedTasks}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Task Distribution</h2>
                    <Pie data={data} />
                </div>
            </div>
        </div>
    );
};

export default OngoingStatusPage;
