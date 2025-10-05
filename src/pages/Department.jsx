import React from "react";
import { useParams } from "react-router";

const Department = () => {
    const { department } = useParams();

    const formatDepartmentName = (departmentName) => {
        const nameWithSpaces = departmentName.replace(/-/g, " ");

        const capitalizedName = nameWithSpaces
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        return capitalizedName;
    };

    const departmentData = {
        name: formatDepartmentName(department),
        info: "",
        upcomingProjects: [],
        ongoingProjects: [],
        pastProjects: [],
        members: [],
        departmentHead: "",
        departmentSupervisor: "",
    };

    return (
        <div className="p-8 bg-gray-100">
            <div className="bg-white p-6 rounded shadow mb-6">
                <h1 className="text-3xl font-bold mb-4">
                    {departmentData.name}
                </h1>
                <p className="text-gray-700 mb-4">{departmentData.info}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">
                            Upcoming Projects
                        </h2>
                        <ul className="list-disc pl-5">
                            {departmentData.upcomingProjects.map(
                                (project, index) => (
                                    <li key={index} className="mb-2">
                                        {project}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">
                            Ongoing Projects
                        </h2>
                        <ul className="list-disc pl-5">
                            {departmentData.ongoingProjects.map(
                                (project, index) => (
                                    <li key={index} className="mb-2">
                                        {project}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">
                            Past Projects
                        </h2>
                        <ul className="list-disc pl-5">
                            {departmentData.pastProjects.map(
                                (project, index) => (
                                    <li key={index} className="mb-2">
                                        {project}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded shadow mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Department Details
                </h2>
                <p className="mb-2">
                    <strong>Department Head:</strong>{" "}
                    {department.departmentHead}
                </p>
                <p className="mb-2">
                    <strong>Department Supervisor:</strong>{" "}
                    {department.departmentSupervisor}
                </p>
                <p className="mb-2">
                    <strong>Members:</strong>{" "}
                    {departmentData.members.join(", ")}
                </p>
            </div>
        </div>
    );
};

export default Department;
