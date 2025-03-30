import React from 'react';
import CurvedGraph from './CurvedGraph';

const CalorieBalanceGraph = ({ burned, consumed, isDarkMode }) => {
  if (!burned || burned.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No data</div>;
  }
  
  // If we don't have consumed data, just show burned
  if (!consumed || consumed.length === 0) {
    return (
      <div className="w-full h-full">
        <CurvedGraph 
          data={burned} 
          color={isDarkMode ? '#FF6500' : '#261FB3'}
          fillOpacity={0.15}
          isDarkMode={isDarkMode}
          showGrid={false}
          animate={true}
          strokeWidth={2}
        />
      </div>
    );
  }
  
  // Make sure the arrays are the same length
  const normalizedConsumed = consumed.slice(-burned.length);
  while (normalizedConsumed.length < burned.length) {
    // Prepend with estimated values if necessary
    normalizedConsumed.unshift(Math.round(normalizedConsumed[0] * (0.9 + Math.random() * 0.2)));
  }
  
  // Calculate the net (calories burned minus consumed)
  const net = burned.map((val, i) => val - (normalizedConsumed[i] || 0));
  
  // Use different colors based on the overall trend
  const isNetPositive = net.reduce((sum, val) => sum + val, 0) > 0;
  
  return (
    <div className="w-full h-full">
      <CurvedGraph 
        data={net} 
        color={isNetPositive 
          ? (isDarkMode ? '#10B981' : '#059669') // Green for positive net
          : (isDarkMode ? '#EF4444' : '#DC2626')  // Red for negative net
        }
        fillOpacity={0.15}
        isDarkMode={isDarkMode}
        showGrid={false}
        animate={true}
        strokeWidth={2}
      />
    </div>
  );
};

export default CalorieBalanceGraph;
