import React, { useState, useCallback, memo } from 'react';

// Define workout types and their icons/colors
const WORKOUT_TYPES = {
  'Cardio': {
    icon: '🏃‍♂️',
    color: 'bg-red-500',
    textColor: 'text-red-600 dark:text-red-400'
  },
  'Strength': {
    icon: '🏋️‍♂️',
    color: 'bg-blue-500',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  'Yoga': {
    icon: '🧘‍♀️',
    color: 'bg-purple-500',
    textColor: 'text-purple-600 dark:text-purple-400'
  },
  'HIIT': {
    icon: '⚡',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600 dark:text-yellow-400'
  },
  'Cycling': {
    icon: '🚴‍♀️',
    color: 'bg-green-500',
    textColor: 'text-green-600 dark:text-green-400'
  }
};

// Mock data for workouts
const MOCK_WORKOUTS = [
  {
    id: 1,
    date: 'Oct 18, 2023',
    name: 'Morning Run',
    type: 'Cardio',
    duration: 30,
    calories: 320,
    status: 'Completed'
  },
  {
    id: 2,
    date: 'Oct 17, 2023',
    name: 'Upper Body Strength',
    type: 'Strength',
    duration: 45,
    calories: 280,
    status: 'Completed'
  },
  {
    id: 3,
    date: 'Oct 15, 2023',
    name: 'Yoga Flow',
    type: 'Yoga',
    duration: 60,
    calories: 220,
    status: 'Completed'
  },
  {
    id: 4,
    date: 'Oct 14, 2023',
    name: 'HIIT Session',
    type: 'HIIT',
    duration: 25,
    calories: 300,
    status: 'Completed'
  },
  {
    id: 5,
    date: 'Oct 12, 2023',
    name: 'Lower Body Strength',
    type: 'Strength',
    duration: 50,
    calories: 310,
    status: 'Completed'
  }
];

interface WorkoutCardProps {
  workout: typeof MOCK_WORKOUTS[0];
  index: number;
}

// Workout card component
const WorkoutCard = memo(({ workout, index }: WorkoutCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  
  const workoutTypeInfo = WORKOUT_TYPES[workout.type as keyof typeof WORKOUT_TYPES];
  
  return (
    <div 
      className={`
        bg-white dark:bg-darkBackground-light rounded-md border border-gray-100 dark:border-gray-700/50 
        p-3 transition-all duration-300 shadow-sm hover:shadow-md relative
        transform translate-z-0 animate-slideUp
      `}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Status indicator */}
      <div className="absolute top-3 right-3">
        <div className="flex items-center">
          <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></div>
          <span className="text-[9px] text-text-light dark:text-darkText-light">{workout.status}</span>
        </div>
      </div>
      
      {/* Workout content */}
      <div className="flex items-start space-x-3">
        {/* Icon circle */}
        <div 
          className={`flex-shrink-0 w-10 h-10 rounded-full ${workoutTypeInfo.color} bg-opacity-10 dark:bg-opacity-20 
          flex items-center justify-center text-lg transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
        >
          <span role="img" aria-label={workout.type}>{workoutTypeInfo.icon}</span>
        </div>
        
        {/* Workout details */}
        <div className="flex-grow">
          <div className="flex flex-col">
            <h4 className="text-sm font-medium text-primary-dark dark:text-darkText">{workout.name}</h4>
            <p className={`text-xs ${workoutTypeInfo.textColor}`}>{workout.type}</p>
            
            <div className="flex items-center mt-2 justify-between text-[10px] text-text-light dark:text-darkText-light">
              <div>
                <span className="inline-block">
                  <span className="font-medium">{workout.duration}</span> min
                </span>
                <span className="mx-1">•</span>
                <span className="inline-block">
                  <span className="font-medium">{workout.calories}</span> kcal
                </span>
              </div>
              <div className="text-[9px]">{workout.date}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress bar - visual element */}
      <div className="mt-3 h-0.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${workoutTypeInfo.color}`}
          style={{ width: '100%' }}
        ></div>
      </div>
    </div>
  );
});
WorkoutCard.displayName = 'WorkoutCard';

// Workout summary component
const WorkoutSummary = memo(() => {
  // Calculate summary statistics
  const totalWorkouts = MOCK_WORKOUTS.length;
  const totalDuration = MOCK_WORKOUTS.reduce((sum, workout) => sum + workout.duration, 0);
  const totalCalories = MOCK_WORKOUTS.reduce((sum, workout) => sum + workout.calories, 0);
  
  // Count by type
  const workoutsByType = MOCK_WORKOUTS.reduce((counts, workout) => {
    const type = workout.type as keyof typeof WORKOUT_TYPES;
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  return (
    <div className="bg-gray-50 dark:bg-darkBackground-dark border border-gray-100 dark:border-gray-700/50 rounded-md p-3 mt-3">
      <h4 className="text-xs font-medium text-primary-dark dark:text-darkText mb-2">Summary</h4>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="text-center">
          <div className="text-[9px] text-text-light dark:text-darkText-light">Workouts</div>
          <div className="text-sm font-medium text-primary dark:text-darkPrimary">{totalWorkouts}</div>
        </div>
        <div className="text-center">
          <div className="text-[9px] text-text-light dark:text-darkText-light">Duration</div>
          <div className="text-sm font-medium text-primary dark:text-darkPrimary">{totalDuration} min</div>
        </div>
        <div className="text-center">
          <div className="text-[9px] text-text-light dark:text-darkText-light">Calories</div>
          <div className="text-sm font-medium text-primary dark:text-darkPrimary">{totalCalories}</div>
        </div>
      </div>
      
      {/* Workout type distribution */}
      <div className="h-1.5 w-full flex rounded-full overflow-hidden">
        {Object.entries(workoutsByType).map(([type, count], index) => {
          const typedType = type as keyof typeof WORKOUT_TYPES;
          const percentage = (count / totalWorkouts) * 100;
          return (
            <div 
              key={type}
              className={`h-full ${WORKOUT_TYPES[typedType].color}`}
              style={{ width: `${percentage}%` }}
              title={`${type}: ${count} (${percentage.toFixed(1)}%)`}
            ></div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-2 mt-2">
        {Object.entries(workoutsByType).map(([type, count]) => {
          const typedType = type as keyof typeof WORKOUT_TYPES;
          return (
            <div key={type} className="flex items-center text-[9px]">
              <div className={`w-1.5 h-1.5 rounded-full ${WORKOUT_TYPES[typedType].color} mr-1`}></div>
              <span className="text-text-light dark:text-darkText-light">{type}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
WorkoutSummary.displayName = 'WorkoutSummary';

// Main Recent Workouts component
const RecentWorkouts: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  // Filter workouts by type
  const filteredWorkouts = filter 
    ? MOCK_WORKOUTS.filter(workout => workout.type === filter)
    : MOCK_WORKOUTS;
  
  return (
    <div className="bg-white dark:bg-darkBackground-light rounded-md shadow-sm border border-gray-100 dark:border-gray-700/50 p-3 contain-paint">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-primary-dark dark:text-darkText">Recent Workouts</h3>
        
        {/* Filter buttons */}
        <div className="flex space-x-1 overflow-x-auto pb-1 -mr-1 scrollbar-none">
          <button 
            onClick={() => setFilter(null)}
            className={`text-[9px] px-2 py-0.5 rounded-full ${
              filter === null 
                ? 'bg-primary dark:bg-darkPrimary text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-text dark:text-darkText hover:bg-gray-200 dark:hover:bg-gray-700'
            } transition-colors duration-150 whitespace-nowrap`}
          >
            All
          </button>
          
          {Object.entries(WORKOUT_TYPES).map(([type, { icon }]) => (
            <button 
              key={type}
              onClick={() => setFilter(filter === type ? null : type)}
              className={`text-[9px] px-2 py-0.5 rounded-full flex items-center ${
                filter === type 
                  ? 'bg-primary dark:bg-darkPrimary text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-text dark:text-darkText hover:bg-gray-200 dark:hover:bg-gray-700'
              } transition-colors duration-150 whitespace-nowrap`}
            >
              <span className="mr-1">{icon}</span> {type}
            </button>
          ))}
        </div>
      </div>
      
      {/* Workout cards */}
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout, index) => (
            <WorkoutCard key={workout.id} workout={workout} index={index} />
          ))
        ) : (
          <div className="text-center py-4 text-xs text-text-light dark:text-darkText-light">
            No workouts found for this filter.
          </div>
        )}
      </div>
      
      {/* Workout summary */}
      <WorkoutSummary />
    </div>
  );
};

export default RecentWorkouts;
