import React from 'react';

const AreaGraph = ({ 
  data, 
  color = '#261FB3',
  strokeWidth = 2,
  fillOpacity = 0.2,
  isDarkMode = false,
  showGrid = true,
  xAxisLabels = [],
  yAxisLabels = []
}) => {
  // Handle empty data case
  if (!data || data.length === 0) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        No data available
      </div>
    );
  }

  // Calculate min and max values for scaling
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data) > 0 ? 0 : Math.min(...data);
  const valueRange = maxValue - minValue || 1; // Avoid division by zero

  // Generate points for the area chart
  const generatePathD = () => {
    let path = `M 20 160`;
    
    // Add the bottom line from left to right
    data.forEach((value, index) => {
      const x = 20 + (index * (280 / (data.length - 1 || 1)));
      path += ` L ${x} 160`;
    });
    
    // Add the data line from right to left
    for (let i = data.length - 1; i >= 0; i--) {
      const x = 20 + (i * (280 / (data.length - 1 || 1)));
      const y = 160 - ((data[i] - minValue) / valueRange * 140);
      path += ` L ${x} ${y}`;
    }
    
    path += ' Z';
    
    return path;
  };

  // Generate line path for data curve
  const generateLinePath = () => {
    let path = '';
    
    data.forEach((value, index) => {
      const x = 20 + (index * (280 / (data.length - 1 || 1)));
      const y = 160 - ((value - minValue) / valueRange * 140);
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  };

  // Render grid lines if enabled
  const renderGrid = () => {
    if (!showGrid) return null;
    
    const gridLines = [];
    const gridLineCount = 5;
    
    for (let i = 0; i <= gridLineCount; i++) {
      const y = 160 - (i * 140 / gridLineCount);
      const gridValue = minValue + (i * valueRange / gridLineCount);
      
      gridLines.push(
        <g key={`grid-${i}`}>
          <line
            x1={20}
            y1={y}
            x2={300}
            y2={y}
            stroke={isDarkMode ? '#1E3E62' : '#E2E8F0'}
            strokeWidth={1}
            strokeDasharray={isDarkMode ? "3,3" : "2,2"}
          />
          <text
            x={15}
            y={y + 3}
            fontSize="8"
            textAnchor="end"
            fill={isDarkMode ? '#A0AEC0' : '#718096'}
          >
            {Math.round(gridValue)}
          </text>
        </g>
      );
    }
    
    return gridLines;
  };

  // Generate data points for the chart
  const renderDataPoints = () => {
    return data.map((value, index) => {
      const x = 20 + (index * (280 / (data.length - 1 || 1)));
      const y = 160 - ((value - minValue) / valueRange * 140);
      
      return (
        <g key={`point-${index}`}>
          <circle
            cx={x}
            cy={y}
            r={3}
            fill={color}
            stroke={isDarkMode ? '#0B192C' : 'white'}
            strokeWidth={1.5}
          />
          
          {/* X-axis label */}
          {xAxisLabels[index] && (
            <text
              x={x}
              y={175}
              fontSize="8"
              textAnchor="middle"
              fill={isDarkMode ? '#A0AEC0' : '#666666'}
            >
              {xAxisLabels[index]}
            </text>
          )}
        </g>
      );
    });
  };

  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 320 180" 
      preserveAspectRatio="xMidYMid meet" 
      className="overflow-visible"
    >
      {/* Background grid */}
      {renderGrid()}
      
      {/* X and Y axes */}
      <line
        x1={20}
        y1={160}
        x2={300}
        y2={160}
        stroke={isDarkMode ? '#4A5568' : '#CBD5E0'}
        strokeWidth={1}
      />
      <line
        x1={20}
        y1={20}
        x2={20}
        y2={160}
        stroke={isDarkMode ? '#4A5568' : '#CBD5E0'}
        strokeWidth={1}
      />
      
      {/* Area fill */}
      <path
        d={generatePathD()}
        fill={color}
        fillOpacity={fillOpacity}
        stroke="none"
      />
      
      {/* Line connecting all points */}
      <path
        d={generateLinePath()}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Data points */}
      {renderDataPoints()}
    </svg>
  );
};

export default AreaGraph;
