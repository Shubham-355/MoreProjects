import React, { Suspense, lazy, memo, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';

// Eagerly load ThemeToggle to prevent UI jumps
import ThemeToggle from './components/ThemeToggle';

// Lazy-load components
const MotivationalQuote = lazy(() => import('./components/MotivationalQuote'));
const ExampleCard = lazy(() => import('./components/ExampleCard'));
const ProgressBadge = lazy(() => import('./components/ProgressBadge'));
const ActivityTrends = lazy(() => import('./components/ActivityTrends'));
const RecentWorkouts = lazy(() => import('./components/RecentWorkouts'));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="w-full h-24 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary/20 dark:border-darkPrimary/20 border-t-primary dark:border-t-darkPrimary rounded-full animate-spin"></div>
  </div>
);

// Header optimized for scroll performance
const Header = memo(() => {
  // Force GPU rasterization
  useEffect(() => {
    const header = document.getElementById('main-header');
    if (header) {
      header.style.transform = 'translateZ(0)';
      header.style.willChange = 'transform';
    }
  }, []);

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white dark:bg-darkBackground-light shadow-sm py-2.5 px-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
      <h1 className="text-lg font-bold text-primary-dark dark:text-darkPrimary">
        Fitness Dashboard
      </h1>
      <ThemeToggle />
    </header>
  );
});
Header.displayName = 'Header';

// Section header with optimized sticky behavior
const SectionHeader = memo(({ id, title, color = "bg-primary dark:bg-darkPrimary" }: { id: string, title: string, color?: string }) => (
  <div className="section-header sticky top-[41px] z-20 bg-background dark:bg-darkBackground py-2 flex items-center" id={`section-header-${id}`}>
    <div className={`w-1 h-5 ${color} rounded-full mr-2`}></div>
    <h2 id={id} className="text-base font-semibold text-primary-dark dark:text-darkPrimary">{title}</h2>
  </div>
));
SectionHeader.displayName = 'SectionHeader';

function App() {
  // Apply scroll optimization
  useEffect(() => {
    // Add passive event listeners to improve scroll performance
    const options = { passive: true };
    document.addEventListener('touchstart', () => {}, options);
    document.addEventListener('touchmove', () => {}, options);
    document.addEventListener('wheel', () => {}, options);
    
    // Optimize header on scroll
    const mainHeader = document.getElementById('main-header');
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    const optimizeOnScroll = () => {
      if (window.scrollY > 10 && mainHeader) {
        mainHeader.classList.add('shadow-md');
      } else if (mainHeader) {
        mainHeader.classList.remove('shadow-md');
      }
    };
    
    window.addEventListener('scroll', optimizeOnScroll, options);
    
    return () => {
      window.removeEventListener('scroll', optimizeOnScroll);
      document.removeEventListener('touchstart', () => {});
      document.removeEventListener('touchmove', () => {});
      document.removeEventListener('wheel', () => {});
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background dark:bg-darkBackground text-text dark:text-darkText">
        <Header />
        
        <main className="max-w-5xl mx-auto px-3 pb-6 contain-paint">
          <Suspense fallback={<LoadingFallback />}>
            <section className="py-3 max-w-lg mx-auto">
              <MotivationalQuote />
            </section>
            
            {/* Activity Trends Section */}
            <section className="py-2" aria-labelledby="activity-section">
              <SectionHeader id="activity-section" title="Activity Trends" color="bg-secondary dark:bg-darkSecondary" />
              <div className="mt-2">
                <ActivityTrends />
              </div>
            </section>

            {/* Recent Workouts Section */}
            <section className="py-2" aria-labelledby="workouts-section">
              <SectionHeader id="workouts-section" title="Recent Workouts" color="bg-accent dark:bg-darkPrimary" />
              <div className="mt-2">
                <RecentWorkouts />
              </div>
            </section>
            
            <section className="py-2" aria-labelledby="features-section">
              <SectionHeader id="features-section" title="Features" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                <ExampleCard 
                  title="Daily Activity" 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>}
                >
                  <p>Track your daily fitness activities and progress.</p>
                </ExampleCard>
                
                <ExampleCard 
                  title="Workout Plans" 
                  accentColor="from-secondary to-accent dark:from-darkSecondary to-darkPrimary"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                  </svg>}
                >
                  <p>Personalized workout plans to achieve your fitness goals.</p>
                </ExampleCard>
                
                <ExampleCard 
                  title="Nutrition Tips"
                  accentColor="from-accent to-secondary dark:from-darkPrimary to-darkSecondary"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>}
                >
                  <p>Expert nutrition advice to complement your fitness routine.</p>
                </ExampleCard>
              </div>
            </section>
            
            <section className="py-2 mt-2" aria-labelledby="progress-section">
              <SectionHeader id="progress-section" title="Your Progress" color="bg-accent dark:bg-darkPrimary" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <ProgressBadge 
                  title="Running Goal" 
                  progress={75} 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v1.586l-1.293-1.293a1 1 0 00-1.414 1.414L8.586 8H7a1 1 0 000 2h1.586l-2.293 2.293a1 1 0 101.414 1.414L10 11.414V13a1 1 0 102 0v-1.586l2.293 2.293a1 1 0 001.414-1.414L13.414 10H15a1 1 0 000-2h-1.586l2.293-2.293a1 1 0 00-1.414-1.414L12 6.586V5a1 1 0 00-1-1h-1z" clipRule="evenodd" />
                  </svg>}
                />
                
                <ProgressBadge 
                  title="Weight Goal" 
                  progress={50} 
                  color="from-accent to-secondary dark:from-darkPrimary to-darkSecondary"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
                  </svg>}
                />
              </div>
            </section>
          </Suspense>
        </main>
        
        <footer className="bg-white dark:bg-darkBackground border-t border-gray-200 dark:border-gray-700/30 py-3 px-4 text-center text-xs text-text dark:text-darkText-light">
          <p>Stay healthy, stay happy! 💪</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;