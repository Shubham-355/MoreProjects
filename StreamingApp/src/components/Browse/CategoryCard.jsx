import { useState } from 'react';

function CategoryCard({ category, onClick, isSelected = false }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    // Try the next image in the array if available
    if (imageIndex < category.images.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      // If all images fail, mark as error to show fallback content
      setImageError(true);
      console.error(`All images failed to load for category: ${category.name}`);
    }
  };

  return (
    <div 
      className={`group cursor-pointer transition-all duration-300 transform ${
        isHovered ? '-translate-y-2' : ''
      } ${isSelected ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900 rounded-md' : ''}`}
      onClick={() => onClick(category)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-md overflow-hidden">
        <div className="aspect-[3/4] w-full bg-gray-800">
          {imageError ? (
            // Fallback display when all images fail
            <div className="w-full h-full flex items-center justify-center bg-purple-900/50">
              <span className="text-white font-bold text-center p-4">{category.name}</span>
            </div>
          ) : (
            <>
              {/* Fallback content that will always be present */}
              <div className="absolute inset-0 flex items-center justify-center bg-purple-900/50 z-0">
                <span className="text-white font-bold text-center p-4">{category.name}</span>
              </div>
              
              <img 
                src={category.images[imageIndex]} 
                alt={category.name} 
                className={`w-full h-full object-cover transition-transform duration-300 relative z-10 ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
                onError={handleImageError}
              />
            </>
          )}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 z-20 ${
            isHovered ? 'opacity-80' : 'opacity-100' 
          }`}></div>
        </div>
        <div className="absolute bottom-0 left-0 p-3 z-30">
          <h3 className="text-white font-medium">{category.name}</h3>
          <p className="text-gray-300 text-sm">{category.viewers.toLocaleString()} viewers</p>
        </div>
        
        {/* Live indicator that appears on hover */}
        <div className={`absolute top-2 right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded transition-opacity duration-300 z-30 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          LIVE
        </div>
        
        {/* More transparent overlay on hover */}
        <div className={`absolute inset-0 bg-purple-600/20 transition-opacity duration-300 z-20 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>
    </div>
  );
}

export default CategoryCard;
