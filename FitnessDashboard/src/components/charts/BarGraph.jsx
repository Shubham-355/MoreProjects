import React from 'react';

const BarGraph = ({ 
  data, 
  color = '#261FB3',
  strokeWidth = 2,
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

  // Calculate bar width based on data length
  const barCount = data.length;
  const barWidth = (300 - 40) / (barCount * 1.5); // 40px for padding
  const barSpacing = barWidth / 2;

  // Generate bars for the chart
  const renderBars = () => {
    return data.map((value, index) => {
      const normalizedHeight = ((value - minValue) / valueRange) * 140; // 140px is the chart height
      const xPos = 20 + index * (barWidth + barSpacing);
      
      return (
        <g key={index} transform={`translate(${xPos}, 0)`}>
          <rect
            x={0}
            y={160 - normalizedHeight}
            width={barWidth}
            height={normalizedHeight}
            fill={color}
            fillOpacity={0.7}
            rx={2}
            className="transition-all duration-500"
          />
          
          {/* Bar value label */}
          <text
            x={barWidth / 2}
            y={155 - normalizedHeight}
            fontSize="9"
            textAnchor="middle"
            fill={isDarkMode ? '#FFFFFF' : '#333333'}
            className="chart-value-label"
          >
            {value}
          </text>
          
          {/* X-axis label */}
          {xAxisLabels[index] && (
            <text
              x={barWidth / 2}
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
      
      {/* Bars */}
      {renderBars()}
    </svg>
  );
};

export default BarGraph;
