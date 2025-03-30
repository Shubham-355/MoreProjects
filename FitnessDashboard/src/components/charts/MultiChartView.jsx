import React from 'react';
import CurvedGraph from './CurvedGraph';
import BarGraph from './BarGraph';
import LineGraph from './LineGraph';
import AreaGraph from './AreaGraph';

const MultiChartView = ({ 
  data, 
  chartType = 'curve',
  color = '#261FB3',
  isDarkMode = false,
  xAxisLabels = [],
  yAxisLabels = [],
  showGrid = true, 
  height = '100%',
  simplified = false // For smaller spaces like stat cards
}) => {
  // Handle empty data case
  if (!data || data.length === 0) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        No data available
      </div>
    );
  }

  const renderChart = () => {
    const commonProps = {
      data,
      color,
      isDarkMode,
      xAxisLabels,
      yAxisLabels,
      showGrid,
      simplified
    };

    switch (chartType) {
      case 'bar':
        return <BarGraph {...commonProps} />;
      case 'line':
        return <LineGraph {...commonProps} />;
      case 'area':
        return <AreaGraph {...commonProps} />;
      case 'curve':
      default:
        return <CurvedGraph {...commonProps} />;
    }
  };

  return (
    <div className="w-full h-full">
      {renderChart()}
    </div>
  );
};

export default MultiChartView;
