import { useState } from 'react';

function ReliableProfile({ 
  user, 
  size = "md", 
  className = "", 
  showStatus = false,
  statusClass = "bg-red-500"
}) {
  const [imgError, setImgError] = useState(false);
  
  if (!user) {
    return (
      <div className={`bg-gray-700 text-white font-bold flex items-center justify-center ${getSizeClasses(size)} rounded-full ${className}`}>
        ?
      </div>
    );
  }
  
  const userName = typeof user === 'string' ? user : user.name || user.username || 'User';
  const userAvatar = !imgError && (user.avatar || (user.avatars && user.avatars[0]));
  
  // Get user initials - either first letter or first letters of first and last name
  const getUserInitials = () => {
    if (!userName) return '?';
    
    const parts = userName.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    
    return userName.charAt(0).toUpperCase();
  };
  
  // Calculate background color based on user name
  const getColorFromName = (name) => {
    const colors = [
      'bg-purple-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600', 
      'bg-red-600', 'bg-pink-600', 'bg-indigo-600', 'bg-teal-600'
    ];
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i);
      hash = hash & hash;
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  // Try all available avatars before failing
  const handleAvatarError = () => {
    setImgError(true);
  };
  
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Avatar or Fallback */}
      {userAvatar && !imgError ? (
        <img 
          src={userAvatar}
          alt=""
          className={`object-cover rounded-full ${getSizeClasses(size)}`}
          onError={handleAvatarError}
        />
      ) : (
        <div 
          className={`${getColorFromName(userName)} text-white font-bold flex items-center justify-center ${getSizeClasses(size)} rounded-full`}
        >
          {getUserInitials()}
        </div>
      )}
      
      {/* Status indicator */}
      {showStatus && (
        <span className={`absolute ${getStatusPosition(size)} rounded-full ${getStatusSize(size)} ${statusClass} animate-pulse border border-gray-900`}></span>
      )}
    </div>
  );
}

// Helper functions for sizing
function getSizeClasses(size) {
  switch (size) {
    case 'xs': return 'w-6 h-6 text-xs';
    case 'sm': return 'w-8 h-8 text-sm';
    case 'md': return 'w-10 h-10 text-base';
    case 'lg': return 'w-14 h-14 text-lg';
    case 'xl': return 'w-20 h-20 text-xl';
    default: return 'w-10 h-10 text-base';
  }
}

function getStatusSize(size) {
  switch (size) {
    case 'xs': return 'w-2 h-2';
    case 'sm': return 'w-2.5 h-2.5';
    case 'md': return 'w-3 h-3';
    case 'lg': return 'w-4 h-4';
    case 'xl': return 'w-5 h-5';
    default: return 'w-3 h-3';
  }
}

function getStatusPosition(size) {
  switch (size) {
    case 'xs': return 'bottom-0 right-0';
    case 'sm': return 'bottom-0 right-0';
    case 'md': return 'bottom-0 right-0';
    case 'lg': return 'bottom-1 right-1';
    case 'xl': return 'bottom-1 right-1';
    default: return 'bottom-0 right-0';
  }
}

export default ReliableProfile;
