function Sidebar({ isOpen, onClose, followedChannels, recommendedChannels, onSelectChannel }) {
  return (
    <>
      {/* Mobile overlay - shown only when sidebar is open on mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-gray-900 z-50 transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header - only shown on mobile when sidebar is open */}
          <div className="p-4 md:pt-16">
            <h2 className="text-white font-medium text-lg">For You</h2>
            <button
              onClick={onClose}
              className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {followedChannels.length > 0 && (
              <div className="px-4 py-2">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Followed Channels
                </h3>
                <ul className="space-y-1">
                  {followedChannels.map(channel => (
                    <li key={channel.id}>
                      <button
                        onClick={() => onSelectChannel(channel)}
                        className="flex items-center w-full rounded px-2 py-1 hover:bg-gray-800 text-left"
                      >
                        <div className="relative flex-shrink-0">
                          <img 
                            src={channel.avatar} 
                            alt={channel.name} 
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          {channel.isLive && (
                            <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-white text-sm truncate">{channel.name}</p>
                          {channel.isLive ? (
                            <p className="text-xs text-gray-400 truncate">
                              {channel.currentGame || 'Live Now'}
                            </p>
                          ) : (
                            <p className="text-xs text-gray-500 truncate">Offline</p>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="px-4 py-2">
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Recommended Channels
              </h3>
              <ul className="space-y-1">
                {recommendedChannels.map(channel => (
                  <li key={channel.id}>
                    <button
                      onClick={() => onSelectChannel(channel)}
                      className="flex items-center w-full rounded px-2 py-1 hover:bg-gray-800 text-left"
                    >
                      <div className="relative flex-shrink-0">
                        <img 
                          src={channel.avatar} 
                          alt={channel.name} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        {channel.isLive && (
                          <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-white text-sm truncate">{channel.name}</p>
                        {channel.isLive ? (
                          <p className="text-xs text-gray-400 truncate">
                            {channel.currentGame || 'Live Now'}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500 truncate">Offline</p>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-800">
            <button className="w-full py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-sm">
              Show More
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
