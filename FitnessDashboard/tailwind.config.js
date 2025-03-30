/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        'heading': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['Roboto Mono', 'SFMono-Regular', 'monospace'],
      },
      zIndex: {
        '-1': '-1',
        '0': '0', 
        '1': '1',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        'auto': 'auto',
      },
      colors: {
        // Dark theme colors - darker blacks
        dark: {
          primary: '#FF6500',
          primaryHover: '#FF8533',
          background: '#050C15', // Darker background
          backgroundSecondary: '#0B192C', // Previous background as secondary
          card: '#0F2742', // Darker card
          overlay: '#1E3E62', // Previous card color as overlay
          text: '#FFFFFF',
          textMuted: '#A0AEC0',
          border: 'rgba(30, 62, 98, 0.5)'
        },
        // Light theme colors
        light: {
          primary: '#261FB3',
          primaryHover: '#5C56D4',
          background: '#F8F7FF', // Changed from FBE4D6 to F8F7FF
          card: '#FFFFFF',
          text: '#0C0950',
          textMuted: '#4A5568',
          border: 'rgba(38, 31, 179, 0.2)'
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideRight: 'slideRight 0.3s ease-in-out',
        slideUp: 'slideUp 0.3s ease-in-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'soft': '0 2px 5px 0 rgba(0, 0, 0, 0.05)',
        'hover': '0 4px 15px -5px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
