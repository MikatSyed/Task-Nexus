import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { MdOutlineAddTask } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import { useTaskStore } from '../../stores/taskStore';
import FormInput from '../Forms/FormInput';
import FormTextArea from '../Forms/FormTextArea';
import FormDatePicker from '../Forms/FormDatePicker';
import Form from '../Forms/Form';
import toast from 'react-hot-toast';

interface AddTaskModalProps {
  title: string;
  visible: boolean;
  onCancel: () => void;
  projectId: string | undefined;
  members: string[];
  onTaskAdded: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ 
  title, 
  visible, 
  onCancel, 
  projectId, 
  members, 
  onTaskAdded 
}) => {
  const [assignee, setAssignee] = useState<string>('');
  const addTask = useTaskStore((state) => state.addTask);

  const onSubmit = async (values: any) => {
    const newTask = {
      ...values,
      status: 'To Do',
      serviceId: projectId,
      isCompleted: false,
      assignee: assignee,
    };
    const toastId = toast.loading('Posting...')
    try {
      await addTask(newTask);
      onTaskAdded();
      onCancel();
    } catch (err: any) {
      console.error('Error adding task:', err.message);
    }finally{
      toast.dismiss(toastId)
    }
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

      <Form submitHandler={onSubmit}>
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
            className="mt-2 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-gray-700"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="">All Assignees</option>
            {members.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mb-4">
          <FormDatePicker name="dueDate" label="Due Date" />
        </div>

        <button
          type="submit"
          className="mt-4 py-2 px-4 rounded-md font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors duration-300 w-full"
        >
          Add Task
        </button>
      </Form>
    </ReactModal>
  );
};

export default AddTaskModal;
