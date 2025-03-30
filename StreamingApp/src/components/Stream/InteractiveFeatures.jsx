import { useState, useEffect } from 'react';
import { RippleButton, BounceButton } from '../UI/AnimatedButtons';

function InteractiveFeatures({ stream, currentUser }) {
  const [pollQuestion, setPollQuestion] = useState("What game should I play next?");
  const [pollOptions, setPollOptions] = useState([
    { id: 1, text: "Minecraft", votes: 28 },
    { id: 2, text: "Fortnite", votes: 15 },
    { id: 3, text: "League of Legends", votes: 42 },
    { id: 4, text: "Valorant", votes: 35 }
  ]);
  const [userVoted, setUserVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [prediction, setPrediction] = useState({
    question: "Will the streamer win this match?",
    options: [
      { id: 1, text: "Yes", users: 157, points: 15700 },
      { id: 2, text: "No", users: 43, points: 4300 }
    ],
    timeRemaining: 120, // in seconds
    status: "open" // 'open', 'locked', 'completed'
  });
  const [remainingTime, setRemainingTime] = useState(prediction.timeRemaining);
  const [predictionSelected, setPredictionSelected] = useState(null);
  const [rewardPoints, setRewardPoints] = useState(currentUser ? 500 : 0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Calculate total votes on mount
  useEffect(() => {
    setTotalVotes(pollOptions.reduce((sum, option) => sum + option.votes, 0));
  }, [pollOptions]);
  
  // Countdown timer for prediction
  useEffect(() => {
    if (prediction.status !== 'open') return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPrediction(prev => ({ ...prev, status: 'locked' }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [prediction.status]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Handle poll vote
  const handleVote = (optionId) => {
    if (!currentUser || userVoted) return;
    
    // Update poll options with new vote
    setPollOptions(pollOptions.map(option => 
      option.id === optionId 
        ? { ...option, votes: option.votes + 1 } 
        : option
    ));
    
    setUserVoted(true);
    setTotalVotes(prev => prev + 1);
    
    // Animation effect
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    
    // Simulate earning points
    setRewardPoints(prev => prev + 50);
  };
  
  // Handle prediction choice
  const handlePrediction = (optionId) => {
    if (!currentUser || prediction.status !== 'open' || predictionSelected) return;
    
    // Update prediction options with new participant
    setPrediction(prev => ({
      ...prev,
      options: prev.options.map(option => 
        option.id === optionId 
          ? { ...option, users: option.users + 1, points: option.points + 100 } 
          : option
      )
    }));
    
    setPredictionSelected(optionId);
    
    // Animation effect
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };
  
  // Handle prediction resolution (for demo)
  const handleResolvePrediction = (winnerId) => {
    setPrediction(prev => ({ ...prev, status: 'completed', winnerId }));
    
    // If user predicted correctly, reward them
    if (predictionSelected === winnerId) {
      setRewardPoints(prev => prev + 100);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Optional: Confetti effect for rewards */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-70 animate-fall"
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
                width: `${Math.random() * 12 + 5}px`,
                height: `${Math.random() * 12 + 5}px`,
                top: '-20px',
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 1}s`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            ></div>
          ))}
        </div>
      )}
      
      {/* Points Display */}
      {currentUser && (
        <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm p-4 rounded-lg border border-purple-800/30 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold mr-3">
              ⭐
            </div>
            <div>
              <p className="text-gray-300 text-sm">Channel Points</p>
              <p className="text-white font-bold text-lg">{rewardPoints}</p>
            </div>
          </div>
          <RippleButton>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17A3 3 0 015 5zm4.30 9.40a1 1 0 001.4-1.4l-2.3-2.3c-1.4-1.4-3.6-1.4-5 0a3.5 3.5 0 000 4.95l2.3 2.3a1 1 0 001.4-1.4l-2.3-2.3a1.5 1.5 0 010-2.12c.59-.59 1.54-.59 2.12 0l2.3 2.3z" clipRule="evenodd" />
              </svg>
              Redeem
            </span>
          </RippleButton>
        </div>
      )}
      
      {/* Poll Widget */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            Poll
          </h3>
          <span className="text-gray-400 text-sm">{totalVotes} votes</span>
        </div>
        
        <div className="p-4">
          <h4 className="text-white font-medium mb-4">{pollQuestion}</h4>
          
          <div className="space-y-3">
            {pollOptions.map(option => {
              const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
              
              return (
                <div key={option.id} className="relative">
                  <div className="bg-gray-700 rounded-lg overflow-hidden">
                    <div 
                      className={`absolute inset-y-0 left-0 ${
                        userVoted && option.id === pollOptions.find(o => o.votes === Math.max(...pollOptions.map(o => o.votes)))?.id
                          ? 'bg-gradient-to-r from-purple-600 to-purple-500' 
                          : 'bg-gradient-to-r from-gray-600 to-gray-500'
                      } transition-all duration-1000`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                    
                    <button 
                      className={`relative flex justify-between items-center p-3 w-full text-left ${
                        userVoted ? 'cursor-default' : 'hover:bg-gray-600/30 cursor-pointer'
                      }`}
                      onClick={() => handleVote(option.id)}
                      disabled={!currentUser || userVoted}
                    >
                      <span className="text-white font-medium relative z-10">{option.text}</span>
                      <span className="text-white font-medium relative z-10">{percentage}%</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {!currentUser && (
            <div className="mt-4 text-center text-gray-400 text-sm">
              Sign in to vote in polls
            </div>
          )}
          
          {userVoted && (
            <div className="mt-4 text-center">
              <span className="inline-block bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm">
                Thanks for voting!
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Prediction Widget */}
      <div className="bg-gradient-to-br from-gray-800/80 to-blue-900/20 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Prediction
          </h3>
          <div>
            {prediction.status === 'open' && (
              <span className="text-yellow-400 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {formatTime(remainingTime)}
              </span>
            )}
            
            {prediction.status === 'locked' && (
              <span className="text-gray-400 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Locked
              </span>
            )}
            
            {prediction.status === 'completed' && (
              <span className="text-green-400 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Completed
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h4 className="text-white font-medium mb-4">{prediction.question}</h4>
          
          <div className="space-y-3">
            {prediction.options.map(option => {
              const totalUsers = prediction.options.reduce((sum, opt) => sum + opt.users, 0);
              const percentage = totalUsers > 0 ? Math.round((option.users / totalUsers) * 100) : 0;
              const isWinner = prediction.status === 'completed' && option.id === prediction.winnerId;
              
              return (
                <div key={option.id} className="relative">
                  <div className={`bg-gray-700 rounded-lg overflow-hidden ${
                    isWinner ? 'ring-2 ring-green-500 shadow-lg shadow-green-500/20' : 
                    (prediction.status === 'completed' ? 'opacity-75' : '')
                  }`}>
                    <div 
                      className={`absolute inset-y-0 left-0 ${
                        isWinner ? 'bg-gradient-to-r from-green-600 to-green-500' :
                        (predictionSelected === option.id ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gradient-to-r from-gray-600 to-gray-500')
                      } transition-all duration-1000`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                    
                    <button 
                      className={`relative flex justify-between items-center p-3 w-full text-left ${
                        prediction.status !== 'open' || !currentUser || predictionSelected 
                          ? 'cursor-default' 
                          : 'hover:bg-blue-600/20 cursor-pointer'
                      }`}
                      onClick={() => handlePrediction(option.id)}
                      disabled={prediction.status !== 'open' || !currentUser || predictionSelected}
                    >
                      <div className="flex flex-col relative z-10">
                        <span className="text-white font-medium">{option.text}</span>
                        <span className="text-gray-300 text-sm">{option.users} users • {option.points} pts</span>
                      </div>
                      <span className="text-white font-medium relative z-10">{percentage}%</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {!currentUser && prediction.status === 'open' && (
            <div className="mt-4 text-center text-gray-400 text-sm">
              Sign in to participate in predictions
            </div>
          )}
          
          {prediction.status === 'locked' && currentUser?.username === stream?.streamer.name && (
            <div className="flex gap-3 mt-4">
              {prediction.options.map(option => (
                <BounceButton 
                  key={option.id}
                  onClick={() => handleResolvePrediction(option.id)}
                  className="flex-1"
                >
                  "{option.text}" wins
                </BounceButton>
              ))}
            </div>
          )}
          
          {prediction.status === 'completed' && (
            <div className="mt-4 p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700">
              <p className="text-center text-white">
                Result: <span className="font-bold text-green-400">
                  {prediction.options.find(o => o.id === prediction.winnerId)?.text}
                </span> won!
                
                {predictionSelected && (
                  <span className={`ml-2 ${predictionSelected === prediction.winnerId ? 'text-green-400' : 'text-red-400'}`}>
                    {predictionSelected === prediction.winnerId 
                      ? 'You predicted correctly! +100 points' 
                      : 'Your prediction was incorrect'}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InteractiveFeatures;
