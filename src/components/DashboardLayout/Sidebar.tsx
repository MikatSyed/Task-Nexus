// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDashboard, MdExitToApp } from 'react-icons/md';
import { FiCheckSquare, FiX } from 'react-icons/fi';


interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string>(''); 

  const handleLogout = () => {

   
    navigate('/');
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (isOpen) {
      onToggle();
    }
  };

  return (
    <div
      className={`fixed md:relative inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0 z-50' : '-translate-x-full z-40'
      } md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
     

<div className="text-center py-5 px-4 border-b border-gray-700 relative">
  <h2 className="flex items-center justify-start space-x-2 text-2xl font-semibold italic text-white">
    <FiCheckSquare className="text-white" size={28} />
    <span>Task Nexus</span>
  </h2>
  <button
    onClick={onToggle}
    className="absolute top-4 right-4 text-white hover:text-gray-200 md:hidden"
  >
    <FiX size={24} />
  </button>
</div>

        <nav className="mt-6 flex-1">
          <ul>
        
            <li>
              <Link
                to="/"
                className={`flex items-center p-4 hover:text-teal-500 mx-2 ${
                  activeItem === 'project' ? 'bg-gray-700 rounded-md mx-2  p-4' : ''
                }`}
                onClick={() => handleItemClick('project')}
              >
                <MdDashboard className="text-lg mr-3" />
                <span>Project</span>
              </Link>
            </li>
         
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg flex items-center justify-center"
            onClick={handleLogout}
          >
            <MdExitToApp className="text-lg mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
