import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import CurvedGraph from '../components/charts/CurvedGraph';
import MultiChartView from '../components/charts/MultiChartView';
import ChartTypeSelector from '../components/charts/ChartTypeSelector';

const WorkoutCard = ({ workout, isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} rounded-xl shadow-sm p-5 transition-all duration-300 backdrop-blur-sm hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{workout.name}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{workout.type}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${
          workout.status === 'Completed' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {workout.status}
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Duration</p>
          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{workout.duration} min</p>
        </div>
        <div className="text-center">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Calories</p>
          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{workout.calories}</p>
        </div>
        <div className="text-center">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</p>
          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{workout.date}</p>
        </div>
      </div>
    </div>
  );
};

const WorkoutsPage = () => {
  const { workouts, isDarkMode } = useDashboard();
  const [filter, setFilter] = useState('all');
  const [chartType, setChartType] = useState('line');
  
  // Group workouts by type
  const workoutTypes = [...new Set(workouts.map(w => w.type))];
  
  // Filter workouts based on selected filter
  const filteredWorkouts = filter === 'all' 
    ? workouts 
    : workouts.filter(w => w.type === filter);
  
  // Calculate workout stats
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
  const totalWorkouts = workouts.length;
  
  // Prepare data for weekly progress graph
  const weeklyCaloriesData = [420, 350, 0, 520, 380, 450, 300]; // Sample data
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
            Workouts
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Track and manage your fitness activities
          </p>
        </div>
        <button 
          className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-[#FF6500] hover:bg-[#FF8533]' : 'bg-[#261FB3] hover:bg-[#5C56D4]'} text-white transition-colors`}
        >
          + New Workout
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`rounded-xl shadow-sm p-5 ${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Workouts</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>{totalWorkouts}</p>
        </div>
        <div className={`rounded-xl shadow-sm p-5 ${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Minutes</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>{totalMinutes}</p>
        </div>
        <div className={`rounded-xl shadow-sm p-5 ${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Calories Burned</p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>{totalCalories}</p>
        </div>
      </div>
      
      {/* Weekly Progress */}
      <div className={`rounded-xl shadow-sm p-6 mb-8 ${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>Weekly Progress</h2>
          <ChartTypeSelector 
            chartType={chartType} 
            onChartTypeChange={setChartType} 
            isDarkMode={isDarkMode} 
            size="sm"
          />
        </div>
        <div className="h-48">
          <MultiChartView 
            data={weeklyCaloriesData}
            chartType={chartType}
            color={isDarkMode ? "#FF6500" : "#261FB3"}
            fillOpacity={0.2}
            isDarkMode={isDarkMode}
            xAxisLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            showGrid={true}
          />
        </div>
      </div>
      
      {/* Workout List */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>Workout History</h2>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filter === 'all' 
                  ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
                  : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
              }`}
            >
              All
            </button>
            
            {workoutTypes.map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filter === type 
                    ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
                    : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout, index) => (
            <WorkoutCard 
              key={index} 
              workout={workout} 
              isDarkMode={isDarkMode} 
            />
          ))}
        </div>
        
        {filteredWorkouts.length === 0 && (
          <div className={`flex flex-col items-center justify-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-[#1E3E62]/50' : 'bg-[#F8F7FF]'}`}>
              <span className="text-3xl">💪</span>
            </div>
            <p className="text-center mb-3">No workouts found</p>
            <button 
              className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-[#FF6500] hover:bg-[#FF8533]' : 'bg-[#261FB3] hover:bg-[#5C56D4]'} text-white transition-colors`}
            >
              Add Your First Workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutsPage;
