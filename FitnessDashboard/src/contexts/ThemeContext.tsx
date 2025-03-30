import React, { createContext, useState, useContext, useEffect, useCallback, useMemo, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Get theme from localStorage only once during initialization
  const getInitialTheme = (): Theme => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        return storedTheme;
      }
      
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'light'; // Default for SSR
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  
  // Memoize isDarkMode to prevent unnecessary calculations
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);

  // Memoized toggle function
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  // Apply theme class to html element - run only when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // Memoize context value to prevent recreating the object on every render
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    isDarkMode,
  }), [theme, toggleTheme, isDarkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Optimized hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
