/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'twitch-purple': '#9146FF',
        'twitch-dark': '#0E0E10',
        'twitch-light': '#18181B',
        'twitch-lighter': '#1F1F23',
        'twitch-gray': '#ADADB8',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'pulse-slow': 'pulse 3s infinite',
        'fadeIn': 'fadeIn 0.2s ease-in forwards',
        'fadeOut': 'fadeOut 0.2s ease-out forwards',
        'slideIn': 'slideIn 0.3s ease-out forwards',
        'slideOut': 'slideOut 0.3s ease-in forwards',
        'pulse-once': 'pulse 2s ease-in-out 1',
        'pulse-quick': 'pulse 1s ease-in-out 3',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'jiggle': 'jiggle 0.3s ease-in-out',
        'shake': 'shake 0.3s cubic-bezier(.36,.07,.19,.97) both',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ripple': 'ripple 0.8s linear forwards',
        'ripple-fast': 'ripple 0.6s linear forwards',
        'carousel': 'carousel 16s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'scale-up': 'scaleUp 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'slide-left': 'slideLeft 0.3s ease-out forwards',
        'slide-right': 'slideRight 0.3s ease-out forwards', 
        'bounce-soft': 'bounceSoft 1s infinite',
        'bounce-spring': 'bounceSpring 1.5s cubic-bezier(0.280, 0.840, 0.420, 1) 1',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'rotate-slow': 'rotate 15s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blur-in': 'blurIn 0.4s ease-out forwards',
        'gradient-x': 'gradient-x 10s ease infinite',
        'border-roam': 'borderRoam 2.5s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'success-particle-1': 'successParticle1 1s ease-out forwards',
        'success-particle-2': 'successParticle2 1s ease-out forwards',
        'success-particle-3': 'successParticle3 1s ease-out forwards',
        'success-particle-4': 'successParticle4 1s ease-out forwards',
        'float-particle': 'floatParticle 3s ease-in-out infinite',
        'fall': 'fall 3s linear forwards',
        'confetti': 'fall 3s linear forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
          '0%': { opacity: 0, transform: 'translateY(5px)', willChange: 'opacity, transform' },
          '100%': { opacity: 1, transform: 'translateY(0)', willChange: 'auto' },
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'translateY(0)', willChange: 'opacity, transform' },
          '100%': { opacity: 0, transform: 'translateY(5px)', willChange: 'auto' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        jiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(3deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 0.5 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        },
        carousel: {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-100%)' },
          '45%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(-200%)' },
          '70%': { transform: 'translateX(-200%)' },
          '75%': { transform: 'translateX(-300%)' },
          '95%': { transform: 'translateX(-300%)' },
          '100%': { transform: 'translateX(-400%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        floatParticle: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-10px) translateX(5px)' },
          '50%': { transform: 'translateY(0) translateX(10px)' },
          '75%': { transform: 'translateY(10px) translateX(5px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        bounceSpring: {
          '0%': { transform: 'scale(1,1) translateY(0)' },
          '10%': { transform: 'scale(1.1,.9) translateY(0)' },
          '30%': { transform: 'scale(.9,1.1) translateY(-10px)' },
          '50%': { transform: 'scale(1.05,.95) translateY(0)' },
          '57%': { transform: 'scale(1,1) translateY(-3px)' },
          '64%': { transform: 'scale(1,1) translateY(0)' },
          '100%': { transform: 'scale(1,1) translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(145, 71, 255, 0.5)', borderColor: 'rgba(145, 71, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(145, 71, 255, 0.8)', borderColor: 'rgba(145, 71, 255, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blurIn: {
          '0%': { filter: 'blur(10px)', opacity: 0 },
          '100%': { filter: 'blur(0)', opacity: 1 },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%', willChange: 'background-position' },
          '50%': { backgroundPosition: '100% 50%', willChange: 'auto' },
        },
        'borderRoam': {
          '0%': { transform: 'translateX(-100%) skewX(-30deg)', willChange: 'transform' },
          '100%': { transform: 'translateX(300%) skewX(-30deg)', willChange: 'auto' },
        },
        'wave': {
          '0%, 100%': { d: 'path("M0,5 C20,15 35,-5 55,5 C75,15 85,-5 100,5")' },
          '50%': { d: 'path("M0,5 C20,-5 35,15 55,5 C75,-5 85,15 100,5")' },
        },
        'successParticle1': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: 1 },
          '100%': { transform: 'translateY(-20px) translateX(20px)', opacity: 0 },
        },
        'successParticle2': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: 1 },
          '100%': { transform: 'translateY(-20px) translateX(-20px)', opacity: 0 },
        },
        'successParticle3': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: 1 },
          '100%': { transform: 'translateY(20px) translateX(20px)', opacity: 0 },
        },
        'successParticle4': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: 1 },
          '100%': { transform: 'translateY(20px) translateX(-20px)', opacity: 0 },
        },
        'fall': {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: 0.7 },
          '50%': { opacity: 0.5 },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 },
        },
      },
      backgroundSize: {
        'size-200': '200% 200%',
        'size-400': '400% 100%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(145, 71, 255, 0.7), 0 0 20px rgba(145, 71, 255, 0.5), 0 0 30px rgba(145, 71, 255, 0.3)',
        'neon-light': '0 0 5px rgba(145, 71, 255, 0.3), 0 0 10px rgba(145, 71, 255, 0.2)',
        'glow-sm': '0 0 8px rgba(255, 255, 255, 0.6)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.7)',
      },
      skew: {
        '30': '30deg',
      },
      // Define custom gradients for proper recognition
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
