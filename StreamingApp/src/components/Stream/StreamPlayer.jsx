import { useState, useRef, useEffect } from 'react';
import { MOCK_VIDEO_URLS, MOCK_LIVE_STREAMS } from '../../data/mockData';
import '../../styles/CustomVideoPlayer.css';

function StreamPlayer({ stream }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isShowingControls, setIsShowingControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [videoUrlIndex, setVideoUrlIndex] = useState(0);
  const [isIframe, setIsIframe] = useState(false);
  const [useCustomPlayer, setUseCustomPlayer] = useState(true);
  const [lastMouseMoveTime, setLastMouseMoveTime] = useState(Date.now());
  const [controlsVisible, setControlsVisible] = useState(true);
  
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeout = useRef(null);
  
  // Get current video URL with fallback support - differentiating between live and VOD
  const getCurrentVideoUrl = () => {
    // Check if this is a live stream or VOD
    const isLiveStream = stream.isLive !== false;
    
    // Try the main video URL first
    if (videoUrlIndex === 0) {
      return stream.videoUrl;
    }
    
    // Next try any fallback URLs provided specifically for this stream
    if (stream.fallbackVideoUrls && videoUrlIndex <= stream.fallbackVideoUrls.length) {
      return stream.fallbackVideoUrls[videoUrlIndex - 1];
    }
    
    // If all specific fallbacks fail, use the appropriate general fallbacks
    const globalFallbackIndex = videoUrlIndex - (stream.fallbackVideoUrls?.length || 0) - 1;
    
    // Google Drive-like embedded video URLs for reliable playback
    const googleDriveEmbeds = [
      // Public video files that can be reliably embedded
      "https://drive.google.com/file/d/1evz4wd-3pn2ya5ZLZDY1HGxUDfQ0P1EI/preview", // Nature video
      "https://drive.google.com/file/d/1l4f5GQCmF-IoT5-S0ZoDnhLFMuLnMM8s/preview", // Ocean waves
      "https://drive.google.com/file/d/1tZ-6_lhwRbDRqnU-zw43KaY4JJpJJVUO/preview", // Mountain scenery
      "https://www.googleapis.com/drive/v3/files/1tZ-6_lhwRbDRqnU-zw43KaY4JJpJJVUO?alt=media&key=YOUR_API_KEY"
    ];
    
    // Alternate reliable streaming services that offer iframe embeds
    const reliableStreamEmbeds = [
      "https://iframe.mediadelivery.net/embed/153921/db81d241-b6e1-4b8e-97a6-7f65eec8c48a", // Bunny.net stream
      "https://customer-3m7b3c8wqp89oa9z.cloudflarestream.com/9a6bf4bec6dcf9f9916942ddb230f5f8/iframe", // Cloudflare Stream
      "https://iframe.videodelivery.net/ab811a5f25416e08214785b9a3f651b5" // Another Cloudflare Stream
    ];
    
    // Choose from appropriate sources based on whether this is live or VOD
    if (isLiveStream && globalFallbackIndex < reliableStreamEmbeds.length) {
      // Use a live stream fallback for live content
      return reliableStreamEmbeds[globalFallbackIndex % reliableStreamEmbeds.length];
    } else if (globalFallbackIndex < googleDriveEmbeds.length) {
      // Use a Google Drive embed for VOD content
      return googleDriveEmbeds[globalFallbackIndex % googleDriveEmbeds.length];
    } else if (MOCK_LIVE_STREAMS && isLiveStream) {
      // Fallback to our original mock streams
      return MOCK_LIVE_STREAMS[globalFallbackIndex % MOCK_LIVE_STREAMS.length];
    } else if (MOCK_VIDEO_URLS) {
      // Last resort fallback
      return MOCK_VIDEO_URLS[globalFallbackIndex % MOCK_VIDEO_URLS.length];
    }
    
    // Ultimate fallback
    return isLiveStream 
      ? "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1" // Lo-fi livestream
      : "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; // Reliable MP4
  };
  
  // Check if the video URL is for an iframe (YouTube, Google Drive or other embed)
  useEffect(() => {
    const url = getCurrentVideoUrl();
    setIsIframe(
      url.includes('youtube.com/embed') || 
      url.includes('player.twitch.tv') || 
      url.includes('drive.google.com/file') ||
      url.includes('mediadelivery.net') ||
      url.includes('cloudflarestream.com') ||
      url.includes('videodelivery.net')
    );
  }, [videoUrlIndex]);
  
  // Handle video loading error
  const handleVideoError = () => {
    console.warn(`Video at index ${videoUrlIndex} failed to load, trying next fallback...`);
    
    // Calculate the total number of available video sources
    const totalFallbacks = (stream.fallbackVideoUrls?.length || 0) + 10; // 10 is our guaranteed fallbacks
    
    // Try the next video URL if available
    if (videoUrlIndex < totalFallbacks) {
      setVideoUrlIndex(videoUrlIndex + 1);
    } else {
      console.error("All video sources failed to load");
      setIsPlaying(false);
      
      // If the enhanced player fails repeatedly, try falling back to the basic player
      if (useCustomPlayer) {
        setUseCustomPlayer(false);
        setVideoUrlIndex(0); // Reset and try the basic player
      }
    }
  };
  
  // Auto-play for live streams after component mounts
  useEffect(() => {
    if (stream.isLive !== false) {
      // Small delay to ensure UI is ready
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [stream.isLive]);
  
  // Improved to optimize video performance and prevent memory leaks
  useEffect(() => {
    // Cleanup function to prevent memory leaks
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
      
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);
  
  // Optimized video source switching
  useEffect(() => {
    if (!isIframe && videoRef.current) {
      const videoElement = videoRef.current;
      
      // Only reload the video if the source has changed
      const newSrc = getCurrentVideoUrl();
      if (videoElement.src !== newSrc) {
        videoElement.src = newSrc;
        videoElement.load();
      }
      
      // Set volume and mute state
      videoElement.volume = volume / 100;
      videoElement.muted = isMuted;
      
      // Play or pause based on state
      if (isPlaying) {
        videoElement.play().catch(error => {
          console.error("Error playing video:", error);
          handleVideoError();
        });
      } else {
        videoElement.pause();
      }
    }
  }, [isPlaying, videoUrlIndex, isIframe, volume, isMuted]);
  
  // Handle thumbnail error
  const handleThumbnailError = () => {
    if (thumbnailIndex < stream.thumbnails.length - 1) {
      setThumbnailIndex(thumbnailIndex + 1);
    }
  };
  
  // Handle play/pause button click
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Show controls when mouse moves - improved to prevent scrolling and unwanted behaviors
  const showControls = (e) => {
    // Stop all propagation and prevent default to avoid any scroll events
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    setLastMouseMoveTime(Date.now());
    setControlsVisible(true);
    
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    
    if (isPlaying) {
      controlsTimeout.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
  };
  
  // Render the appropriate video player based on type and settings
  const renderVideoPlayer = () => {
    if (!isPlaying) {
      // Thumbnail view (before play)
      return (
        <div className="relative aspect-video cursor-pointer" onClick={handlePlayPause}>
          <img
            src={stream.thumbnails[thumbnailIndex]}
            alt={stream.title}
            className="w-full h-full object-cover"
            onError={handleThumbnailError}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button className="bg-purple-600/80 hover:bg-purple-600 text-white rounded-full p-4 transform transition-transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      );
    } else if (isIframe) {
      // Iframe player with sandbox attributes for better performance
      return (
        <div className="aspect-video relative">
          <iframe
            ref={iframeRef}
            src={getCurrentVideoUrl()}
            className="w-full h-full border-0"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            sandbox="allow-same-origin allow-scripts allow-popups allow-presentation allow-forms"
            loading="lazy"
            title={stream.title}
            onError={handleVideoError}
          ></iframe>
        </div>
      );
    } else {
      // Custom video player
      return (
        <video
          ref={videoRef}
          className="w-full aspect-video cursor-pointer custom-video-player"
          onClick={handlePlayPause}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onError={handleVideoError}
          poster={stream.thumbnails[thumbnailIndex]}
          preload="metadata"
          playsInline
          disablePictureInPicture={false}
          controlsList="nodownload"
        ></video>
      );
    }
  };
  
  // Handle video time update for basic player - with proper error checking
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration) && videoRef.current.duration > 0) {
      const currentTime = videoRef.current.currentTime || 0;
      const duration = videoRef.current.duration;
      const currentProgress = (currentTime / duration) * 100;
      
      // Ensure we never set progress to NaN or invalid values
      if (!isNaN(currentProgress) && isFinite(currentProgress) && currentProgress >= 0) {
        setProgress(currentProgress);
      } else {
        setProgress(0);
      }
    }
  };
  
  // Format time for display
  const formatTime = (seconds) => {
    if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) {
      return '0:00';
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Show "LIVE" or "RECORDED" indicator based on stream status
  const getStreamStatusIndicator = () => {
    if (stream.isLive !== false) {
      return (
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center z-20">
          <span className="h-2 w-2 bg-white rounded-full inline-block animate-pulse mr-1"></span>
          LIVE
        </div>
      );
    } else {
      return (
        <div className="absolute top-3 left-3 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded z-20">
          RECORDED
        </div>
      );
    }
  };
  
  // Show viewer count with appropriate label
  const getViewerCountIndicator = () => {
    if (stream.isLive !== false) {
      return (
        <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded flex items-center z-20">
          <span className="h-2 w-2 bg-red-600 rounded-full inline-block mr-2"></span>
          {stream.viewers.toLocaleString()} viewers
        </div>
      );
    } else {
      return (
        <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded z-20">
          {(stream.currentViewers || Math.floor(stream.viewers / 10)).toLocaleString()} watching now
        </div>
      );
    }
  };
  
  // Add this new effect to handle auto-hiding controls when mouse is inactive
  useEffect(() => {
    const checkMouseActivity = () => {
      const now = Date.now();
      if (now - lastMouseMoveTime > 3000 && isPlaying) {
        setControlsVisible(false);
      }
    };
    
    const intervalId = setInterval(checkMouseActivity, 1000);
    
    return () => clearInterval(intervalId);
  }, [lastMouseMoveTime, isPlaying]);
  
  // Add touch handling for mobile devices
  useEffect(() => {
    const playerElement = playerRef.current;
    
    if (!playerElement) return;
    
    const handleTouchStart = () => {
      showControls();
    };
    
    playerElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    return () => {
      playerElement.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
  
  return (
    <div className="relative bg-black rounded-lg overflow-hidden mb-4">
      <div
        ref={playerRef}
        className="relative video-player-container prevent-scroll"
        onMouseMove={!isIframe ? showControls : undefined}
        onClick={(e) => {
          e.stopPropagation(); // Prevent click propagation
          e.preventDefault(); // Prevent any default behavior
          if (!isIframe) handlePlayPause();
        }}
        style={{ 
          overscrollBehavior: 'none',
          touchAction: 'none',
          scrollSnapAlign: 'none',
          scrollMarginBlockStart: '999999px',
          scrollMarginBlockEnd: '999999px',
          overflowAnchor: 'none'
        }}
      >
        {/* Render the video player based on state */}
        {renderVideoPlayer()}
        
        {/* These overlays are only shown for non-enhanced player */}
        {(!useCustomPlayer || !isPlaying) && (
          <>
            {/* Live/VOD Badge */}
            {getStreamStatusIndicator()}
            
            {/* Viewer Count */}
            {getViewerCountIndicator()}
          </>
        )}
        
        {/* Basic controls for non-iframe player */}
        {isPlaying && !isIframe && (
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3 transition-opacity duration-300 ${
              controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Progress Bar */}
            <div className="mb-2">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => {
                  if (videoRef.current) {
                    const seekTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
                    videoRef.current.currentTime = seekTime;
                    setProgress(parseFloat(e.target.value));
                  }
                }}
                className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
              />
            </div>
            
            {/* Control Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <button onClick={handlePlayPause} className="text-white hover:text-purple-400">
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>
                
                <div className="flex items-center space-x-2 min-w-[120px]">
                  <button 
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                      }
                    }}
                    className="text-white hover:text-purple-400"
                  >
                    {isMuted || volume === 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : volume < 50 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072" />
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => {
                      const newVolume = parseInt(e.target.value);
                      setVolume(newVolume);
                      setIsMuted(newVolume === 0);
                      
                      if (videoRef.current) {
                        videoRef.current.volume = newVolume / 100;
                        videoRef.current.muted = newVolume === 0;
                      }
                    }}
                    className="w-16 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>
                
                {videoRef.current && (
                  <span className="text-white text-sm">
                    {formatTime(videoRef.current.currentTime)} / {formatTime(videoRef.current.duration)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Toggle enhanced player button */}
                <button 
                  className="text-white hover:text-purple-400 flex items-center space-x-1"
                  onClick={() => setUseCustomPlayer(!useCustomPlayer)}
                  title={`Switch to ${useCustomPlayer ? 'basic' : 'enhanced'} player`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                
                {/* Fullscreen toggle */}
                <button 
                  className="text-white hover:text-purple-400" 
                  onClick={() => {
                    if (!playerRef.current) return;
                    
                    if (!document.fullscreenElement) {
                      playerRef.current.requestFullscreen().catch(err => {
                        console.error(`Error attempting to enable fullscreen: ${err.message}`);
                      });
                      setIsFullscreen(true);
                    } else {
                      document.exitFullscreen();
                      setIsFullscreen(false);
                    }
                  }}
                >
                  {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M15 9H19.5M15 9V4.5M15 15V19.5M15 15H19.5M9 15H4.5M9 15V19.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div 
        className="p-4 stream-description prevent-scroll" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          overscrollBehavior: 'none',
          scrollSnapAlign: 'none', 
          scrollMarginBlock: '999999px',
          overflowAnchor: 'none'
        }}
      >
        <h1 className="text-white text-xl font-bold mb-2">{stream.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-gray-400">
          <span className="text-purple-500 font-medium">{stream.game}</span>
          {stream.tags && stream.tags.map(tag => (
            <span key={tag} className="bg-gray-800 px-2 py-1 rounded-full text-xs">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StreamPlayer;
