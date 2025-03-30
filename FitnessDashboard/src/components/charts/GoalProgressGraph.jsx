import React from 'react';
import CurvedGraph from './CurvedGraph';

const GoalProgressGraph = ({ goal, isDarkMode }) => {
  if (!goal) return null;
  
  // Generate a series of data points to simulate progress over time
  const generateProgressData = () => {
    const dataPoints = 8; // Including a starting point and the current value
    const result = [0]; // Starting from zero
    
    // Current progress percentage
    const progress = goal.current / goal.target;
    
    // Generate a series of values that show realistic progress towards the goal
    for (let i = 1; i < dataPoints - 1; i++) {
      // Calculate a simulated historical point with some randomness
      const expectedProgress = (i / (dataPoints - 1)) * goal.current;
      const randomFactor = Math.random() * 0.2 - 0.1; // +/- 10% randomness
      const value = Math.max(0, expectedProgress * (1 + randomFactor));
      result.push(Math.round(value * 10) / 10); // Round to 1 decimal place
    }
    
    // Add the current value as the last point
    result.push(goal.current);
    
    return result;
  };
  
  const progressData = generateProgressData();
  
  // Calculate weeks or days based on the goal deadline
  const deadline = new Date(goal.deadline);
  const today = new Date();
  const timeLeft = Math.max(0, Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)));
  
  // X-axis labels (just the last few points)
  const xLabels = ['Start'];
  if (timeLeft > 14) {
    // Show weeks if more than 2 weeks left
    xLabels.push('Week 1', 'Week 2', '', 'Now');
  } else {
    // Show recent days
    xLabels.push('', '', '', 'Now');
  }
  
  // Color based on progress and theme
  const getColor = () => {
    const progress = goal.current / goal.target;
    
    if (progress >= 0.9) {
      return isDarkMode ? '#22C55E' : '#059669'; // Green
    } else if (progress >= 0.5) {
      return isDarkMode ? '#FF6500' : '#261FB3'; // Primary
    } else {
      return isDarkMode ? '#F59E0B' : '#D97706'; // Yellow/Orange
    }
  };
  
  const color = getColor();
  
  return (
    <div className="w-full h-32">
      <CurvedGraph 
        data={progressData}
        color={color}
        fillOpacity={0.15}
        isDarkMode={isDarkMode}
        strokeWidth={3}
        xAxisLabels={xLabels}
        showGrid={false}
      />
      
      {/* Target line */}
      <div 
        className={`w-full h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} relative -mt-16 mb-16 flex justify-end items-center`}
        style={{ marginTop: `-${(goal.target / Math.max(...progressData)) * 128}px` }}
      >
        <div className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} mr-1`}>
          Target: {goal.target} {goal.unit}
        </div>
      </div>
    </div>
  );
};

export default GoalProgressGraph;
