import { useState, useEffect, useRef } from 'react';

function StreamGridItem({ stream, onClick, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);
  
  // Observe when item enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);
  
  const handleThumbnailError = () => {
    if (thumbnailIndex < stream.thumbnails.length - 1) {
      setThumbnailIndex(thumbnailIndex + 1);
    } else {
      // Set a fallback colored background with text overlay
      console.error(`All thumbnails failed for stream: ${stream.title}`);
      // We'll let the CSS handle showing the fallback content
    }
  };

  const handleAvatarError = () => {
    if (avatarIndex < stream.streamer.avatars.length - 1) {
      setAvatarIndex(avatarIndex + 1);
    } else {
      // Generate a fallback colored avatar with initials
      console.error(`All avatars failed for streamer: ${stream.streamer.name}`);
    }
  };
  
  // Calculate animation delay based on index
  const getAnimationDelay = () => {
    return `${Math.min(index * 0.1, 0.9)}s`;
  };

  // Direct click handler that correctly passes the stream object
  const handleClick = () => {
    console.log("StreamGridItem clicked, stream object:", stream);
    // Ensure we're passing the full stream object to the parent component
    onClick(stream);
  };

  return (
    <div 
      ref={itemRef}
      onClick={handleClick}
      className={`cursor-pointer rounded-xl overflow-hidden bg-gray-800 transition-all duration-300 transform ${
        isHovered ? 'scale-105 shadow-neon-light z-10' : 'scale-100'
      } ${isVisible ? 'animate-scale-up' : 'opacity-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: getAnimationDelay() }}
    >
      <div className="relative">
        <div className="aspect-video overflow-hidden bg-purple-900/50">
          {/* Fallback content that will show when the image fails */}
          <div className="absolute inset-0 flex items-center justify-center z-0 p-4">
            <p className="text-white text-center font-bold">{stream.title}</p>
          </div>
          
          <img 
            src={stream.thumbnails[thumbnailIndex]} 
            alt={stream.title} 
            className={`w-full h-full object-cover transition-all duration-500 relative z-10 ${
              isHovered ? 'scale-110 brightness-110' : 'scale-100'
            }`}
            onError={handleThumbnailError}
            onLoad={() => {
              // If image loads successfully, make sure it's visible above the fallback
              const img = document.getElementById(`thumb-${stream.id}`);
              if (img) img.style.opacity = 1;
            }}
            id={`thumb-${stream.id}`}
          />
          
          {/* Color overlay gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-70 transition-opacity duration-300 ${
            isHovered ? 'opacity-40' : 'opacity-70'
          }`}></div>
          
          {/* Purple glow on hover */}
          <div className={`absolute inset-0 bg-purple-900/30 transition-opacity duration-300 ${
            isHovered ? 'opacity-30' : 'opacity-0'
          }`}></div>
        </div>
        
        {/* Live badge */}
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-md flex items-center">
          <span className="h-1.5 w-1.5 bg-white rounded-full inline-block animate-pulse mr-1"></span>
          LIVE
        </div>
        
        {/* Viewers count */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
          {stream.viewers.toLocaleString()} viewers
        </div>
        
        {/* Play button on hover */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-purple-600/80 rounded-full p-3 transform transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Stream info */}
      <div className="p-4">
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full mr-3 relative overflow-hidden">
            {/* Fallback avatar with initials */}
            <div 
              className="absolute inset-0 bg-purple-600 flex items-center justify-center text-white font-bold"
              aria-hidden="true"
            >
              {stream.streamer.name.charAt(0)}
            </div>
            
            <img 
              src={stream.streamer.avatars[avatarIndex]} 
              alt={stream.streamer.name} 
              className={`h-full w-full object-cover absolute inset-0 border-2 transition-all duration-300 ${
                isHovered ? 'border-purple-500 animate-pulse-once' : 'border-gray-700'
              }`}
              onError={handleAvatarError}
            />
          </div>
          <div>
            <h3 className={`font-medium transition-colors duration-300 line-clamp-1 ${
              isHovered ? 'text-purple-400' : 'text-white'
            }`}>
              {stream.title}
            </h3>
            <p className="text-gray-400 text-sm">{stream.streamer.name}</p>
            <p className="text-gray-400 text-sm">{stream.game}</p>
          </div>
        </div>
        
        {/* Tags (show on hover) */}
        <div className={`mt-3 flex flex-wrap gap-1 transition-all duration-300 ${
          isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          {stream.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-gray-700 px-2 py-0.5 rounded-md text-xs text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StreamGridItem;
