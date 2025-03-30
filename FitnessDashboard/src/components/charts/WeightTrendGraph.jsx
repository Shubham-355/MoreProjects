import React from 'react';
import CurvedGraph from './CurvedGraph';

const WeightTrendGraph = ({ data, isDarkMode }) => {
  if (!data || data.length === 0) {
    // Generate sample data for demonstration
    data = [
      { date: 'Oct 1', weight: 185.5 },
      { date: 'Oct 5', weight: 184.2 },
      { date: 'Oct 10', weight: 183.7 },
      { date: 'Oct 15', weight: 183.0 },
      { date: 'Oct 20', weight: 182.3 },
      { date: 'Oct 25', weight: 181.8 },
      { date: 'Oct 30', weight: 181.2 },
    ];
  }

  const weights = data.map(item => item.weight);
  const dates = data.map(item => item.date);
  
  // Calculate weight change
  const startWeight = weights[0];
  const currentWeight = weights[weights.length - 1];
  const weightChange = currentWeight - startWeight;
  const percentChange = ((weightChange / startWeight) * 100).toFixed(1);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current</span>
          <div className="font-bold text-xl">{currentWeight} lbs</div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs ${
          weightChange < 0 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {weightChange < 0 ? '↓' : '↑'} {Math.abs(weightChange).toFixed(1)} lbs ({Math.abs(percentChange)}%)
        </div>
      </div>
      
      <div className="h-40 mt-2">
        <CurvedGraph 
          data={weights} 
          color={weightChange < 0 
            ? (isDarkMode ? '#10B981' : '#059669') // Green for weight loss
            : (isDarkMode ? '#F59E0B' : '#D97706')  // Yellow/orange for weight gain
          }
          fillOpacity={0.2}
          isDarkMode={isDarkMode}
          xAxisLabels={dates}
          showGrid={true}
        />
      </div>
      
      <div className="flex justify-between mt-4 text-center">
        <div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Starting</span>
          <div className="font-medium">{startWeight} lbs</div>
        </div>
        <div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Goal</span>
          <div className="font-medium">{(startWeight * 0.9).toFixed(1)} lbs</div>
        </div>
        <div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average</span>
          <div className="font-medium">
            {(weights.reduce((a, b) => a + b, 0) / weights.length).toFixed(1)} lbs
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightTrendGraph;
