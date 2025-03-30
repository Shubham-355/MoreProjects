import { useState } from 'react';

const WeeklyOverview = ({ activity }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Calculate weekly totals and averages
  const weeklyStats = {
    totalSteps: activity.reduce((sum, day) => sum + day.steps, 0),
    totalCalories: activity.reduce((sum, day) => sum + day.calories, 0),
    totalActive: activity.reduce((sum, day) => sum + day.active, 0),
    totalWater: activity.reduce((sum, day) => sum + day.water, 0),
    avgSteps: Math.round(activity.reduce((sum, day) => sum + day.steps, 0) / activity.length),
    avgCalories: Math.round(activity.reduce((sum, day) => sum + day.calories, 0) / activity.length),
    avgActive: Math.round(activity.reduce((sum, day) => sum + day.active, 0) / activity.length),
    avgWater: Math.round(activity.reduce((sum, day) => sum + day.water, 0) / activity.length * 10) / 10,
  };
  
  // Find best and worst days
  const bestStepsDay = activity.reduce((best, current) => 
    current.steps > best.steps ? current : best, activity[0]);
  
  const bestActiveDay = activity.reduce((best, current) => 
    current.active > best.active ? current : best, activity[0]);
  
  const worstStepsDay = activity.reduce((worst, current) => 
    current.steps < worst.steps ? current : worst, activity[0]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 transform hover:shadow-md">
      <div 
        className="px-6 py-5 cursor-pointer flex justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-semibold dark:text-white">Weekly Overview</h3>
        <button 
          className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 transition-transform duration-300 transform ${expanded ? 'rotate-180' : ''}`}
          aria-label={expanded ? "Collapse section" : "Expand section"}
        >
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <div className={`transition-all duration-500 ease-in-out ${expanded ? 'max-h-[1000px]' : 'max-h-0'} overflow-hidden`}>
        <div className="px-6 pb-6 space-y-6">
          {/* Weekly Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 transition hover:scale-105 duration-300">
              <div className="text-blue-800 dark:text-blue-300 text-xs font-medium mb-1">TOTAL STEPS</div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{weeklyStats.totalSteps.toLocaleString()}</div>
              <div className="text-blue-700 dark:text-blue-400 text-xs mt-1">Average: {weeklyStats.avgSteps.toLocaleString()}/day</div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 transition hover:scale-105 duration-300">
              <div className="text-orange-800 dark:text-orange-300 text-xs font-medium mb-1">CALORIES BURNED</div>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{weeklyStats.totalCalories.toLocaleString()}</div>
              <div className="text-orange-700 dark:text-orange-400 text-xs mt-1">Average: {weeklyStats.avgCalories}/day</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 transition hover:scale-105 duration-300">
              <div className="text-green-800 dark:text-green-300 text-xs font-medium mb-1">ACTIVE MINUTES</div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">{weeklyStats.totalActive}</div>
              <div className="text-green-700 dark:text-green-400 text-xs mt-1">Average: {weeklyStats.avgActive}/day</div>
            </div>
            
            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 transition hover:scale-105 duration-300">
              <div className="text-cyan-800 dark:text-cyan-300 text-xs font-medium mb-1">WATER INTAKE</div>
              <div className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">{weeklyStats.totalWater} cups</div>
              <div className="text-cyan-700 dark:text-cyan-400 text-xs mt-1">Average: {weeklyStats.avgWater}/day</div>
            </div>
          </div>
          
          {/* Weekly Insights */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Weekly Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium dark:text-white">Most Active Day</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {bestActiveDay.day} with {bestActiveDay.active} active minutes
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium dark:text-white">Best Step Count</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {bestStepsDay.day} with {bestStepsDay.steps.toLocaleString()} steps
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium dark:text-white">Room for Improvement</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {worstStepsDay.day} with only {worstStepsDay.steps.toLocaleString()} steps
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mr-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium dark:text-white">Weekly Streak</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      You've hit 10,000+ steps on {activity.filter(day => day.steps >= 10000).length} days this week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Week Summary */}
          <div className="mt-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-300">
            <p>
              This week you took <strong>{weeklyStats.totalSteps.toLocaleString()} steps</strong> and burned 
              <strong> {weeklyStats.totalCalories.toLocaleString()} calories</strong>. You were active for 
              <strong> {weeklyStats.totalActive} minutes</strong> and drank <strong>{weeklyStats.totalWater} cups</strong> of water. 
              {weeklyStats.avgSteps >= 10000 ? 
                " Great job meeting your step goals this week!" : 
                " Try to increase your daily steps to reach your goal of 10,000 steps per day."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyOverview;
