import React from 'react';

const ChartTypeSelector = ({ chartType, onChartTypeChange, isDarkMode, size = 'md' }) => {
  // Size variants
  const sizeClasses = {
    xs: 'space-x-0.5',
    sm: 'space-x-1',
    md: 'space-x-1',
    lg: 'space-x-2'
  };
  
  const buttonClasses = {
    xs: 'p-1 text-[10px]',
    sm: 'px-1.5 py-1 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };
  
  const iconClasses = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const chartTypes = [
    { id: 'curve', label: 'Curved', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconClasses[size]}>
        <path d="M3 13h2v-2H3v2zm4 8h2v-2H7v2zm6-18h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zm4 0h2v-2H7v2zm8-8h2v-2h-2v2zm0 8h2v-2h-2v2zm-4-4h2v-2h-2v2zm0-4h2v-2h-2v2zm0 8h2v-2h-2v2zm-4 0h2v-2H7v2zm8-12h-2v2h2V5z" 
          fill="currentColor" />
      </svg>
    )},
    { id: 'bar', label: 'Bar', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconClasses[size]}>
        <path d="M4 9h4v11H4zm6-5h4v16h-4zm6 8h4v8h-4z" fill="currentColor" />
      </svg>
    )},
    { id: 'line', label: 'Line', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconClasses[size]}>
        <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" fill="currentColor" />
      </svg>
    )},
    { id: 'area', label: 'Area', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconClasses[size]}>
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" fill="currentColor" />
      </svg>
    )}
  ];

  return (
    <div className={`flex ${sizeClasses[size]}`}>
      {chartTypes.map(type => (
        <button
          key={type.id}
          onClick={() => onChartTypeChange(type.id)}
          className={`flex items-center space-x-1 rounded-md transition-colors ${buttonClasses[size]} ${
            chartType === type.id 
              ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
              : (isDarkMode ? 'bg-[#1E3E62]/30 text-gray-300 hover:bg-[#1E3E62]/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
          }`}
          title={type.label}
        >
          <span>{type.icon}</span>
          {size !== 'xs' && size !== 'sm' && <span className="hidden sm:inline">{type.label}</span>}
        </button>
      ))}
    </div>
  );
};

export default ChartTypeSelector;
