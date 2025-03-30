import React, { useState, memo, useCallback, useMemo } from 'react';

interface ProgressBadgeProps {
  title: string;
  progress: number; // 0 to 100
  icon: React.ReactNode;
  color?: string;
}

// Final optimized progress badge
const ProgressBadge: React.FC<ProgressBadgeProps> = memo(({ 
  title, 
  progress, 
  icon,
  color = 'from-primary to-secondary dark:from-darkPrimary dark:to-darkSecondary'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  
  // Pre-compute derived values
  const roundedProgress = useMemo(() => Math.round(progress), [progress]);
  const message = useMemo(() => {
    if (roundedProgress < 30) return "Just started";
    if (roundedProgress < 60) return "Good progress";
    if (roundedProgress < 90) return "Almost there";
    return "Complete!";
  }, [roundedProgress]);
  
  return (
    <div 
      className="bg-white dark:bg-darkBackground-light shadow-sm border border-gray-100 dark:border-gray-700/50 rounded-md p-3 contain-paint"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center mb-2">
        <div 
          className={`p-1.5 rounded mr-2 bg-gradient-to-r ${color} text-white`}
          style={{ 
            transition: 'transform 150ms ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)' 
          }}
        >
          {icon}
        </div>
        <h3 className="text-sm font-medium text-primary-dark dark:text-darkText">{title}</h3>
      </div>
      
      {/* Progress text */}
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium text-primary dark:text-darkPrimary">{roundedProgress}%</span>
        <span className="text-text-light dark:text-darkText-light">{message}</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${color}`}
          style={{ width: `${roundedProgress}%` }}
        ></div>
      </div>
      
      {/* Celebration dot - only for 100% */}
      {roundedProgress === 100 && isHovered && (
        <div 
          className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent dark:bg-darkPrimary animate-ping"
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
});

ProgressBadge.displayName = 'ProgressBadge';
export default ProgressBadge;
