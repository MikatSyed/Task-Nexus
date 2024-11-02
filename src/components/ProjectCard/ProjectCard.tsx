import React from "react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    status: string;
    priority: string;
    progress: number;
    dueDate: string;
    teamMembers: string[];
    budget: number;
  };
  onViewProject: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewProject }) => {
  // Helper function to format date
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-sm font-medium ${
            project.status === "Completed"
              ? "text-green-600"
              : project.status === "In Progress"
              ? "text-yellow-600"
              : "text-gray-600"
          }`}
        >
          {project.status}
        </span>
        <span
          className={`text-sm font-medium ${
            project.priority === "High"
              ? "text-red-600"
              : project.priority === "Medium"
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {project.priority} Priority
        </span>
      </div>
      <div className="text-gray-600 text-sm mb-2">
        <strong>Due:</strong> {formatDate(project.dueDate)}
      </div>
      <div className="text-gray-600 text-sm mb-2">
        <strong>Team:</strong> {project.teamMembers.join(", ")}
      </div>
      <div className="flex items-center mb-3">
        <span className="text-gray-500 text-xs">{project.progress}% Completed</span>
        <div className="ml-2 bg-gray-200 rounded-full h-2.5 flex-grow">
          <div
            className="bg-teal-500 h-2.5 rounded-full"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
      <button
        onClick={() => onViewProject(project.id)}
        className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded "
      >
        View Project
      </button>
    </div>
  );
};

export default ProjectCard;
