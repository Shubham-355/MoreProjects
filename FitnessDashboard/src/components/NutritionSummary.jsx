import { useState } from 'react';

const NutritionSummary = ({ nutritionData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Add safety checks to prevent errors with undefined or null nutritionData
  if (!nutritionData || typeof nutritionData !== 'object') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold dark:text-white">Nutrition Summary</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Nutrition data is not available right now.
        </p>
      </div>
    );
  }
  
  // Add default values to prevent undefined errors
  const calories = nutritionData.calories || { consumed: 0, burned: 0, goal: 2000 };
  const macros = nutritionData.macros || { 
    protein: { value: 0, goal: 100, unit: "g" },
    carbs: { value: 0, goal: 200, unit: "g" },
    fat: { value: 0, goal: 50, unit: "g" }
  };
  const meals = nutritionData.meals || [];
  
  // Calculate calorie balance
  const calorieBalance = calories.consumed - calories.burned;
  const isCalorieDeficit = calorieBalance < 0;
  
  // Calculate macro percentages
  const totalMacros = macros.protein.value + macros.carbs.value + macros.fat.value;
  const proteinPercentage = totalMacros ? Math.round((macros.protein.value / totalMacros) * 100) : 0;
  const carbsPercentage = totalMacros ? Math.round((macros.carbs.value / totalMacros) * 100) : 0;
  const fatPercentage = totalMacros ? Math.round((macros.fat.value / totalMacros) * 100) : 0;
  
  // Calculate progress percentages
  const caloriePercentage = Math.min(Math.round((calories.consumed / calories.goal) * 100), 100);
  const proteinProgressPercentage = Math.min(Math.round((macros.protein.value / macros.protein.goal) * 100), 100);
  const carbsProgressPercentage = Math.min(Math.round((macros.carbs.value / macros.carbs.goal) * 100), 100);
  const fatProgressPercentage = Math.min(Math.round((macros.fat.value / macros.fat.goal) * 100), 100);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 transform hover:shadow-md">
      {/* Header with tabs */}
      <div className="flex border-b border-gray-100 dark:border-gray-700">
        <button 
          onClick={() => setActiveTab('overview')} 
          className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
            activeTab === 'overview' 
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-300'
          }`}
        >
          Nutrition Overview
        </button>
        <button 
          onClick={() => setActiveTab('meals')} 
          className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
            activeTab === 'meals' 
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-300'
          }`}
        >
          Today's Meals
        </button>
      </div>
      
      {activeTab === 'overview' ? (
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            {/* Calorie summary */}
            <div className="flex-1 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Daily Calories</h4>
              <div className="flex justify-between items-baseline">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold dark:text-white">{calories.consumed}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">/ {calories.goal}</span>
                </div>
                <div className={`text-sm font-medium ${isCalorieDeficit ? 'text-green-500 dark:text-green-400' : 'text-orange-500 dark:text-orange-400'}`}>
                  {isCalorieDeficit ? `-${Math.abs(calorieBalance)}` : `+${calorieBalance}`} cal
                </div>
              </div>
              
              {/* Calorie progress bar */}
              <div className="mt-2 mb-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-1000 ${
                    caloriePercentage > 95 
                      ? 'bg-red-500 dark:bg-red-500' 
                      : 'bg-gradient-to-r from-green-400 to-blue-500'
                  }`}
                  style={{ width: `${caloriePercentage}%` }}
                ></div>
              </div>
              
              {/* Burned vs Consumed */}
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                  Burned: <span className="font-medium dark:text-gray-300">{calories.burned} cal</span>
                </div>
                <div>
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                  Consumed: <span className="font-medium dark:text-gray-300">{calories.consumed} cal</span>
                </div>
              </div>
            </div>
            
            {/* Macro distribution */}
            <div className="flex-1 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Macronutrient Split</h4>
              <div className="flex gap-2 mb-3">
                <div className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full"></div>
                <div className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"></div>
                <div className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full"></div>
              </div>
              <div className="flex justify-between text-xs">
                <div className="text-center">
                  <div className="text-purple-600 dark:text-purple-400 font-medium">{proteinPercentage}%</div>
                  <div className="text-gray-500 dark:text-gray-400">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 dark:text-blue-400 font-medium">{carbsPercentage}%</div>
                  <div className="text-gray-500 dark:text-gray-400">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-600 dark:text-yellow-400 font-medium">{fatPercentage}%</div>
                  <div className="text-gray-500 dark:text-gray-400">Fat</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Macro details */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Macro Progress</h4>
            
            {/* Protein */}
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">Protein</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {macros.protein.value} / {macros.protein.goal} {macros.protein.unit}
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${proteinProgressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Carbs */}
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">Carbs</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {macros.carbs.value} / {macros.carbs.goal} {macros.carbs.unit}
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${carbsProgressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Fat */}
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">Fat</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {macros.fat.value} / {macros.fat.goal} {macros.fat.unit}
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${fatProgressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Today's Meals</h4>
          {meals.length > 0 ? (
            <div className="space-y-4">
              {meals.map((meal, index) => (
                <div 
                  key={index} 
                  className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 group"
                  style={{ 
                    opacity: 0,
                    animation: 'fadeIn 0.5s ease-out forwards',
                    animationDelay: `${index * 100}ms` 
                  }}
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="text-xl mr-3 group-hover:scale-125 transition-transform duration-300">
                        {meal.name === 'Breakfast' ? '🍳' : 
                         meal.name === 'Lunch' ? '🥗' : 
                         meal.name === 'Dinner' ? '🍽️' : '🥤'}
                      </div>
                      <div>
                        <h5 className="font-medium dark:text-white">{meal.name}</h5>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{meal.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium dark:text-white">{meal.calories} cal</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round((meal.calories / calories.consumed) * 100)}% of daily
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {meal.items.map((item, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No meals recorded for today.
            </div>
          )}
          
          <button className="mt-4 w-full py-2 border border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
            Track New Meal
          </button>
        </div>
      )}
    </div>
  );
};

export default NutritionSummary;
