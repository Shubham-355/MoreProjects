import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const Achievements = () => {
  const { userAchievements } = useDashboard();
  const [celebrating, setCelebrating] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const handleAchievementClick = (id, completed) => {
    if (completed) {
      setCelebrating(id);
      setTimeout(() => setCelebrating(null), 2000);
    }
  };

  // Create confetti effect for celebration
  const renderConfetti = () => {
    return Array.from({ length: 50 }).map((_, i) => {
      const randomLeft = Math.random() * 100;
      const randomDelay = Math.random() * 500;
      const randomSize = Math.random() * 8 + 4;
      const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      return (
        <div 
          key={i}
          className={`absolute w-2 h-2 ${randomColor} rounded-full opacity-70`}
          style={{
            left: `${randomLeft}%`,
            top: '-10px',
            width: `${randomSize}px`,
            height: `${randomSize}px`,
            animationDelay: `${randomDelay}ms`,
            animation: 'confetti 1s ease-out forwards',
          }}
        />
      );
    });
  };
  
  // Filter achievements based on active filter
  const filteredAchievements = () => {
    if (activeFilter === 'completed') {
      return userAchievements.filter(a => a.completed);
    } else if (activeFilter === 'in-progress') {
      return userAchievements.filter(a => !a.completed);
    }
    return userAchievements;
  };
  
  const displayAchievements = filteredAchievements();
  const completedCount = userAchievements.filter(a => a.completed).length;
  const totalPoints = userAchievements.filter(a => a.completed).reduce((sum, a) => sum + a.points, 0);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-300 transform hover:shadow-md relative overflow-hidden">
      {celebrating && <div className="absolute inset-0 pointer-events-none">{renderConfetti()}</div>}
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Achievements</h3>
        <div className="flex items-center space-x-2">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded-full">
            {completedCount}/{userAchievements.length}
          </div>
          <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full flex items-center">
            <span className="mr-1">✨</span>
            {totalPoints} pts
          </div>
        </div>
      </div>
      
      {/* Filter tabs */}
      <div className="flex space-x-2 mb-4 text-xs">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1 rounded-full transition-colors ${
            activeFilter === 'all' 
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveFilter('completed')}
          className={`px-3 py-1 rounded-full transition-colors flex items-center ${
            activeFilter === 'completed' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {activeFilter === 'completed' && (
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )}
          Completed
        </button>
        <button 
          onClick={() => setActiveFilter('in-progress')}
          className={`px-3 py-1 rounded-full transition-colors ${
            activeFilter === 'in-progress' 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          In Progress
        </button>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
        {displayAchievements.length > 0 ? (
          displayAchievements.map((achievement, index) => (
            <div 
              key={achievement.id} 
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 transform ${
                achievement.completed ? 'hover:bg-indigo-50 dark:hover:bg-indigo-900/30' : 'opacity-80 hover:opacity-100'
              } ${celebrating === achievement.id ? 'scale-105 bg-indigo-50 dark:bg-indigo-900/30' : ''}`}
              onClick={() => handleAchievementClick(achievement.id, achievement.completed)}
              style={{ 
                opacity: 0,
                animation: 'opacity 1 0.5s ease-out forwards',
                animationDelay: `${index * 100 + 200}ms`
              }}
            >
              <div className={`relative w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                achievement.completed 
                  ? 'bg-gradient-to-br from-indigo-400 to-purple-500 text-white shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              } transition-all duration-300 ${
                celebrating === achievement.id ? 'animate-bounce' : ''
              }`}>
                {achievement.icon}
                {achievement.completed && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex justify-between flex-wrap">
                  <h4 className={`font-medium ${achievement.completed ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                    {achievement.title}
                  </h4>
                  
                  <div className="flex space-x-2">
                    {achievement.completed ? (
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Completed
                      </span>
                    ) : (
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                        In Progress
                      </span>
                    )}
                    
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-xs px-2 py-1 rounded-full">
                      {achievement.points} pts
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{achievement.description}</p>
                
                {!achievement.completed && achievement.progress !== undefined && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-1000"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex justify-between">
                      <span>{achievement.progress}% complete</span>
                      <span>{achievement.completed ? 'Completed' : `${achievement.progress}/100`}</span>
                    </div>
                  </div>
                )}
                
                {achievement.completed && achievement.date && (
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Completed on {achievement.date}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No achievements found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
