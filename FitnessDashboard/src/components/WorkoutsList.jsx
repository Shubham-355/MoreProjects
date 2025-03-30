import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const WorkoutsList = () => {
  const { userWorkouts } = useDashboard();
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('recent');
  
  const getWorkoutIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'cardio': return '🏃';
      case 'strength': return '💪';
      case 'flexibility': return '🧘';
      case 'interval': return '⏱️';
      default: return '🏋️';
    }
  };
  
  const getIntensityColor = (intensity) => {
    if (!intensity) return '';
    
    switch (intensity.toLowerCase()) {
      case 'high': return 'text-red-500 dark:text-red-400';
      case 'medium': return 'text-orange-500 dark:text-orange-400';
      case 'low': return 'text-green-500 dark:text-green-400';
      default: return 'text-blue-500 dark:text-blue-400';
    }
  };
  
  // Calculate burn rate (calories per minute)
  const getBurnRate = (calories, duration) => {
    return Math.round(calories / duration);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-300 transform hover:shadow-md">
      {/* Tabs */}
      <div className="flex mb-6">
        <button 
          onClick={() => setActiveTab('recent')} 
          className={`flex-1 pb-2 text-center font-medium transition-colors duration-200 border-b-2 ${
            activeTab === 'recent' 
              ? 'text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400' 
              : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-indigo-500 dark:hover:text-indigo-300'
          }`}
        >
          Recent Workouts
        </button>
        <button 
          onClick={() => setActiveTab('upcoming')} 
          className={`flex-1 pb-2 text-center font-medium transition-colors duration-200 border-b-2 ${
            activeTab === 'upcoming' 
              ? 'text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400' 
              : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-indigo-500 dark:hover:text-indigo-300'
          }`}
        >
          Upcoming Classes
        </button>
      </div>
      
      {activeTab === 'recent' ? (
        <>
          <div className="space-y-4 mb-4">
            {userWorkouts.slice(0, 4).map((workout, index) => (
              <div 
                key={workout.id} 
                className={`rounded-lg border transition-all duration-300 transform overflow-hidden ${
                  activeWorkout === workout.id 
                    ? 'border-indigo-200 dark:border-indigo-800' 
                    : 'border-gray-100 dark:border-gray-700 hover:border-indigo-100 dark:hover:border-indigo-900/50'
                }`}
                style={{ 
                  opacity: 0,
                  animation: 'opacity 1 0.3s ease-out forwards',
                  animationDelay: `${index * 100 + 200}ms`
                }}
              >
                <div
                  className={`flex items-center p-3 cursor-pointer ${
                    activeWorkout === workout.id && showDetails 
                      ? 'bg-indigo-50/50 dark:bg-indigo-900/20' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                  }`}
                  onClick={() => {
                    if (activeWorkout === workout.id) {
                      setShowDetails(!showDetails);
                    } else {
                      setActiveWorkout(workout.id);
                      setShowDetails(true);
                    }
                  }}
                >
                  <div className={`min-w-12 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 mr-4 ${
                    activeWorkout === workout.id 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white transform rotate-12 shadow' 
                      : 'bg-indigo-100 dark:bg-indigo-800/50'
                  }`}>
                    {getWorkoutIcon(workout.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium dark:text-white truncate">{workout.name}</h4>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="truncate">{workout.type}</span>
                      <span className="mx-1.5">•</span>
                      <span>{workout.duration} min</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="block font-medium dark:text-white">{workout.calories} cal</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{workout.date}</span>
                  </div>
                  
                  <div className="ml-3 text-gray-400 dark:text-gray-500 transition-transform duration-300 transform">
                    <svg 
                      className={`w-5 h-5 ${activeWorkout === workout.id && showDetails ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Workout details */}
                {activeWorkout === workout.id && showDetails && workout.details && (
                  <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-4 border-t border-indigo-100 dark:border-indigo-800/30 animate-fadeIn">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Burn Rate</div>
                        <div className="font-medium text-indigo-600 dark:text-indigo-400">
                          {getBurnRate(workout.calories, workout.duration)} cal/min
                        </div>
                      </div>
                      
                      {workout.details?.distance && (
                        <div className="text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Distance</div>
                          <div className="font-medium dark:text-white">
                            {workout.details.distance} km
                          </div>
                        </div>
                      )}
                      
                      {workout.details?.heartRate && (
                        <div className="text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Heart Rate</div>
                          <div className="font-medium text-red-500 dark:text-red-400">
                            {workout.details.heartRate} bpm
                          </div>
                        </div>
                      )}
                      
                      {workout.details?.pace && (
                        <div className="text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pace</div>
                          <div className="font-medium dark:text-white">
                            {workout.details.pace} {workout.type.toLowerCase() === 'cycling' ? 'km/h' : 'min/km'}
                          </div>
                        </div>
                      )}
                      
                      {workout.details?.sets && (
                        <div className="text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sets</div>
                          <div className="font-medium dark:text-white">
                            {workout.details.sets}
                          </div>
                        </div>
                      )}
                      
                      {workout.details?.reps && (
                        <div className="text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Reps</div>
                          <div className="font-medium dark:text-white">
                            {workout.details.reps}
                          </div>
                        </div>
                      )}
                      
                      {workout.details?.weight && (
                        <div className="text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Weight</div>
                          <div className="font-medium dark:text-white">
                            {workout.details.weight} kg
                          </div>
                        </div>
                      )}
                      
                      {workout.details?.intensity && (
                        <div className="text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Intensity</div>
                          <div className={`font-medium ${getIntensityColor(workout.details.intensity)}`}>
                            {workout.details.intensity}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {workout.details?.muscleGroups && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Muscle Groups</div>
                        <div className="flex flex-wrap gap-2">
                          {workout.details.muscleGroups.map(muscle => (
                            <span key={muscle} className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs px-2 py-1 rounded-full">
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {workout.details?.exercises && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Exercises</div>
                        <div className="flex flex-wrap gap-2">
                          {workout.details.exercises.map(exercise => (
                            <span key={exercise} className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs px-2 py-1 rounded-full">
                              {exercise}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg">
            Add New Workout
          </button>
        </>
      ) : (
        <div className="py-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center text-indigo-500 dark:text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-medium dark:text-white mb-2">No Upcoming Classes</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            You don't have any scheduled classes. Browse available classes or create a new workout plan.
          </p>
          <button className="mt-4 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors">
            Browse Classes
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutsList;
