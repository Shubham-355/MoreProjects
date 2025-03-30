import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const ChallengeCard = ({ challenge, isDarkMode }) => {
  const progressPercent = (challenge.current / challenge.target) * 100;
  
  return (
    <div className={`${isDarkMode ? 'bg-[#0B192C]/70 border border-[#1E3E62]/50' : 'bg-white'} rounded-xl shadow-sm p-5 transition-all duration-300 backdrop-blur-sm hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{challenge.title}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{challenge.description}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${
          challenge.status === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : challenge.status === 'Completed'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        }`}>
          {challenge.status}
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Progress</span>
          <span className={isDarkMode ? 'text-white' : 'text-[#0C0950]'}>{Math.round(progressPercent)}%</span>
        </div>
        <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#1E3E62]/30' : 'bg-gray-200'}`}>
          <div 
            className={`h-full rounded-full ${
              progressPercent >= 100 
                ? (isDarkMode ? 'bg-green-500' : 'bg-green-600') 
                : (isDarkMode ? 'bg-[#FF6500]' : 'bg-[#261FB3]')
            }`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current</p>
          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{challenge.current}</p>
        </div>
        <div className="text-center">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Target</p>
          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{challenge.target}</p>
        </div>
        <div className="text-center">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Deadline</p>
          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{challenge.deadline}</p>
        </div>
      </div>
    </div>
  );
};

const ChallengesPage = () => {
  const { isDarkMode } = useDashboard();
  const [filter, setFilter] = useState('all');
  
  // Sample challenges data
  const challenges = [
    {
      title: '10K Steps Challenge',
      description: 'Walk 10,000 steps every day for a week',
      status: 'Active',
      current: 4,
      target: 7,
      deadline: 'Nov 15, 2023',
      category: 'Walking'
    },
    {
      title: 'Weight Loss Challenge',
      description: 'Lose 5 pounds in a month',
      status: 'Active',
      current: 3,
      target: 5,
      deadline: 'Nov 30, 2023',
      category: 'Weight Loss'
    },
    {
      title: 'Strength Training',
      description: 'Complete 12 strength training sessions',
      status: 'Completed',
      current: 12,
      target: 12,
      deadline: 'Oct 30, 2023',
      category: 'Strength'
    },
    {
      title: 'Yoga Challenge',
      description: 'Practice yoga for 20 days straight',
      status: 'Upcoming',
      current: 0,
      target: 20,
      deadline: 'Dec 15, 2023',
      category: 'Yoga'
    },
    {
      title: 'Running Challenge',
      description: 'Run 50 miles in a month',
      status: 'Active',
      current: 32,
      target: 50,
      deadline: 'Nov 30, 2023',
      category: 'Running'
    },
    {
      title: 'Hydration Challenge',
      description: 'Drink 8 glasses of water daily for 14 days',
      status: 'Active',
      current: 10,
      target: 14,
      deadline: 'Nov 20, 2023',
      category: 'Nutrition'
    },
  ];
  
  // Filter challenges based on selected filter
  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(c => c.status === filter);
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
            Challenges
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Push your limits with these fitness challenges
          </p>
        </div>
        <button 
          className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-[#FF6500] hover:bg-[#FF8533]' : 'bg-[#261FB3] hover:bg-[#5C56D4]'} text-white transition-colors`}
        >
          Join Challenge
        </button>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            filter === 'all' 
              ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
              : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('Active')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            filter === 'Active' 
              ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
              : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('Completed')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            filter === 'Completed' 
              ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
              : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('Upcoming')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            filter === 'Upcoming' 
              ? (isDarkMode ? 'bg-[#FF6500] text-white' : 'bg-[#261FB3] text-white') 
              : (isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700')
          }`}
        >
          Upcoming
        </button>
      </div>
      
      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredChallenges.map((challenge, index) => (
          <ChallengeCard 
            key={index} 
            challenge={challenge} 
            isDarkMode={isDarkMode} 
          />
        ))}
      </div>
      
      {filteredChallenges.length === 0 && (
        <div className={`flex flex-col items-center justify-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-[#1E3E62]/50' : 'bg-[#F8F7FF]'}`}>
            <span className="text-3xl">🏆</span>
          </div>
          <p className="text-center mb-3">No challenges found</p>
          <button 
            className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-[#FF6500] hover:bg-[#FF8533]' : 'bg-[#261FB3] hover:bg-[#5C56D4]'} text-white transition-colors`}
          >
            Browse Challenges
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengesPage;
