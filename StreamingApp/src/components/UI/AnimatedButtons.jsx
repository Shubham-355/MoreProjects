import { useState, useRef, useEffect } from 'react';

// Pulse button for notifications or alerts - Enhanced with liquid animation
export function PulseButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-md overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/30 ${className}`}
    >
      <span className="relative z-10 font-medium">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/70 to-fuchsia-500/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
      <span className="absolute inset-0 bg-white opacity-30 animate-ping-slow rounded-full -translate-x-full -translate-y-full transform-gpu blur-xl w-2/3 h-2/3"></span>
      <span className="absolute inset-0 bg-white opacity-30 animate-ping-slow rounded-full translate-x-full translate-y-full delay-200 transform-gpu blur-xl w-2/3 h-2/3"></span>
    </button>
  );
}

// Gradient shift button for primary actions - Enhanced with shimmer effect
export function GradientButton({ children, onClick, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative px-6 py-3 font-medium text-white rounded-md transition-all duration-500 
                 overflow-hidden transform hover:scale-105 active:scale-95 
                 hover:shadow-xl hover:shadow-purple-500/20 ${className}`}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-700 group-hover:from-purple-600 group-hover:via-fuchsia-600 group-hover:to-indigo-600 transition-all duration-500"></div>
      
      {/* Shimmer effect */}
      <div className={`absolute inset-0 opacity-0 ${isHovered ? 'opacity-20' : ''} transition-opacity duration-1000`}>
        <div className="absolute inset-0 translate-x-full transform-gpu bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
      </div>
      
      {/* Text content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        <span>{children}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-0 w-0 group-hover:h-4 group-hover:w-4 transition-all duration-300 transform ${isHovered ? 'translate-x-1' : 'translate-x-0'}`}
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </button>
  );
}

// Jiggle button for playful interactions - Enhanced with fun 3D effect
export function JiggleButton({ children, onClick, className = "" }) {
  const [isJiggling, setIsJiggling] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  
  const handleMouseEnter = () => {
    setIsJiggling(true);
  };
  
  const handleMouseLeave = () => {
    setIsJiggling(false);
    setIsPressing(false);
  };
  
  const handleMouseDown = () => {
    setIsPressing(true);
  };
  
  const handleMouseUp = () => {
    setIsPressing(false);
  };
  
  const handleClick = (e) => {
    setIsJiggling(false);
    if (onClick) onClick(e);
    
    // Create a fun pop animation after click
    setTimeout(() => {
      setIsJiggling(true);
      setTimeout(() => setIsJiggling(false), 500);
    }, 50);
  };
  
  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`relative px-6 py-3 bg-gradient-to-br from-green-500 to-emerald-600 text-white font-medium rounded-md
                transition-all duration-300 shadow-lg 
                ${isJiggling ? 'animate-jiggle' : ''} 
                ${isPressing ? 'shadow-inner scale-95' : 'shadow-green-500/30 hover:shadow-green-500/50'} ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: isPressing ? 'translateY(2px)' : 'translateY(0)',
      }}
    >
      <div className="flex items-center justify-center space-x-2 relative z-10">
        <span>{children}</span>
        <span className={`transform transition-all duration-300 ${isJiggling ? 'rotate-12' : 'rotate-0'}`}>✨</span>
      </div>
      
      {/* 3D bottom layer for depth effect */}
      <div 
        className="absolute inset-0 bg-green-700 rounded-md -z-10"
        style={{ 
          transform: 'translateZ(-4px) translateY(4px)',
          opacity: isPressing ? 0 : 1,
          transition: 'opacity 0.2s ease'
        }}
      ></div>
    </button>
  );
}

// Ripple effect button for secondary actions - Enhanced with more liquid ripples
export function RippleButton({ children, onClick, className = "" }) {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);
  
  const handleClick = (e) => {
    if (!buttonRef.current) return;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(buttonRect.width, buttonRect.height) * 2;
    const x = e.clientX - buttonRect.left - size / 2;
    const y = e.clientY - buttonRect.top - size / 2;
    
    // Create multiple ripples for a more dramatic effect
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    };
    
    // Add the main ripple
    setRipples(prev => [...prev, newRipple]);
    
    // Add 3 smaller, faster ripples with slight offsets for a more dynamic effect
    for (let i = 1; i <= 3; i++) {
      setTimeout(() => {
        const smallerRipple = {
          id: Date.now() + i,
          x: x + (Math.random() * 20 - 10),
          y: y + (Math.random() * 20 - 10),
          size: size * 0.7,
          fast: true
        };
        setRipples(prev => [...prev, smallerRipple]);
      }, i * 50);
    }
    
    // Clean up ripples after animation
    setTimeout(() => {
      setRipples(prevRipples => prevRipples.filter(r => r.id !== newRipple.id));
    }, 1200);
    
    if (onClick) onClick(e);
  };
  
  // Cleanup ripples on unmount
  useEffect(() => {
    return () => {
      setRipples([]);
    };
  }, []);
  
  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`relative px-6 py-3 bg-gradient-to-br from-cyan-600 to-blue-700 text-white font-medium rounded-md 
                overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 ${className}`}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className={`absolute rounded-full bg-white opacity-30 ${ripple.fast ? 'animate-ripple-fast' : 'animate-ripple'}`}
          style={{
            left: ripple.x + 'px',
            top: ripple.y + 'px',
            width: ripple.size + 'px',
            height: ripple.size + 'px'
          }}
        ></span>
      ))}
      <span className="relative z-10 flex items-center">
        <span className="mr-2">{children}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 transform transition-transform group-hover:scale-110" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    </button>
  );
}

// Shake button for error or warning actions - Enhanced with warning effect
export function ShakeButton({ children, onClick, isShaking = false, className = "" }) {
  const [localShaking, setLocalShaking] = useState(false);
  
  // Combine controlled and local shaking state
  const shouldShake = isShaking || localShaking;
  
  const handleClick = (e) => {
    setLocalShaking(true);
    setTimeout(() => setLocalShaking(false), 500);
    if (onClick) onClick(e);
  };
  
  return (
    <button
      onClick={handleClick}
      className={`group relative px-6 py-3 bg-gradient-to-r from-red-600 to-rose-700 text-white font-medium rounded-md 
                transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 ${shouldShake ? 'animate-shake' : ''} ${className}`}
    >
      {/* Warning zigzag line */}
      <div className="absolute -top-2 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 100 10" className="w-full overflow-visible">
          <path d="M0,5 C20,15 35,-5 55,5 C75,15 85,-5 100,5" fill="none" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2" className="animate-wave">
          </path>
        </svg>
      </div>
      
      <div className="flex items-center justify-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>{children}</span>
      </div>
    </button>
  );
}

// Bounce button for confirmations or success actions - Enhanced with springing effect
export function BounceButton({ children, onClick, className = "" }) {
  const [isBouncing, setIsBouncing] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  
  const handleClick = (e) => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 1000);
    if (onClick) onClick(e);
  };
  
  return (
    <button
      onClick={handleClick}
      onMouseDown={() => setIsPressing(true)}
      onMouseUp={() => setIsPressing(false)}
      onMouseLeave={() => setIsPressing(false)}
      className={`group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-md 
                transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 
                ${isBouncing ? 'animate-bounce-spring' : ''} 
                ${isPressing ? 'scale-95' : 'scale-100'} ${className}`}
    >
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isBouncing ? 'scale-110' : 'scale-100'}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span>{children}</span>
      </div>
      
      {/* Success particles that appear on click */}
      {isBouncing && (
        <>
          <span className="absolute -top-2 -right-2 w-3 h-3 bg-green-300 rounded-full animate-success-particle-1"></span>
          <span className="absolute -top-2 -left-2 w-2 h-2 bg-green-300 rounded-full animate-success-particle-2"></span>
          <span className="absolute -bottom-2 -right-2 w-2 h-2 bg-green-300 rounded-full animate-success-particle-3"></span>
          <span className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-300 rounded-full animate-success-particle-4"></span>
        </>
      )}
      
      {/* Bottom cutout for 3D effect */}
      <div className="absolute inset-0 rounded-md overflow-hidden">
        <div className={`absolute inset-x-0 bottom-0 h-1 bg-black/20 transform transition-all ${isPressing ? 'translate-y-full' : ''}`}></div>
      </div>
    </button>
  );
}

// Glow button for highlighting important actions - Enhanced with particle effect
export function GlowButton({ children, onClick, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000);
    if (onClick) onClick(e);
  };
  
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-medium rounded-md 
                overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/40 
                ${isClicked ? 'animate-pulse-once' : ''} ${className}`}
    >
      {/* Main glow effect */}
      <span className={`absolute inset-0 rounded-md bg-gradient-to-br from-indigo-400 to-purple-500 opacity-0
                      transition-opacity duration-500 blur-xl ${isHovered ? 'opacity-60' : ''}`}></span>
      
      {/* More dramatic glow on click */}
      <span className={`absolute inset-0 rounded-md bg-gradient-to-br from-white to-indigo-300 opacity-0
                      transition-opacity duration-300 blur-xl ${isClicked ? 'opacity-60 animate-pulse-quick' : ''}`}></span>
      
      {/* Moving particles for dynamic effect */}
      <div className="absolute inset-0 overflow-hidden rounded-md">
        {isHovered && Array.from({ length: 6 }).map((_, i) => (
          <span 
            key={i}
            className={`absolute bg-white/70 rounded-full blur-sm animate-float-particle`}
            style={{ 
              width: `${Math.random() * 8 + 4}px`, 
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></span>
        ))}
      </div>
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        <span className={`transition-transform duration-300 ${isClicked ? 'scale-110' : 'scale-100'}`}>{children}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    </button>
  );
}

// Magnetic button for important UI elements
export function MagneticButton({ children, onClick, className = "" }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!buttonRef.current || !isHovered) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (normalized)
    const distX = (e.clientX - centerX) / (rect.width / 2) * 12; // Max 12px movement
    const distY = (e.clientY - centerY) / (rect.height / 2) * 8; // Max 8px movement
    
    setPosition({ x: distX, y: distY });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      className={`relative px-6 py-3 bg-gradient-to-br from-pink-600 to-red-600 text-white font-medium rounded-md
                transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 overflow-hidden ${className}`}
      style={{
        transform: isHovered ? `translate(${position.x}px, ${position.y}px)` : 'translate(0, 0)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
      }}
    >
      {/* Background shift effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-pink-600 to-red-600 opacity-90 transition-opacity duration-300"
        style={{
          transform: isHovered ? `translate(${-position.x/3}px, ${-position.y/3}px)` : 'translate(0, 0)',
          transition: 'transform 0.2s ease-out'
        }}
      ></div>
      
      {/* Glow effect */}
      {isHovered && (
        <div 
          className="absolute inset-0 bg-white opacity-10 rounded-full blur-xl"
          style={{
            left: `calc(50% + ${position.x}px)`,
            top: `calc(50% + ${position.y}px)`,
            width: '60%',
            height: '60%',
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
      )}
      
      {/* Text content */}
      <span className="relative z-10 flex items-center">
        <span className="mr-2">{children}</span>
        <span className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>⭐</span>
      </span>
    </button>
  );
}

// Neon Button for dark mode interfaces
export function NeonButton({ children, onClick, color = "purple", className = "" }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Color theme mapping
  const colorMap = {
    purple: { base: "purple-600", light: "purple-400", dark: "purple-800" },
    blue: { base: "blue-600", light: "blue-400", dark: "blue-800" },
    green: { base: "green-600", light: "green-400", dark: "green-800" },
    red: { base: "red-600", light: "red-400", dark: "red-800" },
    pink: { base: "pink-600", light: "pink-400", dark: "pink-800" },
  };
  
  const colorTheme = colorMap[color] || colorMap.purple;
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative px-6 py-3 bg-black font-medium rounded-md text-${colorTheme.light}
               border-2 border-${colorTheme.base} transition-all duration-500 ${className}`}
      style={{ boxShadow: isHovered ? `0 0 15px 2px var(--tw-color-${colorTheme.base})` : 'none' }}
    >
      {/* Text glow effect */}
      <span className={`relative z-10 transition-all duration-300 ${isHovered ? `text-white drop-shadow-[0_0_8px_var(--tw-color-${colorTheme.light})]` : ''}`}>
        {children}
      </span>
      
      {/* Hover background glow */}
      <span className={`absolute inset-0 rounded-md bg-${colorTheme.base}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></span>
      
      {/* Border glow pulse effect */}
      <span className={`absolute -inset-0.5 rounded-md opacity-0 ${isHovered ? 'opacity-50 animate-pulse-slow' : ''} transition-opacity duration-300`}
        style={{ boxShadow: `0 0 15px 2px var(--tw-color-${colorTheme.light})` }}
      ></span>
    </button>
  );
}
