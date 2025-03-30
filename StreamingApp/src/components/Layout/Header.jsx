import { useState, useEffect, useRef } from 'react';
import { MOCK_RECOMMENDED_CHANNELS } from '../../data/mockData';
import ReliableProfile from '../UI/ReliableProfile';

function Header({ activeView, setActiveView, currentUser, onAuthModalOpen, onSignOut }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const searchInputRef = useRef(null);
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);
  
  // Listen for scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Focus search input when activated
  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 will-change-[background-color,box-shadow] ${
      isScrolled ? 'bg-black shadow-lg' : 'bg-black/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => setActiveView('browse')} className="font-bold text-xl text-white group">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">Streamy</span>
            </button>
          </div>
          
          {/* Navigation */}
          <div className="hidden md:flex space-x-1">
            <NavButton 
              text="Browse" 
              isActive={activeView === 'browse'} 
              onClick={() => setActiveView('browse')} 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
              } 
            />
            <NavButton 
              text="Following" 
              isActive={activeView === 'following'} 
              onClick={() => setActiveView('following')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              }
            />
          </div>
          
          {/* Search and User Actions */}
          <div className="flex items-center">
            {/* Search */}
            <div className="relative mr-4">
              {isSearchActive ? (
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md text-sm w-60 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    onBlur={() => {
                      if (!searchQuery) {
                        setIsSearchActive(false);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setSearchQuery('');
                        setIsSearchActive(false);
                      }
                    }}
                  />
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchActive(true)}
                  className="flex items-center justify-center h-9 w-9 rounded-md text-gray-400 hover:bg-gray-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* User Section */}
            {currentUser ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative flex items-center space-x-2 transition-all duration-300 rounded-full"
                >
                  <ReliableProfile
                    user={currentUser}
                    size="sm"
                    className="border-2 border-transparent hover:border-purple-500 transition-colors"
                  />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-900 rounded-md shadow-xl border border-gray-800 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-gray-800">
                      <p className="text-sm text-white font-medium truncate">{currentUser.username}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setActiveView('channel');
                      }}
                      className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Your Channel
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onSignOut();
                      }}
                      className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zM2 4a2 2 0 012-2h9.586a1 1 0 01.707.293l5 5A1 1 0 0120 8v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        <path d="M5 9V7a3 3 0 116 0v2h-1V7a2 2 0 10-4 0v2H5z" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onAuthModalOpen('signin')}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                <span>Sign In</span>
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <div className="ml-4 md:hidden relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center h-9 w-9 rounded-md text-gray-400 hover:bg-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-900 rounded-md shadow-xl border border-gray-800 animate-fadeIn">
                  <button
                    onClick={() => {
                      setActiveView('browse');
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    Browse
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('following');
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Following
                  </button>
                  {currentUser && (
                    <button
                      onClick={() => {
                        setActiveView('channel');
                        setIsMenuOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Your Channel
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Navigation button component
function NavButton({ text, isActive, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-150 flex items-center space-x-2 ${
        isActive 
          ? 'bg-purple-600 text-white' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

export default Header;
