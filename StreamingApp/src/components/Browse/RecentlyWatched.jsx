import { useState, useEffect } from 'react';

function RecentlyWatched({ onStreamSelect }) {
  const [recentStreams, setRecentStreams] = useState([]);
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    // Get recently watched streams from localStorage
    const loadRecentStreams = () => {
      try {
        const saved = localStorage.getItem('recentlyWatched');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRecentStreams(parsed);
          }
        }
      } catch (e) {
        console.error("Failed to load recently watched streams", e);
      }
    };
    
    loadRecentStreams();
  }, []);
  
  if (!recentStreams || recentStreams.length === 0) return null;
  
  // Only show the first 4 items when not expanded
  const displayedStreams = expanded ? recentStreams : recentStreams.slice(0, 4);
  
  return (
    <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-lg font-medium">Continue Watching</h3>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-white text-sm transition-colors focus:outline-none"
        >
          {expanded ? 'Show Less' : 'Show All'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {displayedStreams.map(stream => (
          <div 
            key={stream.id} 
            className="relative cursor-pointer group"
            onClick={() => onStreamSelect(stream)}
          >
            <div className="aspect-video rounded-md overflow-hidden">
              <div className="relative w-full h-full">
                <img 
                  src={stream.thumbnail} 
                  alt={stream.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Stream progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                  <div 
                    className="h-full bg-purple-500" 
                    style={{ width: `${stream.progress || 0}%` }}
                  ></div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
                
                {/* Play button overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-purple-600 rounded-full p-3 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                
                {/* Live badge if stream is live */}
                {stream.isLive && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded">
                    LIVE
                  </div>
                )}
                
                {/* Last watched time */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {stream.lastWatchedAt}
                </div>
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-white text-sm font-medium line-clamp-1">{stream.title}</p>
              <p className="text-gray-400 text-xs">{stream.streamer.name}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Show "clear history" button only when expanded */}
      {expanded && (
        <div className="mt-3 text-right">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Clear your watch history?')) {
                localStorage.removeItem('recentlyWatched');
                setRecentStreams([]);
              }
            }}
            className="text-red-400 hover:text-red-300 text-sm hover:underline transition-colors"
          >
            Clear Watch History
          </button>
        </div>
      )}
    </div>
  );
}

export default RecentlyWatched;
