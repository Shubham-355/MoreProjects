import { useRef, useEffect, useState, memo } from 'react';

// Optimized particle background component using requestAnimationFrame for smooth animations
const ParticleBackground = memo(({ 
  particleCount = 50, 
  color = 'rgba(255, 255, 255, 0.5)', 
  speed = 0.5, 
  size = 2,
  radius = null,
  direction = 'random',
  glowing = false,
  optimized = false
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  // Create observer to only animate when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }
    
    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);
  
  // Update canvas dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = canvasRef.current.parentElement;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Initialize particles
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Calculate particle count based on optimization setting
    let count = optimized ? Math.min(particleCount, 30) : particleCount;
    
    // Create particles with optimized properties
    particlesRef.current = Array.from({ length: count }, () => {
      // Initialize based on direction
      let x, y, vx, vy;
      
      if (radius) {
        // For outward direction from center point
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        
        x = dimensions.width / 2 + Math.cos(angle) * distance;
        y = dimensions.height / 2 + Math.sin(angle) * distance;
        
        if (direction === 'outward') {
          vx = Math.cos(angle) * speed * (0.5 + Math.random());
          vy = Math.sin(angle) * speed * (0.5 + Math.random());
        } else {
          vx = (Math.random() - 0.5) * speed;
          vy = (Math.random() - 0.5) * speed;
        }
      } else if (direction === 'top-right') {
        x = Math.random() * dimensions.width;
        y = Math.random() * dimensions.height;
        vx = (0.1 + Math.random() * 0.4) * speed;
        vy = -(0.1 + Math.random() * 0.4) * speed;
      } else {
        x = Math.random() * dimensions.width;
        y = Math.random() * dimensions.height;
        vx = (Math.random() - 0.5) * speed;
        vy = (Math.random() - 0.5) * speed;
      }
      
      return {
        x,
        y,
        vx,
        vy,
        radius: size * (0.5 + Math.random()),
        color: color,
        alpha: 0.3 + Math.random() * 0.7
      };
    });
    
    // Animation loop with performance optimizations
    const animate = () => {
      if (!isVisible) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary check - wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        if (glowing) {
          // Add glow effect for highlighted particles
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius * 3
          );
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.globalAlpha = particle.alpha * 0.7;
          ctx.fill();
        }
        
        // Regular particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, particleCount, color, speed, size, radius, direction, glowing, optimized, isVisible]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full" 
      style={{ 
        opacity: glowing ? 0.8 : 0.6,
        mixBlendMode: 'screen' 
      }}
    />
  );
});

export default ParticleBackground;
