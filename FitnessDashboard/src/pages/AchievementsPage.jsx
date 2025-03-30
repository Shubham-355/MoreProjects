import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import CurvedGraph from '../components/charts/CurvedGraph';
import MultiChartView from '../components/charts/MultiChartView';
import ChartTypeSelector from '../components/charts/ChartTypeSelector';

const AchievementCard = ({ achievement, isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} rounded-xl shadow-sm p-5 transition-all duration-300 backdrop-blur-sm hover:shadow-md text-center`}>
      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
        achievement.unlocked 
          ? (isDarkMode ? 'bg-gradient-to-r from-[#FF6500] to-[#FF8533]' : 'bg-gradient-to-r from-[#261FB3] to-[#5C56D4]') 
          : (isDarkMode ? 'bg-[#1E3E62]/50' : 'bg-gray-200')
      }`}>
        <span className="text-2xl">{achievement.icon}</span>
      </div>
      
      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{achievement.title}</h3>
      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{achievement.description}</p>
      
      {achievement.unlocked ? (
        <div className={`mt-4 px-3 py-1 rounded-full text-xs inline-block ${
          isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
        }`}>
          Unlocked on {achievement.date}
        </div>
      ) : (
        <div className={`mt-4 px-3 py-1 rounded-full text-xs inline-block ${
          isDarkMode ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-100 text-gray-600'
        }`}>
          {achievement.progress}% Complete
        </div>
      )}
    </div>
  );
};

const AchievementsPage = () => {
  const { isDarkMode } = useDashboard();
  const [chartType, setChartType] = useState('line');
  
  // Sample achievements data
  const achievements = [
    {
      icon: '🔥',
      title: '7-Day Streak',
      description: 'Complete workouts for 7 consecutive days',
      unlocked: true,
      date: 'Oct 15, 2023',
      progress: 100
    },
    {
      icon: '🏃',
      title: 'Marathon Runner',
      description: 'Run a total of 26.2 miles in a month',
      unlocked: true,
      date: 'Sep 28, 2023',
      progress: 100
    },
    {
      icon: '💪',
      title: 'Strength Master',
      description: 'Complete 20 strength training sessions',
      unlocked: false,
      progress: 85
    },
    {
      icon: '🚶',
      title: 'Step Champion',
      description: 'Reach 10,000 steps every day for 2 weeks',
      unlocked: false,
      progress: 50
    },
    {
      icon: '🥗',
      title: 'Nutrition Pro',
      description: 'Track your nutrition for 30 consecutive days',
      unlocked: true,
      date: 'Aug 22, 2023',
      progress: 100
    },
    {
      icon: '💧',
      title: 'Hydration Hero',
      description: 'Drink 8 cups of water daily for 14 days',
      unlocked: false,
      progress: 75
    },
    {
      icon: '🧘',
      title: 'Zen Master',
      description: 'Complete 15 meditation sessions',
      unlocked: false,
      progress: 40
    },
    {
      icon: '⚡',
      title: 'Early Bird',
      description: 'Complete 10 workouts before 8am',
      unlocked: true,
      date: 'Oct 5, 2023',
      progress: 100
    }
  ];
  
  // Statistics for achievements
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const percent = Math.round((unlockedCount / totalCount) * 100);
  
  // Data for achievement progress chart (last 6 months)
  const monthNames = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const achievementsByMonth = [2, 3, 1, 4, 5, unlockedCount];
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
            Achievements
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Track your fitness milestones
          </p>
        </div>
        <div className={`${isDarkMode ? 'bg-[#1E3E62]/40' : 'bg-[#F8F7FF]'} px-4 py-2 rounded-lg text-center`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progress</p>
          <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
            {unlockedCount}/{totalCount} ({percent}%)
          </p>
        </div>
      </div>
      
      {/* Achievement progress chart */}
      <div className={`rounded-xl shadow-sm p-6 mb-8 ${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>Achievement Progress</h2>
          <ChartTypeSelector 
            chartType={chartType} 
            onChartTypeChange={setChartType} 
            isDarkMode={isDarkMode} 
            size="sm"
          />
        </div>
        <div className="h-48">
          <MultiChartView 
            data={achievementsByMonth}
            chartType={chartType}
            color={isDarkMode ? "#FF6500" : "#261FB3"}
            fillOpacity={0.2}
            isDarkMode={isDarkMode}
            xAxisLabels={monthNames}
            showGrid={true}
          />
        </div>
      </div>
      
      {/* Achievement grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {achievements.map((achievement, index) => (
          <AchievementCard 
            key={index} 
            achievement={achievement} 
            isDarkMode={isDarkMode} 
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
