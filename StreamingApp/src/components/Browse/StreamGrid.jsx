import { useState, useRef, useEffect } from 'react';
import StreamGridItem from './StreamGridItem';

function StreamGrid({ streams, onStreamSelect, title = "Recommended Streams" }) {
  const [visibleCount, setVisibleCount] = useState(8);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const buttonRef = useRef(null);
  
  // Observe when load more button enters viewport
  useEffect(() => {
    if (!buttonRef.current || visibleCount >= streams?.length) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(buttonRef.current);
    
    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, [buttonRef, streams, visibleCount]);
  
  if (!streams) {
    // Loading state
    return (
      <div className="mb-16">
        <h2 className="text-white text-2xl font-bold mb-4 flex items-center">
          <span className="inline-block w-1.5 h-6 bg-purple-500 rounded-sm mr-2"></span>
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
          {Array(4).fill(0).map((_, i) => (
            <div key={i}>
              <div className="aspect-video bg-gray-800 rounded-lg mb-2"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-800 rounded-full mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-800 rounded mb-2 w-3/4"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (streams.length === 0) {
    return (
      <div className="mb-16">
        <h2 className="text-white text-2xl font-bold mb-4 flex items-center">
          <span className="inline-block w-1.5 h-6 bg-purple-500 rounded-sm mr-2"></span>
          {title}
        </h2>
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400 mb-2">No streams available at the moment.</p>
            <p className="text-gray-500 text-sm">Try checking back later or explore other categories</p>
          </div>
        </div>
      </div>
    );
  }

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, streams.length));
  };

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white text-2xl font-bold flex items-center group">
          <span className="inline-block w-1.5 h-6 bg-purple-500 rounded-sm mr-2 group-hover:h-8 transition-all duration-300"></span>
          <span className="group-hover:text-purple-400 transition-colors duration-300">{title}</span>
        </h2>
        <div className="flex items-center">
          <span className="text-gray-400 text-sm mr-4 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full">
            {streams.length} streams
          </span>
          <button className="text-purple-400 hover:text-purple-300 flex items-center group transition-colors duration-300">
            <span>View All</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {streams.slice(0, visibleCount).map((stream, index) => (
          <StreamGridItem 
            key={stream.id} 
            stream={stream} 
            onClick={onStreamSelect} // Directly pass the function reference
            index={index}
          />
        ))}
      </div>
      
      {visibleCount < streams.length && (
        <div 
          ref={buttonRef}
          className="mt-8 text-center"
        >
          <button 
            onClick={handleLoadMore}
            className={`px-6 py-3 rounded-md bg-gradient-to-r from-purple-700 to-purple-900 text-white transition-all duration-500 hover:shadow-neon ${
              isButtonVisible ? 'animate-fadeIn' : 'opacity-0'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2">Load More</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default StreamGrid;
