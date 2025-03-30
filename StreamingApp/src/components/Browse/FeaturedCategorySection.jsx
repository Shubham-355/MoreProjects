import React from 'react';
import { useState } from 'react';
import StreamCard from './StreamCard';
import { GradientButton } from '../UI/AnimatedButtons';
import ReliableImage from '../UI/ReliableImage';

function FeaturedCategorySection({ title, category, streams, onStreamSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!streams || streams.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      {/* Title section with view all link */}
      <div 
        className="flex items-center justify-between mb-4" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="text-2xl font-bold text-white flex items-center group">
          <div className={`w-1.5 h-6 bg-purple-500 rounded-sm mr-2 transition-all duration-300 ${isHovered ? 'h-8' : ''}`}></div>
          <span className={`transition-colors duration-300 ${isHovered ? 'text-purple-400' : ''}`}>
            {title || `Live ${category?.name || 'Featured'} Streams`}
          </span>
          <span className="ml-2 text-purple-500 text-sm font-normal">
            {streams.length} {streams.length === 1 ? 'stream' : 'streams'}
          </span>
        </h2>
        <a href="#viewall" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
          View All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Category card with first stream featured */}
      {category && (
        <div className="flex flex-col md:flex-row gap-4 mb-6 hover:shadow-lg transition-shadow duration-300">
          <div className="md:w-1/4 bg-gray-800 rounded-lg overflow-hidden group relative">
            <div className="aspect-square relative overflow-hidden">
              <ReliableImage
                src={category.imageUrl}
                fallbackSrc="/assets/fallbacks/game-placeholder.jpg"
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
              <div className="flex items-center text-gray-300 text-sm mb-2">
                <div className="flex items-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {(category.viewerCount || 0).toLocaleString()} viewers
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  {(category.streamCount || 0).toLocaleString()} streams
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.tags && category.tags.map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-3/4 bg-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {streams.slice(0, 3).map((stream) => (
                <StreamCard
                  key={stream.id}
                  stream={stream}
                  onClick={() => onStreamSelect(stream)}
                  hideCategory={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid of streams */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {streams.map((stream) => (
          <StreamCard
            key={stream.id}
            stream={stream}
            onClick={() => onStreamSelect(stream)}
          />
        ))}
      </div>

      {/* Show more button for larger collections */}
      {streams.length > 8 && (
        <div className="flex justify-center mt-8">
          <GradientButton>
            Show More
          </GradientButton>
        </div>
      )}
    </div>
  );
}

export default FeaturedCategorySection;
