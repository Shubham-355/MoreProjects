import { useState, useEffect, useRef } from 'react';
import { useDashboard } from '../context/DashboardContext';

// Enhanced particle implementation with error handling for radius
function ParticleBackground({ isDarkMode }) {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Create particles state
  const particles = useRef([]);
  const animationFrameId = useRef(null);
  
  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const updateDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };
    
    // Initial dimensions
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Initialize more particles and with larger sizes for better visibility
    particles.current = Array(80).fill().map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1.5, // Ensure minimum size is larger to avoid negative radius errors
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.7 + 0.3
    }));
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Animation effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particlesArray = particles.current;
    
    // Connection line function with safety checks
    const connect = () => {
      const maxDistance = 170;
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance && distance > 0) { // Added check for distance > 0
            // Calculate opacity based on distance with higher minimum
            const opacity = (1 - distance / maxDistance) * 0.5;
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode 
              ? `rgba(255, 101, 0, ${opacity})` // Orange
              : `rgba(38, 31, 179, ${opacity})`; // Blue
            ctx.lineWidth = 1.2;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop with safety checks
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles with safety checks
      for (let i = 0; i < particlesArray.length; i++) {
        // Update position
        particlesArray[i].x += particlesArray[i].speedX;
        particlesArray[i].y += particlesArray[i].speedY;
        
        // Bounce off edges
        if (particlesArray[i].x < 0 || particlesArray[i].x > canvas.width) {
          particlesArray[i].speedX *= -1;
        }
        if (particlesArray[i].y < 0 || particlesArray[i].y > canvas.height) {
          particlesArray[i].speedY *= -1;
        }
        
        // Ensure size is positive
        const size = Math.max(particlesArray[i].size, 1);
        
        // Draw particle with error handling
        try {
          ctx.beginPath();
          ctx.arc(
            particlesArray[i].x, 
            particlesArray[i].y, 
            size, 
            0, 
            Math.PI * 2
          );
          
          // Set particle color based on theme
          const particleColor = isDarkMode 
            ? `rgba(255, 101, 0, ${particlesArray[i].opacity})` // Orange
            : `rgba(38, 31, 179, ${particlesArray[i].opacity})`; // Blue
          
          ctx.fillStyle = particleColor;
          ctx.fill();
          
          // Add subtle pulse animation to some particles
          if (i % 5 === 0) {
            const pulseSize = size + Math.sin(Date.now() * 0.003) * 2;
            if (pulseSize > 0) { // Safety check
              ctx.beginPath();
              ctx.arc(
                particlesArray[i].x, 
                particlesArray[i].y, 
                pulseSize,
                0,
                Math.PI * 2
              );
              ctx.fillStyle = isDarkMode 
                ? `rgba(255, 101, 0, ${particlesArray[i].opacity * 0.3})` // Orange with lower opacity
                : `rgba(38, 31, 179, ${particlesArray[i].opacity * 0.3})`; // Blue with lower opacity
              ctx.fill();
            }
          }
        } catch (error) {
          console.error("Canvas drawing error:", error);
          // If there's an error, reset this particle
          particlesArray[i].size = Math.random() * 3 + 1.5;
        }
      }
      
      // Draw connections
      connect();
      
      // Continue animation
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup on unmount
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isDarkMode, dimensions]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1] bg-transparent pointer-events-none"
      style={{ 
        background: isDarkMode 
          ? 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.92), rgba(11, 25, 44, 0.94))' // Black to Navy
          : 'linear-gradient(to bottom right, rgba(251, 228, 214, 0.7), rgba(251, 228, 214, 0.9))' // Beige/Peach gradient
      }}
    />
  );
}

export default ParticleBackground;
