import { useState } from 'react';
import StreamCard from './StreamCard';
import { GradientButton } from '../UI/AnimatedButtons';

function StreamCardGrid({ streams, title, onStreamSelect, emptyMessage }) {
  const [visibleCount, setVisibleCount] = useState(8);
  
  if (!streams || streams.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center my-8">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          <h3 className="text-white font-bold text-xl mb-2">{emptyMessage || "No streams found"}</h3>
          <p className="text-gray-400 mb-4">Try following some channels or exploring more categories</p>
        </div>
      </div>
    );
  }
  
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, streams.length));
  };
  
  return (
    <div className="my-8">
      {title && (
        <h2 className="text-white text-2xl font-bold mb-6 flex items-center">
          <span className="inline-block w-1.5 h-6 bg-purple-500 rounded-sm mr-2"></span>
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {streams.slice(0, visibleCount).map(stream => (
          <StreamCard
            key={stream.id}
            stream={stream}
            onClick={onStreamSelect}
          />
        ))}
      </div>
      
      {visibleCount < streams.length && (
        <div className="mt-8 text-center">
          <GradientButton onClick={handleLoadMore}>
            Load More
          </GradientButton>
        </div>
      )}
    </div>
  );
}

export default StreamCardGrid;
