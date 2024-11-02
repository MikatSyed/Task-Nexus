
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddTaskModal from '../components/AddTaskModal/AddTaskModal';
import { projectData, Task, teamMembers } from '../utils/data';
import { loadFromLocalStorage } from '../stores/taskStore';
import FilterSection from '../components/FilterSection/FilterSection';
import { useParams } from 'react-router-dom';
import TaskList from '../components/TaskList/Tasklist';






const ProjectDetails = () => {
  const { id } = useParams(); 
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dueDateFilter, setDueDateFilter] = useState<string>('');
  const [assigneeFilter, setAssigneeFilter] = useState<string>(''); 
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const currentProject = projectData.projects.find(project => project.id === id);
  
  if (!currentProject) {
    return <div className="text-center">Project not found</div>;
  }

  const { title, description } = currentProject;

  useEffect(() => {
    loadTasks();
  }, [id]);

  const loadTasks = () => {
    const loadedTasks: Task[] = loadFromLocalStorage('tasks', []);
    const projectTasks = loadedTasks.filter(task => task.serviceId === id);
    setTasks(projectTasks);
  };

  const handleAddTask = () => {
    loadTasks(); // Reload tasks after adding
  };

  const resetFilters = () => {
    setStatusFilter('');
    setDueDateFilter('');
    setAssigneeFilter('');
    loadTasks(); // Reload all tasks
  };

  const filteredTasks = tasks.filter((task:any) => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (statusFilter && task.status !== statusFilter) return false;
    if (dueDateFilter && task.dueDate !== dueDateFilter) return false;
    if (assigneeFilter && task.member !== assigneeFilter) return false;
    return true;
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <AddTaskModal
        title="Create a New Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        projectId={id}
        members={teamMembers}
        onTaskAdded={handleAddTask}
      />
      <div className="container mx-auto ">
        <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
  <button 
    className="flex items-center bg-teal-600 hover:bg-teal-700 text-white rounded-lg h-10 px-4 py-2 border-none cursor-pointer transition duration-200 ease-in-out transform hover:scale-105"
    onClick={showModal}
  >
    <FaPlus className="mr-2" /> Add Task
  </button>
</div>

          <p className="text-gray-600 mb-4">{description}</p>

          <FilterSection
            statusFilter={statusFilter}
            dueDateFilter={dueDateFilter}
            assigneeFilter={assigneeFilter}
            assignees={teamMembers}
            setSearchQuery={setSearchQuery}
            setStatusFilter={setStatusFilter}
            setDueDateFilter={setDueDateFilter}
            setAssigneeFilter={setAssigneeFilter}
            onResetFilters={resetFilters} 
          />

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TaskList filteredTasks={filteredTasks} onTaskAdded={handleAddTask} />
        

         
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
