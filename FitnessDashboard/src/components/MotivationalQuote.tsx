import React, { useState, useEffect, memo, useCallback, useRef } from 'react';

// Pre-defined quotes for better startup performance
const quotes = [
  "The only bad workout is the one that didn't happen.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "The difference between try and triumph is a little umph.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Your health is an investment, not an expense.",
  "Take care of your body. It's the only place you have to live.",
];

// Optimized for minimal repaints
const MotivationalQuote: React.FC = memo(() => {
  const [quote, setQuote] = useState(quotes[0]);
  const [isChanging, setIsChanging] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  
  // Get a different quote
  const getRandomQuote = useCallback(() => {
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (quotes[newIndex] === quote && quotes.length > 1);
    return quotes[newIndex];
  }, [quote]);
  
  // Change quote with minimal animations
  const changeQuote = useCallback(() => {
    if (isChanging) return;
    
    setIsChanging(true);
    
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    timeoutRef.current = window.setTimeout(() => {
      setQuote(getRandomQuote());
      setIsChanging(false);
    }, 300) as unknown as number;
  }, [isChanging, getRandomQuote]);
  
  // Setup initial quote and rotation
  useEffect(() => {
    // Set initial quote
    if (quote === quotes[0]) {
      setQuote(getRandomQuote());
    }
    
    // Refresh quote periodically (60 seconds)
    const interval = window.setInterval(changeQuote, 60000);
    
    return () => {
      window.clearInterval(interval);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [changeQuote, getRandomQuote, quote]);
  
  return (
    <div className="bg-white dark:bg-darkBackground-light shadow-sm border border-gray-100 dark:border-gray-700/50 rounded-md p-3 text-center contain-paint">
      {/* Quote text */}
      <blockquote className={`text-sm font-medium text-primary-dark dark:text-darkText transition-opacity duration-300 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
        <p>"{quote}"</p>
      </blockquote>
      
      {/* Button */}
      <div className="mt-2">
        <button 
          onClick={changeQuote} 
          className="bg-gray-50 dark:bg-darkBackground-dark hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-0.5 rounded text-xs font-medium text-primary dark:text-darkPrimary transition-colors duration-150"
          aria-label="Show new motivational quote"
          disabled={isChanging}
        >
          New Inspiration
        </button>
      </div>
    </div>
  );
});

MotivationalQuote.displayName = 'MotivationalQuote';
export default MotivationalQuote;
