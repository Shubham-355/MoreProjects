import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import CurvedGraph from '../components/charts/CurvedGraph';
import NutritionChart from '../components/charts/NutritionChart';
import MultiChartView from '../components/charts/MultiChartView';
import ChartTypeSelector from '../components/charts/ChartTypeSelector';

const MealCard = ({ meal, isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} rounded-xl shadow-sm p-5 transition-all duration-300 backdrop-blur-sm hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{meal.name}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{meal.time}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${
          isDarkMode ? 'bg-[#1E3E62] text-gray-300' : 'bg-gray-100 text-gray-700'
        }`}>
          {meal.calories} cal
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        {meal.items.map((item, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm mr-2">{item.emoji}</span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
            </div>
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.portion} • {item.calories} cal
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{meal.macros.protein}g</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{meal.macros.carbs}g</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{meal.macros.fat}g</span>
            </div>
          </div>
          <button className={`text-xs ${isDarkMode ? 'text-[#FF6500]' : 'text-[#261FB3]'}`}>Edit</button>
        </div>
      </div>
    </div>
  );
};

const NutritionPage = () => {
  const { nutritionData, isDarkMode } = useDashboard();
  const [selectedDay, setSelectedDay] = useState('today');
  const [chartType, setChartType] = useState('line');
  
  // Sample meals data
  const meals = [
    {
      name: 'Breakfast',
      time: '7:30 AM',
      calories: 450,
      items: [
        { emoji: '🥣', name: 'Oatmeal', portion: '1 cup', calories: 150 },
        { emoji: '🍌', name: 'Banana', portion: '1 medium', calories: 105 },
        { emoji: '🥜', name: 'Peanut Butter', portion: '1 tbsp', calories: 95 },
        { emoji: '🍯', name: 'Honey', portion: '1 tsp', calories: 20 },
        { emoji: '🥛', name: 'Almond Milk', portion: '1 cup', calories: 80 }
      ],
      macros: {
        protein: 15,
        carbs: 65,
        fat: 12
      }
    },
    {
      name: 'Lunch',
      time: '12:15 PM',
      calories: 620,
      items: [
        { emoji: '🥗', name: 'Chicken Salad', portion: '1 bowl', calories: 350 },
        { emoji: '🥑', name: 'Avocado', portion: '1/2', calories: 120 },
        { emoji: '🍞', name: 'Whole Grain Bread', portion: '1 slice', calories: 80 },
        { emoji: '🫒', name: 'Olive Oil Dressing', portion: '1 tbsp', calories: 70 }
      ],
      macros: {
        protein: 42,
        carbs: 35,
        fat: 28
      }
    },
    {
      name: 'Snack',
      time: '3:30 PM',
      calories: 230,
      items: [
        { emoji: '🍎', name: 'Apple', portion: '1 medium', calories: 95 },
        { emoji: '🧀', name: 'Cheddar Cheese', portion: '1 oz', calories: 115 },
        { emoji: '💧', name: 'Water', portion: '16 oz', calories: 0 }
      ],
      macros: {
        protein: 8,
        carbs: 25,
        fat: 10
      }
    },
    {
      name: 'Dinner',
      time: '7:00 PM',
      calories: 680,
      items: [
        { emoji: '🐟', name: 'Salmon', portion: '6 oz', calories: 350 },
        { emoji: '🍚', name: 'Brown Rice', portion: '1 cup', calories: 220 },
        { emoji: '🥦', name: 'Broccoli', portion: '1 cup', calories: 55 },
        { emoji: '🧄', name: 'Garlic Butter Sauce', portion: '2 tbsp', calories: 55 }
      ],
      macros: {
        protein: 45,
        carbs: 58,
        fat: 22
      }
    }
  ];
  
  // Calculate totals
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.macros.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.macros.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.macros.fat, 0);
  
  // Prepare data for calorie intake chart (last 7 days)
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const calorieIntakeData = [1850, 2100, 1950, 2300, 2050, 1900, totalCalories];
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
            Nutrition
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Track your diet and nutrition
          </p>
        </div>
        <button 
          className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-[#FF6500] hover:bg-[#FF8533]' : 'bg-[#261FB3] hover:bg-[#5C56D4]'} text-white transition-colors`}
        >
          + Log Meal
        </button>
      </div>
      
      {/* Day selector */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {['yesterday', 'today', 'custom'].map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap ${
              selectedDay === day 
                ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
                : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
            }`}
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Nutrition summary and charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className={`rounded-xl shadow-sm p-6 ${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>Calorie Intake</h2>
              <ChartTypeSelector 
                chartType={chartType} 
                onChartTypeChange={setChartType} 
                isDarkMode={isDarkMode} 
                size="sm"
              />
            </div>
            <div className="h-48">
              <MultiChartView 
                data={calorieIntakeData}
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
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Daily Average</p>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round(calorieIntakeData.reduce((a, b) => a + b, 0) / 7)}
                </p>
              </div>
              <div className="text-center">
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today</p>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{totalCalories}</p>
              </div>
              <div className="text-center">
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Goal</p>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2,000</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className={`rounded-xl shadow-sm p-6 ${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm h-full`}>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-4`}>Macros</h2>
            <NutritionChart data={{
              protein: totalProtein,
              carbs: totalCarbs,
              fat: totalFat
            }} />
          </div>
        </div>
      </div>
      
      {/* Meal list */}
      <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-4`}>Today's Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {meals.map((meal, index) => (
          <MealCard 
            key={index} 
            meal={meal} 
            isDarkMode={isDarkMode} 
          />
        ))}
      </div>
    </div>
  );
};

export default NutritionPage;
