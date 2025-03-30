import React, { useEffect, useState, useRef, Suspense } from 'react';
import HeroSection from '../components/Browse/HeroSection';
import StreamGridItem from '../components/StreamGridItem';
import { STARFIELD_STREAMS, POPULAR_CATEGORIES } from '../data/mockData';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParticleBackground from '../components/UI/ParticleBackground';

// Sample data for the hero section (replace with actual data from your API)
const heroData = {
  title: "Live Streaming Reimagined",
  subtitle: "Watch your favorite streamers, discover new content, and join the community.",
  imageUrls: [
    '/assets/images/hero-banner.jpg',
    'https://example.com/fallback-image.jpg',
    '/assets/fallbacks/hero-placeholder.jpg'
  ],
  ctaText: "Browse Streams",
  ctaLink: "#browse-streams"
};

// Sample stream data (replace with data from your API)
const sampleStreams = [
  {
    id: 1,
    title: "Ranked matches - Road to Radiant",
    streamer: "ProGamer123",
    thumbnailUrls: ['/assets/fallbacks/stream-placeholder.jpg'],
    viewers: 1245,
    game: "Valorant"
  },
  {
    id: 2,
    title: "Minecraft building with viewers!",
    streamer: "CraftyCreator",
    thumbnailUrls: ['/assets/fallbacks/stream-placeholder.jpg'],
    viewers: 867,
    game: "Minecraft"
  },
  {
    id: 3,
    title: "Pro player scrims - Championship practice",
    streamer: "ESports_Legend",
    thumbnailUrls: ['/assets/fallbacks/stream-placeholder.jpg'],
    viewers: 3421,
    game: "League of Legends"
  },
  {
    id: 4,
    title: "Call of Duty: Modern Warfare III - Early Access",
    streamer: "FPS_Master",
    thumbnailUrls: ['/assets/fallbacks/stream-placeholder.jpg'],
    viewers: 2198,
    game: "Call of Duty"
  },
  {
    id: 5,
    title: "Casual gaming & chill vibes",
    streamer: "ChillStreamer",
    thumbnailUrls: ['/assets/fallbacks/stream-placeholder.jpg'],
    viewers: 715,
    game: "Various"
  },
  {
    id: 6,
    title: "Retro Game Marathon - Classics From The 90s",
    streamer: "RetroGamer",
    thumbnailUrls: ['/assets/fallbacks/stream-placeholder.jpg'],
    viewers: 1432,
    game: "Retro"
  }
];

function HomePage({ onStreamSelect, onCategorySelect }) {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredStreams, setFeaturedStreams] = useState([]);
  const [trendingStreams, setTrendingStreams] = useState([]);
  const [recommendedStreams, setRecommendedStreams] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrollY, setScrollY] = useState(0);
  
  // Section-specific loading states
  const [liveStreamsLoading, setLiveStreamsLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  
  // Intersection observer hooks for scroll animations
  const [trendingRef, trendingInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const [recommendedRef, recommendedInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Add state for particle animation control
  const [particleSpeed, setParticleSpeed] = useState(0.6);

  // Add new state for animation control
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const mainControls = useAnimation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Click animation helper
  const createRippleEffect = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        const allStreams = [...sampleStreams, ...STARFIELD_STREAMS];
        
        setFeaturedStreams(allStreams.slice(0, 5));
        setIsLoading(false);
        
        // Simulate staggered loading for different sections
        setTimeout(() => {
          setLiveStreamsLoading(false);
          setTrendingStreams(
            [...allStreams].sort((a, b) => (b.viewers || 0) - (a.viewers || 0))
          );
        }, 500);
        
        setTimeout(() => {
          setTrendingLoading(false);
        }, 1200);
        
        setTimeout(() => {
          setCategoriesLoading(false);
          setPopularCategories(POPULAR_CATEGORIES);
        }, 1800);
        
        setTimeout(() => {
          setRecommendedLoading(false);
          setRecommendedStreams(
            [...allStreams].sort(() => Math.random() - 0.5)
          );
        }, 2400);
      }, 1000);
    };

    loadData();
    
    // Add scroll listener for parallax effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced main loading state with ParticleBackground
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a16] flex items-center justify-center overflow-hidden relative">
        {/* Full screen particle background */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground 
            particleCount={100}
            color="rgba(139, 92, 246, 0.3)"
            speed={particleSpeed}
            size={3}
            direction="top-right"
            glowing={true}
          />
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Interactive loading spinner with particle integration */}
          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 border-4 border-purple-300/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style={{animationDuration: '1.2s', animationDirection: 'reverse'}}></div>
            <div className="absolute inset-8 border-4 border-transparent border-t-purple-300 rounded-full animate-spin" style={{animationDuration: '1.5s'}}></div>
            
            {/* Center glow effect */}
            <div className="absolute inset-[25%] bg-purple-600/30 rounded-full blur-md animate-pulse"></div>
            <div className="absolute inset-[30%] bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Orbiting particles */}
            <div className="absolute w-4 h-4 bg-purple-500 rounded-full top-0 left-1/2 transform -translate-x-1/2 animate-orbit" style={{animationDelay: '0s'}}></div>
            <div className="absolute w-3 h-3 bg-pink-500 rounded-full top-0 left-1/2 transform -translate-x-1/2 animate-orbit" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute w-2 h-2 bg-blue-500 rounded-full top-0 left-1/2 transform -translate-x-1/2 animate-orbit" style={{animationDelay: '1s'}}></div>
          </div>
          
          <motion.div 
            className="bg-gray-900/50 backdrop-blur-sm px-8 py-4 rounded-lg border border-purple-500/20 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-white text-xl font-medium text-center">
              <span className="inline-block animate-pulse">Initializing streaming universe</span>
            </p>
            
            {/* Interactive progress bar */}
            <div className="w-64 h-1.5 bg-gray-800 rounded-full mt-4 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                onAnimationComplete={() => setParticleSpeed(1.2)}
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Loading skeletons for content sections
  const renderSkeleton = (type) => {
    switch(type) {
      case 'stream':
        return (
          <div className="bg-gray-800/60 rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-700/50"></div>
            <div className="p-4">
              <div className="h-5 bg-gray-700/60 rounded w-3/4 mb-3"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-gray-700/60 rounded-full mr-2"></div>
                <div>
                  <div className="h-3 bg-gray-700/60 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-700/60 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'category':
        return (
          <div className="bg-gray-800/60 rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-700/50"></div>
            <div className="p-3">
              <div className="h-4 bg-gray-700/60 rounded w-2/3"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0a0a16] min-h-screen text-white overflow-x-hidden relative">
      {/* Add ripple effect container for global click feedback */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute w-12 h-12 rounded-full bg-purple-500/30 pointer-events-none"
          style={{ 
            x: mouseX, 
            y: mouseY, 
            scale: 0,
            translateX: "-50%", 
            translateY: "-50%"
          }}
          animate={{ scale: [0, 1, 0], opacity: [0, 0.2, 0] }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </motion.div>
      
      {/* Optimized particle backgrounds with reduced count for better performance */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 z-0">
          <ParticleBackground 
            particleCount={30} 
            color="rgba(139, 92, 246, 15)" 
            speed={0.2}
            size={2}
            optimized={true}
          />
        </div>
        <div className="absolute inset-0 z-0">
          <ParticleBackground 
            particleCount={12} 
            color="rgba(168, 85, 247, 0.2)" 
            speed={0.1}
            size={3}
            glowing={true}
            optimized={true}
          />
        </div>
      </div>
      
      <main className="relative z-10">
        {/* Keep Hero Section as is */}
        <section className="mb-16">
          <HeroSection streams={featuredStreams} onStreamSelect={onStreamSelect} />
        </section>
        
        {/* Enhanced Live Now section with spring animations */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          className="container mx-auto px-4 mb-24"
        >
          <div className="flex items-center mb-6">
            <div className="relative mr-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">LIVE NOW</h2>
          </div>
          
          <div className="relative overflow-hidden">
            {/* Horizontal scroll indicator */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-800">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-1/3 rounded-full" style={{ transform: `translateX(${scrollY % 300}%)` }}></div>
            </div>
            
            {/* Live streams carousel with loading state */}
            <AnimatePresence mode="wait">
              {liveStreamsLoading ? (
                <motion.div 
                  className="flex space-x-4 pb-6 overflow-x-auto hide-scrollbar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(6)].map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      className="flex-shrink-0 w-72 relative"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <div className="bg-gray-800/60 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gradient-to-r from-gray-800/80 to-gray-700/80 animate-pulse"></div>
                        <div className="p-4 space-y-3">
                          <div className="h-5 bg-gray-700/60 rounded-md w-3/4"></div>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-700/60 mr-2"></div>
                            <div className="space-y-2 flex-1">
                              <div className="h-3 bg-gray-700/60 rounded-md w-1/2"></div>
                              <div className="h-3 bg-gray-700/60 rounded-md w-1/3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="flex space-x-4 pb-6 overflow-x-auto hide-scrollbar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {trendingStreams.slice(0, 8).map((stream, index) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: index * 0.07, 
                        duration: 0.3, 
                        type: "spring", 
                        stiffness: 120, 
                        damping: 10 
                      }}
                      className="flex-shrink-0 w-72 relative group"
                      whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                      whileTap={{ scale: 0.97, transition: { type: "spring", stiffness: 400 } }}
                    >
                      <div 
                        className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl"
                        onClick={(e) => {
                          createRippleEffect(e);
                          onStreamSelect(stream);
                        }}
                      >
                        {/* Add ripple effect on click */}
                        <motion.div
                          className="absolute pointer-events-none rounded-full bg-purple-500/30 z-20"
                          initial={{ 
                            x: clickPosition.x, 
                            y: clickPosition.y, 
                            scale: 0, 
                            opacity: 0.8
                          }}
                          animate={{ scale: 5, opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        
                        {/* Live indicator */}
                        <div className="absolute top-3 left-3 z-20 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
                          <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                          LIVE
                        </div>
                        
                        {/* Viewer count */}
                        <div className="absolute top-3 right-3 z-20 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                          {stream.viewers.toLocaleString()} viewers
                        </div>
                        
                        {/* Thumbnail with hover effect */}
                        <div className="aspect-video overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                          <img 
                            src={stream.thumbnailUrls[0]} 
                            alt={stream.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              const altTextElement = document.createElement('div');
                              altTextElement.className = 'bg-gradient-to-br from-purple-900/40 to-gray-900 text-white p-4 h-full w-full flex items-center justify-center text-center';
                              altTextElement.textContent = stream.title;
                              e.target.parentNode.appendChild(altTextElement);
                            }}
                          />
                        </div>
                        
                        {/* Stream info */}
                        <div className="p-4">
                          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-purple-400 transition-colors">{stream.title}</h3>
                          <div className="flex items-center mt-2">
                            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden mr-2">
                              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-xs font-bold">
                                {stream.streamer.charAt(0)}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{stream.streamer}</p>
                              <p className="text-xs text-gray-400">{stream.game}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover overlay with play button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 z-20">
                          <motion.div 
                            className="w-16 h-16 rounded-full bg-purple-600/90 flex items-center justify-center cursor-pointer"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            onClick={() => onStreamSelect(stream)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
        
        {/* Trending Content Section with optimized animations */}
        <motion.section 
          ref={trendingRef}
          className="py-16 relative mb-24 overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(20, 20, 40, 0.6), rgba(10, 10, 22, 0.8))',
          }}
        >
          {/* Background glow effect */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
          
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={trendingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-4xl font-extrabold mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Trending Now
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl">
                The hottest streams everyone's watching right now. Join in and be part of the conversation.
              </p>
            </motion.div>
            
            {/* 3D Card Grid with loading state */}
            <AnimatePresence mode="wait">
              {trendingLoading ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(8)].map((_, index) => (
                    <motion.div
                      key={`trending-skeleton-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.1, 
                          duration: 0.5 
                        }
                      }}
                      className="transform perspective-1000 relative"
                    >
                      {renderSkeleton('stream')}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ staggerChildren: 0.07 }}
                >
                  {trendingStreams.slice(0, 8).map((stream, index) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={trendingInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.07,
                        type: "spring",
                        stiffness: 70,
                        damping: 15
                      }}
                      whileHover={{ 
                        rotateY: 5, 
                        rotateX: -5, 
                        z: 10,
                        scale: 1.03,
                        transition: { duration: 0.2, type: "spring", stiffness: 300 }
                      }}
                      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                      className="transform perspective-1000 relative"
                      onClick={(e) => {
                        createRippleEffect(e);
                        onStreamSelect(stream);
                      }}
                    >
                      <div 
                        className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl overflow-hidden shadow-lg border border-gray-700/50"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Card content */}
                        <div className="aspect-video relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                          
                          {/* Category tag */}
                          <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">
                            {stream.game}
                          </div>
                          
                          {/* Live indicator with viewer count */}
                          <div className="absolute top-3 left-3 z-10 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                            {stream.viewers.toLocaleString()}
                          </div>
                          
                          {/* Thumbnail */}
                          <img 
                            src={stream.thumbnailUrls[0]} 
                            alt={stream.title}
                            className="w-full h-full object-cover transform transition-transform duration-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              const altTextElement = document.createElement('div');
                              altTextElement.className = 'absolute inset-0 bg-gradient-to-br from-purple-900/40 to-gray-900 text-white flex items-center justify-center text-center p-4';
                              altTextElement.textContent = stream.title;
                              e.target.parentNode.appendChild(altTextElement);
                            }}
                          />
                          
                          {/* Play overlay */}
                          <div 
                            className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-20"
                            onClick={() => onStreamSelect(stream)}
                            style={{ transform: 'translateZ(20px)' }}
                          >
                            <motion.div 
                              className="bg-purple-600/90 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              transition={{ type: "spring", stiffness: 400, damping: 8 }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3-2a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </motion.div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-bold line-clamp-1">{stream.title}</h3>
                          
                          <div className="flex items-center mt-3 justify-between">
                            <div className="flex items-center">
                              <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-xs font-bold mr-2">
                                  {stream.streamer.charAt(0).toUpperCase()}
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                              </div>
                              <span className="text-sm font-medium">{stream.streamer}</span>
                            </div>
                            
                            <button 
                              className="text-xs bg-purple-800/50 hover:bg-purple-700/70 rounded-full px-3 py-1 transition-colors"
                              onClick={() => onStreamSelect(stream)}
                            >
                              Watch
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
        
        {/* Enhanced Category tabs with better animations */}
        <motion.section 
          ref={categoriesRef}
          className="container mx-auto px-4 mb-24"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-4xl font-extrabold mb-2">Explore Categories</h2>
            <p className="text-gray-400 max-w-2xl">Discover new content from a variety of genres and interests</p>
          </motion.div>
          
          {/* Horizontal category tabs */}
          <motion.div 
            className="flex space-x-3 mb-8 overflow-x-auto pb-4 hide-scrollbar"
            initial={{ opacity: 0, x: -20 }}
            animate={categoriesInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 70 }}
          >
            <motion.button
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === 'All' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveCategory('All')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              All Categories
            </motion.button>
            
            {POPULAR_CATEGORIES.slice(0, 8).map((category) => (
              <motion.button
                key={category.id}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all ${
                  activeCategory === category.name 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {category.iconUrl && (
                  <img 
                    src={category.iconUrl} 
                    alt="" 
                    className="w-5 h-5 rounded object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <span>{category.name}</span>
              </motion.button>
            ))}
          </motion.div>
          
          {/* Category cards with loading state */}
          <AnimatePresence>
            {categoriesLoading ? (
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(12)].map((_, index) => (
                  <motion.div
                    key={`category-skeleton-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { delay: index * 0.05, duration: 0.3 }
                    }}
                    className="relative"
                  >
                    {renderSkeleton('category')}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {popularCategories
                  .filter(cat => activeCategory === 'All' || cat.name === activeCategory)
                  .map((category, index) => (
                    <motion.div
                      key={category.id}
                      className="relative group"
                      onClick={() => onCategorySelect(category)}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { 
                          opacity: 1, 
                          scale: 1,
                          transition: { type: "spring", stiffness: 100 }
                        }
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                    >
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden rounded-lg border border-gray-700/50 shadow-md hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-300">
                        <div className="aspect-square relative overflow-hidden">
                          {/* Category thumbnail with gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
                          
                          <img 
                            src={category.thumbnailUrl || '/assets/fallbacks/category-placeholder.jpg'} 
                            alt={category.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              const altTextElement = document.createElement('div');
                              altTextElement.className = 'absolute inset-0 bg-gradient-to-br from-purple-900/30 to-gray-900 flex items-center justify-center';
                              altTextElement.textContent = category.name;
                              e.target.parentNode.appendChild(altTextElement);
                            }}
                          />
                          
                          {/* Hover glow effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-purple-600/10 transition-opacity duration-300 z-10"></div>
                          
                          {/* Category name overlay */}
                          <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
                            <h3 className="text-white font-medium text-sm">{category.name}</h3>
                            {category.viewerCount && (
                              <p className="text-gray-300 text-xs">{category.viewerCount.toLocaleString()} viewers</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
        
        {/* Optimized Recommended Section with better animations */}
        <motion.section 
          ref={recommendedRef}
          className="py-16 relative mb-12 overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(10, 10, 22, 0.8), rgba(20, 20, 40, 0.6))',
          }}
        >
          {/* Background glow effect */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-800/10 rounded-full blur-[120px]"></div>
          
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={recommendedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center"
            >
              <h2 className="text-4xl font-extrabold mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                  Recommended For You
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Personalized picks based on what you love to watch
              </p>
            </motion.div>
            
            {/* Floating cards with loading state */}
            <AnimatePresence mode="wait">
              {recommendedLoading ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(6)].map((_, index) => (
                    <motion.div
                      key={`recommended-skeleton-${index}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.1, duration: 0.5 }
                      }}
                      className="relative"
                    >
                      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-xl overflow-hidden shadow-lg border border-gray-700/30 backdrop-blur-sm">
                        <div className="aspect-video bg-gradient-to-br from-gray-800/80 via-purple-900/10 to-gray-800/80 animate-pulse"></div>
                        <div className="p-5 space-y-4">
                          <div className="h-6 bg-gray-700/60 rounded-md w-4/5"></div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gray-700/60 mr-2"></div>
                              <div className="space-y-2">
                                <div className="h-3 bg-gray-700/60 rounded-md w-20"></div>
                                <div className="h-3 bg-gray-700/60 rounded-md w-16"></div>
                              </div>
                            </div>
                            <div className="h-8 w-20 bg-gray-700/60 rounded-md"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {recommendedStreams.slice(0, 6).map((stream, index) => (
                    <motion.div
                      key={stream.id}
                      className="relative"
                      initial={{ opacity: 0, y: 50 }}
                      animate={recommendedInView ? { 
                        opacity: 1, 
                        y: 0, 
                        transition: { 
                          type: "spring", 
                          stiffness: 50, 
                          damping: 12, 
                          delay: index * 0.07
                        } 
                      } : {}}
                      // Optimized floating animation using custom keyframes
                      css={{
                        animation: recommendedInView ? 
                          `float-${index % 3} 4s ease-in-out infinite` : 'none'
                      }}
                    >
                      <div 
                        className="bg-gradient-to-br from-gray-800/90 via-gray-900/95 to-black rounded-xl overflow-hidden shadow-xl shadow-purple-900/10 border border-gray-700/30 backdrop-blur-sm group"
                        onClick={(e) => {
                          createRippleEffect(e);
                          onStreamSelect(stream);
                        }}
                      >
                        {/* Stream header */}
                        <div className="relative aspect-video overflow-hidden">
                          {/* Live badge */}
                          <div className="absolute top-3 left-3 z-20">
                            <div className="flex items-center space-x-2">
                              <div className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-white mr-1 animate-pulse"></div>
                                LIVE
                              </div>
                              <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                {stream.viewers.toLocaleString()} watching
                              </div>
                            </div>
                          </div>
                          
                          {/* Category tag */}
                          <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                            {stream.game}
                          </div>
                          
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
                          
                          {/* Thumbnail */}
                          <img 
                            src={stream.thumbnailUrls[0]} 
                            alt={stream.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              const altTextElement = document.createElement('div');
                              altTextElement.className = 'bg-gradient-to-br from-purple-900/30 to-gray-900 text-white p-4 h-full w-full flex items-center justify-center text-center';
                              altTextElement.textContent = stream.title;
                              e.target.parentNode.appendChild(altTextElement);
                            }}
                          />
                          
                          {/* Hover overlay with play button */}
                          <div 
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20 cursor-pointer"
                            onClick={() => onStreamSelect(stream)}
                          >
                            <motion.div 
                              className="bg-purple-600/90 w-16 h-16 rounded-full flex items-center justify-center transform transition-transform shadow-lg shadow-purple-600/30"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              transition={{ type: "spring", stiffness: 400, damping: 8 }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Stream info */}
                        <div className="p-5">
                          <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                            {stream.title}
                          </h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="relative">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-sm font-bold">
                                  {stream.streamer.charAt(0).toUpperCase()}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-900"></div>
                              </div>
                              <div className="ml-2">
                                <p className="font-medium text-sm">{stream.streamer}</p>
                                <p className="text-xs text-gray-400">Started 2h ago</p>
                              </div>
                            </div>
                            
                            <motion.button 
                              className="text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-1.5 rounded-md text-sm font-medium shadow shadow-purple-900/30"
                              onClick={() => onStreamSelect(stream)}
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.92 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              Watch
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
        
        {/* Enhanced loading indicator with optimized particles */}
        <AnimatePresence>
          {(liveStreamsLoading || trendingLoading || categoriesLoading || recommendedLoading) && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
              className="fixed bottom-6 right-6 z-50 w-auto h-auto"
            >
              <motion.div 
                className="bg-purple-900/70 backdrop-blur-md border border-purple-500/30 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-4 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* Optimized mini particle background */}
                <div className="absolute inset-0 opacity-70 pointer-events-none">
                  <ParticleBackground 
                    particleCount={10} 
                    color="rgba(168, 85, 247, 0.6)" 
                    speed={0.5}
                    size={2}
                    optimized={true}
                  />
                </div>
                
                {/* Enhanced pulsing circle indicator */}
                <div className="relative w-6 h-6 flex-shrink-0">
                  <motion.div 
                    className="absolute inset-0 bg-purple-400 rounded-full opacity-75"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  ></motion.div>
                  <div className="relative w-full h-full bg-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="relative">
                  <p className="font-medium text-sm relative z-10">Loading amazing content</p>
                  <div className="h-0.5 w-full mt-1 bg-purple-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                      animate={{
                        x: ["-100%", "100%"], 
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Optimized ParticleBackground for section loading states */}
        <AnimatePresence>
          {trendingLoading && trendingInView && (
            <motion.div 
              className="absolute inset-0 z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ParticleBackground 
                  particleCount={20}
                  color="rgba(168, 85, 247, 0.4)"
                  speed={0.6}
                  size={2}
                  radius={150}
                  direction="outward"
                  optimized={true}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Enhanced orbit animation with better performance
const floatingAnimations = `
@keyframes orbit {
  from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
}

@keyframes float-0 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes float-1 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-orbit {
  animation: orbit 3s linear infinite;
}

.animate-float-0 {
  animation: float-0 4s ease-in-out infinite;
}

.animate-float-1 {
  animation: float-1 5s ease-in-out infinite;
}

.animate-float-2 {
  animation: float-2 6s ease-in-out infinite;
}
`;

// Inject the animation styles with optimized keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = floatingAnimations;
  document.head.appendChild(style);
}

export default HomePage;
