import { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useThemeColors } from '../hooks/useThemeColors';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children, initialTheme }) => {
  // Initialize with default values to prevent undefined errors
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Initialize theme with parent's value if provided
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', 
    initialTheme !== undefined ? initialTheme : window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Initialize dailyGoals with default values
  const [dailyGoals, setDailyGoals] = useLocalStorage('dailyGoals', {
    steps: { target: 10000, current: 0 },
    calories: { target: 2500, current: 0 },
    water: { target: 8, current: 0 },
    sleep: { target: 8, current: 0 },
    exercise: { target: 60, current: 0 }
  });

  // Other state values
  const [workouts, setWorkouts] = useLocalStorage('workouts', sampleWeeklyStats.workouts || []);
  const [nutritionData, setNutritionData] = useLocalStorage('nutritionData', {
    macros: {
      protein: { value: 120, target: 150 },
      carbs: { value: 180, target: 250 },
      fat: { value: 50, target: 70 }
    },
    dailyCalories: [2100, 1950, 2300, 2050, 1900, 2250, 2100]
  });
  const [waterLog, setWaterLog] = useLocalStorage('waterLog', []);
  const [sleepData, setSleepData] = useLocalStorage('sleepData', []);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  
  // Mock data or other state initializations
  const [userData, setUserData] = useState(sampleUserData);
  const [todayStats, setTodayStats] = useState(sampleTodayStats);
  const [weeklyStats, setWeeklyStats] = useState(sampleWeeklyStats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  
  // Add a new state for glass morphism styling
  const [glassEffect, setGlassEffect] = useState(true);
  
  // Get theme colors based on dark mode state
  const themeColors = useThemeColors(isDarkMode);
  
  // Add activity data to state
  const [activity, setActivity] = useState(sampleActivity);
  
  // Current page state
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Ensure the HTML element gets the dark class properly
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Apply dark mode class to html element immediately on load
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // In a real app, you would fetch data from an API here
  useEffect(() => {
    // Simulating data fetch
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Data would normally come from an API
        setUserData(sampleUserData);
        setTodayStats(sampleTodayStats);
        setWeeklyStats(sampleWeeklyStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  // Open modal to add/edit goal
  const openGoalModal = (goal = null) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };
  
  // Close goal modal
  const closeGoalModal = () => {
    setIsModalOpen(false);
    setSelectedGoal(null);
  };
  
  // Save a goal
  const saveGoal = (goal) => {
    if (goal.id) {
      // Update existing goal
      setUserData(prev => ({
        ...prev,
        goals: prev.goals.map(g => g.id === goal.id ? goal : g)
      }));
    } else {
      // Add new goal
      const newGoal = {
        ...goal,
        id: Date.now(), // Simple ID generation - use UUID in production
      };
      setUserData(prev => ({
        ...prev,
        goals: [...prev.goals, newGoal]
      }));
    }
    closeGoalModal();
  };
  
  // Delete a goal
  const deleteGoal = (goalId) => {
    setUserData(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== goalId)
    }));
    closeGoalModal();
  };

  const value = {
    showGoalModal,
    setShowGoalModal,
    activeTab,
    setActiveTab,
    selectedDate,
    setSelectedDate,
    dailyGoals,
    setDailyGoals,
    workouts,
    setWorkouts,
    nutritionData,
    setNutritionData,
    waterLog,
    setWaterLog,
    sleepData,
    setSleepData,
    selectedWorkout,
    setSelectedWorkout,
    userData,
    todayStats,
    weeklyStats,
    isModalOpen,
    selectedGoal,
    openGoalModal,
    closeGoalModal,
    saveGoal,
    deleteGoal,
    glassEffect,
    setGlassEffect,
    isDarkMode,
    themeColors,
    toggleDarkMode,
    activity, // Add activity to the context value
    setActivity,
    currentPage,
    setCurrentPage
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

// Sample data - in a real app this would come from an API
const sampleUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/avatars/user.jpg',
  goals: [
    {
      id: 1,
      title: 'Lose Weight',
      description: 'Lose 10 pounds by the end of the month',
      current: 3,
      target: 10,
      unit: 'lbs',
      deadline: 'Oct 31, 2023'
    },
    {
      id: 2,
      title: 'Run a Marathon',
      description: 'Complete training for marathon',
      current: 65,
      target: 100,
      unit: 'miles',
      deadline: 'Nov 15, 2023'
    },
    {
      id: 3,
      title: 'Improve Strength',
      description: 'Increase bench press max',
      current: 180,
      target: 225,
      unit: 'lbs',
      deadline: 'Dec 1, 2023'
    }
  ]
};

const sampleTodayStats = {
  caloriesBurned: 350,
  steps: 7820,
  activeMinutes: 45,
  workoutsCompleted: 1,
  sleepQuality: 85,
  sleepHours: 7.5,
  waterIntake: 5,
  nutrition: {
    protein: 120,
    carbs: 180,
    fat: 50
  }
};

const sampleWeeklyStats = {
  activity: [
    { label: 'Mon', value: 32, sleep: 7.5, sleepQuality: 85 },
    { label: 'Tue', value: 45, sleep: 7.5, sleepQuality: 85 },
    { label: 'Wed', value: 28, sleep: 7.5, sleepQuality: 85 },
    { label: 'Thu', value: 65, sleep: 7.5, sleepQuality: 85 },
    { label: 'Fri', value: 40, sleep: 7.5, sleepQuality: 85 },
    { label: 'Sat', value: 55, sleep: 7.5, sleepQuality: 85 },
    { label: 'Sun', value: 30, sleep: 7.5, sleepQuality: 85 }
  ],
  workouts: [
    {
      date: 'Oct 18, 2023',
      name: 'Morning Run',
      type: 'Cardio',
      duration: 30,
      calories: 320,
      status: 'Completed'
    },
    {
      date: 'Oct 17, 2023',
      name: 'Upper Body Strength',
      type: 'Strength',
      duration: 45,
      calories: 280,
      status: 'Completed'
    },
    {
      date: 'Oct 15, 2023',
      name: 'Yoga Flow',
      type: 'Yoga',
      duration: 60,
      calories: 220,
      status: 'Completed'
    },
    {
      date: 'Oct 14, 2023',
      name: 'HIIT Session',
      type: 'Cardio',
      duration: 25,
      calories: 300,
      status: 'Completed'
    },
    {
      date: 'Oct 12, 2023',
      name: 'Lower Body Strength',
      type: 'Strength',
      duration: 50,
      calories: 310,
      status: 'Completed'
    }
  ]
};

const sampleNutritionData = {
  dailyCalories: [2100, 1950, 2300, 2050, 1900, 2250, 2100]
};

// Sample data for activity
const sampleActivity = [
  { day: 'Mon', steps: 8542, calories: 320, active: 42, water: 6, distance: 5.2, sleep: 7.2, sleepQuality: 82, date: 'Oct 16' },
  { day: 'Tue', steps: 10253, calories: 420, active: 65, water: 8, distance: 6.8, sleep: 8.1, sleepQuality: 89, date: 'Oct 17' },
  { day: 'Wed', steps: 7891, calories: 280, active: 38, water: 5, distance: 4.9, sleep: 6.5, sleepQuality: 75, date: 'Oct 18' },
  { day: 'Thu', steps: 9234, calories: 380, active: 52, water: 7, distance: 5.7, sleep: 7.8, sleepQuality: 84, date: 'Oct 19' },
  { day: 'Fri', steps: 11567, calories: 450, active: 78, water: 9, distance: 7.2, sleep: 8.3, sleepQuality: 91, date: 'Oct 20' },
  { day: 'Sat', steps: 6543, calories: 250, active: 35, water: 4, distance: 3.8, sleep: 7.9, sleepQuality: 86, date: 'Oct 21' },
  { day: 'Sun', steps: 8123, calories: 340, active: 48, water: 6, distance: 5.5, sleep: 7.5, sleepQuality: 88, date: 'Oct 22' }
];
