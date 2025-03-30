import { useState, useEffect, useRef } from 'react';

function HeroSection({ streams, onStreamSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [thumbnailError, setThumbnailError] = useState(false);
  const streamCount = Math.min(5, streams.length);
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  
  // Observe when hero section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  // Simplified video play/pause logic
  useEffect(() => {
    if (inViewport && videoRef.current && !isAnimating) {
      if (!isVideoPlaying) {
        const timer = setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.volume = 0;
            
            videoRef.current.play().catch(err => {
              console.log("Autoplay prevented:", err);
              setVideoLoaded(true); // Show thumbnail instead
            });
            setIsVideoPlaying(true);
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    } else if (videoRef.current && isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [inViewport, isAnimating]);
  
  // Auto rotate featured streams
  useEffect(() => {
    if (!inViewport || isAnimating) return;
    
    let rotationInterval = setInterval(() => {
      setIsAnimating(true);
      setVideoLoaded(false);
      setIsVideoPlaying(false);
      
      const changeIndexTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % streamCount);
        
        const endAnimationTimer = setTimeout(() => {
          setIsAnimating(false);
        }, 600);
        
        return () => clearTimeout(endAnimationTimer);
      }, 400);
      
      return () => clearTimeout(changeIndexTimer);
    }, 10000); // Reduced to 10 seconds for better engagement
    
    return () => {
      clearInterval(rotationInterval);
    };
  }, [currentIndex, streamCount, inViewport, isAnimating]);
  
  // Handle video loading errors
  const handleVideoError = () => {
    console.log("Video failed to load");
    setVideoLoaded(false);
  };
  
  // Check if streams exist
  if (!streams || streams.length === 0) {
    return (
      <div className="h-96 bg-gray-900 rounded-lg flex items-center justify-center mb-10">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300">Loading featured content...</p>
        </div>
      </div>
    );
  }
  
  const currentStream = streams[currentIndex];
  
  // Get optimized video URL
  const getStreamVideoUrl = () => {
    if (!currentStream) return null;
    
    // Check for video URL
    if (currentStream.videoUrl && isValidUrl(currentStream.videoUrl)) {
      return currentStream.videoUrl;
    }
    
    // Fallback to alternatives
    if (currentStream.fallbackVideoUrls && currentStream.fallbackVideoUrls.length > 0) {
      for (const url of currentStream.fallbackVideoUrls) {
        if (isValidUrl(url)) return url;
      }
    }
    
    return null;
  };
  
  // Validate URL format
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  // Check if the URL is an iframe source
  const isIframeSource = (url) => {
    if (!url) return false;
    return url.includes('youtube.com/embed') || 
           url.includes('player.twitch.tv') || 
           url.includes('drive.google.com/file') ||
           url.includes('mediadelivery.net') || 
           url.includes('cloudflarestream.com');
  };
  
  // Calculate delay for staged animations
  const getAnimationDelay = (index) => {
    return `${index * 0.1}s`;
  };
  
  // Handle stream selection
  const handleStreamClick = () => {
    if (typeof onStreamSelect === 'function') {
      onStreamSelect(currentStream);
    }
  };
  
  // Enhanced iframe URL with parameters
  const getSecureIframeSrc = (url) => {
    if (!url) return '';
    
    let secureUrl = url;
    const separator = secureUrl.includes('?') ? '&' : '?';
    const muteParams = ['mute=1', 'muted=1', 'volume=0', 'autoplay=1'];
     
    return `${secureUrl}${separator}${muteParams.join('&')}`;
  };
  
  // Get optimized thumbnail
  const getOptimizedThumbnail = () => {
    if (!currentStream || !currentStream.thumbnails || !Array.isArray(currentStream.thumbnails)) {
      return 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop';
    }
    
    // Filter out empty or invalid URLs
    const validThumbnails = currentStream.thumbnails.filter(url => 
      url && url.trim() !== '' && isValidUrl(url)
    );
    
    // Return first valid thumbnail or fallback
    return validThumbnails.length > 0 
      ? validThumbnails[0] 
      : 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop';
  };
  
  // Fix potential error if tags don't exist
  const renderTags = () => {
    if (!currentStream.tags || !Array.isArray(currentStream.tags)) {
      return null;
    }
    
    return currentStream.tags.slice(0, 3).map((tag) => (
      <span 
        key={tag} 
        className="bg-gray-800/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm hover:bg-purple-700/60 transition-colors cursor-pointer"
      >
        {tag}
      </span>
    ));
  };

  return (
    <div 
      ref={heroRef}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-purple-900 hero-section mb-10 shadow-xl" 
    >
      {/* Enhanced background with subtle parallax and blur effect */}
      <div className="absolute inset-0 w-full h-full opacity-40">
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-in-out"
          style={{ 
            backgroundImage: thumbnailError ? 
              `linear-gradient(45deg, #2d1b69, #1f1235)` : 
              `url(${getOptimizedThumbnail()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${isAnimating ? 1.1 : 1.05})`,
            filter: 'blur(8px)',
          }}
          onError={() => setThumbnailError(true)}
        ></div>
      </div>
      
      {/* Improved gradient overlay with more depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      
      {/* Content */}
      <div className="relative flex flex-col lg:flex-row h-full min-h-[500px]">
        {/* Left - Stream details column */}
        <div 
          className={`w-full lg:w-1/2 p-6 md:p-8 lg:p-16 flex flex-col justify-end transition-opacity duration-500 ease-in-out ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Streamer info with improved animation */}
          <div className="animate-slide-up" style={{ animationDelay: getAnimationDelay(0) }}>
            <div className="flex items-center mb-6">
              <div className="relative mr-4">
                <div className="w-16 h-16 rounded-full border-2 border-purple-500 overflow-hidden">
                  <img 
                    src={currentStream.streamer?.avatars?.[0] || "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentStream.streamer?.name || "User")} 
                    alt={currentStream.streamer?.name || "Streamer"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentStream.streamer?.name || "User");
                    }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">
                  LIVE
                </div>
              </div>
              <div>
                <p className="text-purple-400 text-sm mb-1">{currentStream.game || "Live Stream"}</p>
                <h3 className="text-white font-bold text-xl md:text-2xl">{currentStream.streamer?.name || "Streamer"}</h3>
              </div>
            </div>
          </div>
          
          {/* Stream title with better typography */}
          <div className="animate-slide-up" style={{ animationDelay: getAnimationDelay(1) }}>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight drop-shadow-md">
              {currentStream.title || "Featured Stream"}
            </h1>
          </div>
          
          {/* Stats & tags */}
          <div
            className="flex flex-wrap items-center gap-4 text-gray-300 mb-8 animate-slide-up" 
            style={{ animationDelay: getAnimationDelay(2) }}
          >
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-ping-slow"></div>
              <span>{(currentStream.viewers || Math.floor(Math.random() * 10000) + 500).toLocaleString()} viewers</span>
            </div>
            
            {renderTags()}
          </div>
          
          {/* Enhanced CTA button */}
          <div className="animate-slide-up" style={{ animationDelay: getAnimationDelay(3) }}>
            <button 
              onClick={handleStreamClick}
              className="group relative w-auto max-w-[250px] px-6 py-3 rounded-xl font-medium overflow-hidden transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97]"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity animate-gradient-x"></div>
              
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Subtle border */}
              <div className="absolute inset-0 rounded-xl border border-white/30 overflow-hidden">
                <div className="absolute top-0 left-0 w-[40%] h-[500%] bg-gradient-to-b from-transparent via-white/40 to-transparent -skew-x-30 animate-border-roam"></div>
              </div>
              
              {/* Text with icon */}
              <div className="relative flex items-center justify-center text-white space-x-2">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Watch Stream
                </span>
                
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-0 w-0 group-hover:h-4 group-hover:w-4 transition-all duration-300 transform group-hover:translate-x-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 10l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          </div>
        </div>
        
        {/* Right - Video/Thumbnail column with improved responsive layout */}
        <div className="w-full lg:w-1/2 relative overflow-hidden">
          <div 
            className={`h-full relative transition-all duration-500 ease-in-out ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {isIframeSource(getStreamVideoUrl()) ? (
              // Iframe for embedded content
              <iframe
                src={getSecureIframeSrc(getStreamVideoUrl())}
                className="w-full h-full min-h-[300px]"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture"
                title={currentStream.title || "Featured Stream"}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></iframe>
            ) : (
              // HTML5 video player with fallback to thumbnail
              <>
                {getStreamVideoUrl() ? (
                  <video
                    ref={videoRef}
                    src={getStreamVideoUrl()}
                    className="w-full h-full object-cover min-h-[300px]"
                    muted={true}
                    playsInline
                    autoPlay={false}
                    loop={true}
                    preload="metadata"
                    onError={handleVideoError}
                    onCanPlay={() => setVideoLoaded(true)}
                    poster={getOptimizedThumbnail()}
                    onClick={handleStreamClick}
                  />
                ) : null}
                
                {(!videoLoaded || !getStreamVideoUrl()) && (
                  <img 
                    src={getOptimizedThumbnail()} 
                    alt={currentStream.title || "Featured Stream"}
                    className="w-full h-full object-cover min-h-[300px] animate-scale-up"
                    onError={() => setThumbnailError(true)}
                  />
                )}
              </>
            )}
            
            {/* Enhanced gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
            
            {/* Video controls - simplified */}
            {isVideoPlaying && (
              <div className="absolute bottom-4 right-4">
                <div 
                  className="bg-black/70 backdrop-blur-sm p-2 rounded-full"
                  title="Muted preview - Click to watch with sound"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Live badge with improved design */}
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
              <span className="h-2 w-2 bg-white rounded-full inline-block animate-pulse"></span>
              <span className="font-medium">LIVE</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Improved navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {Array.from({ length: streamCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setVideoLoaded(false);
              setIsVideoPlaying(false);
              setCurrentIndex(index);
              setTimeout(() => setIsAnimating(false), 600);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-purple-500 w-8' : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
