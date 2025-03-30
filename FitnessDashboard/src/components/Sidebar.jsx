import React from 'react';
import { useDashboard } from '../context/DashboardContext';

const Sidebar = () => {
  const { currentPage, setCurrentPage, isDarkMode, userData } = useDashboard();

  // Replace emoji icons with SVG icons and add descriptions
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      id: 'workouts', 
      label: 'Workouts',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      )
    },
    { 
      id: 'challenges', 
      label: 'Challenges',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    },
    { 
      id: 'achievements', 
      label: 'Achievements',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 'nutrition', 
      label: 'Nutrition',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: 'settings', 
      label: 'Settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
  };

  return (
    <aside className={`h-full w-64 ${isDarkMode ? 'bg-[#0B192C]/90' : 'bg-white/90'} backdrop-blur-md ${isDarkMode ? 'border-r border-[#1E3E62]/50' : 'border-r border-gray-200'} flex flex-col`}>
      {/* Logo and user profile section - now horizontal */}
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-[#1E3E62]/50">
        <div className={`w-10 h-10 rounded-full ${
          isDarkMode ? 'bg-gradient-to-r from-[#FF6500] to-[#FF8533]' : 'bg-gradient-to-r from-[#261FB3] to-[#5C56D4]'
        } flex items-center justify-center text-white text-xl mr-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
            {userData?.name?.split(' ')[0] || 'User'}
          </h2>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Premium Member
          </p>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
              currentPage === item.id
                ? (isDarkMode ? 'bg-[#FF6500]/10 text-[#FF6500]' : 'bg-[#261FB3]/10 text-[#261FB3]')
                : (isDarkMode ? 'text-gray-300 hover:bg-[#1E3E62]/30' : 'text-gray-700 hover:bg-gray-100')
            } group`}
          >
            <span className={`mr-3 transition-transform duration-300 group-hover:scale-110 ${
              currentPage === item.id ? 'animate-pulse' : ''
            }`}>
              {item.icon}
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 mt-auto">
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#1E3E62]/30' : 'bg-[#F8F7FF]'}`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Need help with your fitness journey?
          </p>
          <button 
            className={`mt-2 px-4 py-2 w-full rounded-lg text-white text-sm font-medium ${
              isDarkMode ? 'bg-[#FF6500] hover:bg-[#FF8533]' : 'bg-[#261FB3] hover:bg-[#5C56D4]'
            } transition-colors relative overflow-hidden group`}
          >
            <span className="relative z-10">Contact Coach</span>
            <div className={`absolute inset-0 h-full w-0 ${
              isDarkMode ? 'bg-[#FF8533]' : 'bg-[#5C56D4]'
            } transition-all duration-300 group-hover:w-full`}></div>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
