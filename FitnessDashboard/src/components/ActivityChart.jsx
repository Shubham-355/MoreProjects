import { useState, useEffect, useRef } from 'react';
import { useDashboard } from '../context/DashboardContext';

const ActivityChart = ({ isDarkMode }) => {
  const { activity, timeFrame, monthly } = useDashboard();
  const [activeIndex, setActiveIndex] = useState(null);
  const [animatedBars, setAnimatedBars] = useState(false);
  const [activeMetric, setActiveMetric] = useState('steps');
  const chartRef = useRef(null);
  
  // Data mapping for different metrics
  const metricData = {
    steps: { 
      data: activity.map(day => day.steps), 
      color: isDarkMode ? 'from-[#FF6500] to-[#FF6500]/80' : 'from-[#261FB3] to-[#161179]',
      unit: 'steps',
      label: 'Steps'
    },
    calories: { 
      data: activity.map(day => day.calories), 
      color: isDarkMode ? 'from-[#FF6500] to-[#FF8533]' : 'from-[#261FB3] to-[#5C56D4]',
      unit: 'cal',
      label: 'Calories'
    },
    active: { 
      data: activity.map(day => day.active), 
      color: isDarkMode ? 'from-[#1E3E62] to-[#3A6B9F]' : 'from-[#161179] to-[#261FB3]',
      unit: 'min',
      label: 'Active Minutes'
    },
    water: { 
      data: activity.map(day => day.water), 
      color: isDarkMode ? 'from-[#0B192C] to-[#1E3E62]' : 'from-[#0C0950] to-[#261FB3]',
      unit: 'cups',
      label: 'Water Intake'
    }
  };
  
  // Get current metric data
  const currentData = metricData[activeMetric].data;
  const maxValue = Math.max(...currentData);
  const currentColor = metricData[activeMetric].color;
  const currentUnit = metricData[activeMetric].unit;
  
  // Calculate average for current metric
  const average = Math.round(currentData.reduce((acc, val) => acc + val, 0) / currentData.length);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedBars(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animate when metric changes
  useEffect(() => {
    setAnimatedBars(false);
    setTimeout(() => setAnimatedBars(true), 100);
  }, [activeMetric]);
  
  // Handle chart click for mobile
  const handleChartClick = (e) => {
    if (!chartRef.current) return;
    
    const chartRect = chartRef.current.getBoundingClientRect();
    const clickX = e.clientX - chartRect.left;
    const barWidth = chartRect.width / activity.length;
    const clickedIndex = Math.floor(clickX / barWidth);
    
    setActiveIndex(clickedIndex >= 0 && clickedIndex < activity.length ? clickedIndex : null);
  };
  
  return (
    <div className={`rounded-xl transition-colors duration-300`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} flex items-center`}>
          <span className="mr-2">Activity Overview</span>
          <div className="relative h-2 w-2">
            <span className={`ping absolute inline-flex h-full w-full rounded-full ${isDarkMode ? 'bg-[#FF6500]' : 'bg-[#261FB3]'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isDarkMode ? 'bg-[#FF6500]' : 'bg-[#261FB3]'}`}></span>
          </div>
        </h3>
        
        {/* Metric selector */}
        <div className={`flex ${isDarkMode ? 'bg-[#1E3E62]/30' : 'bg-[#261FB3]/10'} p-1 rounded-lg self-start`}>
          {Object.keys(metricData).map(metric => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeMetric === metric 
                  ? isDarkMode ? 'bg-[#0B192C] text-[#FF6500]' : 'bg-white text-[#161179]' 
                  : isDarkMode ? 'text-white hover:bg-[#0B192C]/50' : 'text-[#161179] hover:bg-white/50'
              }`}
            >
              {metricData[metric].label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Time frame badge */}
      <div className={`text-sm ${isDarkMode ? 'text-gray-300 bg-[#1E3E62]/20' : 'text-[#161179] bg-[#261FB3]/10'} px-3 py-1 rounded-full inline-block mb-4`}>
        {timeFrame === 'daily' && 'Last 7 days'}
        {timeFrame === 'weekly' && 'Last 4 weeks'}
        {timeFrame === 'monthly' && 'Last 6 months'}
      </div>
      
      {/* Chart area */}
      <div 
        ref={chartRef}
        className="flex items-end h-48 sm:h-56 gap-1 md:gap-2 mt-2" 
        onClick={handleChartClick}
      >
        {activity.map((day, index) => (
          <div 
            key={index} 
            className="flex-1 flex flex-col items-center group"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="w-full flex flex-col items-center relative">
              {/* Metric bar */}
              <div 
                className={`w-full rounded-t-md bg-gradient-to-t ${currentColor} shadow-sm relative overflow-hidden transition-all duration-300`}
                style={{ 
                  height: animatedBars ? `${(currentData[index] / maxValue) * 100}%` : '0%',
                  minHeight: '6%',
                  transitionDelay: `${index * 50}ms`,
                  opacity: activeIndex === null || activeIndex === index ? 1 : 0.5,
                  transform: activeIndex === index ? 'scaleY(1.05)' : 'scaleY(1)'
                }}
              >
                {/* Highlight effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white opacity-30"></div>
                
                {/* Hover highlight */}
                <div className={`absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 ${
                  activeIndex === index ? 'opacity-10' : ''
                }`}></div>
              </div>
              
              {/* Tooltip */}
              <div 
                className={`absolute -top-14 left-1/2 transform -translate-x-1/2 ${isDarkMode ? 'bg-[#0B192C]' : 'bg-[#0C0950]'} text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg z-10 
                    opacity-0 transition-all duration-200 pointer-events-none ${
                      activeIndex === index ? 'opacity-100 translate-y-0' : 'translate-y-2'
                    }`}
              >
                <div className="text-center mb-1 font-bold">{day.day}</div>
                <div className="whitespace-nowrap">{currentData[index].toLocaleString()} {currentUnit}</div>
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 ${isDarkMode ? 'bg-[#0B192C]' : 'bg-[#0C0950]'} rotate-45`}></div>
              </div>
              
              {/* Bar label */}
              <div className={`mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#161179]'}`}>{day.day}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Stats summary */}
      <div className={`grid grid-cols-3 gap-4 mt-8 pt-4 border-t ${isDarkMode ? 'border-[#1E3E62]/30' : 'border-[#261FB3]/20'}`}>
        <div className="hover:scale-105 transition-transform duration-300 text-center">
          <div className={`${isDarkMode ? 'text-gray-400' : 'text-[#161179]/70'} text-xs uppercase tracking-wider mb-1`}>AVERAGE</div>
          <div className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
            {average.toLocaleString()} <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#161179]/70'}`}>{currentUnit}</span>
          </div>
        </div>
        
        <div className="hover:scale-105 transition-transform duration-300 text-center">
          <div className={`${isDarkMode ? 'text-gray-400' : 'text-[#161179]/70'} text-xs uppercase tracking-wider mb-1`}>HIGHEST</div>
          <div className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
            {Math.max(...currentData).toLocaleString()} <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#161179]/70'}`}>{currentUnit}</span>
          </div>
        </div>
        
        <div className="hover:scale-105 transition-transform duration-300 text-center">
          <div className={`${isDarkMode ? 'text-gray-400' : 'text-[#161179]/70'} text-xs uppercase tracking-wider mb-1`}>TOTAL</div>
          <div className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
            {currentData.reduce((a, b) => a + b, 0).toLocaleString()} <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#161179]/70'}`}>{currentUnit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
