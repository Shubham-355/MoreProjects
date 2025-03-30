import React from 'react';

const CurvedGraph = ({ 
  data, 
  width = '100%', // Changed from fixed width to 100%
  height = 150, 
  color = '#261FB3',
  strokeWidth = 3,
  fillOpacity = 0.2,
  isDarkMode = false,
  showGrid = true,
  yAxisLabels = [],
  xAxisLabels = [],
  animate = true
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
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1; // Avoid division by zero

  // Function to create the curved path
  const createPath = () => {
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 300;
      const y = height - ((value - minValue) / range) * height;
      return { x, y };
    });

    if (points.length === 1) {
      // If only one point, create a small circle
      return `M ${points[0].x},${points[0].y} a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0`;
    }

    // Create curved path using bezier curves
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const x1 = points[i].x;
      const y1 = points[i].y;
      const x2 = points[i + 1].x;
      const y2 = points[i + 1].y;
      
      // Control points for the curve
      const cpx1 = x1 + (x2 - x1) / 2;
      const cpy1 = y1;
      const cpx2 = x1 + (x2 - x1) / 2;
      const cpy2 = y2;
      
      path += ` C ${cpx1},${cpy1} ${cpx2},${cpy2} ${x2},${y2}`;
    }
    
    return path;
  };

  // Create path for filling the area under the curve
  const createAreaPath = () => {
    const linePath = createPath();
    return `${linePath} L 300,${height} L 0,${height} Z`;
  };

  // Grid lines
  const gridLines = () => {
    if (!showGrid) return null;

    const horizontalLines = 5;
    const lines = [];
    
    for (let i = 0; i <= horizontalLines; i++) {
      const y = (i / horizontalLines) * height;
      lines.push(
        <line 
          key={`h-${i}`} 
          x1="0" 
          y1={y} 
          x2={300} 
          y2={y} 
          stroke={isDarkMode ? "#333" : "#ddd"} 
          strokeWidth="1" 
          strokeDasharray="5,5"
        />
      );
    }
    
    // Vertical grid lines (if we have x-axis labels)
    if (xAxisLabels.length > 1) {
      for (let i = 0; i < xAxisLabels.length; i++) {
        const x = (i / (xAxisLabels.length - 1)) * 300;
        lines.push(
          <line 
            key={`v-${i}`} 
            x1={x} 
            y1="0" 
            x2={x} 
            y2={height} 
            stroke={isDarkMode ? "#333" : "#ddd"} 
            strokeWidth="1" 
            strokeDasharray="5,5"
          />
        );
      }
    }
    
    return <g className="grid-lines">{lines}</g>;
  };

  // Axis labels
  const renderLabels = () => {
    const labels = [];
    
    // Y-axis labels (value)
    if (yAxisLabels.length > 0) {
      yAxisLabels.forEach((label, i) => {
        const y = height - ((i / (yAxisLabels.length - 1)) * height);
        labels.push(
          <text 
            key={`y-${i}`} 
            x="-5" 
            y={y} 
            className={`text-xs ${isDarkMode ? 'fill-gray-400' : 'fill-gray-600'}`}
            textAnchor="end" 
            dominantBaseline="middle"
          >
            {label}
          </text>
        );
      });
    }
    
    // X-axis labels (time/labels)
    if (xAxisLabels.length > 0) {
      xAxisLabels.forEach((label, i) => {
        const x = (i / (xAxisLabels.length - 1)) * 300;
        labels.push(
          <text 
            key={`x-${i}`} 
            x={x} 
            y={height + 15} 
            className={`text-xs ${isDarkMode ? 'fill-gray-400' : 'fill-gray-600'}`}
            textAnchor="middle"
          >
            {label}
          </text>
        );
      });
    }
    
    return <g className="axis-labels">{labels}</g>;
  };

  // Data points with tooltips
  const renderDataPoints = () => {
    return data.map((value, index) => {
      const x = (index / (data.length - 1)) * 300;
      const y = height - ((value - minValue) / range) * height;
      
      return (
        <g key={`point-${index}`} className="data-point">
          <circle 
            cx={x} 
            cy={y} 
            r={4} 
            fill={color} 
            className="cursor-pointer hover:r-6 transition-all duration-200"
          />
          {/* Hidden larger hitbox for better hover */}
          <circle 
            cx={x} 
            cy={y} 
            r={10} 
            fill="transparent" 
            className="cursor-pointer"
          >
            <title>{value}</title>
          </circle>
        </g>
      );
    });
  };

  // Make this function responsive by using viewBox instead of fixed dimensions
  // This allows the SVG to scale while maintaining aspect ratio
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox={`-20 -10 340 180`} 
      preserveAspectRatio="xMidYMid meet" 
      className="overflow-visible"
    >
      {/* Grid lines */}
      {gridLines()}
      
      {/* Area under the curve */}
      <path 
        d={createAreaPath()} 
        fill={color}
        fillOpacity={fillOpacity}
        className={animate ? "graph-fill-anim" : ""}
      />
      
      {/* Curved line */}
      <path 
        d={createPath()} 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "graph-line-anim" : ""}
      />
      
      {/* Data points */}
      {renderDataPoints()}
      
      {/* Axes labels */}
      {renderLabels()}
      
      {/* Digital glowing effect for darker mode */}
      {isDarkMode && (
        <path 
          d={createPath()} 
          fill="none" 
          stroke={color}
          strokeWidth={1} 
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          className={animate ? "graph-glow-anim" : ""}
        />
      )}
      
      {/* Filters for glow effect */}
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Animation styles */}
      <style>
        {`
        .graph-line-anim {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 1.5s ease-in-out forwards;
        }
        .graph-fill-anim {
          opacity: 0;
          animation: fade-in 1s ease-in-out 0.5s forwards;
        }
        .graph-glow-anim {
          opacity: 0;
          animation: fade-in 1s ease-in-out 0.8s forwards;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fade-in {
          to {
            opacity: 1;
          }
        }
        `}
      </style>
    </svg>
  );
};

export default CurvedGraph;
