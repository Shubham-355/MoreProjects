import { useState, useRef, useEffect } from 'react';

function LiveEvents({ events, onEventSelect }) {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  
  // Auto-scroll events every 6 seconds
  useEffect(() => {
    if (!events || events.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % events.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [events]);
  
  // Scroll to the active event when changed
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const activeItem = container.children[activeEventIndex];
    
    if (activeItem) {
      const scrollPosition = activeItem.offsetLeft - (container.offsetWidth / 2) + (activeItem.offsetWidth / 2);
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeEventIndex]);
  
  if (!events || events.length === 0) return null;
  
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-bold flex items-center group">
          <span className="inline-block w-1.5 h-6 bg-yellow-500 rounded-sm mr-2 group-hover:h-8 transition-all duration-300"></span>
          <span className="group-hover:text-yellow-400 transition-colors duration-300">Special Events</span>
        </h2>
        <button className="text-gray-400 hover:text-white text-sm hover:underline transition-colors">
          View Calendar
        </button>
      </div>
      
      {/* Events Carousel */}
      <div className="relative">
        {/* Active Event Display */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-black border border-gray-800">
          <div className="relative aspect-[21/9] md:aspect-[21/6]">
            <img 
              src={events[activeEventIndex].coverImage} 
              alt={events[activeEventIndex].title}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10"></div>
            
            {/* Event badge */}
            <div className="absolute top-3 left-3 bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              SPECIAL EVENT
            </div>
            
            {/* Live indicator if event is live */}
            {events[activeEventIndex].isLive && (
              <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                LIVE NOW
              </div>
            )}
            
            {/* Event details */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="w-full max-w-4xl mx-auto">
                <div className="flex items-center mb-2">
                  <div className="bg-gray-800 text-xs text-white py-0.5 px-2 rounded mr-2">
                    {events[activeEventIndex].category}
                  </div>
                  {events[activeEventIndex].partners && (
                    <div className="text-gray-300 text-xs">
                      In partnership with {events[activeEventIndex].partners}
                    </div>
                  )}
                </div>
                
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                  {events[activeEventIndex].title}
                </h3>
                
                <p className="text-gray-300 mb-4 max-w-3xl hidden md:block">
                  {events[activeEventIndex].description}
                </p>
                
                <div className="flex flex-wrap gap-2 items-center">
                  {events[activeEventIndex].isLive ? (
                    <button 
                      onClick={() => onEventSelect(events[activeEventIndex])}
                      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                      </svg>
                      <span>Watch Now</span>
                    </button>
                  ) : (
                    <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Reminder</span>
                    </button>
                  )}
                  
                  <div className="bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-md">
                    {events[activeEventIndex].isLive ? (
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <span>{events[activeEventIndex].viewerCount.toLocaleString()} watching</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{events[activeEventIndex].scheduledTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event thumbnails selector */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 mt-4 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          {events.map((event, index) => (
            <button 
              key={event.id}
              onClick={() => setActiveEventIndex(index)}
              className={`flex-shrink-0 transition-all duration-300 ${
                index === activeEventIndex 
                  ? 'opacity-100 ring-2 ring-yellow-500 transform scale-[1.02]' 
                  : 'opacity-70 hover:opacity-90'
              }`}
            >
              <div className="relative w-48 aspect-video rounded-md overflow-hidden">
                <img 
                  src={event.thumbnail || event.coverImage} 
                  alt={event.title} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Event title */}
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-white text-xs font-medium line-clamp-2">{event.title}</p>
                </div>
                
                {/* Live or scheduled indicator */}
                {event.isLive ? (
                  <div className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm">
                    LIVE
                  </div>
                ) : (
                  <div className="absolute top-1 right-1 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded-sm">
                    {event.shortDate}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveEvents;
