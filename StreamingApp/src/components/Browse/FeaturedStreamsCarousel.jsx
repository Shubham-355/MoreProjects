import { useState, useEffect, useRef } from 'react';

function FeaturedStreamsCarousel({ streams, onStreamSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const autoScrollTimerRef = useRef(null);
  const MAX_FEATURED_STREAMS = Math.min(5, streams.length);

  // Reset thumbnail index when current stream changes
  useEffect(() => {
    setThumbnailIndex(0);
  }, [currentIndex]);

  // Auto-scroll to the next stream every 8 seconds
  useEffect(() => {
    if (!isHovering && !isAnimating) {
      autoScrollTimerRef.current = setTimeout(() => {
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % MAX_FEATURED_STREAMS);
        
        // Reset animation state after transition completes
        setTimeout(() => {
          setIsAnimating(false);
        }, 700); // Match this with the CSS transition duration
      }, 8000);
    }
    
    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
    };
  }, [currentIndex, isHovering, MAX_FEATURED_STREAMS, isAnimating]);

  // Handle thumbnail error
  const handleThumbnailError = () => {
    const currentStream = streams[currentIndex];
    if (thumbnailIndex < currentStream.thumbnails.length - 1) {
      setThumbnailIndex(thumbnailIndex + 1);
    }
  };

  // Manual navigation
  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
    
    // Reset the auto-scroll timer when manually navigating
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
    }
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    goToSlide((currentIndex - 1 + MAX_FEATURED_STREAMS) % MAX_FEATURED_STREAMS);
  };

  const goToNextSlide = () => {
    if (isAnimating) return;
    goToSlide((currentIndex + 1) % MAX_FEATURED_STREAMS);
  };

  // If there are no streams, show placeholder
  if (!streams || streams.length === 0) {
    return (
      <div className="relative bg-gray-800 rounded-lg overflow-hidden mb-10 aspect-video w-full animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400">Loading featured streams...</p>
        </div>
      </div>
    );
  }

  const currentStream = streams[currentIndex];

  return (
    <div 
      className="relative bg-gray-800 rounded-lg overflow-hidden mb-10"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex flex-col md:flex-row">
        {/* Left side - Video/Thumbnail (50% width on desktop) */}
        <div className="md:w-1/2 relative">
          <div className="aspect-video relative overflow-hidden">
            <img 
              key={`${currentIndex}-${thumbnailIndex}`} /* Key helps with re-rendering on change */
              src={currentStream.thumbnails[thumbnailIndex]} 
              alt={currentStream.title} 
              className={`w-full h-full object-cover transition-all duration-700 ${isAnimating ? 'opacity-0 scale-110' : 'opacity-100 hover:scale-105'}`}
              onError={handleThumbnailError}
              onLoad={() => setIsAnimating(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
            
            {/* Live badge */}
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
              <span className="h-1.5 w-1.5 bg-white rounded-full inline-block animate-pulse"></span>
              <span>LIVE</span>
            </div>
            
            {/* Play button overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              onClick={() => onStreamSelect(currentStream)}
            >
              <div className="bg-purple-600/80 rounded-full p-5 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {Array.from({ length: MAX_FEATURED_STREAMS }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-purple-500 w-6' : 'bg-gray-400/50 hover:bg-gray-300/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Right side - Stream details (50% width on desktop) */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100 animate-fadeIn'}`}>
            <div className="flex items-center mb-4">
              <img 
                src={currentStream.streamer.avatars[0]} 
                alt={currentStream.streamer.name}
                className="w-12 h-12 rounded-full border-2 border-purple-500 mr-3"
                onError={(e) => {
                  if (currentStream.streamer.avatars.length > 1) {
                    e.target.src = currentStream.streamer.avatars[1];
                  }
                }}
              />
              <div>
                <h3 className="text-white font-bold text-lg">{currentStream.streamer.name}</h3>
                <p className="text-gray-400 text-sm">{currentStream.game}</p>
              </div>
            </div>
            
            <h2 className="text-white text-2xl font-bold mb-4 leading-tight">{currentStream.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {currentStream.tags.map(tag => (
                <span key={tag} className="bg-gray-700 px-2 py-1 rounded-full text-xs text-gray-300">{tag}</span>
              ))}
            </div>
            
            <div className="text-gray-300 mb-6">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                <span>{currentStream.viewers.toLocaleString()} viewers</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => onStreamSelect(currentStream)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-medium transition-colors duration-300"
            >
              Watch Stream
            </button>
            <button 
              onClick={goToPrevSlide}
              className="bg-gray-700 hover:bg-gray-600 p-3 rounded-md text-white transition-colors duration-300"
              disabled={isAnimating}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={goToNextSlide}
              className="bg-gray-700 hover:bg-gray-600 p-3 rounded-md text-white transition-colors duration-300"
              disabled={isAnimating}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Preview of next streams */}
      <div className="hidden lg:flex absolute top-1/2 right-0 transform translate-x-1/3 -translate-y-1/2 gap-2">
        {[1, 2].map((offset) => {
          const nextIndex = (currentIndex + offset) % MAX_FEATURED_STREAMS;
          const nextStream = streams[nextIndex];
          
          return (
            <div 
              key={nextIndex} 
              className="w-32 h-18 rounded-md overflow-hidden cursor-pointer shadow-lg transform transition-transform duration-300 hover:translate-x-4 hover:scale-110"
              onClick={() => goToSlide(nextIndex)}
              style={{ 
                opacity: 0.7 - (offset * 0.3),
                transform: `translateX(${-offset * 10}px) scale(${1 - offset * 0.1})` 
              }}
            >
              <img 
                src={nextStream.thumbnails[0]} 
                alt={nextStream.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (nextStream.thumbnails.length > 1) {
                    e.target.src = nextStream.thumbnails[1];
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeaturedStreamsCarousel;
