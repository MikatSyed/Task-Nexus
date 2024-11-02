"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectData } from "../utils/data";
import Pagination from "../components/Pagination/Pagination";
import ProjectCard from "../components/ProjectCard/ProjectCard";


const Project = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(4);

  const totalPages = Math.ceil(projectData.projects.length / size);

 
  const handleAddProjectPhases = async (projectId: string) => {
    const isFirstVisit = !localStorage.getItem(`projectPhasesAdded_${projectId}`);

    if (isFirstVisit && projectId) {
      localStorage.setItem(`projectPhasesAdded_${projectId}`, "true");
      navigate(`/dashboard/project/view/${projectId}`);
    } else {
      navigate(`/dashboard/project/view/${projectId}`);
    }
  };

  const currentPageProjects = projectData.projects.slice(
    (page - 1) * size,
    page * size
  );

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Project Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentPageProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onViewProject={handleAddProjectPhases}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Project;
