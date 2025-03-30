/**
 * Generate random data for fitness metrics
 */
export const generateRandomData = () => {
  // Random daily steps between 6000 and 12000
  const steps = Math.floor(Math.random() * 6000) + 6000;
  
  // Random calories burned between 250 and 600
  const caloriesBurned = Math.floor(Math.random() * 350) + 250;
  
  // Random active minutes between 30 and 120
  const activeMinutes = Math.floor(Math.random() * 90) + 30;
  
  // Random water intake between 3 and 8 glasses
  const waterIntake = Math.floor(Math.random() * 6) + 3;
  
  // Random sleep hours between 5.5 and 8.5
  const sleepHours = (Math.floor(Math.random() * 6) + 11) / 2;
  
  // Random sleep quality between 70 and 95
  const sleepQuality = Math.floor(Math.random() * 25) + 70;
  
  // Random workouts completed between 0 and 2
  const workoutsCompleted = Math.floor(Math.random() * 3);
  
  // Random nutrition data
  const nutrition = {
    protein: Math.floor(Math.random() * 60) + 80, // 80-140g
    carbs: Math.floor(Math.random() * 100) + 150, // 150-250g
    fat: Math.floor(Math.random() * 40) + 40, // 40-80g
  };
  
  return {
    steps,
    caloriesBurned,
    activeMinutes,
    waterIntake,
    sleepHours,
    sleepQuality,
    workoutsCompleted,
    nutrition,
    timestamp: new Date().getTime()
  };
};

/**
 * Generate historical data for a week
 */
export const generateWeeklyData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  return days.map((day, index) => {
    // Current day and future days have partial or no data
    const isPastDay = index < dayOfWeek;
    const isToday = index === dayOfWeek;
    
    // Generate more realistic data based on day patterns
    const isWeekend = index >= 5; // Saturday and Sunday
    const baseSteps = isWeekend ? 8000 : 9500; // Generally more active on weekdays
    
    // Random variance factor for each metric
    const variance = Math.random() * 0.4 + 0.8; // 0.8-1.2 multiplier
    
    // Generate date string for the day
    const date = new Date(today);
    date.setDate(today.getDate() - (dayOfWeek - index));
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return {
      label: day,
      date: dateStr,
      // Future days have no data, today has partial data, past days have full data
      value: !isPastDay && !isToday ? 0 : Math.round(baseSteps * variance * (isToday ? 0.7 : 1)),
      sleep: !isPastDay && !isToday ? 0 : (Math.floor(Math.random() * 3) + 14) / 2, // 7-8.5 hours
      sleepQuality: !isPastDay && !isToday ? 0 : Math.floor(Math.random() * 20) + 75, // 75-95%
      calories: !isPastDay && !isToday ? 0 : Math.floor(baseSteps * variance * 0.04), // ~4% of steps
      active: !isPastDay && !isToday ? 0 : Math.floor(baseSteps * variance * 0.005), // ~0.5% of steps
      water: !isPastDay && !isToday ? 0 : Math.floor(Math.random() * 4) + 4, // 4-8 glasses
      distance: !isPastDay && !isToday ? 0 : Math.round(baseSteps * variance * 0.0006 * 10) / 10, // ~0.6m per 1000 steps
    };
  });
};

/**
 * Generate random variation to existing data
 */
export const updateRandomData = (currentData) => {
  // Small variations to current values (±5%)
  const variation = () => (Math.random() * 0.1) - 0.05; // -5% to +5%
  
  return {
    steps: Math.max(0, Math.round(currentData.steps * (1 + variation()))),
    caloriesBurned: Math.max(0, Math.round(currentData.caloriesBurned * (1 + variation()))),
    activeMinutes: Math.max(0, Math.round(currentData.activeMinutes * (1 + variation()))),
    waterIntake: Math.max(0, Math.round(currentData.waterIntake * (1 + variation()))),
    sleepHours: Math.max(0, Math.round(currentData.sleepHours * (1 + variation()) * 10) / 10),
    sleepQuality: Math.min(100, Math.max(0, Math.round(currentData.sleepQuality * (1 + variation())))),
    workoutsCompleted: currentData.workoutsCompleted,
    nutrition: {
      protein: Math.max(0, Math.round(currentData.nutrition.protein * (1 + variation()))),
      carbs: Math.max(0, Math.round(currentData.nutrition.carbs * (1 + variation()))),
      fat: Math.max(0, Math.round(currentData.nutrition.fat * (1 + variation()))),
    },
    timestamp: new Date().getTime()
  };
};
