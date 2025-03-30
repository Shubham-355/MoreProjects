export const userData = {
  name: "Alex Johnson",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&auto=format&fit=crop&q=60",
  weight: 165, // in lbs
  height: 175, // in cm
  age: 32,
  level: "Intermediate",
  streak: 14, // consecutive days active
  totalPoints: 1250,
  dailyGoals: {
    steps: 10000,
    calories: 2500,
    water: 8, // in cups
    sleep: 8, // in hours
    exercise: 45, // in minutes
  }
};

export const activityData = [
  { day: 'Mon', steps: 8245, calories: 420, active: 35, water: 6, sleep: 7.2 },
  { day: 'Tue', steps: 7500, calories: 350, active: 30, water: 5, sleep: 6.8 },
  { day: 'Wed', steps: 9800, calories: 510, active: 45, water: 7, sleep: 7.5 },
  { day: 'Thu', steps: 6300, calories: 310, active: 25, water: 4, sleep: 6.5 },
  { day: 'Fri', steps: 11200, calories: 590, active: 55, water: 8, sleep: 8.0 },
  { day: 'Sat', steps: 13500, calories: 680, active: 70, water: 9, sleep: 8.5 },
  { day: 'Sun', steps: 6700, calories: 330, active: 28, water: 6, sleep: 7.8 },
];

export const monthlyActivity = [
  { week: 'Week 1', avgSteps: 8500, avgCalories: 450, avgActive: 40, totalWorkouts: 4 },
  { week: 'Week 2', avgSteps: 9200, avgCalories: 480, avgActive: 45, totalWorkouts: 5 },
  { week: 'Week 3', avgSteps: 7800, avgCalories: 400, avgActive: 35, totalWorkouts: 3 },
  { week: 'Week 4', avgSteps: 10500, avgCalories: 520, avgActive: 50, totalWorkouts: 6 },
];

export const workouts = [
  { 
    id: 1, 
    name: "Morning Run", 
    type: "Cardio", 
    duration: 45, 
    calories: 320, 
    date: "2025-03-20",
    details: {
      distance: 5.2, // km
      pace: "5:30", // min/km
      heartRate: 142, // avg bpm
      elevationGain: 78 // meters
    } 
  },
  { 
    id: 2, 
    name: "Strength Training", 
    type: "Strength", 
    duration: 60, 
    calories: 280, 
    date: "2025-03-21",
    details: {
      sets: 4,
      reps: 12,
      weight: 65, // kg total
      muscleGroups: ["Chest", "Back", "Arms"]
    } 
  },
  { 
    id: 3, 
    name: "Yoga Session", 
    type: "Flexibility", 
    duration: 30, 
    calories: 150, 
    date: "2025-03-22",
    details: {
      intensity: "Medium",
      focus: "Core and Balance",
      poses: 15
    } 
  },
  { 
    id: 4, 
    name: "Cycling", 
    type: "Cardio", 
    duration: 50, 
    calories: 400, 
    date: "2025-03-24",
    details: {
      distance: 15, // km
      pace: "18", // km/h
      heartRate: 155, // avg bpm
      elevationGain: 210 // meters
    } 
  },
  { 
    id: 5, 
    name: "HIIT Workout", 
    type: "Interval", 
    duration: 25, 
    calories: 350, 
    date: "2025-03-25",
    details: {
      rounds: 5,
      workInterval: 40, // seconds
      restInterval: 20, // seconds
      exercises: ["Burpees", "Squats", "Push-ups", "Mountain Climbers"]
    } 
  },
];

export const achievements = [
  { 
    id: 1, 
    title: "Early Bird", 
    description: "Complete 5 workouts before 8am", 
    icon: "🌅", 
    completed: true,
    date: "2025-03-15", 
    points: 50
  },
  { 
    id: 2, 
    title: "Marathon Master", 
    description: "Run 100 miles total", 
    icon: "🏃", 
    completed: false, 
    progress: 68,
    points: 100
  },
  { 
    id: 3, 
    title: "Weight Warrior", 
    description: "Lift 1000kg in a single session", 
    icon: "💪", 
    completed: true,
    date: "2025-03-08",
    points: 75
  },
  { 
    id: 4, 
    title: "Step Champion", 
    description: "Reach 10,000 steps for 7 days in a row", 
    icon: "👣", 
    completed: false, 
    progress: 5,
    points: 80
  },
  { 
    id: 5, 
    title: "Hydration Hero", 
    description: "Drink 8 cups of water daily for 30 days", 
    icon: "💧", 
    completed: false, 
    progress: 22,
    points: 60
  },
  { 
    id: 6, 
    title: "Consistency King", 
    description: "Work out 4 times per week for a month", 
    icon: "👑", 
    completed: false, 
    progress: 75,
    points: 120
  },
];

export const challenges = [
  { 
    id: 1, 
    title: "30-Day Push-up Challenge", 
    description: "Do push-ups every day for 30 days", 
    participants: 245, 
    daysLeft: 12,
    difficulty: "Medium",
    reward: "75 points"
  },
  { 
    id: 2, 
    title: "10K Step Challenge", 
    description: "Complete 10,000 steps daily for a week", 
    participants: 518, 
    daysLeft: 3,
    difficulty: "Easy",
    reward: "50 points"
  },
  { 
    id: 3, 
    title: "Veggie Boost", 
    description: "Eat 5 servings of vegetables daily", 
    participants: 132, 
    daysLeft: 5,
    difficulty: "Medium",
    reward: "40 points"
  },
  { 
    id: 4, 
    title: "Cardio Champion", 
    description: "Burn 5000 calories through cardio this week", 
    participants: 321, 
    daysLeft: 4,
    difficulty: "Hard",
    reward: "100 points"
  },
];

export const weeklyProgress = {
  steps: { current: 52000, goal: 70000 },
  calories: { current: 2200, goal: 2500 },
  workouts: { current: 3, goal: 5 },
  water: { current: 42, goal: 56 },
  sleep: { current: 51, goal: 56 }, // hours
  active: { current: 240, goal: 300 }, // minutes
};

export const upcomingWorkouts = [
  {
    id: 1,
    name: "HIIT Training",
    trainer: "Emma Davis",
    time: "07:30 AM",
    date: "Tomorrow",
    duration: 45,
    intensity: "High"
  },
  {
    id: 2,
    name: "Yoga Flow",
    trainer: "Michael Chen",
    time: "06:00 PM",
    date: "Thursday",
    duration: 60,
    intensity: "Medium"
  }
];

export const nutritionData = {
  calories: { consumed: 1850, burned: 2200, goal: 2000 },
  macros: {
    protein: { value: 95, goal: 120, unit: "g" },
    carbs: { value: 210, goal: 250, unit: "g" },
    fat: { value: 60, goal: 65, unit: "g" }
  },
  meals: [
    { name: "Breakfast", calories: 420, time: "07:30 AM", items: ["Oatmeal", "Banana", "Protein Shake"] },
    { name: "Lunch", calories: 650, time: "12:15 PM", items: ["Chicken Salad", "Whole Grain Bread", "Apple"] },
    { name: "Snack", calories: 180, time: "03:30 PM", items: ["Greek Yogurt", "Blueberries", "Almonds"] },
    { name: "Dinner", calories: 580, time: "07:00 PM", items: ["Salmon", "Quinoa", "Roasted Vegetables"] }
  ]
};
