import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const Header = () => {
  const { userData, isDarkMode, toggleDarkMode, openGoalModal } = useDashboard();
  const [showMenu, setShowMenu] = useState(false);
  
  const toggleMenu = () => setShowMenu(!showMenu);
  
  return (
    <header className={`py-4 border-b ${isDarkMode ? 'border-[#1E3E62]/50 bg-[#050C15]' : 'border-gray-200 bg-white'} relative z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`font-heading font-bold text-xl ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
              FitTracker
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-[#0F2742] hover:bg-[#1E3E62]' : 'bg-gray-100 hover:bg-gray-200'
              } transition-colors duration-300`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* User menu */}
            <div className="relative">
              <button 
                onClick={toggleMenu}
                className="flex items-center space-x-2 focus:outline-none"
                aria-label="User menu"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                  isDarkMode ? 'from-[#FF6500] to-[#FF8533]' : 'from-[#261FB3] to-[#5C56D4]'
                } flex items-center justify-center text-white font-bold font-sans`}>
                  {userData?.name?.charAt(0) || 'U'}
                </div>
              </button>
              
              {showMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                  isDarkMode ? 'bg-[#0B192C] border border-[#1E3E62]/50' : 'bg-white'
                } ring-1 ring-black ring-opacity-5 py-1 z-50`}>
                  <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-[#1E3E62]/50' : 'border-gray-200'}`}>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {userData?.name || 'User'}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {userData?.email || 'user@example.com'}
                    </p>
                  </div>
                  <a href="#" 
                    className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-[#1E3E62]/50' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    Profile
                  </a>
                  <a href="#" 
                    className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-[#1E3E62]/50' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => {
                      openGoalModal();
                      setShowMenu(false);
                    }}
                  >
                    Add New Goal
                  </a>
                  <a href="#" 
                    className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-[#1E3E62]/50' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    Settings
                  </a>
                  <a href="#" 
                    className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-red-400 hover:bg-[#1E3E62]/50' : 'text-red-600 hover:bg-gray-100'}`}
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
