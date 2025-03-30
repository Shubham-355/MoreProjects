import { useState, useEffect } from 'react'
import Header from './components/Layout/Header'
import StreamPlayer from './components/Stream/StreamPlayer'
import Chat from './components/Stream/Chat'
import CategorySection from './components/Browse/CategorySection'
import AuthModal from './components/Auth/AuthModal'
import InteractiveFeatures from './components/Stream/InteractiveFeatures'
import StreamerProfile from './components/Stream/StreamerProfile'
import DonationPanel from './components/Stream/DonationPanel'
import CreatorTools from './components/Stream/CreatorTools'
import StreamGrid from './components/Browse/StreamGrid'
import StreamGridItem from './components/Browse/StreamGridItem'
import StreamCard from './components/Browse/StreamCard'
import HeroSection from './components/Browse/HeroSection'
import ParticleBackground from './components/UI/ParticleBackground'
import StreamCardGrid from './components/Browse/StreamCardGrid'
import { 
  MOCK_STREAMS, 
  MOCK_CATEGORIES, 
  MOCK_CHAT_USERS, 
  MOCK_CHAT_MESSAGES,
  MOCK_RECOMMENDED_CHANNELS
} from './data/mockData'

function App() {
  // Add global scrollbar styles
  useEffect(() => {
    const globalStyles = document.createElement("style");
    globalStyles.textContent = `
      /* Custom scrollbar styles for modern browsers */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(30, 30, 40, 0.7);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(128, 90, 213, 0.8);
        border-radius: 4px;
        transition: background 0.2s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(139, 92, 246, 0.9);
      }
      
      /* For Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(128, 90, 213, 0.8) rgba(30, 30, 40, 0.7);
      }
    `;
    document.head.appendChild(globalStyles);
    
    return () => {
      document.head.removeChild(globalStyles);
    };
  }, []);

  // App state
  const [activeView, setActiveView] = useState('browse'); // 'browse', 'stream', 'following', 'channel'
  const [currentStream, setCurrentStream] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT_MESSAGES);
  const [followedChannels, setFollowedChannels] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [featuredStreams, setFeaturedStreams] = useState([]);
  const [filteredStreams, setFilteredStreams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previousView, setPreviousView] = useState('browse');
  
  // New state for likes/dislikes and viewer count
  const [streamLikes, setStreamLikes] = useState(0);
  const [streamDislikes, setStreamDislikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [liveViewerCount, setLiveViewerCount] = useState(0);
  
  // Load user from localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
        localStorage.removeItem('currentUser');
      }
    }
    
    const savedFollowed = localStorage.getItem('followedChannels');
    if (savedFollowed) {
      try {
        setFollowedChannels(JSON.parse(savedFollowed));
      } catch (e) {
        console.error("Failed to parse saved followed channels", e);
        localStorage.removeItem('followedChannels');
      }
    }
  }, []);
  
  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);
  
  // Save followed channels to localStorage when they change
  useEffect(() => {
    localStorage.setItem('followedChannels', JSON.stringify(followedChannels));
  }, [followedChannels]);
  
  // Initialize featured and filtered streams
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      // Select top streams with most viewers as featured
      const sortedByViewers = [...MOCK_STREAMS].sort((a, b) => b.viewers - a.viewers);
      setFeaturedStreams(sortedByViewers.slice(0, 5));
      
      // Initial stream list is all streams
      setFilteredStreams(MOCK_STREAMS);
      
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Listen for popstate (back/forward button) events
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        setActiveView(event.state.view);
        if (event.state.stream) {
          setCurrentStream(event.state.stream);
        }
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    // Initialize history state
    if (!window.history.state) {
      window.history.replaceState({ view: 'browse' }, '', '/');
    }
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  // Enhanced navigation with history management
  const handleViewChange = (newView, stream = null) => {
    // Only set previous view if we're changing views
    if (activeView !== newView) {
      setPreviousView(activeView);
    }
    setActiveView(newView);
    
    // Update stream mode class on HTML element to disable scrolling
    if (newView === 'stream') {
      document.documentElement.classList.add('stream-mode');
    } else {
      document.documentElement.classList.remove('stream-mode');
    }
    
    // Update browser history - fix URL encoding issues
    let url;
    if (newView === 'stream' && stream) {
      // Use a safer way to include stream in URL
      url = `/stream/${encodeURIComponent(stream.id)}`;
    } else {
      url = `/${newView}`;
    }
    
    const state = { view: newView };
    if (stream) {
      state.stream = stream;
    }
    
    window.history.pushState(state, '', url);
  };
  
  // Enhanced stream selection with better error handling
  const handleStreamSelect = (stream) => {
    if (!stream) {
      console.error("[APP] No stream object provided to handleStreamSelect");
      return;
    }
    
    // Ensure stream has all required properties
    if (!stream.id || !stream.title || !stream.streamer) {
      console.error("[APP] Stream is missing required properties:", stream);
      return;
    }
    
    console.log("[APP] Stream selected:", stream.id, stream.title);
    setCurrentStream(stream);
    handleViewChange('stream', stream);
    setChatMessages(MOCK_CHAT_MESSAGES);
    
    // Reset like/dislike state for the new stream
    setStreamLikes(stream.likes || Math.floor(Math.random() * 500));
    setStreamDislikes(stream.dislikes || Math.floor(Math.random() * 100));
    setHasLiked(false);
    setHasDisliked(false);
    
    // Set initial viewer count based on stream data
    setLiveViewerCount(stream.viewers || Math.floor(Math.random() * 1000) + 100);
    
    console.log("[APP] Navigation complete, current view:", 'stream');
  };
  
  // Handle stream likes
  const handleLike = () => {
    if (!currentUser) {
      handleAuthModalOpen('signin');
      return;
    }
    
    if (hasLiked) {
      // Unlike
      setStreamLikes(prev => Math.max(0, prev - 1));
      setHasLiked(false);
    } else {
      // Like
      setStreamLikes(prev => prev + 1);
      setHasLiked(true);
      
      // If previously disliked, remove dislike
      if (hasDisliked) {
        setStreamDislikes(prev => Math.max(0, prev - 1));
        setHasDisliked(false);
      }
    }
  };
  
  // Handle stream dislikes
  const handleDislike = () => {
    if (!currentUser) {
      handleAuthModalOpen('signin');
      return;
    }
    
    if (hasDisliked) {
      // Un-dislike
      setStreamDislikes(prev => Math.max(0, prev - 1));
      setHasDisliked(false);
    } else {
      // Dislike
      setStreamDislikes(prev => prev + 1);
      setHasDisliked(true);
      
      // If previously liked, remove like
      if (hasLiked) {
        setStreamLikes(prev => Math.max(0, prev - 1));
        setHasLiked(false);
      }
    }
  };
  
  // Update live viewer count randomly
  useEffect(() => {
    if (activeView !== 'stream' || !currentStream) return;
    
    const viewerUpdateInterval = setInterval(() => {
      setLiveViewerCount(prev => {
        // Random fluctuation: +/- 5% with a minimum of +/- 1
        const fluctuation = Math.max(1, Math.floor(prev * 0.05));
        const delta = Math.floor(Math.random() * fluctuation * 2) - fluctuation;
        return Math.max(10, prev + delta); // Ensure minimum of 10 viewers
      });
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(viewerUpdateInterval);
  }, [activeView, currentStream]);
  
  // Handle back navigation
  const handleGoBack = () => {
    window.history.back();
  };
  
  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    
    // Filter streams by selected category
    if (category) {
      const filtered = MOCK_STREAMS.filter(stream => 
        stream.game.toLowerCase() === category.name.toLowerCase()
      );
      setFilteredStreams(filtered);
    } else {
      setFilteredStreams(MOCK_STREAMS);
    }
  };
  
  // Authentication handlers
  const handleAuthModalOpen = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };
  
  const handleAuth = (userData) => {
    setCurrentUser(userData);
    // Store user in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // New users automatically start following recommendations
    if (followedChannels.length === 0) {
      const newFollowed = [MOCK_RECOMMENDED_CHANNELS[0]];
      setFollowedChannels(newFollowed);
      localStorage.setItem('followedChannels', JSON.stringify(newFollowed));
    }
  };
  
  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    // Keep followed channels for returning users
  };
  
  // Handle following channels
  const handleFollow = (streamerId) => {
    if (!currentUser) {
      handleAuthModalOpen('signin');
      return;
    }
    
    if (followedChannels.some(channel => channel.id === streamerId)) {
      setFollowedChannels(followedChannels.filter(channel => channel.id !== streamerId));
    } else {
      const streamer = MOCK_STREAMS.find(stream => stream.streamer.id === streamerId)?.streamer;
      if (streamer) {
        setFollowedChannels([...followedChannels, streamer]);
      }
    }
  };
  
  // Enhanced sending chat messages with user ID
  const handleSendMessage = (message, userId = null, options = {}) => {
    // If no userId provided but user is logged in, use current user
    const senderId = userId || (currentUser ? currentUser.id : null);
    
    if (!senderId) {
      console.log("[APP] Cannot send message: No sender ID");
      return; // Don't send message if no sender ID
    }
    
    const newMessage = {
      id: Date.now(),
      userId: senderId,
      text: message,
      timestamp: new Date(),
      ...options
    };
    
    console.log("[APP] Sending message:", newMessage);
    setChatMessages(prev => [...prev, newMessage]);
  };
  
  // Simulate new chat messages
  useEffect(() => {
    if (activeView !== 'stream' || !currentStream) return;
    
    const interval = setInterval(() => {
      const randomUser = MOCK_CHAT_USERS[Math.floor(Math.random() * MOCK_CHAT_USERS.length)];
      const randomMessages = [
        "Great stream today!",
        "LOL that was funny",
        "Can you explain that strategy again?",
        "GG!",
        "Wow, nice move!",
        "Hello from Germany!",
        "First time watching, this is awesome!",
        "Have you played the new DLC yet?",
        "This boss is so hard to beat",
        "What's your favorite loadout?",
        "Did you see that new update coming next month?"
      ];
      
      const newMessage = {
        id: Date.now(),
        userId: randomUser.id,
        text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev.slice(-50), newMessage]); // Keep only the last 50 messages
    }, 5000); // More frequent chat for better demo
    
    return () => clearInterval(interval);
  }, [activeView, currentStream]);
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Authentication Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSwitch={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
        onAuth={handleAuth}
      />
      
      {/* Header */}
      <Header 
        activeView={activeView}
        setActiveView={handleViewChange}
        currentUser={currentUser}
        onAuthModalOpen={handleAuthModalOpen}
        onSignOut={handleSignOut}
      />
      
      {/* Main Content */}
      <main className="pt-16 relative z-10"> {/* Added padding-top to account for fixed header */}
        {activeView === 'browse' && (
          <div className="container mx-auto px-4 py-6">
            {isLoading ? (
              /* Loading Skeleton */
              <div className="animate-pulse">
                <div className="h-96 bg-gray-800 rounded-lg"></div>
                <div className="h-8 bg-gray-800 w-64 rounded mt-10 mb-4"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="aspect-[3/4] bg-gray-800 rounded-lg"></div>
                  ))}
                </div>
                <div className="h-8 bg-gray-800 w-64 rounded mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array(8).fill(0).map((_, i) => (
                    <div key={i} className="aspect-video bg-gray-800 rounded-lg mb-2"></div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Hero Section with no bottom margin */}
                {featuredStreams.length > 0 && (
                  <div className="mb-4"> {/* Small margin between hero and next section */}
                    <HeroSection 
                      streams={featuredStreams} 
                      onStreamSelect={handleStreamSelect}
                    />
                  </div>
                )}
                
                {/* Categories Section */}
                <CategorySection 
                  title="Popular Categories" 
                  categories={MOCK_CATEGORIES}
                  onSelect={handleCategorySelect}
                />
                
                {/* Live Channels */}
                <StreamGrid 
                  streams={filteredStreams}
                  onStreamSelect={handleStreamSelect}
                  title={selectedCategory ? `Live ${selectedCategory.name} Streams` : "Live Channels"}
                />
                
                {/* Recommended Channels - only if user is logged in */}
                {currentUser && (
                  <div className="mb-10">
                    <h2 className="text-white text-2xl font-bold mb-4 flex items-center group">
                      <span className="inline-block w-1.5 h-6 bg-purple-500 rounded-sm mr-2 group-hover:h-8 transition-all duration-300"></span>
                      <span className="group-hover:text-purple-400 transition-colors duration-300">Recommended for You</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {MOCK_STREAMS
                        .filter(stream => !followedChannels.some(c => c.id === stream.streamer.id))
                        .slice(0, 4)
                        .map((stream, index) => (
                          <StreamGridItem 
                            key={stream.id} 
                            stream={stream} 
                            onClick={handleStreamSelect}
                            index={index}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        
        {activeView === 'stream' && currentStream && (
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Main Content */}
              <div className="lg:w-3/4">
                {/* Video Player */}
                <StreamPlayer stream={currentStream} />
                
                {/* Stream Info & Tabs */}
                <div className="bg-gray-800 rounded-lg mb-6">
                  {/* Streamer Profile */}
                  <StreamerProfile 
                    streamer={currentStream.streamer}
                    onFollow={() => handleFollow(currentStream.streamer.id)}
                    isFollowing={followedChannels.some(c => c.id === currentStream.streamer.id)}
                  />
                  
                  {/* Interactive Features */}
                  <div className="p-4 border-t border-gray-700">
                    <InteractiveFeatures 
                      stream={currentStream}
                      currentUser={currentUser}
                    />
                  </div>
                  
                  {/* Donation Panel */}
                  <div className="p-4 border-t border-gray-700">
                    <DonationPanel currentUser={currentUser} />
                  </div>
                  
                  {/* Creator Tools - Only shown if this is the current user's channel */}
                  {currentUser && currentUser.username === currentStream.streamer.name && (
                    <div className="p-4 border-t border-gray-700">
                      <CreatorTools />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Chat Section */}
              <div className="lg:w-1/4">
                <Chat 
                  messages={chatMessages}
                  users={[...MOCK_CHAT_USERS, ...(currentUser ? [{
                    id: currentUser.id || 'current-user',
                    name: currentUser.username,
                    avatar: currentUser.avatar,
                    isSub: false
                  }] : [])]}
                  currentUser={currentUser}
                  onSendMessage={handleSendMessage}
                  onAuthModalOpen={() => handleAuthModalOpen('signin')}
                  viewerCount={liveViewerCount}
                  likes={streamLikes}
                  dislikes={streamDislikes}
                  onLike={handleLike}
                  onDislike={handleDislike}
                />
              </div>
            </div>
          </div>
        )}
        
        {activeView === 'following' && (
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-white text-2xl font-bold mb-6">Following</h1>
            
            {followedChannels.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h2 className="text-white text-xl font-bold mb-2">No channels followed yet</h2>
                <p className="text-gray-400 mb-4">Follow your favorite streamers to see them here</p>
                <button 
                  onClick={() => handleViewChange('browse')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                >
                  Discover Channels
                </button>
              </div>
            ) : (
              <StreamCardGrid 
                streams={MOCK_STREAMS.filter(stream => followedChannels.some(c => c.id === stream.streamer.id))}
                onStreamSelect={handleStreamSelect}
                emptyMessage="None of your followed channels are live"
              />
            )}
          </div>
        )}
        
        {activeView === 'channel' && currentUser && (
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-white text-2xl font-bold mb-6">Your Channel</h1>
            
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-6">
                <img 
                  src={currentUser.avatar || (currentUser.avatars ? currentUser.avatars[0] : '')} 
                  alt={currentUser.username} 
                  className="w-20 h-20 rounded-full mr-4 border-2 border-purple-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/80x80/232323/FFFFFF?text=' + currentUser.username.charAt(0);
                  }}
                />
                <div>
                  <h2 className="text-white text-xl font-bold">{currentUser.username}</h2>
                  <p className="text-gray-400">0 followers</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-2">Stream Settings</h3>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded-md">
                    Go Live
                  </button>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-bold mb-2">Channel Analytics</h3>
                  <p className="text-gray-300">No stream data available</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
