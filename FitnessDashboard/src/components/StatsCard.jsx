import { useState, useEffect } from 'react';

const StatsCard = ({ title, value, icon, bgColor, textColor, goalValue, unit, trend, trendValue }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    // Animate value counting up
    const duration = 1500;
    const frameRate = 20;
    const totalFrames = Math.min(value, duration / frameRate);
    let currentFrame = 0;
    
    const timer = setInterval(() => {
      currentFrame++;
      const progress = Math.min(currentFrame / totalFrames, 1);
      setAnimatedValue(Math.floor(progress * value));
      
      if (currentFrame === totalFrames) {
        clearInterval(timer);
      }
    }, frameRate);
    
    // Animate progress bar
    const calculatedPercentage = goalValue ? Math.min(Math.round((value / goalValue) * 100), 100) : null;
    
    const progressTimer = setTimeout(() => {
      setPercentage(calculatedPercentage);
    }, 300);
    
    return () => {
      clearInterval(timer);
      clearTimeout(progressTimer);
    };
  }, [value, goalValue]);
  
  return (
    <div 
      className="glass-card rounded-xl p-4 flex flex-col h-full transform transition-all duration-300 hover-scale dark:shadow-indigo-900/10 fade-in hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1 flex items-baseline dark:text-white">
            {animatedValue.toLocaleString()}
            {unit && <span className="text-gray-400 dark:text-gray-500 text-sm ml-1">{unit}</span>}
          </p>
          
          {/* Trend indicator */}
          {trend && (
            <div className={`flex items-center mt-1 text-xs font-medium ${
              trend === 'up' 
                ? 'text-green-500 dark:text-green-400' 
                : 'text-red-500 dark:text-red-400'
            }`}>
              <span className={`mr-1 ${trend === 'up' ? 'rotate-0' : 'rotate-180'}`}>
                {trend === 'up' ? '↑' : '↓'}
              </span>
              <span>{trendValue.toLocaleString()} {trend === 'up' ? 'more' : 'less'} than yesterday</span>
            </div>
          )}
        </div>
        <div className={`${bgColor} ${textColor} w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-all duration-300 ${isHovered ? 'scale-110 rotate-12 shadow-md' : ''}`}>
          {icon}
        </div>
      </div>
      
      {goalValue && (
        <div className="mt-auto pt-3">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span className={percentage >= 80 ? 'text-green-500 dark:text-green-400 font-medium' : ''}>
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                percentage >= 100 
                  ? 'bg-gradient-to-r from-green-400 to-green-500'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              }`}
              style={{ 
                width: `${percentage}%`,
                backgroundSize: '200% 100%',
                animation: isHovered ? 'shimmer 2s infinite linear' : 'none'
              }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex justify-between">
            <span>{value.toLocaleString()} / {goalValue.toLocaleString()} {unit}</span>
            {percentage >= 100 && (
              <span className="text-green-500 dark:text-green-400 font-medium flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Goal achieved!
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
