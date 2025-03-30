import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import GoalProgressGraph from './charts/GoalProgressGraph';

const GoalProgress = () => {
  const { userData, isDarkMode, openGoalModal } = useDashboard();
  
  // Handle creating a new goal
  const handleAddGoal = () => {
    openGoalModal(); // Open modal with no pre-filled goal (for creation)
  };
  
  // Handle editing an existing goal
  const handleEditGoal = (goal) => {
    openGoalModal(goal); // Open modal with the existing goal data
  };

  return (
    <div className={`rounded-xl shadow-sm p-6 h-full ${isDarkMode ? 'bg-[#0B192C]/80 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm`}>
      <div className="flex justify-between items-center mb-5">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>Goals Progress</h3>
        <button 
          onClick={handleAddGoal}
          className={`px-3 py-1 text-xs rounded-full ${isDarkMode ? 'bg-[#FF6500] hover:bg-[#FF8533]' : 'bg-[#261FB3] hover:bg-[#5C56D4]'} text-white transition-colors`}
        >
          + New Goal
        </button>
      </div>
      
      {(!userData.goals || userData.goals.length === 0) ? (
        <div className={`flex flex-col items-center justify-center py-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-[#1E3E62]/50' : 'bg-[#F8F7FF]'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isDarkMode ? 'text-[#FF6500]' : 'text-[#261FB3]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-center mb-3">No goals set yet</p>
          <button 
            onClick={handleAddGoal}
            className={`px-4 py-2 text-sm rounded-lg ${isDarkMode ? 'bg-[#1E3E62] hover:bg-[#3A6B9F]' : 'bg-[#F8F7FF] hover:bg-[#EAE9FF]'} ${isDarkMode ? 'text-white' : 'text-[#261FB3]'} transition-colors`}
          >
            Set Your First Goal
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {userData.goals.map((goal) => (
            <div 
              key={goal.id} 
              className={`rounded-lg p-4 ${isDarkMode ? 'bg-[#1E3E62]/30 hover:bg-[#1E3E62]/50' : 'bg-[#F8F7FF] hover:bg-[#EAE9FF]'} transition-colors cursor-pointer`}
              onClick={() => handleEditGoal(goal)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>{goal.title}</h4>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{goal.description}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-[#1E3E62]' : 'bg-white'} ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Due: {goal.deadline}
                </div>
              </div>
              
              {/* Goal progress visualization */}
              <GoalProgressGraph goal={goal} isDarkMode={isDarkMode} />
              
              <div className="mt-2 flex justify-between items-center">
                <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
                  {goal.current} / {goal.target} {goal.unit}
                </div>
                <div className={`text-xs ${
                  Math.round((goal.current / goal.target) * 100) >= 80 
                    ? (isDarkMode ? 'text-green-400' : 'text-green-600') 
                    : (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                }`}>
                  {Math.round((goal.current / goal.target) * 100)}% complete
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalProgress;
