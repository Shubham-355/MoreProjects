import React, { useState } from 'react';

const StreamGridItem = ({ stream }) => {
  const [thumbnailError, setThumbnailError] = useState(false);
  
  // Default fallback thumbnail that's guaranteed to exist in your public folder
  const defaultThumbnail = '/assets/fallbacks/stream-placeholder.jpg';
  
  // Handle thumbnail error more gracefully
  const handleThumbnailError = () => {
    console.log(`Using fallback thumbnail for stream: ${stream.title}`);
    setThumbnailError(true);
  };

  // Safely extract streamer name (either string or object)
  const streamerName = typeof stream.streamer === 'object' 
    ? (stream.streamer.name || 'Unknown Streamer') 
    : stream.streamer;

  return (
    <div className="stream-grid-item h-full">
      <div className="relative aspect-video bg-gray-700">
        <img 
          src={thumbnailError ? defaultThumbnail : (stream.thumbnailUrls?.[0] || defaultThumbnail)}
          alt={stream.title}
          className="w-full h-full object-cover"
          onError={handleThumbnailError}
        />
        <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-1 py-0.5 rounded">
          LIVE
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded flex items-center">
          <span className="mr-1">●</span>
          {stream.viewers.toLocaleString()}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-white font-medium truncate">{stream.title}</h3>
        <p className="text-gray-400 text-sm mt-1">{streamerName}</p>
        <p className="text-gray-500 text-xs mt-1">{stream.game}</p>
      </div>
    </div>
  );
};

export default StreamGridItem;