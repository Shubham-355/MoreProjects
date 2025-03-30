import { useMemo } from 'react';

/**
 * Hook to get theme-specific colors
 * @param {boolean} isDarkMode - Whether dark mode is active
 * @returns {Object} Theme colors object
 */
export const useThemeColors = (isDarkMode) => {
  const colors = useMemo(() => ({
    // Primary colors
    primary: isDarkMode ? '#FF6500' : '#261FB3',
    primaryLight: isDarkMode ? '#FF8533' : '#5C56D4',
    primaryDark: isDarkMode ? '#E55A00' : '#161179',
    
    // Background colors
    background: isDarkMode ? '#050C15' : '#F8F7FF', // Darker background
    backgroundSecondary: isDarkMode ? '#0B192C' : '#FFFFFF',
    card: isDarkMode ? 'rgba(15, 39, 66, 0.8)' : 'rgba(255, 255, 255, 1)', // Darker card
    cardHover: isDarkMode ? 'rgba(30, 62, 98, 0.5)' : 'rgba(248, 247, 255, 1)',
    
    // Text colors
    text: isDarkMode ? '#FFFFFF' : '#0C0950',
    textSecondary: isDarkMode ? '#A0AEC0' : '#4A5568',
    textMuted: isDarkMode ? '#718096' : '#718096',
    
    // Border colors
    border: isDarkMode ? 'rgba(30, 62, 98, 0.5)' : 'rgba(38, 31, 179, 0.2)',
    borderActive: isDarkMode ? '#FF6500' : '#261FB3',
    
    // Status colors
    success: isDarkMode ? '#38A169' : '#38A169',
    warning: isDarkMode ? '#F6AD55' : '#DD6B20',
    error: isDarkMode ? '#E53E3E' : '#C53030',
    info: isDarkMode ? '#4299E1' : '#3182CE',
    
    // Graph colors
    graph: {
      primary: isDarkMode ? '#FF6500' : '#261FB3',
      secondary: isDarkMode ? '#3A6B9F' : '#5C56D4',
      protein: isDarkMode ? '#3B82F6' : '#2563EB',
      carbs: isDarkMode ? '#10B981' : '#059669',
      fat: isDarkMode ? '#F59E0B' : '#D97706',
    }
  }), [isDarkMode]);

  return colors;
};
