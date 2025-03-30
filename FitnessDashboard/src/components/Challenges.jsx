import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const Challenges = () => {
  const { activeChallenges, joinChallenge } = useDashboard();
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [justJoined, setJustJoined] = useState(null);
  const [sortBy, setSortBy] = useState('daysLeft');
  
  const handleJoinChallenge = (id) => {
    joinChallenge(id);
    setJustJoined(id);
    
    setTimeout(() => {
      setJustJoined(null);
    }, 2000);
  };
  
  // Sort challenges based on current sortBy value
  const sortedChallenges = [...activeChallenges].sort((a, b) => {
    if (sortBy === 'daysLeft') {
      return a.daysLeft - b.daysLeft;
    } else if (sortBy === 'participants') {
      return b.participants - a.participants;
    } else if (sortBy === 'difficulty') {
      const difficultyValue = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      return difficultyValue[a.difficulty] - difficultyValue[b.difficulty];
    } else if (sortBy === 'reward') {
      return parseInt(b.reward.split(' ')[0]) - parseInt(a.reward.split(' ')[0]);
    }
    return 0;
  });
  
  // Get color for difficulty badge
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default: return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-300 transform hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Active Challenges</h3>
        <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 flex items-center">
          <span>Browse More</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      
      {/* Sort controls */}
      <div className="flex items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="mr-2">Sort by:</span>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSortBy('daysLeft')}
            className={`px-2 py-1 rounded transition-colors ${
              sortBy === 'daysLeft' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-medium' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Time Left
          </button>
          <button 
            onClick={() => setSortBy('participants')}
            className={`px-2 py-1 rounded transition-colors ${
              sortBy === 'participants' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-medium' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Popular
          </button>
          <button 
            onClick={() => setSortBy('difficulty')}
            className={`px-2 py-1 rounded transition-colors ${
              sortBy === 'difficulty' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-medium' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Difficulty
          </button>
          <button 
            onClick={() => setSortBy('reward')}
            className={`px-2 py-1 rounded transition-colors ${
              sortBy === 'reward' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-medium' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Reward
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedChallenges.map((challenge, index) => (
          <div 
            key={challenge.id} 
            className={`border rounded-lg p-4 transition-all duration-300 transform ${
              activeChallenge === challenge.id ? 'scale-[1.02] shadow-md border-indigo-200 dark:border-indigo-800' : 'border-gray-100 dark:border-gray-700'
            } ${justJoined === challenge.id ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
            onMouseEnter={() => setActiveChallenge(challenge.id)}
            onMouseLeave={() => setActiveChallenge(null)}
            style={{ 
              opacity: 0,
              animation: 'opacity 1 0.3s ease-out forwards',
              animationDelay: `${index * 100 + 300}ms`
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="font-medium dark:text-white">{challenge.title}</h4>
                  {justJoined === challenge.id && (
                    <span className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full px-2 py-0.5 ml-2 transition-all duration-300 animate-pulse">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Joined
                    </span>
                  )}
                </div>
                
                <div className="mt-1 flex flex-wrap gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 text-xs px-2 py-0.5 rounded-full flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {challenge.daysLeft} {challenge.daysLeft === 1 ? 'day' : 'days'} left
                  </span>
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-xs px-2 py-0.5 rounded-full">
                    {challenge.reward}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => handleJoinChallenge(challenge.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 transform ${
                  justJoined === challenge.id 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-indigo-100 dark:bg-indigo-800/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-700/50'
                } hover:shadow-md`}
              >
                {justJoined === challenge.id ? 'Joined' : 'Join'}
              </button>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{challenge.description}</p>
            
            {/* Participants */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                {/* Participant avatars would go here */}
                <div className="flex -space-x-2 mr-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-indigo-200 dark:bg-indigo-800 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] text-indigo-800 dark:text-indigo-200 font-medium">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {challenge.participants} participants
                </span>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {Math.round(100 - (challenge.daysLeft / 30) * 100)}% complete
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-2">
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full"
                  style={{ 
                    width: `${Math.max(0, 100 - (challenge.daysLeft / 30) * 100)}%`,
                    transition: 'width 1s ease-in-out' 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
