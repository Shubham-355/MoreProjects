import React, { memo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Micro-optimized theme toggle with minimal rendering impact
const ThemeToggle: React.FC = memo(() => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-darkBackground hover:bg-gray-50 dark:hover:bg-darkBackground-light focus:outline-none"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Single SVG with conditional path rendering for better performance */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor"
        className="h-4 w-4 text-primary-dark dark:text-darkPrimary transform translate-z-0"
        aria-hidden="true"
      >
        {isDark ? (
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        ) : (
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        )}
      </svg>
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
export default ThemeToggle;
