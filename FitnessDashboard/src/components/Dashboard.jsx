import { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import ActivityChart from './charts/ActivityChart';
import NutritionChart from './charts/NutritionChart';
import GoalProgress from './GoalProgress';
import StatCard from './StatCard';
import WorkoutHistoryTable from './WorkoutHistoryTable';
import TodayActivityGraph from './charts/TodayActivityGraph';
import SleepQualityGraph from './charts/SleepQualityGraph';
import WaterIntakeGraph from './charts/WaterIntakeGraph';
import CalorieBalanceGraph from './charts/CalorieBalanceGraph';

const Dashboard = () => {
  const { 
    userData, 
    todayStats, 
    weeklyStats, 
    activity = [], 
    nutritionData, 
    isDarkMode,
    dailyGoals 
  } = useDashboard();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hours = new Date().getHours();
    let newGreeting = '';
    
    if (hours < 12) {
      newGreeting = 'Good morning';
    } else if (hours < 18) {
      newGreeting = 'Good afternoon';
    } else {
      newGreeting = 'Good evening';
    }
    
    setGreeting(newGreeting);
  }, []);

  // Safe data mapping functions to handle undefined or null values
  const getStepsData = () => {
    if (!activity || !Array.isArray(activity) || activity.length === 0) {
      return Array(7).fill(0);
    }
    return activity.map(day => day.steps || 0).slice(-7);
  };
  
  const getCaloriesData = () => {
    if (!activity || !Array.isArray(activity) || activity.length === 0) {
      return Array(7).fill(0);
    }
    return activity.map(day => day.calories || 0).slice(-7);
  };
  
  const getActiveData = () => {
    if (!activity || !Array.isArray(activity) || activity.length === 0) {
      return Array(7).fill(0);
    }
    return activity.map(day => day.active || 0).slice(-7);
  };
  
  const getWaterData = () => {
    if (!activity || !Array.isArray(activity) || activity.length === 0) {
      return Array(7).fill(0);
    }
    return activity.map(day => day.water || 0).slice(-7);
  };

  // Update today's stats based on dailyGoals
  const getCurrentStats = () => {
    return {
      steps: dailyGoals.steps?.current || 0,
      caloriesBurned: dailyGoals.calories?.current || 0,
      activeMinutes: dailyGoals.exercise?.current || 0,
      waterIntake: dailyGoals.water?.current || 0,
      // Include other stats to avoid undefined errors
      stepsChange: todayStats?.stepsChange || 0,
      caloriesBurnedChange: todayStats?.caloriesBurnedChange || 0,
      activeMinutesChange: todayStats?.activeMinutesChange || 0,
      waterIntakeChange: todayStats?.waterIntakeChange || 0
    };
  };
  
  const currentStats = getCurrentStats();
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <section className="dashboard-section">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
              {greeting}
            </h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Here's your fitness summary</p>
          </div>
          <div className={`${isDarkMode ? 'bg-[#1E3E62]/30' : 'bg-[#F8F7FF]'} px-4 py-2 rounded-lg flex items-center gap-2`}>
            <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#FF6500]' : 'bg-[#261FB3]'}`}></span>
            <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-[#0C0950]'}`}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Today's Stats with Graphical Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Steps" 
            value={currentStats.steps} 
            icon="👣" 
            change={currentStats.stepsChange} 
            target={dailyGoals.steps?.target || 10000}
            chartData={getStepsData()}
          />
          <StatCard 
            title="Calories Burned" 
            value={currentStats.caloriesBurned} 
            icon="🔥" 
            change={currentStats.caloriesBurnedChange}
            target={dailyGoals.calories?.target || 2500}
            chartData={getCaloriesData()}
          />
          <StatCard 
            title="Active Minutes" 
            value={currentStats.activeMinutes} 
            icon="⏱️" 
            change={currentStats.activeMinutesChange}
            target={dailyGoals.exercise?.target || 60}
            chartData={getActiveData()}
          />
          <StatCard 
            title="Water Intake" 
            value={`${currentStats.waterIntake} cups`} 
            icon="💧" 
            change={currentStats.waterIntakeChange}
            target={dailyGoals.water?.target || 8}
            chartData={getWaterData()}
          />
        </div>

        {/* Weekly Activity (Moved after Today's Stats) */}
        <div className="mb-8">
          <div className={`rounded-xl transition-colors duration-300 ${isDarkMode ? 'bg-[#0B192C]/80 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm shadow-sm p-6`}>
            <ActivityChart data={activity || []} />
          </div>
        </div>
      </section>

      {/* Main content grid - Goals and Nutrition */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <GoalProgress />
        </div>
        <div>
          <div className={`rounded-xl shadow-sm p-6 h-full ${isDarkMode ? 'bg-[#0B192C]/80 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm`}>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-4`}>Nutrition</h3>
            <NutritionChart data={nutritionData ? {
              protein: nutritionData.macros?.protein?.value || 0,
              carbs: nutritionData.macros?.carbs?.value || 0,
              fat: nutritionData.macros?.fat?.value || 0
            } : null} />
          </div>
        </div>
      </section>

      {/* Sleep Quality and Workout History */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <div className={`rounded-xl shadow-sm p-6 h-full ${isDarkMode ? 'bg-[#0B192C]/80 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm`}>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-4`}>Sleep Quality</h3>
            <SleepQualityGraph data={(activity || []).map(day => ({
              date: day?.date || '',
              hours: day?.sleep || Math.floor(Math.random() * 3) + 6,
              quality: day?.sleepQuality || Math.floor(Math.random() * 30) + 70
            }))} isDarkMode={isDarkMode} />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className={`rounded-xl shadow-sm p-6 h-full ${isDarkMode ? 'bg-[#0B192C]/80 border border-[#1E3E62]/50' : 'bg-white'} backdrop-blur-sm`}>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-4`}>Recent Workouts</h3>
            <WorkoutHistoryTable />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
