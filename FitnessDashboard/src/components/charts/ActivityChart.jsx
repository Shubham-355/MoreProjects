import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import ChartTypeSelector from './ChartTypeSelector';
import MultiChartView from './MultiChartView';

const ActivityChart = ({ data }) => {
  const { isDarkMode } = useDashboard();
  const [activeStat, setActiveStat] = useState('steps');
  const [chartType, setChartType] = useState('curve');
  
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40">
        <p className="text-gray-500 dark:text-gray-400">No activity data available</p>
      </div>
    );
  }

  // Prepare data for graph display
  const getGraphData = () => {
    const metrics = {
      steps: { 
        values: data.map(item => item.steps), 
        color: isDarkMode ? "#FF6500" : "#261FB3",
        unit: 'steps',
        title: 'Steps'
      },
      calories: { 
        values: data.map(item => item.calories), 
        color: isDarkMode ? "#FF8533" : "#5C56D4",
        unit: 'cal',
        title: 'Calories Burned'
      },
      active: { 
        values: data.map(item => item.active), 
        color: isDarkMode ? "#3A6B9F" : "#161179",
        unit: 'min',
        title: 'Active Minutes'
      },
      distance: { 
        values: data.map(item => item.distance || Math.round(item.steps / 1300 * 10) / 10), 
        color: isDarkMode ? "#1E3E62" : "#0C0950",
        unit: 'km',
        title: 'Distance'
      }
    };
    
    return metrics;
  };
  
  const metrics = getGraphData();
  const currentMetric = metrics[activeStat];
  const labels = data.map(item => item.day || '');
  
  // Calculate summary stats
  const values = currentMetric.values;
  const total = values.reduce((sum, val) => sum + val, 0);
  const average = Math.round(total / values.length);
  const max = Math.max(...values);
  
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {currentMetric.title}
        </h3>
        
        <div className="flex items-center space-x-4">
          <ChartTypeSelector 
            chartType={chartType} 
            onChartTypeChange={setChartType} 
            isDarkMode={isDarkMode} 
            size="md"
          />
          
          <div className="flex space-x-2">
            {Object.keys(metrics).map(metric => (
              <button
                key={metric}
                onClick={() => setActiveStat(metric)}
                className={`px-2 py-1 text-xs rounded-full transition-colors ${
                  activeStat === metric 
                  ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
                  : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
                }`}
              >
                {metrics[metric].title}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Latest</span>
          <div className="font-bold text-xl">
            <span className={isDarkMode ? 'text-white' : 'text-[#0C0950]'}>{values[values.length - 1]}</span>
            <span className={`text-sm font-normal ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{currentMetric.unit}</span>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs ${
          values[values.length - 1] > average 
            ? (isDarkMode ? 'bg-green-900/30 text-green-200' : 'bg-green-100 text-green-800')
            : (isDarkMode ? 'bg-yellow-900/30 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
        }`}>
          {values[values.length - 1] > average ? 'Above Average' : 'Below Average'}
        </div>
      </div>
      
      <div className="h-48 mt-3 w-full">
        <MultiChartView
          data={currentMetric.values} 
          chartType={chartType}
          color={currentMetric.color}
          isDarkMode={isDarkMode}
          xAxisLabels={labels}
          showGrid={true}
        />
      </div>
      
      <div className="flex justify-between mt-4 text-center">
        <div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total</span>
          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {total}
            <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{currentMetric.unit}</span>
          </div>
        </div>
        <div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Average</span>
          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {average}
            <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{currentMetric.unit}</span>
          </div>
        </div>
        <div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Peak</span>
          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {max}
            <span className={`text-xs ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{currentMetric.unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
