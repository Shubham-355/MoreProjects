import { useState } from 'react';
import { GradientButton, ShakeButton, RippleButton } from '../UI/AnimatedButtons';

function CreatorTools() {
  const [streamTitle, setStreamTitle] = useState("My Awesome Stream");
  const [streamGame, setStreamGame] = useState("Just Chatting");
  const [streamTags, setStreamTags] = useState(["Gaming", "Chatting", "English"]);
  const [newTag, setNewTag] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Analytics data
  const analyticsData = {
    viewers: {
      current: 1245,
      peak: 1872,
      average: 967
    },
    followers: {
      total: 12650,
      new: 84
    },
    subscribers: {
      total: 487,
      new: 12
    },
    revenue: {
      today: 157.85,
      month: 1873.42
    }
  };
  
  const handleSaveChanges = () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setIsEditing(false);
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1500);
  };
  
  const handleAddTag = () => {
    if (!newTag.trim() || streamTags.includes(newTag.trim())) return;
    
    setStreamTags([...streamTags, newTag.trim()]);
    setNewTag("");
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setStreamTags(streamTags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <div className="space-y-6">
      {/* Stream Settings */}
      <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Stream Settings
          </h3>
          
          {!isEditing ? (
            <RippleButton onClick={() => setIsEditing(true)}>
              Edit
            </RippleButton>
          ) : (
            <div className="flex space-x-2">
              <ShakeButton onClick={() => setIsEditing(false)}>
                Cancel
              </ShakeButton>
              <GradientButton 
                onClick={handleSaveChanges}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : "Save Changes"}
              </GradientButton>
            </div>
          )}
        </div>
        
        {showSuccessMessage && (
          <div className="mb-4 bg-green-500/20 border border-green-500 text-green-400 p-3 rounded-md text-sm">
            Stream settings updated successfully!
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Stream Title</label>
            {isEditing ? (
              <input
                type="text"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Enter stream title"
              />
            ) : (
              <p className="text-white bg-gray-800 px-3 py-2 rounded-md">{streamTitle}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Game/Category</label>
            {isEditing ? (
              <input
                type="text"
                value={streamGame}
                onChange={(e) => setStreamGame(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Enter game or category"
              />
            ) : (
              <p className="text-white bg-gray-800 px-3 py-2 rounded-md">{streamGame}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {streamTags.map(tag => (
                <span 
                  key={tag} 
                  className={`px-2 py-1 bg-gray-800 rounded-full text-sm text-white flex items-center ${
                    isEditing ? 'pr-1' : ''
                  }`}
                >
                  {tag}
                  {isEditing && (
                    <button 
                      onClick={() => handleRemoveTag(tag)} 
                      className="ml-1 text-gray-400 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </span>
              ))}
            </div>
            
            {isEditing && (
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-md text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Add new tag"
                />
                <button
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-r-md transition-colors"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Stream Analytics */}
      <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-white font-bold flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          Analytics
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/70 rounded-lg p-3">
            <div className="text-gray-400 text-xs mb-1">Current Viewers</div>
            <div className="text-white text-xl font-bold">{analyticsData.viewers.current.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">Peak: {analyticsData.viewers.peak.toLocaleString()}</div>
          </div>
          
          <div className="bg-gray-800/70 rounded-lg p-3">
            <div className="text-gray-400 text-xs mb-1">Followers</div>
            <div className="text-white text-xl font-bold">{analyticsData.followers.total.toLocaleString()}</div>
            <div className="text-xs text-green-400 mt-1">+{analyticsData.followers.new} today</div>
          </div>
          
          <div className="bg-gray-800/70 rounded-lg p-3">
            <div className="text-gray-400 text-xs mb-1">Subscribers</div>
            <div className="text-white text-xl font-bold">{analyticsData.subscribers.total}</div>
            <div className="text-xs text-green-400 mt-1">+{analyticsData.subscribers.new} today</div>
          </div>
          
          <div className="bg-gray-800/70 rounded-lg p-3">
            <div className="text-gray-400 text-xs mb-1">Revenue</div>
            <div className="text-white text-xl font-bold">${analyticsData.revenue.today.toFixed(2)}</div>
            <div className="text-xs text-gray-400 mt-1">${analyticsData.revenue.month.toFixed(2)} this month</div>
          </div>
        </div>
      </div>
      
      {/* Quick Controls */}
      <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-white font-bold flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
          </svg>
          Quick Controls
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <ShakeButton>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              Run Ad Break
            </div>
          </ShakeButton>
          
          <RippleButton>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              Create Clip
            </div>
          </RippleButton>
          
          <GradientButton>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              Stream Marker
            </div>
          </GradientButton>
          
          <ShakeButton>
            <div className="flex items-center text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              End Stream
            </div>
          </ShakeButton>
        </div>
      </div>
    </div>
  );
}

export default CreatorTools;
