import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Card = ({ name, members, status, link }) => {
    const navigate = useNavigate();

    const handleStatusClick = () => {
        if (link) {
            navigate(link);
        }
    };

    return (
        
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
            <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2">{name}</div>
                <p className="text-gray-700 text-sm">
                    Members: {members}
                </p>
                <p
                    className={`text-sm font-semibold cursor-pointer ${status === 'Ongoing' ? 'text-yellow-500' : 'text-green-500'}`}
                    onClick={handleStatusClick}
                >
                    Status: {status}
                </p>
            </div>
        </div>
    );
};

const ProjectsPage = () => {
    const projects = [
        { name: 'Project 1', members: 10, status: 'Ongoing', link: '/statuspage' },
        { name: 'Project 2', members: 8, status: 'Ongoing' },
        { name: 'Project 3', members: 5, status: 'Completed' },
        { name: 'Project 4', members: 7, status: 'Completed' },
        { name: 'Project 5', members: 12, status: 'Completed' },
        { name: 'Project 6', members: 6, status: 'Completed' },
        { name: 'Project 7', members: 9, status: 'Completed' },
    ];

    return (
        <div className='flex'>
        <Sidebar type="admin"/>
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <Card key={index} name={project.name} members={project.members} status={project.status} link={project.link} />
                ))}
            </div>
        </div>
        </div>
    );
};

export default ProjectsPage;