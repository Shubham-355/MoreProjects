import React from 'react';
import CurvedGraph from './CurvedGraph';

const WaterIntakeGraph = ({ data, isDarkMode }) => {
  if (!data || data.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No data</div>;
  }
  
  return (
    <div className="w-full h-full">
      <CurvedGraph 
        data={data} 
        color={isDarkMode ? '#3B82F6' : '#2563EB'} // Blue for water
        fillOpacity={0.15}
        isDarkMode={isDarkMode}
        showGrid={false}
        animate={true}
        strokeWidth={2}
      />
    </div>
  );
};

export default WaterIntakeGraph;
