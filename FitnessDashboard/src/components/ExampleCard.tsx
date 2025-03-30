import React, { memo, useState, useCallback } from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  accentColor?: string;
}

// Ultra-optimized card component with minimal repaints
const Card: React.FC<CardProps> = memo(({ 
  title, 
  children, 
  icon, 
  accentColor = 'from-primary to-secondary dark:from-darkPrimary dark:to-darkSecondary' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  
  return (
    <div 
      className="rounded-md bg-white dark:bg-darkBackground-light shadow-sm border border-gray-100 dark:border-gray-700/50 h-full flex flex-col contain-paint"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top colored line */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${accentColor}`} aria-hidden="true"></div>
      
      {/* Card content */}
      <div className="p-3 flex-grow flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-2">
          {icon && (
            <div 
              className={`p-1.5 rounded-md bg-gradient-to-r ${accentColor} text-white`}
              style={{ 
                transition: 'transform 150ms ease',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)' 
              }}
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <h3 className="text-sm font-medium text-primary-dark dark:text-darkText">
            {title}
          </h3>
        </div>
        
        {/* Content */}
        <div className="text-xs text-text-dark dark:text-darkText-light flex-grow mb-3">
          {children}
        </div>
        
        {/* Button */}
        <button 
          className={`text-xs py-1 px-2.5 rounded text-white bg-gradient-to-r ${accentColor} self-start`}
          style={{ 
            transition: 'transform 150ms ease',
            transform: isHovered ? 'translateY(-1px)' : 'translateY(0)' 
          }}
        >
          Take Action
          <span 
            className="inline-block ml-1"
            style={{ 
              transition: 'transform 150ms ease',
              transform: isHovered ? 'translateX(2px)' : 'translateX(0)' 
            }}
            aria-hidden="true"
          >→</span>
        </button>
      </div>
    </div>
  );
});

Card.displayName = 'Card';
export default Card;
