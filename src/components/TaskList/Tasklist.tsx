import React, { useState } from 'react';
import { BiBookmark, BiEditAlt } from 'react-icons/bi';
import { FaBookmark } from 'react-icons/fa';
import { FiClock, FiUser } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { useTaskStore } from '../../stores/taskStore';
import { Link } from 'react-router-dom';
import UpdateTaskModal from '../UpdateTaskModal/UpdateTaskModal';
import { teamMembers } from '../../utils/data';
import { Toaster } from 'react-hot-toast';

const TaskList = ({ filteredTasks, onTaskAdded ,id}: any) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    const tasksPerPage = 2; 

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const toggleCompletion = (taskId: number) => {
        useTaskStore.getState().toggleIsComplete(taskId);
        onTaskAdded();
    };

    const deleteTask = (taskId: number) => {
        useTaskStore.getState().deleteTask(taskId);
        onTaskAdded();
    };

    // Paginated tasks based on the current page
    const paginatedTasks = filteredTasks.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage
    );
    const showModal = (taskId: string) => {
        setSelectedTaskId(taskId);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTaskId(null);
    };


    return (
        <div className="">
               <Toaster position="top-center" reverseOrder={false} />
             <UpdateTaskModal
                title="Edit Task"
                visible={isModalVisible}
                onCancel={handleCancel}
                projectId={id}
                members={teamMembers}
                onTaskAdded={onTaskAdded}
                taskId={selectedTaskId}
            />

        {filteredTasks.length > 0  && <h2 className="text-3xl font-bold mb-8 text-gray-800">Tasks</h2>}

            {filteredTasks.length === 0 ? (
                <div className="text-center text-gray-600 py-10">
                    <p className="text-lg">No tasks available. Please add a task.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-10">
                {paginatedTasks.map((task: any) => (
                    <div
                        key={task._id}
                        className="bg-white rounded-lg shadow-md border border-gray-100 p-4 relative hover:shadow-lg"
                    >
                        {/* Task Title and Completion Toggle */}
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{task.title}</h3>
                                <div
                                    className={`ml-0 sm:ml-4 mt-2 inline-block ${
                                        task.status === 'To Do'
                                            ? 'bg-blue-500 text-white'
                                            : task.status === 'In Progress'
                                            ? 'bg-yellow-500 text-white'
                                            : task.status === 'Done'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-300 text-gray-700'
                                    } rounded-full text-xs sm:text-sm px-2 sm:px-3 py-1`}
                                >
                                    {task.status}
                                </div>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
                                {task.isCompleted ? (
                                    <FaBookmark
                                        size={28}
                                        className="text-teal-600 cursor-pointer hover:text-teal-400"
                                        onClick={() => toggleCompletion(task.id)}
                                    />
                                ) : (
                                    <BiBookmark
                                        size={28}
                                        className="text-teal-600 cursor-pointer hover:text-teal-400"
                                        onClick={() => toggleCompletion(task.id)}
                                    />
                                )}
                            </div>
                        </div>
            
                     
                        <p className="text-gray-600 mb-6 text-base leading-relaxed">{task.description}</p>
            
                     
                        <div>
                            <p className="text-base text-gray-700 font-semibold flex items-center mb-3">
                                <FiUser className="mr-2 text-gray-600" />
                                Assign To: <span className="text-gray-600 font-normal ml-2">{task?.assignee}</span>
                            </p>
                        </div>
                        <div className="mb-6">
                            <p className="text-base text-gray-700 font-semibold flex items-center mb-3">
                                <FiClock className="mr-2 text-gray-600" />
                                Due Date: <span className="text-gray-600 font-normal ml-2">
                                    {new Date(task.dueDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </p>
                        </div>
            
                        <div className="flex justify-end space-x-3">
                         
                                <button onClick={() => showModal(task.id)} className="flex items-center justify-center rounded-lg bg-teal-500 text-white px-3 py-2 text-sm font-semibold border-none hover:bg-teal-500">
                                    <BiEditAlt className="mr-1" />
                                    Edit
                                </button>
                            
                            <button
                                className="flex items-center justify-center rounded-lg bg-red-600 text-white px-3 py-2 text-sm font-semibold border-none hover:bg-red-500"
                                onClick={() => deleteTask(task.id)}
                            >
                                <MdDelete className="mr-1" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            
            )}

            {/* Pagination Controls */}
            {filteredTasks.length > 0 && (
  <div className="flex justify-center my-8 space-x-2">
    <button
      className={`px-4 py-2 rounded-md transition-colors duration-300 
        ${currentPage === 1 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-teal-500 text-white hover:bg-teal-500'
        }`}
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>

    {/* Page Number Buttons */}
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        className={`mx-1 px-3 py-2 rounded-md transition-colors duration-300 
          ${currentPage === index + 1 
            ? 'bg-teal-500 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-teal-500 hover:text-white'
          }`}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    ))}

    <button
      className={`px-4 py-2 rounded-md transition-colors duration-300 
        ${currentPage === totalPages 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-teal-500 text-white hover:bg-teal-500'
        }`}
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
)}

        </div>
    );
};

export default TaskList;
