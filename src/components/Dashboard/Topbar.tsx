// src/components/Topbar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX, FiBell } from 'react-icons/fi';
import { TfiWorld } from 'react-icons/tfi';
import { useClickAway } from 'react-use';
import { Link, useNavigate } from 'react-router-dom';



interface TopbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

interface UserData {
  photoURL?: string;
}

const Topbar: React.FC<TopbarProps> = ({ isSidebarOpen, onToggleSidebar }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useClickAway(profileMenuRef, () => {
    setIsProfileOpen(false);
  });



  const toggleProfileMenu = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogout = () => {

    setUserData(null);
    navigate('/');
  };

  return (
    <header className="bg-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <button className="mr-3 md:hidden" onClick={onToggleSidebar}>
            {isSidebarOpen ? <FiX className="w-7 h-7 text-blue-600" /> : <FiMenu className="w-7 h-7 text-blue-600" />}
          </button>
          <Link to="/" className="hidden md:block">
            <div className="flex items-center space-x-3">
              {/* Add logo or other content here if needed */}
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/">
            <button className="p-2 rounded-full hover:text-blue-600 text-gray-500 flex items-center text-sm">
              <TfiWorld className="w-4 h-4 mr-2" />
              <span className="text-xs">View Site</span>
            </button>
          </Link>

          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              ref={profileButtonRef}
              className="flex items-center space-x-2 focus:outline-none"
              tabIndex={0}
            >
              <div className="w-11 h-11 relative rounded-full overflow-hidden">
                <img
                  src='https://via.placeholder.com/44'
                  alt="User"
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </button>
            {isProfileOpen && (
              <div
                ref={profileMenuRef}
                className="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
              >
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Profile
                </Link>
                <div className="border-t border-gray-200"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm cursor-pointer text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;