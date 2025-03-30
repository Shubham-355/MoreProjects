import { useState, useEffect } from 'react';
import './App.css';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import WorkoutsPage from './pages/WorkoutsPage';
import ChallengesPage from './pages/ChallengesPage';
import AchievementsPage from './pages/AchievementsPage';
import NutritionPage from './pages/NutritionPage';
import SettingsPage from './pages/SettingsPage';
import GoalModal from './components/modals/GoalModal';
import MobileNav from './components/MobileNav';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useLocalStorage } from './hooks/useLocalStorage';
import OnboardingOverlay from './components/OnboardingOverlay';
import ParticleBackground from './components/ParticleBackground';

function MainContent() {
  const { currentPage, isDarkMode } = useDashboard();
  
  // Render the appropriate page component based on currentPage
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'workouts':
        return <WorkoutsPage />;
      case 'challenges':
        return <ChallengesPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'nutrition':
        return <NutritionPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <main className={`flex-1 overflow-y-auto animate-fadeIn pb-16 md:pb-0 px-4 md:px-8 py-6 font-sans ${
      isDarkMode ? 'bg-[#050C15]' : 'bg-[#F8F7FF]'
    } transition-colors duration-300`}>
      {renderPage()}
    </main>
  );
}

function App() {
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', 
    window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [showOnboarding, setShowOnboarding] = useLocalStorage('hasSeenOnboarding', true);
  const [isLoading, setIsLoading] = useState(true);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // This ensures the HTML root element gets the dark class correctly
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    const handleEscKey = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isDarkMode, mobileMenuOpen]);

  const handleAnimationEnded = () => {
    console.log("Animation ended, transitioning to app...");
    // Immediately set loading to false - no delay needed
    setIsLoading(false);
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-screen w-screen ${isDarkMode ? 'bg-black' : 'bg-[#FBE4D6]'}`}>
        <video 
          autoPlay 
          muted 
          playsInline
          loop={false} // Never loop - play once only
          className="w-40 h-40 object-contain" // Reduced from w-64 h-64 to w-40 h-40
          onEnded={handleAnimationEnded}
          ref={(el) => {
            // Set playback rate to speed up the animation significantly
            if (el) {
              el.playbackRate = 6.0; // Increased to 6x speed (double the previous 3x)
            }
          }}
        >
          <source src="/Animation - 1743339629036.webm" type="video/webm" />
        </video>
      </div>
    );
  }

  // If there's an error, show the error fallback UI
  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br ${isDarkMode ? 'from-black to-[#0B192C]' : 'from-[#FBE4D6] to-[#FBE4D6]/80'} p-4 text-center`}>
        <ParticleBackground isDarkMode={isDarkMode} />
        <div className={`${isDarkMode ? 'bg-[#0B192C]/70' : 'bg-[#FBE4D6]/70'} backdrop-blur-lg rounded-lg shadow-2xl p-8 max-w-md ${isDarkMode ? 'border border-[#FF6500]/20' : 'border border-[#261FB3]/20'} animate-slideUp`}>
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'} rounded-full flex items-center justify-center ${isDarkMode ? 'text-[#FF6500]' : 'text-red-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          </div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0C0950]'} mb-3`}>
            Something went wrong
          </h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-[#161179]'} mb-6`}>
            The application encountered an unexpected error. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className={`px-6 py-3 ${isDarkMode ? 'bg-gradient-to-r from-[#FF6500] to-[#FF6500]/80' : 'bg-gradient-to-r from-[#261FB3] to-[#161179]'} text-white rounded-lg shadow-md hover:shadow-lg focus:ring-2 ${isDarkMode ? 'focus:ring-[#FF6500]/50' : 'focus:ring-[#161179]/50'} transition-all duration-300`}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // Wrap the return in try/catch to handle any rendering errors
  try {
    return (
      <ErrorBoundary>
        <DashboardProvider initialTheme={isDarkMode}>
          <div className={`flex h-screen w-screen overflow-hidden font-sans ${isDarkMode ? 'dark bg-[#050C15]' : 'bg-[#F8F7FF]'} transition-colors duration-500 relative`}>
            {/* Particle background with fixed z-index and class */}
            <ParticleBackground isDarkMode={isDarkMode} />
            
            {/* Desktop Sidebar */}
            <div className="hidden md:block relative z-10">
              <Sidebar isDarkMode={isDarkMode} />
            </div>
            
            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-40 md:hidden">
                <div 
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" 
                  onClick={toggleMobileMenu}
                ></div>
                <div className="fixed inset-y-0 left-0 flex flex-col z-50 w-72 transform transition-all duration-300 ease-in-out animate-slideRight">
                  <Sidebar isDarkMode={isDarkMode} />
                </div>
              </div>
            )}
            
            {/* Main Content */}
            <div className={`flex-1 flex flex-col overflow-hidden transition-colors duration-500 relative z-10`}>
              <Header 
                toggleFullScreen={toggleFullScreen} 
                isFullScreen={isFullScreen} 
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
                toggleMobileMenu={toggleMobileMenu}
              />
              
              {/* Main content area with dynamic page rendering */}
              <MainContent />
              
              {/* Mobile Navigation */}
              <div className={`md:hidden ${isDarkMode ? 'bg-[#050C15]/70' : 'bg-[#F8F7FF]/70'} backdrop-blur-md ${isDarkMode ? 'border-t border-[#1E3E62]/50' : 'border-t border-[#261FB3]/20'} shadow-lg z-40`}>
                <MobileNav isDarkMode={isDarkMode} />
              </div>
            </div>
            
            {/* Goal setting modal - wrapped in ErrorBoundary for extra protection */}
            <ErrorBoundary>
              <GoalModal isDarkMode={isDarkMode} />
            </ErrorBoundary>
            
            {/* Onboarding Overlay */}
            {showOnboarding && <OnboardingOverlay onComplete={completeOnboarding} isDarkMode={isDarkMode} />}
          </div>
        </DashboardProvider>
      </ErrorBoundary>
    );
  } catch (err) {
    console.error("Error rendering App:", err);
    setError(err);
    return null;
  }
}

export default App;
