import React from 'react';
import CurvedGraph from './CurvedGraph';

const TodayActivityGraph = ({ data, type, isDarkMode }) => {
  if (!data || data.length === 0) {
    return <div className={`w-full h-full flex items-center justify-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No data</div>;
  }
  
  // Apply colors based on activity type and theme
  const getColor = () => {
    switch(type) {
      case 'steps':
        return isDarkMode ? '#FF6500' : '#261FB3';
      case 'active':
        return isDarkMode ? '#3A6B9F' : '#161179';
      case 'calories':
        return isDarkMode ? '#FF8533' : '#5C56D4';
      default:
        return isDarkMode ? '#FF6500' : '#261FB3';
    }
  };
  
  return (
    <div className="w-full h-full">
      <CurvedGraph 
        data={data} 
        color={getColor()}
        fillOpacity={0.15}
        isDarkMode={isDarkMode}
        showGrid={false}
        animate={true}
        strokeWidth={2}
      />
    </div>
  );
};

export default TodayActivityGraph;
