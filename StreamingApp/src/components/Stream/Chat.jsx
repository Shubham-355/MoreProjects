import { useState, useEffect, useRef, useCallback } from 'react';
import ReliableProfile from '../UI/ReliableProfile';

function ChatMessage({ message, user }) {
  // Determine user type classes for styling
  const getUserTypeClasses = () => {
    if (user.isStreamer) {
      return "bg-gradient-to-r from-red-900/40 to-red-700/20 border-l-4 border-red-500";
    } else if (user.isModerator) {
      return "bg-gradient-to-r from-green-900/40 to-green-700/20 border-l-4 border-green-500";
    } else if (user.isSub && user.subMonths > 12) {
      return "bg-gradient-to-r from-purple-900/40 to-purple-700/20 border-l-4 border-purple-500";
    } else if (user.isSub) {
      return "bg-gradient-to-r from-purple-900/30 to-transparent border-l-4 border-purple-400";
    } else if (user.isVIP) {
      return "bg-gradient-to-r from-yellow-900/30 to-transparent border-l-4 border-yellow-500";
    }
    return "";
  };

  // Determine animation for message entry
  const getMessageAnimation = () => {
    // Give donations the most eye-catching animation
    if (message.hasDonation) {
      return "animate-donationHighlight";
    } else if (message.isGift) {
      return "animate-giftHighlight";
    } else if (user.isStreamer) {
      return "animate-slideInRight";
    } else if (user.isModerator || (user.isSub && user.subMonths > 12) || user.isVIP) {
      return "animate-slideInLeft";
    } else if (message.isHighlighted) {
      return "animate-bounceIn";
    }
    return "animate-fadeIn";
  };

  // Check if message contains certain keywords/emotes to highlight
  const highlightWords = ['LMAO', 'OMG', 'LOL', 'WOW', 'CONGRATS'];
  const hasHighlight = highlightWords.some(word => 
    message.text.toUpperCase().includes(word)
  );

  // Determine background color based on donation amount
  const getDonationBackground = () => {
    if (!message.hasDonation) return '';
    
    // Scale background gradient intensity based on donation amount
    if (message.donationAmount >= 100) {
      return 'bg-gradient-to-r from-purple-600/50 to-blue-600/30 border-l-4 border-r-4 border-blue-400 shadow-lg shadow-blue-500/20';
    } else if (message.donationAmount >= 50) {
      return 'bg-gradient-to-r from-blue-600/40 to-blue-400/20 border-l-4 border-blue-400 shadow-md shadow-blue-500/10';
    } else if (message.donationAmount >= 20) {
      return 'bg-gradient-to-r from-blue-500/30 to-blue-300/20 border-l-4 border-blue-400';
    } else if (message.donationAmount >= 10) {
      return 'bg-gradient-to-r from-blue-500/25 to-blue-300/15 border-l-4 border-blue-400';
    } else {
      return 'bg-blue-500/20 border-l-4 border-blue-400';
    }
  };

  // Get gift styling
  const getGiftStyling = () => {
    if (!message.isGift) return '';
    return 'bg-gradient-to-r from-purple-600/40 to-pink-500/20 border-l-4 border-purple-400 shadow-md';
  };

  return (
    <div className={`group px-2 py-1 hover:bg-gray-800/50 rounded ${getMessageAnimation()} ${getUserTypeClasses()} ${getDonationBackground()} ${getGiftStyling()} transition-colors duration-200 my-1`}>
      <div className="flex items-start">
        <ReliableProfile 
          user={user} 
          size="sm" 
          className="mr-2"
        />
        <div className="flex-1">
          <div className="flex items-center flex-wrap">
            <span className={`font-semibold ${
              user.isStreamer ? 'text-red-400' : 
              user.isModerator ? 'text-green-400' : 
              user.isVIP ? 'text-yellow-400' : 
              user.isSub ? 'text-purple-400' : 
              'text-white'
            }`}>
              {user.name}
            </span>
            
            {user.isStreamer && (
              <span className="ml-1 bg-red-600 text-white text-xs px-1 rounded">
                STREAMER
              </span>
            )}
            
            {user.isModerator && (
              <span className="ml-1 bg-green-600 text-white text-xs px-1 rounded">
                MOD
              </span>
            )}
            
            {user.isVIP && (
              <span className="ml-1 bg-yellow-600 text-white text-xs px-1 rounded">
                VIP
              </span>
            )}
            
            {user.isSub && (
              <span className="ml-1 bg-purple-600 text-white text-xs px-1 rounded" 
                title={`Subscribed for ${user.subMonths} months`}>
                {user.subMonths}
              </span>
            )}
            
            <span className="text-gray-400 text-xs ml-2 hidden group-hover:inline">
              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          </div>
          
          {/* Enhanced donation display with larger text and icon */}
          {message.hasDonation && (
            <div className="mb-1 font-bold">
              <span className="inline-flex items-center bg-blue-600/40 text-blue-100 px-2 py-0.5 rounded-full text-sm font-bold">
                <span className="mr-1">💰</span>
                <span className="text-yellow-300">${message.donationAmount.toFixed(2)}</span>
                <span className="ml-1 text-xs font-medium">DONATION</span>
              </span>
            </div>
          )}
          
          {/* Gift display badge */}
          {message.isGift && (
            <div className="mb-1 font-bold">
              <span className="inline-flex items-center bg-purple-600/40 text-purple-100 px-2 py-0.5 rounded-full text-sm font-bold">
                <span className="mr-1">🎁</span>
                <span className="text-yellow-200">{message.giftAmount || 1}</span>
                <span className="ml-1 text-xs font-medium">GIFT SUB{message.giftAmount > 1 ? 'S' : ''}</span>
              </span>
            </div>
          )}
          
          <p className={`text-sm ${
            message.hasDonation ? 'text-white font-medium' : 
            message.isGift ? 'text-white font-medium' :
            hasHighlight ? 'text-white font-medium' : 'text-gray-200'
          } ${
            message.hasDonation || message.isGift ? 'py-1.5 px-2 rounded' : ''
          }`}>
            {message.text}
          </p>
          
          {/* Enhanced donation progress bar with animation and better gradients */}
          {message.hasDonation && message.donationAmount >= 5 && (
            <div className="mt-1.5 h-1.5 w-full bg-blue-900/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 animate-shimmer relative" 
                   style={{
                     width: `${Math.min(message.donationAmount * 1.5, 100)}%`,
                     backgroundSize: '200% 100%',
                     backgroundPosition: '0 0',
                   }}>
              </div>
            </div>
          )}
          
          {/* Gift sub progress visualization */}
          {message.isGift && message.giftAmount > 1 && (
            <div className="mt-1.5 grid grid-cols-10 gap-0.5">
              {Array.from({ length: Math.min(message.giftAmount, 10) }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced stream metrics component with live updates
function StreamMetrics({ viewerCount, likes, dislikes, onLike, onDislike, currentUser }) {
  // Track if the user has liked or disliked
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const [animateDislike, setAnimateDislike] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  
  // Handle like button click with animation
  const handleLike = (e) => {
    if (!currentUser) return;
    
    // Capture click position for ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Toggle like state
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
    
    // Trigger animation
    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 600);
    
    // Call the parent handler
    onLike();
  };
  
  // Handle dislike button click with animation
  const handleDislike = (e) => {
    if (!currentUser) return;
    
    // Capture click position for ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Toggle dislike state
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
    
    // Trigger animation
    setAnimateDislike(true);
    setTimeout(() => setAnimateDislike(false), 600);
    
    // Call the parent handler
    onDislike();
  };
  
  return (
    <div className="flex items-center space-x-3 px-4 py-2 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="flex items-center animate-pulse">
        <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
        <span className="text-white font-medium">{viewerCount.toLocaleString()}</span>
        <span className="text-gray-400 text-xs ml-1">viewers</span>
      </div>
      
      <div className="flex items-center ml-auto">
        <button 
          className={`relative flex items-center transition-all duration-300 overflow-hidden rounded-full px-2 py-1 ${
            isLiked
              ? 'text-purple-400 bg-purple-400/10 scale-110' 
              : 'text-gray-300 hover:text-white hover:bg-gray-800/70'
          }`}
          onClick={handleLike}
          disabled={!currentUser}
          title={currentUser ? "Like" : "Sign in to like"}
        >
          {/* Ripple effect when clicked */}
          {animateLike && (
            <span 
              className="absolute bg-purple-400/30 rounded-full animate-ripple"
              style={{
                left: clickPosition.x,
                top: clickPosition.y,
                transformOrigin: 'center'
              }}
            ></span>
          )}
          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 mr-1.5 transform transition-transform duration-300 ${
              animateLike ? 'animate-superlike' : isLiked ? 'scale-110' : ''
            }`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          
          <span className={`font-medium ${isLiked ? 'animate-bounce-once' : ''}`}>
            {likes.toLocaleString()}
          </span>
        </button>
      </div>
      
      <div className="flex items-center">
        <button 
          className={`relative flex items-center transition-all duration-300 overflow-hidden rounded-full px-2 py-1 ${
            isDisliked
              ? 'text-red-400 bg-red-400/10 scale-110' 
              : 'text-gray-300 hover:text-white hover:bg-gray-800/70'
          }`}
          onClick={handleDislike}
          disabled={!currentUser}
          title={currentUser ? "Dislike" : "Sign in to dislike"}
        >
          {/* Ripple effect when clicked */}
          {animateDislike && (
            <span 
              className="absolute bg-red-400/30 rounded-full animate-ripple"
              style={{
                left: clickPosition.x,
                top: clickPosition.y,
                transformOrigin: 'center'
              }}
            ></span>
          )}
          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 mr-1.5 transform transition-transform duration-300 ${
              animateDislike ? 'animate-superdislike' : isDisliked ? 'scale-110' : ''
            }`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
          </svg>
          
          <span className={`font-medium ${isDisliked ? 'animate-bounce-once' : ''}`}>
            {dislikes.toLocaleString()}
          </span>
        </button>
      </div>
    </div>
  );
}

// New Poll component to show active polls in chat
function ChatPoll({ poll, onVote, currentUser }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);
  
  // Calculate total votes
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  
  // Handle vote submission
  const handleVote = () => {
    if (!currentUser) {
      setError("You need to sign in to vote");
      return;
    }
    
    if (selectedOption === null) {
      setError("Please select an option");
      return;
    }
    
    onVote(poll.id, selectedOption);
    setHasVoted(true);
    setError(null);
  };
  
  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date();
    const endTime = new Date(poll.endTime);
    const remaining = endTime - now;
    
    if (remaining <= 0) return "Poll ended";
    
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    
    return `${minutes}m ${seconds}s remaining`;
  };
  
  return (
    <div className="bg-gray-800/60 rounded-md p-3 my-4 border-l-4 border-purple-500 animate-fadeIn">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-white font-bold">{poll.question}</h3>
        <span className="text-gray-400 text-xs">{getTimeRemaining()}</span>
      </div>
      
      <div className="space-y-2 mt-3">
        {poll.options.map((option, index) => {
          // Calculate percentage
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          
          return (
            <div 
              key={index}
              className={`relative ${hasVoted ? 'cursor-default' : 'cursor-pointer hover:bg-gray-700/50'} 
                         rounded px-3 py-2 transition-colors
                         ${selectedOption === index && !hasVoted ? 'bg-purple-900/30 border border-purple-500/50' : 'bg-gray-700/30'}`}
              onClick={() => !hasVoted && setSelectedOption(index)}
            >
              <div className="flex justify-between items-center z-10 relative">
                <div className="flex items-center">
                  {!hasVoted && (
                    <div className={`w-4 h-4 rounded-full mr-2 border ${
                      selectedOption === index ? 'border-purple-500 bg-purple-500' : 'border-gray-500'
                    }`}>
                      {selectedOption === index && (
                        <div className="zw-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                      )}
                    </div>
                  )}
                  <span className={`${hasVoted && option.votes === Math.max(...poll.options.map(o => o.votes)) ? 'text-purple-400 font-medium' : 'text-white'}`}>
                    {option.text}
                  </span>
                </div>
                {hasVoted && <span className="text-gray-300 font-medium">{percentage}%</span>}
              </div>
              
              {/* Show progress bar for voted polls */}
              {hasVoted && (
                <div 
                  className="absolute left-0 top-0 h-full bg-purple-600/20 rounded" 
                  style={{ width: `${percentage}%`, maxWidth: '100%' }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      
      {error && (
        <p className="text-red-400 text-xs mt-2">{error}</p>
      )}
      
      {!hasVoted && (
        <button
          onClick={handleVote}
          disabled={selectedOption === null || !currentUser}
          className="mt-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded px-4 py-1 text-sm font-medium transition-colors"
        >
          Vote
        </button>
      )}
      
      <div className="mt-2 text-xs text-gray-400">
        {totalVotes} vote{totalVotes !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

// New component for Quick Emoji Reactions - simplified with direct sending
function QuickReactions({ onSendReaction, disabled }) {
  // Fixed set of popular emojis for quick reactions
  const reactions = ["👍", "❤️", "😂", "🔥", "👀", "😮", "🎉", "💯"];
  
  return (
    <div className="flex items-center justify-between px-3 py-2 border-t border-gray-800 bg-gray-800/50">
      <div className="flex space-x-1 overflow-x-auto">
        {reactions.map(emoji => (
          <button
            key={emoji}
            onClick={() => onSendReaction(emoji)}
            disabled={disabled}
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
            title={`Send ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
      
      {/* Like/Dislike buttons with counts */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onSendReaction("👍")}
          disabled={disabled}
          className="flex items-center space-x-1 text-gray-300 hover:text-white"
          title="Like"
        >
          <span className="text-lg">👍</span>
        </button>
        <button
          onClick={() => onSendReaction("👎")}
          disabled={disabled}
          className="flex items-center space-x-1 text-gray-300 hover:text-white"
          title="Dislike"
        >
          <span className="text-lg">👎</span>
        </button>
      </div>
    </div>
  );
}

function Chat({ messages, users, currentUser, onSendMessage, onAuthModalOpen, viewerCount = 0, likes = 0, dislikes = 0, onLike, onDislike }) {
  const [newMessage, setNewMessage] = useState('');
  const [visibleTab, setVisibleTab] = useState('chat'); // 'chat', 'users', 'settings'
  const [chatTheme, setChatTheme] = useState('dark'); // 'dark', 'light', 'colorful'
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'
  const [autoScroll, setAutoScroll] = useState(true); // Auto-scroll state
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // Add state for chat speed
  const [chatSpeed, setChatSpeed] = useState('normal');
  const [lastSpeedChange, setLastSpeedChange] = useState(Date.now());
  const chatSpeedRef = useRef('normal');
  
  // Update ref when state changes
  useEffect(() => {
    chatSpeedRef.current = chatSpeed;
  }, [chatSpeed]);
  
  // Randomly change chat speed over time - adjusted for EVEN SLOWER overall speeds
  useEffect(() => {
    const speeds = ['slow', 'normal', 'fast', 'burst'];
    // Adjust weights to favor slower speeds even more
    const weights = [0.5, 0.35, 0.1, 0.05]; // Increased slow, decreased normal and fast
    
    // Get random speed based on weights
    const getRandomSpeed = () => {
      const rand = Math.random();
      let sum = 0;
      
      for (let i = 0; i < speeds.length; i++) {
        sum += weights[i];
        if (rand < sum) return speeds[i];
      }
      
      return 'normal'; // Fallback
    };
    
    // Random duration between speed changes - increased for more stability
    const getRandomDuration = () => {
      // Even longer durations for more stability
      const minDuration = 45000; // 45 seconds (increased from 30)
      const maxDuration = 300000; // 5 minutes (increased from 4)
      
      // Burst is always short but slightly increased
      if (chatSpeedRef.current === 'burst') {
        return Math.floor(Math.random() * 20000) + 15000; // 15-35 seconds (increased min time)
      }
      
      return Math.floor(Math.random() * (maxDuration - minDuration)) + minDuration;
    };
    
    // Schedule next speed change
    const scheduleSpeedChange = () => {
      const duration = getRandomDuration();
      
      console.log(`[CHAT] Speed is now ${chatSpeedRef.current}, next change in ${Math.round(duration/1000)}s`);
      
      setTimeout(() => {
        // Don't transition from burst to burst
        let newSpeed;
        do {
          newSpeed = getRandomSpeed();
        } while (chatSpeedRef.current === 'burst' && newSpeed === 'burst');
        
        setChatSpeed(newSpeed);
        setLastSpeedChange(Date.now());
        
        // Schedule the next change
        scheduleSpeedChange();
      }, duration);
    };
    
    // Initial speed change schedule
    scheduleSpeedChange();
    
    return () => {
      // Nothing to clean up as the timeout will be cleared on component unmount
    };
  }, []);
  
  // Load user preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('chatTheme');
    const savedFontSize = localStorage.getItem('chatFontSize');
    const savedAutoScroll = localStorage.getItem('chatAutoScroll');
    
    if (savedTheme) setChatTheme(savedTheme);
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedAutoScroll !== null) setAutoScroll(savedAutoScroll === 'true');
  }, []);
  
  // Save user preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('chatTheme', chatTheme);
    localStorage.setItem('chatFontSize', fontSize);
    localStorage.setItem('chatAutoScroll', autoScroll.toString());
  }, [chatTheme, fontSize, autoScroll]);
  
  // Complete rewrite of the scrollToBottom function for maximum reliability
  const scrollToBottom = (options = {}) => {
    // Default options
    const { behavior = 'auto', force = false } = options;
    
    if (!chatContainerRef.current) return;
    
    // Use requestAnimationFrame to ensure we're scrolling after render
    requestAnimationFrame(() => {
      const container = chatContainerRef.current;
      if (!container) return;
      
      if (force || autoScroll) {
        const scrollHeight = container.scrollHeight;
        
        // Smoother animation with behavior option
        container.scrollTo({
          top: scrollHeight,
          behavior: behavior
        });
        
        // Double-check the scroll position after a small delay
        setTimeout(() => {
          if (container && Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) > 10) {
            container.scrollTop = container.scrollHeight;
          }
        }, 50);
      }
    });
  };
  
  // Track if we should show the "New messages" button
  const [hasNewMessages, setHasNewMessages] = useState(false);
  
  // Auto-scroll when messages change - more reliable implementation
  useEffect(() => {
    // If the last rendered messages array length is less than the current one,
    // we have new messages
    if (autoScroll && !isAutoScrollPaused && messages.length > 0) {
      scrollToBottom({ force: true });
    } else if (!autoScroll && !isAutoScrollPaused && messages.length > 0) {
      // If auto-scroll is disabled but user is at bottom, we still want to scroll
      setHasNewMessages(true);
    }
  }, [messages, autoScroll, isAutoScrollPaused]);
  
  // Use a ref to track the previous messages length
  const prevMessagesLengthRef = useRef(messages.length);
  
  // More accurate detection of new messages
  useEffect(() => {
    const prevLength = prevMessagesLengthRef.current;
    const newLength = messages.length;
    
    if (newLength > prevLength) {
      // We have new messages
      if (autoScroll && !isAutoScrollPaused) {
        scrollToBottom({ force: true });
      } else {
        setHasNewMessages(true);
      }
    }
    
    // Update the ref for next comparison
    prevMessagesLengthRef.current = newLength;
  }, [messages, autoScroll, isAutoScrollPaused]);
  
  // Use MutationObserver to detect DOM changes in the chat container
  useEffect(() => {
    if (!chatContainerRef.current) return;
    
    const chatContainer = chatContainerRef.current;
    
    // Create a mutation observer to watch for new messages
    const observer = new MutationObserver((mutations) => {
      // Only care about childList mutations (added/removed nodes)
      const hasNewNodes = mutations.some(mutation => 
        mutation.type === 'childList' && mutation.addedNodes.length > 0
      );
      
      if (hasNewNodes && autoScroll && !isAutoScrollPaused) {
        scrollToBottom({ force: true });
      }
    });
    
    // Start observing
    observer.observe(chatContainer, { 
      childList: true,
      subtree: true,
    });
    
    return () => {
      observer.disconnect();
    };
  }, [autoScroll, isAutoScrollPaused]);
  
  // Improved scroll position detection with throttling
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    
    let scrollTimeout;
    let isThrottled = false;
    
    const checkScrollPosition = () => {
      if (!chatContainer) return;
      
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      // More generous threshold (150px from bottom)
      const isScrolledToBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 150;
      
      // Update auto-scroll paused state
      if (isAutoScrollPaused !== !isScrolledToBottom) {
        setIsAutoScrollPaused(!isScrolledToBottom);
      }
      
      // Update new messages indicator
      if (isScrolledToBottom) {
        setHasNewMessages(false);
      }
    };
    
    const handleScroll = () => {
      // Use throttling to prevent excessive calculations
      if (isThrottled) return;
      
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 100);
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set a new timeout
      scrollTimeout = setTimeout(checkScrollPosition, 100);
    };
    
    chatContainer.addEventListener('scroll', handleScroll);
    
    // Initial check
    checkScrollPosition();
    
    return () => {
      clearTimeout(scrollTimeout);
      chatContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [isAutoScrollPaused]);
  
  // Force scroll to bottom when tab changes to chat
  useEffect(() => {
    if (visibleTab === 'chat') {
      // Delay slightly to ensure content is rendered
      setTimeout(() => scrollToBottom({ force: true }), 100);
      setHasNewMessages(false);
    }
  }, [visibleTab]);
  
  // Better handling for when font size changes
  useEffect(() => {
    if (visibleTab === 'chat') {
      // Wait for DOM to update with new font size
      setTimeout(() => scrollToBottom({ force: true }), 150);
    }
  }, [fontSize, visibleTab]);
  
  // Force scroll when auto-scroll setting changes
  useEffect(() => {
    if (autoScroll && visibleTab === 'chat') {
      scrollToBottom({ force: true });
      setHasNewMessages(false);
    }
  }, [autoScroll, visibleTab]);
  
  // Generate simulated chat messages based on viewer count - SLOWED DOWN
  useEffect(() => {
    if (!viewerCount) return;
    
    // Calculate message frequency based on viewer count - MUCH SLOWER baseline
    const baseInterval = 12000; // Increased from 8000ms to 12000ms for slower messages
    const minInterval = 500; // Increased minimum delay from 300ms to 500ms
    
    // Calculate interval: as viewers increase, interval decreases but more gently
    const calculateInterval = () => {
      if (viewerCount <= 10) return baseInterval;
      if (viewerCount <= 50) return baseInterval / 1.2; // Less aggressive reduction
      if (viewerCount <= 200) return baseInterval / 2;
      if (viewerCount <= 500) return baseInterval / 3;
      if (viewerCount <= 1000) return baseInterval / 6;
      if (viewerCount <= 5000) return baseInterval / 12;
      if (viewerCount <= 10000) return baseInterval / 20;
      return minInterval;
    };
    
    // Add randomness to interval
    const getRandomizedInterval = () => {
      const baseValue = calculateInterval();
      // Add ±30% randomness
      return baseValue * (0.7 + Math.random() * 0.6);
    };
    
    // Calculate how many messages to potentially send each cycle - REDUCED batch sizes
    const getMessageBatchSize = () => {
      if (viewerCount <= 100) return 1;
      if (viewerCount <= 1000) return Math.floor(Math.random() * 1.5) + 1; // 1-2 messages
      if (viewerCount <= 5000) return Math.floor(Math.random() * 2) + 1; // 1-3 messages
      return Math.floor(Math.random() * 3) + 1; // 1-4 messages for very active chats
    };
    
    // Array of potential chat messages - extended with more realistic streaming chat messages
    const chatMessages = [
      "Hello everyone!",
      "Great stream today",
      "LOL",
      "That was amazing",
      "How do you do that trick?",
      "Wow!!!",
      "First time watching, love the content",
      "Can you explain that again?",
      "POGGERS",
      "Where are you from?",
      "👍👍👍",
      "❤️❤️❤️",
      "That's incredible",
      "What game is next?",
      "I can't believe that just happened",
      "Let's goooo!",
      "F in the chat",
      "KEKW",
      "monkaS",
      "Any tips for beginners?",
      "How long have you been streaming?",
      "Nice one!",
      "What's your setup?",
      "This is epic",
      "Greetings from Germany!",
      "Where can I find your schedule?",
      "Do you have a Discord?",
      "What's your favorite game?",
      "LUL",
      "PogChamp",
      "Yo what's up chat",
      "GG",
      "W",
      "L",
      "Can we get some hype in the chat?",
      "5Head play",
      "Just followed!",
      "I've been watching for 2 years",
      "You're the best!",
      "Clutch!",
      "This reminds me of that one time...",
      "Are you streaming tomorrow?",
      "I'm new here",
      "Hello from Brazil!",
      "First stream I've caught live",
      "😂😂😂",
      "💯",
      "Thoughts on the new update?",
      "Any mods?",
      "🔥🔥🔥",
      "Can we play together sometime?",
      "10/10",
      "Sadge",
      "Big brain",
      "WeirdChamp",
      "YEP",
      "Pog",
      "MonkaW"
    ];
    
    // High viewer count specific messages (more emotes, memes, etc)
    const highViewerCountMessages = [
      "LULW",
      "OMEGALUL",
      "Pog",
      "W",
      "L",
      "KEKW",
      "monkaS",
      "PogU",
      "Pepega",
      "!drop",
      "!rewards",
      "Jebaited",
      "modCheck",
      "widepeepoHappy",
      "Sadge",
      "WeirdChamp",
      "monkaW",
      "YEP",
      "5Head",
      "Kreygasm",
      "PepeHands",
      "EZ Clap",
      "HeyGuys",
      "VoteYea",
      "VoteNay",
      "DoritosChip",
      "TwitchVotes",
      "catJAM",
      "ratJAM",
      "COPIUM",
      "WAYTOODANK",
      "pepeLaugh",
      "MonkaChrist"
    ];
    
    // Simulate chat burst when big moments happen - further reduced probability
    const simulateChatBurst = () => {
      // Reduced burst probability across all viewer counts
      const burstProbability = viewerCount > 5000 ? 0.03 : // Reduced from 0.05
                             viewerCount > 1000 ? 0.02 : // Reduced from 0.03
                             viewerCount > 500 ? 0.01 : // Reduced from 0.02
                             0.005; // Reduced from 0.008
      
      // Only trigger bursts occasionally, more often with higher viewer counts
      if (Math.random() < burstProbability) {
        // Smaller bursts for all viewer counts
        const burstBaseSize = viewerCount > 5000 ? 10 : 
                             viewerCount > 1000 ? 7 : 
                             viewerCount > 500 ? 5 : 3;
                             
        const burstSize = Math.floor(Math.random() * burstBaseSize) + Math.floor(burstBaseSize/2); // Variable size
        const burstMessages = ["OMG!!!", "WHAT???", "HOLY!!!", "AMAZING!!", "INSANE!!!", "NO WAY!!", "CLUTCH!", "POGGERS", "WOW!", "UNBELIEVABLE!"];
        
        // For high viewer counts, add hype emotes to the burst
        if (viewerCount > 1000) {
          burstMessages.push(...["PogChamp", "PogU", "POGGERS", "PogChamp PogChamp", "KEKW", "OMEGALUL", "LETSGOOO", "W", "W W W"]);
        }
        
        // Generate burst of messages with longer delays between them
        for (let i = 0; i < burstSize; i++) {
          setTimeout(() => {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            if (randomUser && onSendMessage) {
              const burstMessage = burstMessages[Math.floor(Math.random() * burstMessages.length)];
              onSendMessage(burstMessage, randomUser.id);
            }
          }, i * (viewerCount > 1000 ? 100 : 180)); // Increased delay between burst messages
        }
      }
    };
    
    // Set up interval for random messages with longer stagger time
    const chatInterval = setInterval(() => {
      // Get messages to send in this batch
      const batchSize = getMessageBatchSize();
      
      // Send multiple messages if viewer count is high
      for (let i = 0; i < batchSize; i++) {
        // Simulate each chat message with longer delay between them
        setTimeout(() => {
          if (users.length > 0 && onSendMessage) {
            // Select random user
            const randomUser = users[Math.floor(Math.random() * users.length)];
            
            // Select message based on viewer count
            let randomMessage;
            if (viewerCount > 1000 && Math.random() < 0.6) {
              // Use more emote/short messages for high viewer counts
              randomMessage = highViewerCountMessages[Math.floor(Math.random() * highViewerCountMessages.length)];
            } else {
              randomMessage = chatMessages[Math.floor(Math.random() * chatMessages.length)];
            }
            
            if (randomUser) {
              onSendMessage(randomMessage, randomUser.id);
            }
          }
        }, i * 250); // Increased stagger between messages from 150ms to 250ms
      }
      
      // Occasionally trigger chat bursts
      simulateChatBurst();
      
      // Adjust interval for next message
    }, getRandomizedInterval());
    
    // Special effect: chat acceleration for milestone viewer counts - reduced frequency
    const accelerationInterval = setInterval(() => {
      const milestones = [1000, 5000, 10000];
      const isAtMilestone = milestones.some(milestone => 
        Math.abs(viewerCount - milestone) < 50 || // Near milestone
        (viewerCount > milestone && viewerCount < milestone * 1.1) // Just passed milestone
      );
      
      // Reduced probability of milestone celebration
      if (isAtMilestone && Math.random() < 0.2 && users.length > 0) { // Reduced from 0.3
        // Generate excitement messages for hitting viewer milestones
        const celebrationMessages = [
          `${viewerCount} viewers! Let's go!`,
          `We hit ${viewerCount}! Incredible!`,
          `${viewerCount} strong! Amazing stream!`,
          `That's ${viewerCount} of us now!`,
          `${viewerCount} hype train!`
        ];
        
        // Send a small burst of celebration messages with longer delays
        for (let i = 0; i < 4; i++) { // Reduced from 5
          setTimeout(() => {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            if (randomUser && onSendMessage) {
              const celebMessage = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
              onSendMessage(celebMessage, randomUser.id);
            }
          }, i * 300); // Increased from 200ms to 300ms
        }
      }
    }, 25000); // Increased from 15000ms to 25000ms
    
    return () => {
      clearInterval(chatInterval);
      clearInterval(accelerationInterval);
    };
  }, [viewerCount, users, onSendMessage]);
  
  // Add this at the beginning of the component or modify your keyframes in CSS
  useEffect(() => {
    // Add these keyframes to the document if you haven't defined them in your CSS
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideInLeft {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideInRight {
        from { transform: translateX(20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes bounceIn {
        0% { transform: scale(0.8); opacity: 0; }
        50% { transform: scale(1.05); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
      
      @keyframes donationHighlight {
        0% { transform: scale(0.95); opacity: 0; box-shadow: 0 0 0 rgba(59, 130, 246, 0); }
        20% { transform: scale(1.05); opacity: 0.9; box-shadow: 0 0 15px rgba(59, 130, 246, 0.7); }
        40% { transform: scale(1.02); box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
        60% { transform: scale(1.04); box-shadow: 0 0 15px rgba(59, 130, 246, 0.7); }
        80% { transform: scale(1.01); box-shadow: 0 0 8px rgba(59, 130, 246, 0.4); }
        100% { transform: scale(1); opacity: 1; box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
      }
      
      @keyframes giftHighlight {
        0% { transform: scale(0.95); opacity: 0; box-shadow: 0 0 0 rgba(168, 85, 247, 0); }
        20% { transform: scale(1.04); opacity: 0.9; box-shadow: 0 0 15px rgba(168, 85, 247, 0.7); }
        40% { transform: scale(1.01); box-shadow: 0 0 10px rgba(168, 85, 247, 0.5); }
        100% { transform: scale(1); opacity: 1; box-shadow: 0 0 5px rgba(168, 85, 247, 0.3); }
      }
      
      @keyframes shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }
      
      @keyframes superlike {
        0% { transform: scale(1); }
        20% { transform: scale(1.5) rotate(10deg); }
        40% { transform: scale(1.25) rotate(-8deg); }
        60% { transform: scale(1.5) rotate(12deg); }
        80% { transform: scale(1.25) rotate(-5deg); }
        100% { transform: scale(1); }
      }
      
      @keyframes superdislike {
        0% { transform: scale(1); }
        25% { transform: scale(1.4) rotate(-12deg); }
        50% { transform: scale(1.2) rotate(10deg); }
        75% { transform: scale(1.4) rotate(-8deg); }
        100% { transform: scale(1); }
      }
      
      @keyframes ripple {
        0% { width: 0; height: 0; opacity: 0.5; }
        100% { width: 200px; height: 200px; opacity: 0; }
      }
      
      @keyframes bounce-once {
        0% { transform: translateY(0); }
        30% { transform: translateY(-4px); }
        50% { transform: translateY(0); }
        70% { transform: translateY(-2px); }
        100% { transform: translateY(0); }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
      
      .animate-slideInLeft {
        animation: slideInLeft 0.4s ease-out forwards;
      }
      
      .animate-slideInRight {
        animation: slideInRight 0.4s ease-out forwards;
      }
      
      .animate-bounceIn {
        animation: bounceIn 0.5s ease-out forwards;
      }
      
      .animate-donationHighlight {
        animation: donationHighlight 1.2s ease-out forwards;
      }
      
      .animate-giftHighlight {
        animation: giftHighlight 1s ease-out forwards;
      }
      
      .animate-shimmer {
        animation: shimmer 3s infinite linear;
      }
      
      .animate-superlike {
        animation: superlike 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }
      
      .animate-superdislike {
        animation: superdislike 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }
      
      .animate-ripple {
        animation: ripple 0.6s ease-out forwards;
      }
      
      .animate-bounce-once {
        animation: bounce-once 0.6s ease-in-out forwards;
      }
      
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
      
      /* For dark theme */
      .theme-dark ::-webkit-scrollbar-track {
        background: rgba(30, 30, 40, 0.7);
      }
      
      .theme-dark ::-webkit-scrollbar-thumb {
        background: rgba(128, 90, 213, 0.8);
      }
      
      /* For light theme */
      .theme-light ::-webkit-scrollbar-track {
        background: rgba(240, 240, 245, 0.7);
      }
      
      .theme-light ::-webkit-scrollbar-thumb {
        background: rgba(128, 90, 213, 0.8);
      }
      
      /* For colorful theme */
      .theme-colorful ::-webkit-scrollbar-track {
        background: rgba(30, 30, 40, 0.7);
      }
      
      .theme-colorful ::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, rgba(128, 90, 213, 0.8), rgba(192, 132, 252, 0.8));
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);
  
  // Enhanced chat message generation with donations and special messages - SLOWED DOWN
  useEffect(() => {
    if (!viewerCount) return;
    
    // Calculate message frequency based on viewer count - SLOWER
    const baseInterval = 8000; // Increased from 5000ms to 8000ms
    const minInterval = 250; // Increased minimum delay from 100ms to 250ms
    
    // Calculate interval: as viewers increase, interval decreases with better scaling
    const calculateInterval = () => {
      if (viewerCount <= 10) return baseInterval;
      if (viewerCount <= 50) return baseInterval / 2;
      if (viewerCount <= 200) return baseInterval / 4;
      if (viewerCount <= 500) return baseInterval / 8;
      if (viewerCount <= 1000) return baseInterval / 15;
      if (viewerCount <= 5000) return baseInterval / 30;
      if (viewerCount <= 10000) return baseInterval / 40;
      return minInterval; // For extremely popular streams (10k+ viewers)
    };
    
    // Add randomness to interval
    const getRandomizedInterval = () => {
      const baseValue = calculateInterval();
      // Add ±30% randomness
      return baseValue * (0.7 + Math.random() * 0.6);
    };
    
    // Calculate how many messages to potentially send each cycle
    const getMessageBatchSize = () => {
      if (viewerCount <= 50) return 1;
      if (viewerCount <= 500) return Math.floor(Math.random() * 2) + 1; // 1-2 messages
      if (viewerCount <= 2000) return Math.floor(Math.random() * 3) + 1; // 1-3 messages
      return Math.floor(Math.random() * 5) + 1; // 1-5 messages for very active chats
    };
    
    // Array of potential chat messages - extended with more realistic streaming chat messages
    const chatMessages = [
      "Hello everyone!",
      "Great stream today",
      "LOL",
      "That was amazing",
      "How do you do that trick?",
      "Wow!!!",
      "First time watching, love the content",
      "Can you explain that again?",
      "POGGERS",
      "Where are you from?",
      "👍👍👍",
      "❤️❤️❤️",
      "That's incredible",
      "What game is next?",
      "I can't believe that just happened",
      "Let's goooo!",
      "F in the chat",
      "KEKW",
      "monkaS",
      "Any tips for beginners?",
      "How long have you been streaming?",
      "Nice one!",
      "What's your setup?",
      "This is epic",
      "Greetings from Germany!",
      "Where can I find your schedule?",
      "Do you have a Discord?",
      "What's your favorite game?",
      "LUL",
      "PogChamp",
      "Yo what's up chat",
      "GG",
      "W",
      "L",
      "Can we get some hype in the chat?",
      "5Head play",
      "Just followed!",
      "I've been watching for 2 years",
      "You're the best!",
      "Clutch!",
      "This reminds me of that one time...",
      "Are you streaming tomorrow?",
      "I'm new here",
      "Hello from Brazil!",
      "First stream I've caught live",
      "😂😂😂",
      "💯",
      "Thoughts on the new update?",
      "Any mods?",
      "🔥🔥🔥",
      "Can we play together sometime?",
      "10/10",
      "Sadge",
      "Big brain",
      "WeirdChamp",
      "YEP",
      "Pog",
      "MonkaW"
    ];
    
    // High viewer count specific messages (more emotes, memes, etc)
    const highViewerCountMessages = [
      "LULW",
      "OMEGALUL",
      "Pog",
      "W",
      "L",
      "KEKW",
      "monkaS",
      "PogU",
      "Pepega",
      "!drop",
      "!rewards",
      "Jebaited",
      "modCheck",
      "widepeepoHappy",
      "Sadge",
      "WeirdChamp",
      "monkaW",
      "YEP",
      "5Head",
      "Kreygasm",
      "PepeHands",
      "EZ Clap",
      "HeyGuys",
      "VoteYea",
      "VoteNay",
      "DoritosChip",
      "TwitchVotes",
      "catJAM",
      "ratJAM",
      "COPIUM",
      "WAYTOODANK",
      "pepeLaugh",
      "MonkaChrist"
    ];
    
    // Simulate chat burst when big moments happen
    const simulateChatBurst = () => {
      // Adjust burst probability based on viewer count
      const burstProbability = viewerCount > 5000 ? 0.08 : 
                              viewerCount > 1000 ? 0.05 : 
                              viewerCount > 500 ? 0.03 : 0.01;
      
      // Only trigger bursts occasionally, more often with higher viewer counts
      if (Math.random() < burstProbability) {
        // Larger bursts for higher viewer counts
        const burstBaseSize = viewerCount > 5000 ? 15 : 
                             viewerCount > 1000 ? 10 : 
                             viewerCount > 500 ? 7 : 5;
                             
        const burstSize = Math.floor(Math.random() * burstBaseSize) + burstBaseSize/2; // Variable size
        const burstMessages = ["OMG!!!", "WHAT???", "HOLY!!!", "AMAZING!!", "INSANE!!!", "NO WAY!!", "CLUTCH!", "POGGERS", "WOW!", "UNBELIEVABLE!"];
        
        // For high viewer counts, add hype emotes to the burst
        if (viewerCount > 1000) {
          burstMessages.push(...["PogChamp", "PogU", "POGGERS", "PogChamp PogChamp", "KEKW", "OMEGALUL", "LETSGOOO", "W", "W W W"]);
        }
        
        // Generate burst of messages
        for (let i = 0; i < burstSize; i++) {
          setTimeout(() => {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            if (randomUser && onSendMessage) {
              const burstMessage = burstMessages[Math.floor(Math.random() * burstMessages.length)];
              onSendMessage(burstMessage, randomUser.id);
            }
          }, i * (viewerCount > 1000 ? 50 : 100)); // Send messages in quicker succession for high viewer counts
        }
      }
    };
    
    // Add donation probability based on viewer count - REDUCED
    const getDonationProbability = () => {
      if (viewerCount <= 100) return 0.005; // Reduced from 0.01
      if (viewerCount <= 500) return 0.01; // Reduced from 0.02
      if (viewerCount <= 1000) return 0.015; // Reduced from 0.03
      return 0.025; // Reduced from 0.05
    };
    
    // Generate a random donation amount
    const getRandomDonationAmount = () => {
      const amounts = [1, 2, 3, 5, 10, 20, 50, 100];
      const weightedIndex = Math.floor(Math.random() * Math.random() * amounts.length);
      return amounts[weightedIndex];
    };
    
    // Set up interval for random messages - with longer delays
    const chatInterval = setInterval(() => {
      // Get messages to send in this batch
      const batchSize = getMessageBatchSize();
      
      // Send multiple messages if viewer count is high
      for (let i = 0; i < batchSize; i++) {
        // Simulate each chat message with longer delay between them
        setTimeout(() => {
          if (users.length > 0 && onSendMessage) {
            // Select random user
            const randomUser = users[Math.floor(Math.random() * users.length)];
            
            // Select message based on viewer count
            let randomMessage;
            if (viewerCount > 1000 && Math.random() < 0.6) {
              // Use more emote/short messages for high viewer counts
              randomMessage = highViewerCountMessages[Math.floor(Math.random() * highViewerCountMessages.length)];
            } else {
              randomMessage = chatMessages[Math.floor(Math.random() * chatMessages.length)];
            }
            
            // Determine if this message has a donation
            const hasDonation = Math.random() < getDonationProbability();
            const donationAmount = hasDonation ? getRandomDonationAmount() : 0;
            
            // Add "Thanks for the sub" messages randomly when chat is active
            if (randomUser && randomUser.isSub && Math.random() < 0.08) {
              const thankMessages = [
                "Thanks for the sub support!",
                "Appreciate the sub <3",
                "Thanks for subscribing!",
                "Sub hype! Thank you!",
                "Thanks for the support!"
              ];
              randomMessage = thankMessages[Math.floor(Math.random() * thankMessages.length)];
            }
            
            if (randomUser) {
              onSendMessage(randomMessage, randomUser.id, {
                hasDonation,
                donationAmount,
                isHighlighted: Math.random() < 0.1 // 10% chance for a message to be highlighted
              });
            }
          }
        }, i * 250); // Increased from 150ms to 250ms
      }
      
      // Occasionally trigger chat bursts
      simulateChatBurst();
      
    }, getRandomizedInterval());
    
    // Special effect: chat acceleration for milestone viewer counts
    const accelerationInterval = setInterval(() => {
      const milestones = [1000, 5000, 10000];
      const isAtMilestone = milestones.some(milestone => 
        Math.abs(viewerCount - milestone) < 50 || // Near milestone
        (viewerCount > milestone && viewerCount < milestone * 1.1) // Just passed milestone
      );
      
      if (isAtMilestone && Math.random() < 0.3 && users.length > 0) {
        // Generate excitement messages for hitting viewer milestones
        const celebrationMessages = [
          `${viewerCount} viewers! Let's go!`,
          `We hit ${viewerCount}! Incredible!`,
          `${viewerCount} strong! Amazing stream!`,
          `That's ${viewerCount} of us now!`,
          `${viewerCount} hype train!`
        ];
        
        // Send a small burst of celebration messages
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            if (randomUser && onSendMessage) {
              const celebMessage = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
              onSendMessage(celebMessage, randomUser.id);
            }
          }, i * 200);
        }
      }
    }, 15000); // Check every 15 seconds
    
    return () => {
      clearInterval(chatInterval);
      clearInterval(accelerationInterval);
    };
  }, [viewerCount, users, onSendMessage]);
  
  // Handle emoji reaction
  const handleSendReaction = (emoji) => {
    if (!currentUser) {
      onAuthModalOpen();
      return;
    }
    
    onSendMessage(emoji, currentUser.id);
  };
  
  // Handle emoji selection from picker
  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji);
  };
  
  // Add emojis to chat messages list
  const emojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", 
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", 
    "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
    "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💔", "❣️", "💕",
    "👍", "👎", "👏", "🙌", "👐", "🤲", "🤝", "👊", "✊", "🤛",
    "🔥", "💯", "💫", "⭐", "✨", "💨", "💦", "🎉", "🎊", "🎈"
  ];
  
  // Define helper function for font size classes
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-xs';
      case 'large': return 'text-base';
      default: return 'text-sm';
    }
  };
  
  // Define chat tabs
  const chatTabs = [
    { id: 'chat', label: 'Chat' },
    { id: 'users', label: 'Users' },
    { id: 'settings', label: 'Settings' }
  ];
  
  // Handle submit for chat form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && currentUser) {
      onSendMessage(newMessage, currentUser.id);
      setNewMessage('');
    } else if (!currentUser) {
      onAuthModalOpen();
    }
  };
  
  // Handle clicking on the "New messages" button
  const handleNewMessagesClick = () => {
    scrollToBottom({ behavior: 'smooth', force: true });
    setHasNewMessages(false);
  };
  
  return (
    <div className={`h-full flex flex-col bg-gray-900 theme-${chatTheme} w-full max-h-[calc(100vh-4rem)]`}>
      {/* Metrics Display */}
      <StreamMetrics 
        viewerCount={viewerCount} 
        likes={likes} 
        dislikes={dislikes} 
        onLike={onLike} 
        onDislike={onDislike}
        currentUser={currentUser}
      />
      
      {/* Chat Tabs */}
      <div className="border-b border-gray-800">
        <div className="flex">
          {chatTabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                visibleTab === tab.id
                  ? 'text-white border-purple-500'
                  : 'text-gray-400 border-transparent hover:text-gray-300 hover:bg-gray-800/50'
              }`}
              onClick={() => setVisibleTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Chat Content - Fixed height to match video */}
      <div className="flex-1 overflow-hidden" style={{ height: 'calc(100% - 11rem)' }}>
        {visibleTab === 'chat' && (
          <div 
            ref={chatContainerRef}
            className={`h-full overflow-y-auto px-2 py-3 space-y-1 ${getFontSizeClass()}`}
          >
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-center px-4">
                  No messages yet. Be the first to say hello!
                </p>
              </div>
            ) : (
              messages.map(message => {
                const user = users.find(u => u.id === message.userId);
                if (!user) return null;
                return <ChatMessage key={message.id} message={message} user={user} />;
              })
            )}
            <div ref={messagesEndRef} className="h-0 w-full" />
            
            {/* Improved "New messages" button */}
            {hasNewMessages && messages.length > 0 && (
              <button 
                onClick={handleNewMessagesClick}
                className="sticky bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-600 hover:bg-purple-500 text-white rounded-full px-4 py-1.5 text-xs shadow-lg animate-pulse z-20 transition-colors"
              >
                ↓ New messages
              </button>
            )}
          </div>
        )}
        
        {visibleTab === 'users' && (
          <div className="h-full overflow-y-auto p-4">
            <h3 className="text-white font-medium mb-3">Users in Chat ({users.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {users.map(user => (
                <div key={user.id} className="flex items-center p-2 rounded-md hover:bg-gray-800/50">
                  <ReliableProfile 
                    user={user}
                    size="sm"
                    className="mr-2"
                    showStatus={user.isLive}
                  />
                  <div>
                    <p className={`${user.isSub ? 'text-purple-400' : 'text-white'} font-medium`}>{user.name}</p>
                    {user.isSub && (
                      <p className="text-xs text-gray-400">{user.subMonths} month subscriber</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {visibleTab === 'settings' && (
          <div className="h-full overflow-y-auto p-4">
            <h3 className="text-white font-medium mb-4">Chat Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm text-gray-300 mb-2">Theme</h4>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setChatTheme('dark')}
                    className={`w-8 h-8 rounded-full bg-gray-900 border-2 ${chatTheme === 'dark' ? 'border-purple-500' : 'border-gray-700'}`}
                    aria-label="Dark theme"
                  ></button>
                  <button 
                    onClick={() => setChatTheme('light')}
                    className={`w-8 h-8 rounded-full bg-gray-100 border-2 ${chatTheme === 'light' ? 'border-purple-500' : 'border-gray-700'}`}
                    aria-label="Light theme"
                  ></button>
                  <button 
                    onClick={() => setChatTheme('colorful')}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br from-purple-900 to-gray-900 border-2 ${chatTheme === 'colorful' ? 'border-purple-500' : 'border-gray-700'}`}
                    aria-label="Colorful theme"
                  ></button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-300 mb-2">Font Size</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFontSize('small')}
                    className={`px-3 py-1 rounded ${fontSize === 'small' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => setFontSize('medium')}
                    className={`px-3 py-1 rounded ${fontSize === 'medium' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-3 py-1 rounded ${fontSize === 'large' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                  >
                    Large
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-300 mb-2">Scroll Settings</h4>
                <label className="flex items-center text-gray-300">
                  <input 
                    type="checkbox" 
                    className="form-checkbox h-5 w-5 text-purple-600 rounded bg-gray-700 border-gray-600" 
                    checked={autoScroll} 
                    onChange={(e) => {
                      setAutoScroll(e.target.checked);
                      if (e.target.checked) {
                        scrollToBottom();
                      }
                    }} 
                  />
                  <span className="ml-2">Auto-scroll to new messages</span>
                </label>
                <p className="text-xs text-gray-400 mt-1 ml-7">
                  When disabled, you'll need to manually scroll to see new messages
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quick Emoji Reactions */}
      <QuickReactions 
        onSendReaction={handleSendReaction}
        disabled={!currentUser}
      />
      
      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-800 flex space-x-2">
        <input
          type="text"
          placeholder={currentUser ? "Send a message" : "Sign in to chat"}
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          className="flex-1 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
          disabled={!currentUser}
        />
        
        <button 
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          disabled={!currentUser || !newMessage.trim()}
        >
          Chat
        </button>
      </form>
    </div>
  );
}

export default Chat;
