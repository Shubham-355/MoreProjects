import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import MultiChartView from './MultiChartView';
import ChartTypeSelector from './ChartTypeSelector';

const NutritionChart = ({ data }) => {
  const { isDarkMode } = useDashboard();
  const [activeTab, setActiveTab] = useState('macros');
  const [chartType, setChartType] = useState('curve');
  
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-40">
        <p className="text-gray-500 dark:text-gray-400">No nutrition data available</p>
      </div>
    );
  }

  // Transform data for graphs
  const prepareGraphData = () => {
    // Weekly nutrition data simulation
    const proteinData = [data.protein * 0.8, data.protein * 0.9, data.protein * 0.7, data.protein * 1.1, data.protein * 0.9, data.protein * 1.0, data.protein];
    const carbsData = [data.carbs * 0.7, data.carbs * 1.1, data.carbs * 0.9, data.carbs * 0.8, data.carbs * 1.2, data.carbs * 0.9, data.carbs];
    const fatData = [data.fat * 0.9, data.fat * 0.8, data.fat * 1.1, data.fat * 1.0, data.fat * 0.7, data.fat * 1.2, data.fat];
    
    // Calorie data (sum of macronutrients * their caloric values)
    const calorieData = proteinData.map((protein, i) => 
      (protein * 4) + (carbsData[i] * 4) + (fatData[i] * 9)
    );
    
    return {
      protein: proteinData,
      carbs: carbsData,
      fat: fatData,
      calories: calorieData
    };
  };
  
  const graphData = prepareGraphData();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Calculate today's total calories
  const total = (data.protein * 4) + (data.carbs * 4) + (data.fat * 9);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('macros')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeTab === 'macros' 
                ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
                : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
            }`}
          >
            Macros
          </button>
          <button 
            onClick={() => setActiveTab('calories')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeTab === 'calories' 
                ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
                : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
            }`}
          >
            Calories
          </button>
        </div>
        
        <ChartTypeSelector 
          chartType={chartType} 
          onChartTypeChange={setChartType} 
          isDarkMode={isDarkMode} 
          size="sm"
        />
      </div>
      
      {activeTab === 'macros' ? (
        <div className="flex flex-col">
          {/* Macro nutrients detailed view with curved graphs */}
          <div className="flex justify-between mb-2">
            <div className="text-center">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Protein</span>
              <div className="font-bold text-lg text-blue-500">{data.protein}g</div>
            </div>
            <div className="text-center">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Carbs</span>
              <div className="font-bold text-lg text-green-500">{data.carbs}g</div>
            </div>
            <div className="text-center">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fat</span>
              <div className="font-bold text-lg text-yellow-500">{data.fat}g</div>
            </div>
          </div>
          
          {/* Multiple curved graphs for macros */}
          <div className="h-40 mt-2 relative w-full">
            {/* For macros we still use overlay of multiple curved graphs */}
            <div className="absolute inset-0">
              <MultiChartView
                data={graphData.protein} 
                chartType={chartType}
                color="#3B82F6" 
                fillOpacity={0.1}
                isDarkMode={isDarkMode}
                xAxisLabels={weekDays}
              />
            </div>
            <div className="absolute inset-0">
              <MultiChartView
                data={graphData.carbs}
                chartType={chartType} 
                color="#10B981" 
                fillOpacity={0.1}
                isDarkMode={isDarkMode}
                xAxisLabels={weekDays}
              />
            </div>
            <div className="absolute inset-0">
              <MultiChartView
                data={graphData.fat}
                chartType={chartType} 
                color="#F59E0B" 
                fillOpacity={0.1}
                isDarkMode={isDarkMode}
                xAxisLabels={weekDays}
              />
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Protein</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Carbs</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Fat</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Calories view with single curved graph */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Today's Calories</span>
              <div className="font-bold text-2xl">{total}</div>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-xs ${
              total < 2000 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {total < 2000 ? 'Under Goal' : 'Over Goal'}
            </div>
          </div>
          
          <div className="h-40 mt-2 w-full">
            <MultiChartView 
              data={graphData.calories}
              chartType={chartType} 
              color={isDarkMode ? "#FF6500" : "#261FB3"} 
              fillOpacity={0.2}
              isDarkMode={isDarkMode}
              xAxisLabels={weekDays}
              showGrid={true}
            />
          </div>
          
          <div className="flex justify-between mt-4">
            <div className="text-center">
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Avg</span>
              <div className="font-medium">
                {Math.round(graphData.calories.reduce((a, b) => a + b, 0) / 7)}
              </div>
            </div>
            <div className="text-center">
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Min</span>
              <div className="font-medium">
                {Math.min(...graphData.calories)}
              </div>
            </div>
            <div className="text-center">
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Max</span>
              <div className="font-medium">
                {Math.max(...graphData.calories)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionChart;
