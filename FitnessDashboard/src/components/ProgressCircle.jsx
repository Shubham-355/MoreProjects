import { useState, useEffect } from 'react';

const ProgressCircle = ({ percentage, title, icon, size = 120, strokeWidth = 8, current, goal, isDarkMode }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;
  
  // Determine color based on percentage and theme
  const getColor = (percent) => {
    if (isDarkMode) {
      if (percent >= 100) return "#4ade80"; // Green
      if (percent >= 70) return "#FF6500";  // Orange
      return "#1E3E62";                     // Blue
    } else {
      if (percent >= 100) return "#22c55e"; // Green
      if (percent >= 70) return "#261FB3";  // Blue
      return "#161179";                     // Dark Blue
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [percentage]);
  
  return (
    <div 
      className="flex flex-col items-center scale-in hover:scale-105 transition-transform duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={isDarkMode ? "#1E3E62/30" : "#261FB3/20"}
            strokeWidth={strokeWidth}
            className="transition-colors duration-300"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={getColor(animatedPercentage)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1.5s ease-in-out, stroke 0.5s ease-in-out',
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl mb-1 transition-transform duration-300 ${isHovered ? 'scale-125' : ''}`}>{icon}</span>
          <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} transition-all duration-300`}>
            {animatedPercentage}%
          </span>
        </div>
        
        {/* Pulse overlay for completed progress */}
        {animatedPercentage >= 100 && (
          <div className={`absolute inset-0 rounded-full border-2 ${isDarkMode ? 'border-green-500' : 'border-green-600'} opacity-0 animate-pulse`}></div>
        )}
      </div>
      <p className={`mt-2 text-sm ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} font-medium`}>{title}</p>
      
      {/* Progress details */}
      <div className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#161179]/70'} font-medium`}>
        {current} / {goal}
      </div>
      
      {/* Celebration indicator for 100% */}
      {animatedPercentage >= 100 && (
        <div className={`mt-1 text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'} font-medium flex items-center`}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Goal achieved!
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;
