import { useState } from 'react';

function Navbar({ activeView, setActiveView, currentUser, onAuthModalOpen, onSignOut }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  return (
    <nav className="bg-gray-900 border-b border-gray-800 py-2 px-4 flex items-center">
      {/* Logo */}
      <div 
        className="text-purple-500 font-bold text-xl cursor-pointer flex items-center mr-6"
        onClick={() => setActiveView('browse')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 mr-2 fill-current">
          <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8 s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z" />
          <path d="M8,7v10l9-5L8,7z M10,9.9l3.9,2.1L10,14.1V9.9z" />
          <path d="M13,16h2v2h-2V16z M15,8h2v6h-2V8z" />
        </svg>
        StreamLive
      </div>
      
      {/* Navigation Links */}
      <div className="space-x-4 hidden md:flex">
        <button 
          className={`px-3 py-1.5 rounded hover:bg-gray-800 ${activeView === 'browse' ? 'text-white' : 'text-gray-400'}`}
          onClick={() => setActiveView('browse')}
        >
          Browse
        </button>
        <button 
          className={`px-3 py-1.5 rounded hover:bg-gray-800 ${activeView === 'following' ? 'text-white' : 'text-gray-400'}`}
          onClick={() => setActiveView('following')}
        >
          Following
        </button>
      </div>
      
      {/* Search */}
      <div className="relative mx-4 flex-1 max-w-xl">
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full px-4 py-1.5 pl-10 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Auth/Profile */}
      {currentUser ? (
        <div className="relative">
          <button 
            className="flex items-center space-x-2"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img src={currentUser.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            <span className="hidden md:block text-white">{currentUser.username}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
              <div className="py-1">
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  onClick={() => {
                    setActiveView('channel');
                    setShowUserMenu(false);
                  }}
                >
                  Channel
                </button>
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  onClick={() => {
                    // Handle settings
                    setShowUserMenu(false);
                  }}
                >
                  Settings
                </button>
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  onClick={() => {
                    onSignOut();
                    setShowUserMenu(false);
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <button 
            className="px-3 py-1 text-gray-200 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md"
            onClick={() => onAuthModalOpen('signin')}
          >
            Log In
          </button>
          <button 
            className="px-3 py-1 text-white bg-purple-600 hover:bg-purple-700 rounded-md"
            onClick={() => onAuthModalOpen('signup')}
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
