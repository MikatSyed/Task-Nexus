"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectData, projectPhases } from "../utils/data";
import Pagination from "../components/Pagination/Pagination";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import { useTaskStore } from "../stores/taskStore";


const Project = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(4);

  const totalPages = Math.ceil(projectData.projects.length / size);
  const addTask = useTaskStore((state) => state.addTask);
  const tasks = useTaskStore((state) => state.tasks);

 
  const handleAddProjectPhases = async (projectId: string) => {
    const isFirstVisit = !localStorage.getItem(`projectPhasesAdded_${projectId}`);

    if (isFirstVisit && projectId) {
      // Use projectId to define the desired serviceId
      const desiredServiceId = projectId; // This assumes projectId directly corresponds to serviceId
    
      for (const phase of projectPhases) {
        // Check if the phase's serviceId matches the desiredServiceId and if a task already exists
        const taskExists = tasks.some((task: any) => task.id === phase.id);
        if (!taskExists && phase.serviceId === desiredServiceId) {
          await addTask(phase as any); // Add the phase as a task if it does not already exist
        }
      }
    
      // Mark that the project phases were added for this projectId
      localStorage.setItem(`projectPhasesAdded_${projectId}`, "true"); 
      // Redirect to the project view
      navigate(`/dashboard/project/view/${projectId}`);
    } else {
      // Redirect to the project view if not the first visit or projectId is not set
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
