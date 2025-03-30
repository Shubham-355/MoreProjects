import React, { useState } from 'react';
import ReliableImage from '../UI/ReliableImage';
import ReliableProfile from '../UI/ReliableProfile';

function StreamCard({ stream, onClick, hideCategory = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);

  // Extract streamer details, handling both string and object formats
  const streamerName = typeof stream.streamer === 'string' 
    ? stream.streamer 
    : stream.streamer?.name || 'Unknown Streamer';
  
  const streamerAvatar = typeof stream.streamer === 'object'
    ? stream.streamer.avatars?.[0]
    : null;

  // Use the first thumbnail or fallback
  const thumbnailUrl = stream.thumbnails?.[0] || stream.thumbnailUrls?.[0] || '/assets/fallbacks/stream-placeholder.jpg';
  
  // Generate a title for the thumbnail image
  const thumbnailAlt = `${stream.title || "Stream"} by ${streamerName}`;

  // Handle thumbnail error in addition to ReliableImage's built-in handling
  const handleThumbnailError = () => {
    setThumbnailFailed(true);
  };

  // Generate a game-specific color for text-based stream thumbnails
  const getGameColor = () => {
    const gameColors = {
      'Valorant': '#fd4556',
      'Minecraft': '#8abc3f',
      'League of Legends': '#d8a54e',
      'Fortnite': '#9d4dbb',
      'Call of Duty': '#618549',
      'Apex Legends': '#d13438',
      'Starfield': '#2d1b69'
    };
    
    return gameColors[stream.game] || '#6441a5'; // Default to Twitch purple
  };

  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(stream)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-video overflow-hidden">
        <ReliableImage
          src={thumbnailUrl}
          fallbackSrc="/assets/fallbacks/stream-placeholder.jpg"
          alt={thumbnailAlt}
          className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
          onError={handleThumbnailError}
        />
        
        {/* Live Indicator and Viewer Count */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
        
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md flex items-center">
          <span className="h-2 w-2 bg-white rounded-full inline-block animate-pulse mr-1"></span>
          <span>LIVE</span>
        </div>
        
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
          {(stream.viewers || 0).toLocaleString()} viewers
        </div>
        
        {/* Play button overlay on hover */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <div className="bg-purple-600/90 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Stream Info Section */}
      <div className="p-3">
        {/* Streamer Info */}
        <div className="flex items-start mb-2">
          <div className="mr-3 mt-1">
            {typeof stream.streamer === 'object' ? (
              <ReliableProfile
                user={stream.streamer}
                size="sm"
                showStatus={stream.streamer?.isLive || stream.isLive}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold">
                {streamerName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-base line-clamp-1 group-hover:text-purple-400 transition-colors">
              {stream.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-1">
              {streamerName}
            </p>
            
            {!hideCategory && stream.game && (
              <p className="text-purple-400 text-xs mt-1">
                {stream.game}
              </p>
            )}
          </div>
        </div>
        
        {/* Tags Section */}
        {stream.tags && stream.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {stream.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i}
                className="px-2 py-0.5 text-xs bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StreamCard;
