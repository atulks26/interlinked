import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OngoingStatusPage = () => {
    const ongoingProjects = [
        { name: 'Project 1', completedTasks: 5, ongoingTasks: 3 },
        { name: 'Project 2', completedTasks: 7, ongoingTasks: 2 },
    ];

    const totalCompletedTasks = ongoingProjects.reduce((total, project) => total + project.completedTasks, 0);
    const totalOngoingTasks = ongoingProjects.reduce((total, project) => total + project.ongoingTasks, 0);

    const data = {
        labels: ['Completed Tasks', 'Ongoing Tasks'],
        datasets: [
            {
                data: [totalCompletedTasks, totalOngoingTasks],
                backgroundColor: ['#4caf50', '#ffeb3b'],
            },
        ],
    };

    useEffect(() => {
        // Cleanup code if necessary
        return () => {
            // Perform any necessary cleanup here
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Ongoing Projects Status</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Project Tasks</h2>
                    {ongoingProjects.map((project, index) => (
                        <div key={index} className="mb-4 p-4 rounded shadow-lg bg-white">
                            <h3 className="text-xl font-semibold">{project.name}</h3>
                            <p>Completed Tasks: {project.completedTasks}</p>
                            <p>Ongoing Tasks: {project.ongoingTasks}</p>
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
