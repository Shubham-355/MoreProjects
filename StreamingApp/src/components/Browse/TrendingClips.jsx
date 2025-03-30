import { useState } from 'react';

function TrendingClips({ clips }) {
  const [activeCategory, setActiveCategory] = useState('all');
  
  if (!clips || clips.length === 0) return null;
  
  // Filter clips by category
  const filteredClips = activeCategory === 'all' 
    ? clips 
    : clips.filter(clip => clip.category === activeCategory);
  
  // Get unique categories from clips
  const categories = ['all', ...new Set(clips.map(clip => clip.category))];
  
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-bold flex items-center group">
          <span className="inline-block w-1.5 h-6 bg-red-500 rounded-sm mr-2 group-hover:h-8 transition-all duration-300"></span>
          <span className="group-hover:text-red-400 transition-colors duration-300">Trending Clips</span>
        </h2>
        
        {/* Category Navigation */}
        <div className="hidden md:flex space-x-1 bg-gray-800/70 backdrop-blur-sm p-1 rounded-lg">
          {categories.map(category => (
            <button
              key={category}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                category === activeCategory 
                  ? 'bg-red-500 text-white' 
                  : 'text-gray-300 hover:bg-gray-700/70 hover:text-white'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Mobile dropdown for categories */}
        <div className="md:hidden">
          <select 
            className="bg-gray-800 text-white text-sm rounded-lg px-2 py-1 border border-gray-700"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Clips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredClips.map(clip => (
          <div key={clip.id} className="group relative overflow-hidden rounded-lg bg-gray-800 cursor-pointer hover:scale-[1.02] transition-all duration-300">
            {/* Clip Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={clip.thumbnail} 
                alt={clip.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay with play button on hover */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-red-600 rounded-full p-3 transform transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              
              {/* Clip duration */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {clip.duration}
              </div>
              
              {/* Views count */}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {clip.views.toLocaleString()}
              </div>
            </div>
            
            {/* Clip Info */}
            <div className="px-3 py-2">
              <div className="flex items-start">
                <img 
                  src={clip.creator.avatar} 
                  alt={clip.creator.name} 
                  className="w-8 h-8 rounded-full mr-2 border border-gray-700"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm leading-tight mb-1 truncate">{clip.title}</h3>
                  <p className="text-gray-400 text-xs">{clip.creator.name}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-400">
                    <span>{clip.game}</span>
                    <span className="mx-1.5">•</span>
                    <span>{clip.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-purple-400 hover:text-purple-300 font-medium text-sm hover:underline transition-colors">
          See more clips
        </button>
      </div>
    </div>
  );
}

export default TrendingClips;
