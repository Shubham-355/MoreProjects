import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 z-0 opacity-30">
      {/* Dynamic circles with different sizes and animations - Enhanced for white theme */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/10 dark:bg-darkPrimary/20 animate-pulse" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 rounded-full bg-secondary/10 dark:bg-darkSecondary/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-accent/10 dark:bg-darkPrimary/15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Subtle pattern overlay for texture in light mode */}
      {theme === 'light' && (
        <div className="absolute inset-0 opacity-5" 
             style={{ 
               backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
               backgroundSize: '20px 20px'
             }}>
        </div>
      )}
      
      {/* Gradient overlay - Softer for light theme */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        theme === 'light' 
          ? 'from-transparent via-background/30 to-transparent'
          : 'from-transparent via-darkBackground/40 to-transparent'
      } animate-gradientMove`}></div>
      
      {/* Moving dots - Softer colors for light theme */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i}
          className={`absolute rounded-full ${
            theme === 'light'
              ? i % 3 === 0 ? 'bg-primary/20' : i % 3 === 1 ? 'bg-secondary/20' : 'bg-accent/20'
              : 'bg-darkPrimary/30'
          } animate-pulse`}
          style={{
            width: Math.random() * 8 + 4 + 'px',
            height: Math.random() * 8 + 4 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDuration: Math.random() * 8 + 8 + 's',
            animationDelay: Math.random() * 5 + 's'
          }}
        ></div>
      ))}
      
      {/* Light effect - More subtle in light mode */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial ${
        theme === 'light'
          ? 'from-primary/3 to-transparent'
          : 'from-darkPrimary/5 to-transparent'
      } opacity-70`}></div>
    </div>
  );
};

export default AnimatedBackground;
