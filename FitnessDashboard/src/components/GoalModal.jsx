import { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';

function GoalModal() {
  const { showGoalModal, setShowGoalModal, dailyGoals, setDailyGoals, isDarkMode } = useDashboard();
  
  // Initialize local state with safe defaults
  const [goalInputs, setGoalInputs] = useState({
    steps: 0,
    calories: 0,
    water: 0,
    sleep: 0,
    exercise: 0
  });
  
  // Safely update local state from context when available
  useEffect(() => {
    if (dailyGoals) {
      setGoalInputs({
        steps: dailyGoals.steps?.target || 0,
        calories: dailyGoals.calories?.target || 0,
        water: dailyGoals.water?.target || 0,
        sleep: dailyGoals.sleep?.target || 0,
        exercise: dailyGoals.exercise?.target || 0
      });
    }
  }, [dailyGoals]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalInputs(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create updated goals object with safe access
    const updatedGoals = {
      steps: { 
        target: goalInputs.steps, 
        current: dailyGoals?.steps?.current || 0 
      },
      calories: { 
        target: goalInputs.calories, 
        current: dailyGoals?.calories?.current || 0 
      },
      water: { 
        target: goalInputs.water, 
        current: dailyGoals?.water?.current || 0 
      },
      sleep: { 
        target: goalInputs.sleep, 
        current: dailyGoals?.sleep?.current || 0 
      },
      exercise: { 
        target: goalInputs.exercise, 
        current: dailyGoals?.exercise?.current || 0 
      }
    };
    
    setDailyGoals(updatedGoals);
    setShowGoalModal(false);
  };

  if (!showGoalModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300">
      <div className={`${isDarkMode ? 'bg-[#0B192C]/90' : 'bg-white/95'} backdrop-blur-md rounded-lg shadow-xl max-w-md w-full mx-auto animate-fadeIn ${isDarkMode ? 'border border-[#1E3E62]/50' : 'border border-[#261FB3]/20'}`}>
        <div className="p-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-[#FF6500]' : 'text-[#161179]'} mb-4`}>Set Daily Goals</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-1`}>
                  Steps Goal
                </label>
                <input
                  type="number"
                  name="steps"
                  value={goalInputs.steps}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 ${isDarkMode ? 'border border-[#1E3E62]/70' : 'border border-[#261FB3]/30'} rounded-md shadow-sm focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'} ${isDarkMode ? 'bg-[#0B192C]/70' : 'bg-white'} backdrop-blur-sm ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-1`}>
                  Calories Goal
                </label>
                <input
                  type="number"
                  name="calories"
                  value={goalInputs.calories}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 ${isDarkMode ? 'border border-[#1E3E62]/70' : 'border border-[#261FB3]/30'} rounded-md shadow-sm focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'} ${isDarkMode ? 'bg-[#0B192C]/70' : 'bg-white/70'} backdrop-blur-sm ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-1`}>
                  Water Goal (glasses)
                </label>
                <input
                  type="number"
                  name="water"
                  value={goalInputs.water}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 ${isDarkMode ? 'border border-[#1E3E62]/70' : 'border border-[#261FB3]/30'} rounded-md shadow-sm focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'} ${isDarkMode ? 'bg-[#0B192C]/70' : 'bg-white/70'} backdrop-blur-sm ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-1`}>
                  Sleep Goal (hours)
                </label>
                <input
                  type="number"
                  name="sleep"
                  value={goalInputs.sleep}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 ${isDarkMode ? 'border border-[#1E3E62]/70' : 'border border-[#261FB3]/30'} rounded-md shadow-sm focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'} ${isDarkMode ? 'bg-[#0B192C]/70' : 'bg-white/70'} backdrop-blur-sm ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-1`}>
                  Exercise Goal (minutes)
                </label>
                <input
                  type="number"
                  name="exercise"
                  value={goalInputs.exercise}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 ${isDarkMode ? 'border border-[#1E3E62]/70' : 'border border-[#261FB3]/30'} rounded-md shadow-sm focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'} ${isDarkMode ? 'bg-[#0B192C]/70' : 'bg-white/70'} backdrop-blur-sm ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowGoalModal(false)}
                className={`px-4 py-2 ${isDarkMode ? 'border border-[#1E3E62]/70' : 'border border-gray-300'} rounded-md shadow-sm text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'} ${isDarkMode ? 'bg-[#0B192C]/60' : 'bg-white'} backdrop-blur-sm hover:bg-opacity-80 focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'} transition-all duration-300`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${isDarkMode ? 'bg-gradient-to-r from-[#FF6500] to-[#FF6500]/80' : 'bg-gradient-to-r from-[#261FB3] to-[#161179]'} backdrop-blur-sm hover:opacity-90 focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'} transition-all duration-300`}
              >
                Save Goals
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GoalModal;
