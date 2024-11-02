import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { MdOutlineAddTask } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import { loadFromLocalStorage, useTaskStore } from '../../stores/taskStore';
import FormInput from '../Forms/FormInput';
import FormTextArea from '../Forms/FormTextArea';
import FormDatePicker from '../Forms/FormDatePicker';
import Form from '../Forms/Form';
import { Task } from '../../utils/data';
import toast from 'react-hot-toast';

interface AddTaskModalProps {
  title: string;
  visible: boolean;
  onCancel: () => void;
  projectId: string | undefined;
  taskId: string | undefined | null;
  members: string[];
  onTaskAdded: () => void;
}

const UpdateTaskModal: React.FC<AddTaskModalProps> = ({
  title,
  visible,
  onCancel,
  projectId,
  taskId,
  members,
  onTaskAdded
}) => {
  const loadedTasks: Task[] = loadFromLocalStorage('tasks', []);
  const task: any = loadedTasks.find((task: any) => task.id === taskId);
  
  const [assignee, setAssignee] = useState<string>(task?.assignee);
  const [priority, setPriority] = useState<string>(task?.priority || ''); // State for priority

  const onSubmit = async (values: any) => {
    values.assignee = assignee;
    values.priority = priority; // Include priority in the values
    values.status = values.status || task?.status;
    values.serviceId = projectId;
    const toastId = toast.loading('Updating...');
    try {
      useTaskStore.getState().updateTask(task?.id, values);
      onTaskAdded();
      toast.success("Task Updated Successfully");
      onCancel();
    } catch (err: any) {
      toast.error('Failed to update task. Please try again.');
      onCancel();
    } finally {
      toast.dismiss(toastId);
    }
  };

  const defaultValues = {
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate || '',
  };

  return (
    <ReactModal
      isOpen={visible}
      onRequestClose={onCancel}
      overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
      className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg mx-auto outline-none"
      ariaHideApp={false}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-teal-600 font-semibold text-xl">
          <MdOutlineAddTask className="mr-2" size={22} />
          {title}
        </div>
        <button onClick={onCancel}>
          <CgClose className="text-teal-600" size={20} />
        </button>
      </div>

      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div className="w-full mb-4">
          <FormInput name="title" label="Title" className="w-full" />
        </div>

        <div className="w-full mb-4">
          <FormTextArea
            name="description"
            label="Description"
            rows={4}
            className="w-full"
          />
        </div>

        <div className="w-full mb-4">
          <label
            htmlFor="assignee"
            className="block text-sm font-medium text-gray-600"
          >
            Assignee
          </label>
          <select
            id="assignee"
            name="assignee"
            className="mt-2 w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-gray-700"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="">Select Assignee</option>
            {members.map((member: string) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-4">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-600"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            className="mt-2 w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-gray-700"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="w-full mb-4">
          <FormDatePicker name="dueDate" label="Due Date" />
        </div>

        <button
          type="submit"
          className="mt-4 py-2 px-4 rounded-md font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-300 w-full"
        >
          Save Changes
        </button>
      </Form>
    </ReactModal>
  );
};

export default UpdateTaskModal;
