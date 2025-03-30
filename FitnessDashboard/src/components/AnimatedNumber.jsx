import React, { useEffect, useState } from 'react';

const AnimatedNumber = ({ value, duration = 1000, formatter = (val) => val }) => {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    // Skip animation for initial render or when value is reset to 0
    if (value === displayValue || value === 0) return;
    
    let startTime;
    const startValue = displayValue;
    const change = value - startValue;
    
    const animateValue = (timestamp) => {
      if (!startTime) startTime = timestamp;
      
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = progress; // Linear easing
      const currentValue = startValue + (change * easedProgress);
      
      setDisplayValue(Math.round(currentValue));
      
      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };
    
    requestAnimationFrame(animateValue);
  }, [value, duration]);
  
  return <>{formatter(displayValue)}</>;
};

export default AnimatedNumber;
