import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import ChartTypeSelector from './charts/ChartTypeSelector';
import MultiChartView from './charts/MultiChartView';
import AnimatedNumber from './AnimatedNumber';

// Icons for the stat cards
const icons = {
  fire: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  footprints: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  dumbbell: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
    </svg>
  ),
  heart: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  food: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
};

const StatCard = ({ title, value, icon, change, target, chartData, initialChartType = 'curve' }) => {
  const { isDarkMode } = useDashboard();
  const [chartType, setChartType] = useState(initialChartType);
  
  // Calculate progress percentage
  const progressPercent = Math.min(100, Math.round((value / target) * 100)) || 0;

  // Get color based on theme
  const getColor = () => {
    switch(title.toLowerCase()) {
      case 'steps':
        return isDarkMode ? '#FF6500' : '#261FB3';
      case 'calories burned':
        return isDarkMode ? '#FF8533' : '#5C56D4';
      case 'active minutes':
        return isDarkMode ? '#3A6B9F' : '#161179';
      case 'water intake':
        return isDarkMode ? '#3B82F6' : '#2563EB';
      default:
        return isDarkMode ? '#FF6500' : '#261FB3';
    }
  };

  return (
    <div className={`rounded-xl shadow-sm p-5 transition-all duration-300 ${isDarkMode ? 'bg-[#0B192C]/80 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{title}</h3>
          <p className={`text-2xl font-semibold mt-1 ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
            {typeof value === 'number' ? (
              <AnimatedNumber 
                value={value} 
                formatter={(val) => val.toLocaleString()}
              />
            ) : value}
          </p>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#1E3E62]/50 text-white' : 'bg-[#F8F7FF] text-[#261FB3]'}`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
      
      {/* Graph visualization with chart type selector */}
      <div className="mt-3">
        <div className="flex justify-end mb-1">
          <ChartTypeSelector 
            chartType={chartType} 
            onChartTypeChange={setChartType} 
            isDarkMode={isDarkMode} 
            size="xs" // Extra small size for stat cards
          />
        </div>
        <div className="h-16 w-full">
          {chartData && (
            <MultiChartView
              data={chartData}
              chartType={chartType}
              color={getColor()}
              isDarkMode={isDarkMode}
              showGrid={false}
              simplified={true} // Simplified version for small spaces
            />
          )}
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Progress</span>
          <span className={isDarkMode ? 'text-white' : 'text-[#0C0950]'}>{progressPercent}%</span>
        </div>
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#1E3E62]/30' : 'bg-gray-200'}`}>
          <div 
            className={`h-full rounded-full ${
              progressPercent >= 100 
                ? (isDarkMode ? 'bg-green-500' : 'bg-green-600') 
                : (isDarkMode ? 'bg-[#FF6500]' : 'bg-[#261FB3]')
            }`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Target: {target.toLocaleString()}
        </div>
        {change !== undefined && (
          <div className={`flex items-center text-xs ${
            change >= 0 
              ? (isDarkMode ? 'text-green-400' : 'text-green-600') 
              : (isDarkMode ? 'text-red-400' : 'text-red-600')
          }`}>
            <span>{change >= 0 ? '↑' : '↓'} {Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
