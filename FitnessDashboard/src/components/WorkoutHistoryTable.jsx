import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import CurvedGraph from './charts/CurvedGraph';
import MultiChartView from './charts/MultiChartView';
import ChartTypeSelector from './charts/ChartTypeSelector';

const WorkoutHistoryTable = () => {
  const { workouts, isDarkMode } = useDashboard();
  
  if (!workouts || workouts.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${isDarkMode ? 'bg-[#1E3E62]/50' : 'bg-[#F8F7FF]'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDarkMode ? 'text-[#FF6500]' : 'text-[#261FB3]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-center">No workout history found</p>
      </div>
    );
  }

  // Group workouts by type to prepare for the intensity trend graph
  const workoutsByType = {};
  workouts.forEach(workout => {
    if (!workoutsByType[workout.type]) {
      workoutsByType[workout.type] = [];
    }
    workoutsByType[workout.type].push(workout.intensity || Math.floor(Math.random() * 30) + 70);
  });

  // Get the workout types with the most entries
  const topWorkoutTypes = Object.keys(workoutsByType)
    .sort((a, b) => workoutsByType[b].length - workoutsByType[a].length)
    .slice(0, 2);

  return (
    <div>
      {/* Workout Intensity Trend */}
      {topWorkoutTypes.length > 0 && (
        <div className="mb-6">
          <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Intensity Trend ({topWorkoutTypes[0]})
          </h4>
          <div className="h-24">
            <CurvedGraph 
              data={workoutsByType[topWorkoutTypes[0]]} 
              color={isDarkMode ? '#FF6500' : '#261FB3'}
              fillOpacity={0.15}
              isDarkMode={isDarkMode}
              showGrid={false}
            />
          </div>
        </div>
      )}

      {/* Workout Table */}
      <div className={`rounded-lg ${isDarkMode ? 'bg-[#1E3E62]/20' : 'bg-gray-50'} overflow-hidden`}>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={isDarkMode ? 'bg-[#1E3E62]/50' : 'bg-gray-100'}>
            <tr>
              <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Date
              </th>
              <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Workout
              </th>
              <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Duration
              </th>
              <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Calories
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {workouts.slice(0, 5).map((workout, index) => (
              <tr key={index} className={index % 2 === 0 ? (isDarkMode ? 'bg-[#1E3E62]/10' : 'bg-white') : (isDarkMode ? 'bg-[#1E3E62]/20' : 'bg-gray-50')}>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {workout.date}
                </td>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>
                  {workout.type}
                </td>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {workout.duration} min
                </td>
                <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {workout.calories}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutHistoryTable;
