import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AddTaskModal from '../components/AddTaskModal/AddTaskModal';
import { projectData, Task, teamMembers } from '../utils/data';
import { loadFromLocalStorage } from '../stores/taskStore';
import FilterSection from '../components/FilterSection/FilterSection';
import { useParams } from 'react-router-dom';
import TaskList from '../components/TaskList/Tasklist';
import TaskManagement from '../components/TaskManagement/TaskManagement';
import GanttChart from '../components/GanttChart/GanttChart';

const ProjectDetails = () => {
  const { id } = useParams(); 
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dueDateFilter, setDueDateFilter] = useState<string>('');
  const [assigneeFilter, setAssigneeFilter] = useState<string>(''); 
  const [priorityFilter, setPriorityFilter] = useState<string>(''); // New state for priority filter
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
    setPriorityFilter(''); 
    loadTasks(); 
  };

  const filteredTasks:any = tasks.filter((task: any) => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (statusFilter && task.status !== statusFilter) return false;
    if (dueDateFilter && task.dueDate !== dueDateFilter) return false;
    if (assigneeFilter && task.assignee !== assigneeFilter) return false;
    if (priorityFilter && task.priority !== priorityFilter) return false; 
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
      <div className="container mx-auto mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>
            <button 
              className="flex items-center bg-teal-500 hover:bg-teal-600 text-white rounded-lg h-10 px-4 py-2 border-none cursor-pointer "
              onClick={showModal}
            >
              <FaPlus className="mr-2" /> Add Task
            </button>
          </div>

          <p className="text-gray-600 my-8">{description}</p>

          <div className="mt-10 mb-4">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <FilterSection
            statusFilter={statusFilter}
            dueDateFilter={dueDateFilter}
            assigneeFilter={assigneeFilter}
            priorityFilter={priorityFilter} 
            assignees={teamMembers}
            setSearchQuery={setSearchQuery}
            setStatusFilter={setStatusFilter}
            setDueDateFilter={setDueDateFilter}
            setAssigneeFilter={setAssigneeFilter}
            setPriorityFilter={setPriorityFilter} 
            onResetFilters={resetFilters} 
          />

        

          <TaskList filteredTasks={filteredTasks} onTaskAdded={handleAddTask} id={id} />
          <TaskManagement tasks={filteredTasks} onTaskAdded={handleAddTask} />

          <GanttChart filteredTasks={filteredTasks} />

         
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
