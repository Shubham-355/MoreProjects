import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './styles/global.css'; // Import the global stylesheet with scrollbar styles

// Add error handling to catch any render errors
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the entire app in a try-catch for better error handling
try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render the application:', error);
  
  // Display a fallback UI when the app fails to render
  root.render(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ color: '#e11d48', marginBottom: '16px' }}>Something went wrong</h1>
      <p style={{ marginBottom: '24px' }}>
        The application encountered an error. Please try refreshing the page.
      </p>
      <button 
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Refresh Page
      </button>
    </div>
  );
}
