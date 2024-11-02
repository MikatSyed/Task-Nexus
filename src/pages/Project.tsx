"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectData } from "../utils/data";


const Project = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(4);

  // Get the current page of projects
  const currentPageProjects: any[] = projectData.projects.slice(
    (page - 1) * size,
    page * size
  );

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Project Dashboard</h2>
        <div>
          {/* Add a button to reset filters or reload the page if needed */}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentPageProjects.map((project:any) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-bold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span
                className={`text-sm font-medium ${
                  project.status === "Completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {project.status}
              </span>
              <span className="text-sm text-gray-500">
                Due: {new Date(project.dueDate).toLocaleDateString()}
              </span>
            </div>
            <div className="mt-3 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-teal-500 h-2.5 rounded-full"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <button
           
              className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-1 px-3 rounded"
            >
              View Project
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Project;
