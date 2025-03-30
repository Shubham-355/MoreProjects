import { useState, useEffect } from 'react';
import InteractiveFeatures from './InteractiveFeatures';
import DonationPanel from './DonationPanel';
import CreatorTools from './CreatorTools';
import { MagneticButton, GlowButton, JiggleButton, RippleButton } from '../UI/AnimatedButtons';

function StreamTabs({ stream, currentUser, onFollow, followedChannels, onAuthModalOpen }) {
  const [activeTab, setActiveTab] = useState('about');
  const [tabAnimation, setTabAnimation] = useState('');
  const [animateContent, setAnimateContent] = useState(false);
  
  // Change tab with animation
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    
    setTabAnimation('tab-exit');
    
    setTimeout(() => {
      setActiveTab(tab);
      setTabAnimation('tab-enter');
      setAnimateContent(true);
      
      setTimeout(() => {
        setTabAnimation('');
        setTimeout(() => setAnimateContent(false), 1000);
      }, 400);
    }, 200);
  };
  
  // Reset active tab when stream changes
  useEffect(() => {
    setActiveTab('about');
  }, [stream?.id]);
  
  // Tab definitions
  const tabs = [
    { id: 'about', label: 'About', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    )},
    { id: 'interactive', label: 'Interactive', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    )},
    { id: 'donate', label: 'Donate', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
      </svg>
    )},
  ];
  
  // Add creator tools tab if this is the user's channel
  if (currentUser && currentUser.username === stream?.streamer.name) {
    tabs.push({ 
      id: 'creator', 
      label: 'Creator Tools', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      )
    });
  }

  // Tab content - About section handling null stream
  const renderAboutContent = () => {
    if (!stream) {
      return <div className="text-gray-400 p-4">Stream information unavailable</div>;
    }
    
    return (
      <div className={`${animateContent ? 'animate-fade-in' : ''}`}>
        <div className="mb-4">
          <h3 className="text-white font-bold mb-3 flex items-center">
            <span className="w-1 h-5 bg-purple-500 rounded-full mr-2"></span>
            About this Stream
          </h3>
          <p className="text-gray-300 leading-relaxed">{stream.description || "Join me for an awesome stream! Don't forget to follow for more content like this. I stream regularly and love interacting with my viewers!"}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Stream Stats - Enhanced with glass morphism */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 shadow-lg">
            <h4 className="text-white font-medium mb-3 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Stream Stats
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Started
                </span>
                <span className="text-white font-medium">{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Viewers
                </span>
                <span className="text-white font-medium">{stream.viewers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Category
                </span>
                <span className="text-purple-400 font-medium">{stream.game}</span>
              </div>
            </div>
          </div>
          
          {/* Tags Section - Enhanced with animations */}
          <div className="bg-gradient-to-bl from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 shadow-lg">
            <h4 className="text-white font-medium mb-3 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {stream.tags && stream.tags.map((tag, idx) => (
                <span 
                  key={tag} 
                  className="bg-purple-900/30 hover:bg-purple-800/50 px-2 py-1 rounded-full text-xs text-purple-200 cursor-pointer transition-all duration-300 hover:scale-105 border border-purple-700/30"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Action Buttons - Enhanced with creative animations */}
        <div className="flex flex-wrap gap-3 mt-6">
          {currentUser ? (
            <GlowButton
              onClick={() => onFollow && stream?.streamer?.id && onFollow(stream.streamer.id)}
              className="flex-1"
            >
              {followedChannels && stream?.streamer?.id && 
               followedChannels.some(c => c.id === stream.streamer.id) ? 'Unfollow' : 'Follow'}
            </GlowButton>
          ) : (
            <GlowButton
              onClick={() => onAuthModalOpen && onAuthModalOpen('signin')}
              className="flex-1"
            >
              Sign In to Follow
            </GlowButton>
          )}
          
          <MagneticButton className="flex-1">
            Share Stream
          </MagneticButton>
          
          <JiggleButton className="flex-1">
            Subscribe
          </JiggleButton>
        </div>
      </div>
    );
  };

  // Render tabs only if stream exists
  if (!stream) {
    return (
      <div className="border-t border-gray-700 p-4 text-center text-gray-400">
        Stream information is loading or unavailable
      </div>
    );
  }

  return (
    <div className="border-t border-gray-700">
      {/* Tab Navigation - Enhanced with glass effects and transitions */}
      <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-3 flex items-center space-x-2 transition-all duration-300 flex-shrink-0
                       ${activeTab === tab.id ? 
                          'text-white border-b-2 border-purple-500 bg-gradient-to-b from-transparent to-purple-900/30' : 
                          'text-gray-400 border-b-2 border-transparent hover:text-purple-300 hover:bg-purple-900/20'}`}
          >
            <div className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : ''}`}>
              {tab.icon}
            </div>
            <span>{tab.label}</span>
            
            {/* Active indicator dot with pulse animation */}
            {activeTab === tab.id && (
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 ml-1 animate-pulse"></span>
            )}
          </button>
        ))}
      </div>
      
      {/* Tab Content - with enhanced animations */}
      <div className={`p-4 overflow-hidden transition-all duration-300 ${tabAnimation}`}>
        {activeTab === 'about' && renderAboutContent()}
        
        {activeTab === 'interactive' && (
          <div className={`${animateContent ? 'animate-fade-in' : ''}`}>
            <InteractiveFeatures 
              stream={stream}
              currentUser={currentUser}
            />
          </div>
        )}
        
        {activeTab === 'donate' && (
          <div className={`${animateContent ? 'animate-fade-in' : ''}`}>
            <DonationPanel currentUser={currentUser} />
          </div>
        )}
        
        {activeTab === 'creator' && (
          <div className={`${animateContent ? 'animate-fade-in' : ''}`}>
            <CreatorTools />
          </div>
        )}
      </div>
    </div>
  );
}

export default StreamTabs;
