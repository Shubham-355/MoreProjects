import { useState, useEffect } from 'react';

function ReliableImage({ 
  src, 
  alt, 
  fallbackSrc = '/assets/fallbacks/image-placeholder.jpg', 
  className = "", 
  onLoad, 
  onError,
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  // Reset state when src changes
  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setIsLoading(true);
      setHasError(false);
      setFallbackFailed(false);
    }
  }, [src]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      console.log(`Image failed to load: ${imgSrc}, falling back to: ${fallbackSrc}`);
      setImgSrc(fallbackSrc);
      setHasError(true);
      if (onError) onError();
    } else {
      console.error(`Fallback image also failed to load: ${fallbackSrc}`);
      setFallbackFailed(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  // Generate a color based on the alt text
  const getColorFromText = (text) => {
    const colors = [
      '#9333EA', '#3B82F6', '#10B981', '#F59E0B', 
      '#EF4444', '#EC4899', '#8B5CF6', '#14B8A6'
    ];
    
    // Simple hash function for consistent colors
    let hash = 0;
    const sanitizedText = text || 'Image';
    for (let i = 0; i < sanitizedText.length; i++) {
      hash = sanitizedText.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Get initials for text fallback
  const getInitials = (text) => {
    if (!text) return '';
    
    // For short texts, just use the first letter
    if (text.length <= 2) return text.charAt(0).toUpperCase();
    
    // For longer texts with spaces, get first letters of first two words
    const words = text.split(/\s+/).filter(word => word.length > 0);
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    
    // Default to first letter only
    return text.charAt(0).toUpperCase();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
      )}
      
      {fallbackFailed ? (
        <div 
          className="flex items-center justify-center w-full h-full text-white"
          style={{ 
            backgroundColor: getColorFromText(alt),
            minHeight: props.height || '100px'
          }}
        >
          <span className="text-2xl font-bold">{getInitials(alt)}</span>
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={alt || ""}
          onError={handleError}
          onLoad={handleLoad}
          className={`${className} ${hasError ? 'opacity-80' : ''}`}
          {...props}
        />
      )}
    </div>
  );
}

export default ReliableImage;
