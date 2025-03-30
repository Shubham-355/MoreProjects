import React from 'react';

function RecommendedCategories({ categories = [], onCategorySelect }) {
  // Default categories if none provided
  const defaultCategories = [
    {
      id: 'cat-1',
      name: 'Just Chatting',
      imageUrl: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&auto=format&fit=crop',
      viewers: 256000,
      tags: ['IRL', 'Talk Show']
    },
    {
      id: 'cat-2',
      name: 'Valorant',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop',
      viewers: 189000,
      tags: ['FPS', 'Shooter']
    },
    {
      id: 'cat-3',
      name: 'Minecraft',
      imageUrl: 'https://images.unsplash.com/photo-1587573089734-599eb7a2f4b1?w=400&auto=format&fit=crop',
      viewers: 143000,
      tags: ['Adventure', 'Building']
    },
    {
      id: 'cat-4',
      name: 'League of Legends',
      imageUrl: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&auto=format&fit=crop',
      viewers: 138000,
      tags: ['MOBA', 'Strategy']
    },
    {
      id: 'cat-5',
      name: 'Art',
      imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&auto=format&fit=crop',
      viewers: 42000,
      tags: ['Creative', 'Drawing']
    },
    {
      id: 'cat-6',
      name: 'Music',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop',
      viewers: 38000,
      tags: ['Live', 'Performance']
    }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;
  
  const formatViewers = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="mr-2">🏆</span>
          Popular Categories
        </h2>
        <a href="#categories" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
          Browse All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {displayCategories.map((category) => (
          <div 
            key={category.id}
            onClick={() => onCategorySelect && onCategorySelect(category)}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-600/20 transition-all duration-300 cursor-pointer group"
          >
            <div className="relative aspect-[4/5]">
              <img 
                src={category.imageUrl} 
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-3 left-0 right-0 px-3">
                <h3 className="text-white font-bold text-md mb-1 truncate group-hover:text-purple-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-300 text-xs flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {formatViewers(category.viewers)} viewers
                </p>
              </div>
            </div>
            
            <div className="p-2 flex flex-wrap gap-1">
              {category.tags && category.tags.map((tag, index) => (
                <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedCategories;
