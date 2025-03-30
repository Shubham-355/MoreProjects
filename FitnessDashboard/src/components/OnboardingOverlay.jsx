import { useState } from 'react';

const OnboardingOverlay = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl max-w-lg w-11/12 p-6 md:p-8 shadow-2xl border border-white/20 dark:border-gray-700/30 scale-in">
        <div className="absolute -top-12 right-0 left-0 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-900">
            <span className="text-4xl">
              {step === 1 ? '👋' : step === 2 ? '📊' : '🎯'}
            </span>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {step === 1 ? 'Welcome to FitTrackPro!' : 
             step === 2 ? 'Track Your Progress' : 
             'Set Your Fitness Goals'}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {step === 1 ? 'Your personal fitness dashboard to track your workouts, nutrition, and health metrics in one place.' : 
             step === 2 ? 'Monitor your steps, calories, active minutes, and more with beautiful visualizations and insights.' : 
             'Set customized goals for steps, calories, water intake, and workouts to keep yourself motivated.'}
          </p>
          
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  i + 1 === step ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                Back
              </button>
            )}
            
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              {step < totalSteps ? 'Next' : 'Get Started'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingOverlay;
