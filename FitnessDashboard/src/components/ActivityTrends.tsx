import React, { useState, useMemo, memo, useEffect } from 'react';

// Mock data for demonstration
const MOCK_ACTIVITY_DATA = {
  daily: [
    { date: '2023-06-01', steps: 8432, calories: 420, distance: 5.2, active: 95 },
    { date: '2023-06-02', steps: 10253, calories: 510, distance: 6.8, active: 120 },
    { date: '2023-06-03', steps: 7651, calories: 380, distance: 4.9, active: 85 },
    { date: '2023-06-04', steps: 12105, calories: 605, distance: 7.6, active: 140 },
    { date: '2023-06-05', steps: 9872, calories: 493, distance: 6.3, active: 110 },
    { date: '2023-06-06', steps: 11458, calories: 572, distance: 7.1, active: 130 },
    { date: '2023-06-07', steps: 8765, calories: 438, distance: 5.5, active: 100 },
  ],
  weekly: [
    { week: 'Week 1', steps: 62550, calories: 3125, distance: 39.4, active: 680 },
    { week: 'Week 2', steps: 68720, calories: 3435, distance: 42.8, active: 720 },
    { week: 'Week 3', steps: 59840, calories: 2990, distance: 36.5, active: 640 },
    { week: 'Week 4', steps: 72100, calories: 3605, distance: 45.2, active: 790 },
  ],
  monthly: [
    { month: 'January', steps: 265400, calories: 13270, distance: 168.2, active: 2950 },
    { month: 'February', steps: 248700, calories: 12435, distance: 154.3, active: 2750 },
    { month: 'March', steps: 279800, calories: 13990, distance: 175.6, active: 3080 },
    { month: 'April', steps: 254300, calories: 12715, distance: 160.2, active: 2830 },
    { month: 'May', steps: 283500, calories: 14175, distance: 180.4, active: 3150 },
    { month: 'June', steps: 263210, calories: 13160, distance: 165.8, active: 2940 },
  ]
};

// Types for our data
type TimeFrame = 'daily' | 'weekly' | 'monthly';
type MetricType = 'steps' | 'calories' | 'distance' | 'active';
type ChartType = 'bar' | 'line' | 'area' | 'radial' | 'scatter';

// Bar chart component
const BarChart = memo(({ 
  data, 
  metric, 
  color = 'bg-primary dark:bg-darkPrimary',
  animated = true
}: { 
  data: any[], 
  metric: MetricType,
  color?: string,
  animated?: boolean
}) => {
  const [isVisible, setIsVisible] = useState(!animated);
  
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  // Find the max value for scaling
  const maxValue = useMemo(() => {
    return Math.max(...data.map(item => item[metric]));
  }, [data, metric]);

  return (
    <div className="pt-2 h-40">
      <div className="flex items-end h-32 space-x-1">
        {data.map((item, index) => {
          const height = `${(item[metric] / maxValue * 100)}%`;
          const key = item.date || item.week || item.month;
          
          return (
            <div key={key} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full ${color} rounded-t transition-all duration-500 hover:brightness-110`} 
                style={{ 
                  height: isVisible ? height : '0%',
                  opacity: isVisible ? 1 : 0,
                  transition: `height 0.5s ease-out ${index * 0.1}s, opacity 0.5s ease-out ${index * 0.1}s`
                }}
                title={`${key}: ${formatValue(item[metric], metric)}`}
              ></div>
              <div className="text-[9px] text-text-light dark:text-darkText-light mt-1 truncate w-full text-center">
                {item.date ? new Date(item.date).getDate() : 
                  (item.week || item.month.substring(0, 3))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
BarChart.displayName = 'BarChart';

// Enhanced curve interpolation line chart
const CurvedLineChart = memo(({ 
  data, 
  metric, 
  color = 'stroke-primary dark:stroke-darkPrimary fill-primary/10 dark:fill-darkPrimary/10',
  animated = true
}: { 
  data: any[], 
  metric: MetricType,
  color?: string,
  animated?: boolean
}) => {
  const [isVisible, setIsVisible] = useState(!animated);
  
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  const maxValue = useMemo(() => Math.max(...data.map(item => item[metric])), [data, metric]);

  // Generate smooth curve points using bezier curves
  const generateSmoothPath = useMemo(() => {
    if (data.length < 2) return '';
    
    const width = 100 / (data.length - 1);
    const points = data.map((item, index) => ({
      x: index * width,
      y: 100 - (item[metric] / maxValue * 100)
    }));
    
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      // Control point calculations for smooth curves
      const controlPoint1X = current.x + (next.x - current.x) / 3;
      const controlPoint1Y = current.y;
      const controlPoint2X = current.x + 2 * (next.x - current.x) / 3;
      const controlPoint2Y = next.y;
      
      path += ` C ${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${next.x},${next.y}`;
    }
    
    return path;
  }, [data, metric, maxValue]);

  // Generate area fill path
  const areaPath = useMemo(() => {
    if (!generateSmoothPath) return '';
    return `${generateSmoothPath} L ${100},100 L 0,100 Z`;
  }, [generateSmoothPath]);

  return (
    <div className="pt-2 h-40 flex flex-col">
      <div className="h-32 w-full relative">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="h-full w-full overflow-visible"
        >
          {/* Horizontal grid lines */}
          {[0, 25, 50, 75].map(y => (
            <line 
              key={`grid-${y}`}
              x1="0" 
              y1={y} 
              x2="100" 
              y2={y} 
              stroke="currentColor" 
              strokeWidth="0.2" 
              className="text-gray-200 dark:text-gray-700"
            />
          ))}
          
          {/* Area fill */}
          <path 
            d={areaPath}
            className={`${color.split(' ')[2]} ${color.split(' ')[3]} transition-opacity duration-700`}
            style={{ opacity: isVisible ? 0.2 : 0 }}
          />
          
          {/* Curved line */}
          <path 
            d={generateSmoothPath}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${color.split(' ')[0]} ${color.split(' ')[1]} transition-all duration-700`}
            style={{ 
              strokeDasharray: '200',
              strokeDashoffset: isVisible ? '0' : '200',
            }}
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const width = 100 / (data.length - 1);
            const x = index * width;
            const y = 100 - (item[metric] / maxValue * 100);
            return (
              <circle 
                key={index} 
                cx={x} 
                cy={y} 
                r="1.5"
                className={`${color.split(' ')[0]} ${color.split(' ')[1]} transition-all duration-500`}
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1)' : 'scale(0)',
                  transformOrigin: `${x}px ${y}px`,
                  transitionDelay: `${index * 0.1 + 0.3}s`
                }}
              />
            );
          })}
        </svg>
      </div>
      <div className="flex justify-between mt-1">
        {data.map((item, index) => {
          const key = item.date || item.week || item.month;
          return (
            <div key={key} className="text-[9px] text-text-light dark:text-darkText-light truncate text-center" style={{ width: `${100 / data.length}%` }}>
              {item.date ? new Date(item.date).getDate() : 
                (item.week || item.month.substring(0, 3))}
            </div>
          );
        })}
      </div>
    </div>
  );
});
CurvedLineChart.displayName = 'CurvedLineChart';

// Digital-style scatter plot
const ScatterPlot = memo(({ 
  data, 
  metric, 
  animated = true
}: { 
  data: any[], 
  metric: MetricType,
  animated?: boolean
}) => {
  const [isVisible, setIsVisible] = useState(!animated);
  
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  const maxValue = useMemo(() => Math.max(...data.map(item => item[metric])), [data, metric]);

  // Generate random comparison points for visual interest
  const extraPoints = useMemo(() => {
    return data.map(item => ({
      x: Math.random() * 100,
      y: 100 - (item[metric] / maxValue * 100) + (Math.random() * 20 - 10),
      value: item[metric] * (0.8 + Math.random() * 0.4) // 80-120% of original
    }));
  }, [data, metric, maxValue]);

  return (
    <div className="pt-2 h-40">
      <div className="h-32 w-full bg-gray-50 dark:bg-darkBackground-light rounded-md relative">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="h-full w-full"
        >
          {/* Grid lines */}
          {[0, 20, 40, 60, 80, 100].map(y => (
            <line 
              key={`grid-h-${y}`}
              x1="0" 
              y1={y} 
              x2="100" 
              y2={y} 
              stroke="currentColor" 
              strokeWidth="0.2" 
              strokeDasharray="1,1"
              className="text-gray-300 dark:text-gray-700"
            />
          ))}
          {[0, 20, 40, 60, 80, 100].map(x => (
            <line 
              key={`grid-v-${x}`}
              x1={x} 
              y1="0" 
              x2={x} 
              y2="100" 
              stroke="currentColor" 
              strokeWidth="0.2" 
              strokeDasharray="1,1"
              className="text-gray-300 dark:text-gray-700"
            />
          ))}
          
          {/* Extra scatter points */}
          {extraPoints.map((point, index) => (
            <circle 
              key={`extra-${index}`}
              cx={point.x} 
              cy={point.y} 
              r="0.8"
              className="fill-gray-300 dark:fill-gray-600 transition-all duration-300"
              style={{ 
                opacity: isVisible ? 0.5 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0)',
                transitionDelay: `${index * 0.05}s`
              }}
            />
          ))}
          
          {/* Main data points */}
          {data.map((item, index) => {
            const width = 100 / (data.length - 1);
            const x = index * width;
            const y = 100 - (item[metric] / maxValue * 100);
            return (
              <g key={index}>
                <circle 
                  cx={x} 
                  cy={y} 
                  r="2"
                  className="fill-primary dark:fill-darkPrimary transition-all duration-500"
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0)',
                    transformOrigin: `${x}px ${y}px`,
                    transitionDelay: `${index * 0.1 + 0.2}s`
                  }}
                />
                {isVisible && (
                  <text 
                    x={x} 
                    y={y - 3} 
                    textAnchor="middle" 
                    fontSize="3"
                    className="fill-primary-dark dark:fill-darkPrimary transition-opacity duration-300"
                    style={{ opacity: isVisible ? 1 : 0 }}
                  >
                    {formatValue(item[metric], metric, true)}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Trend line - digital style with steps */}
          {isVisible && data.length > 1 && (
            <polyline 
              points={data.map((item, index) => {
                const width = 100 / (data.length - 1);
                const x = index * width;
                const y = 100 - (item[metric] / maxValue * 100);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2,1"
              className="text-primary/50 dark:text-darkPrimary/50"
            />
          )}
        </svg>
      </div>
      <div className="flex justify-between mt-1">
        {data.map((item, index) => {
          const key = item.date || item.week || item.month;
          return (
            <div key={key} className="text-[9px] text-text-light dark:text-darkText-light truncate text-center" style={{ width: `${100 / data.length}%` }}>
              {item.date ? new Date(item.date).getDate() : 
                (item.week || item.month.substring(0, 3))}
            </div>
          );
        })}
      </div>
    </div>
  );
});
ScatterPlot.displayName = 'ScatterPlot';

// Radial/circular chart for a digital look
const RadialChart = memo(({ 
  data, 
  metric,
  animated = true 
}: { 
  data: any[], 
  metric: MetricType,
  animated?: boolean
}) => {
  const [isVisible, setIsVisible] = useState(!animated);
  
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  const maxValue = useMemo(() => Math.max(...data.map(item => item[metric])), [data, metric]);
  const total = useMemo(() => data.reduce((sum, item) => sum + item[metric], 0), [data, metric]);
  const average = useMemo(() => total / data.length, [total, data.length]);
  
  // Calculate achievement percentage for the gauge
  const achievementPercent = useMemo(() => {
    // Let's say 80% of max value is a good achievement
    const target = maxValue * 0.8;
    return Math.min(100, Math.round((average / target) * 100));
  }, [maxValue, average]);

  // Generate circular arc paths
  const generateArc = (startAngle: number, endAngle: number, radius: number) => {
    // Convert to radians
    const start = (startAngle - 90) * Math.PI / 180;
    const end = (endAngle - 90) * Math.PI / 180;
    
    const x1 = 50 + radius * Math.cos(start);
    const y1 = 50 + radius * Math.sin(start);
    const x2 = 50 + radius * Math.cos(end);
    const y2 = 50 + radius * Math.sin(end);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  return (
    <div className="pt-2 h-40">
      <div className="h-32 flex justify-center items-center">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background circles */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-700" />
            
            {/* Data circles representing values */}
            {data.map((item, index) => {
              const angle = (index / data.length) * 360;
              const nextAngle = ((index + 1) / data.length) * 360;
              const value = item[metric];
              const radius = 25 + (value / maxValue) * 20; // Scale between 25-45
              
              return (
                <g key={index}>
                  <path 
                    d={generateArc(angle, nextAngle, radius)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-primary dark:text-darkPrimary transition-all duration-500`}
                    style={{ 
                      opacity: isVisible ? 0.7 : 0,
                      strokeDasharray: '100',
                      strokeDashoffset: isVisible ? '0' : '100',
                      transitionDelay: `${index * 0.1}s`
                    }}
                  />
                  {isVisible && (
                    <text 
                      x={50 + (radius + 3) * Math.cos((angle + (nextAngle - angle) / 2 - 90) * Math.PI / 180)} 
                      y={50 + (radius + 3) * Math.sin((angle + (nextAngle - angle) / 2 - 90) * Math.PI / 180)}
                      textAnchor="middle"
                      fontSize="3"
                      fill="currentColor"
                      className="text-primary-dark dark:text-darkPrimary transition-opacity duration-300"
                      style={{ opacity: isVisible ? 1 : 0 }}
                    >
                      {formatValue(value, metric, true)}
                    </text>
                  )}
                </g>
              );
            })}
            
            {/* Achievement gauge */}
            <path 
              d={generateArc(180, 180 + (achievementPercent * 1.8), 40)}
              fill="none"
              strokeLinecap="round"
              strokeWidth="3"
              className="text-accent dark:text-darkSecondary transition-all duration-1000"
              style={{ 
                opacity: isVisible ? 1 : 0,
                strokeDasharray: '200',
                strokeDashoffset: isVisible ? '0' : '200'
              }}
            />
            
            {/* Center display */}
            <circle cx="50" cy="50" r="18" className="fill-white dark:fill-darkBackground-light" />
            <text 
              x="50" 
              y="48" 
              textAnchor="middle" 
              fontSize="8" 
              fontWeight="bold"
              className="fill-primary-dark dark:fill-darkPrimary"
              style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}
            >
              {formatValue(average, metric, true)}
            </text>
            <text 
              x="50" 
              y="56" 
              textAnchor="middle" 
              fontSize="4"
              className="fill-text-light dark:fill-darkText-light"
              style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}
            >
              avg
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
});
RadialChart.displayName = 'RadialChart';

// Enhanced format value helper function with abbreviated option
function formatValue(value: number, metric: MetricType, abbreviated = false) {
  if (abbreviated) {
    switch(metric) {
      case 'steps':
        return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
      case 'calories':
        return `${value}`;
      case 'distance':
        return `${value.toFixed(1)}`;
      case 'active':
        return `${value}m`;
      default:
        return value;
    }
  }
  
  switch(metric) {
    case 'steps':
      return `${value.toLocaleString()}`;
    case 'calories':
      return `${value} kcal`;
    case 'distance':
      return `${value} km`;
    case 'active':
      return `${value} min`;
    default:
      return value;
  }
}

// Activity Trends main component
const ActivityTrends: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily');
  const [metric, setMetric] = useState<MetricType>('steps');
  const [showComparison, setShowComparison] = useState(false);
  const [chartType, setChartType] = useState<ChartType>('area');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Get current data based on timeframe
  const currentData = MOCK_ACTIVITY_DATA[timeFrame];
  
  // Get previous period data for comparison
  const previousData = useMemo(() => {
    // In a real app, you would fetch this data from your API
    // For mock purposes, just reduce the current data slightly
    return currentData.map(item => {
      const randomFactor = 0.7 + Math.random() * 0.4; // Between 70% and 110% of current
      const newItem = {...item};
      newItem[metric] = Math.round(item[metric] * randomFactor);
      return newItem;
    });
  }, [currentData, metric]);
  
  // Calculate the difference between current and previous period
  const periodDifference = useMemo(() => {
    if (!showComparison) return 0;
    
    const currentSum = currentData.reduce((sum, item) => sum + item[metric], 0);
    const previousSum = previousData.reduce((sum, item) => sum + item[metric], 0);
    
    return ((currentSum - previousSum) / previousSum * 100);
  }, [currentData, previousData, metric, showComparison]);

  // Handle chart type change with animation
  const handleChartChange = (type: ChartType) => {
    if (type === chartType) return;
    setIsAnimating(true);
    setTimeout(() => {
      setChartType(type);
      setTimeout(() => setIsAnimating(false), 100);
    }, 300);
  };
  
  // Render the appropriate chart based on chart type
  const renderChart = () => {
    const commonProps = {
      data: currentData,
      metric,
      animated: !isAnimating
    };
    
    switch(chartType) {
      case 'bar':
        return <BarChart {...commonProps} />;
      case 'line':
        return <CurvedLineChart {...commonProps} />;
      case 'area':
        return <CurvedLineChart {...commonProps} />;
      case 'radial':
        return <RadialChart {...commonProps} />;
      case 'scatter':
        return <ScatterPlot {...commonProps} />;
      default:
        return <CurvedLineChart {...commonProps} />;
    }
  };
  
  // Render the previous period chart if comparison is enabled
  const renderComparisonChart = () => {
    if (!showComparison) return null;
    
    const commonProps = {
      data: previousData,
      metric,
      animated: !isAnimating
    };
    
    switch(chartType) {
      case 'bar':
        return <BarChart {...commonProps} color="bg-secondary dark:bg-darkSecondary" />;
      case 'line':
        return <CurvedLineChart {...commonProps} color="stroke-secondary dark:stroke-darkSecondary fill-secondary/10 dark:fill-darkSecondary/10" />;
      case 'area':
        return <CurvedLineChart {...commonProps} color="stroke-secondary dark:stroke-darkSecondary fill-secondary/10 dark:fill-darkSecondary/10" />;
      case 'radial':
      case 'scatter':
        // Radial and scatter chart don't support comparison view
        return null;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white dark:bg-darkBackground-light rounded-md shadow-sm border border-gray-100 dark:border-gray-700/50 p-3 contain-paint">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-y-2">
        <h3 className="text-sm font-medium text-primary-dark dark:text-darkText">Activity Trends</h3>
        
        <div className="flex flex-wrap gap-2">
          {/* Chart type selector - Updated with new chart types */}
          <div className="flex rounded-sm overflow-hidden border border-gray-200 dark:border-gray-700 text-xs">
            {(['area', 'line', 'bar', 'radial', 'scatter'] as ChartType[]).map((type) => (
              <button 
                key={type}
                onClick={() => handleChartChange(type)}
                className={`px-1.5 py-0.5 ${
                  chartType === type 
                    ? 'bg-primary dark:bg-darkPrimary text-white' 
                    : 'bg-white dark:bg-darkBackground text-text dark:text-darkText hover:bg-gray-50 dark:hover:bg-gray-800'
                } transition-colors duration-150`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Toggle comparison view (hide for radial and scatter chart) */}
          {(chartType !== 'radial' && chartType !== 'scatter') && (
            <button 
              onClick={() => setShowComparison(!showComparison)}
              className={`text-xs px-2 py-0.5 rounded-sm border ${
                showComparison 
                  ? 'bg-primary/10 dark:bg-darkPrimary/20 border-primary/20 dark:border-darkPrimary/30 text-primary dark:text-darkPrimary' 
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-text dark:text-darkText'
              } transition-colors duration-150`}
            >
              Compare
            </button>
          )}
          
          {/* Metric selector */}
          <select 
            value={metric}
            onChange={(e) => setMetric(e.target.value as MetricType)}
            className="text-xs p-0.5 rounded-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-darkBackground text-text-dark dark:text-darkText"
          >
            <option value="steps">Steps</option>
            <option value="calories">Calories</option>
            <option value="distance">Distance</option>
            <option value="active">Active Minutes</option>
          </select>
          
          {/* Time frame selector */}
          <div className="flex rounded-sm overflow-hidden border border-gray-200 dark:border-gray-700 text-xs">
            {(['daily', 'weekly', 'monthly'] as TimeFrame[]).map((period) => (
              <button 
                key={period}
                onClick={() => setTimeFrame(period)}
                className={`px-1.5 py-0.5 ${
                  timeFrame === period 
                    ? 'bg-primary dark:bg-darkPrimary text-white' 
                    : 'bg-white dark:bg-darkBackground text-text dark:text-darkText hover:bg-gray-50 dark:hover:bg-gray-800'
                } transition-colors duration-150`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Comparison stats */}
      {showComparison && chartType !== 'radial' && chartType !== 'scatter' && (
        <div className="mb-2 flex items-center space-x-1 text-xs">
          <span className="text-text-light dark:text-darkText-light">vs Previous Period:</span>
          <span className={`font-medium ${
            periodDifference > 0 
              ? 'text-green-500 dark:text-green-400' 
              : periodDifference < 0 
                ? 'text-red-500 dark:text-red-400'
                : 'text-text dark:text-darkText'
          }`}>
            {periodDifference > 0 ? '+' : ''}{periodDifference.toFixed(1)}%
          </span>
        </div>
      )}
      
      {/* Charts - Responsive height for different chart types */}
      <div className={`relative transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        {/* Current period chart */}
        {renderChart()}
        
        {/* Previous period chart (shown when comparison is enabled) */}
        {showComparison && chartType !== 'radial' && chartType !== 'scatter' && (
          <div className="absolute inset-0 opacity-40">
            {renderComparisonChart()}
          </div>
        )}
      </div>
      
      {/* Legend for comparison */}
      {showComparison && chartType !== 'radial' && chartType !== 'scatter' && (
        <div className="mt-2 flex justify-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-primary dark:bg-darkPrimary rounded-sm mr-1"></div>
            <span className="text-text-light dark:text-darkText-light">Current Period</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-secondary dark:bg-darkSecondary rounded-sm mr-1"></div>
            <span className="text-text-light dark:text-darkText-light">Previous Period</span>
          </div>
        </div>
      )}
      
      {/* Summary statistics */}
      <div className="mt-3 grid grid-cols-4 gap-2 pt-2 border-t border-gray-100 dark:border-gray-700/50">
        {(['steps', 'calories', 'distance', 'active'] as MetricType[]).map((stat) => {
          const totalValue = currentData.reduce((sum, item) => sum + item[stat], 0);
          const label = stat.charAt(0).toUpperCase() + stat.slice(1);
          let formattedValue = totalValue.toLocaleString();
          
          if (stat === 'calories') formattedValue += ' kcal';
          if (stat === 'distance') formattedValue += ' km';
          if (stat === 'active') formattedValue += ' min';
          
          return (
            <div key={stat} className={`text-center p-1 rounded ${metric === stat ? 'bg-gray-50 dark:bg-gray-800' : ''}`}>
              <div className="text-[10px] text-text-light dark:text-darkText-light">{label}</div>
              <div className="text-xs font-medium text-text-dark dark:text-darkText">{formattedValue}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTrends;
