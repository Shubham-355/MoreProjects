import React, { useState } from 'react';
import MultiChartView from './MultiChartView';
import ChartTypeSelector from './ChartTypeSelector';

const SleepQualityGraph = ({ data, isDarkMode }) => {
  const [view, setView] = useState('hours'); 
  const [chartType, setChartType] = useState('curve');
  
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-40 text-gray-500">No sleep data available</div>;
  }

  const hours = data.map(day => day.hours);
  const quality = data.map(day => day.quality);
  const labels = data.map(day => day.date);
  
  // Calculate stats
  const avgHours = Math.round((hours.reduce((sum, val) => sum + val, 0) / hours.length) * 10) / 10;
  const avgQuality = Math.round(quality.reduce((sum, val) => sum + val, 0) / quality.length);
  
  return (
    <div className="w-full">
      {/* View selector */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setView('hours')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              view === 'hours' 
                ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
                : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
            }`}
          >
            Hours
          </button>
          <button 
            onClick={() => setView('quality')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              view === 'quality' 
                ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
                : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
            }`}
          >
            Quality
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <ChartTypeSelector 
            chartType={chartType} 
            onChartTypeChange={setChartType} 
            isDarkMode={isDarkMode} 
            size="sm"
          />
          
          {view === 'hours' ? (
            <div className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}`}>
              Avg: {avgHours} hrs
            </div>
          ) : (
            <div className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
              Avg: {avgQuality}%
            </div>
          )}
        </div>
      </div>
      
      {/* Graph */}
      <div className="h-40">
        <MultiChartView 
          data={view === 'hours' ? hours : quality}
          chartType={chartType}
          color={view === 'hours' 
            ? (isDarkMode ? '#818CF8' : '#4F46E5') // Indigo for hours
            : (isDarkMode ? '#C084FC' : '#7E22CE')  // Purple for quality
          }
          fillOpacity={0.2}
          isDarkMode={isDarkMode}
          xAxisLabels={labels.length > 7 ? labels.slice(-7) : labels}
          showGrid={true}
        />
      </div>
      
      {/* Sleep insights */}
      <div className="mt-4 flex justify-between text-center">
        <div>
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last Night</div>
          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {hours[hours.length - 1]} hrs
          </div>
        </div>
        <div>
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Best Night</div>
          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {Math.max(...hours)} hrs
          </div>
        </div>
        <div>
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Weekly Trend</div>
          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {hours.slice(-3).reduce((a, b) => a + b, 0) > hours.slice(-6, -3).reduce((a, b) => a + b, 0) 
              ? '↑ Improving' 
              : '↓ Declining'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepQualityGraph;
