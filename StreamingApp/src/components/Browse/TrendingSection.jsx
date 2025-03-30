import React from 'react';

function TrendingSection({ streams, onStreamSelect }) {
  if (!streams || streams.length === 0) {
    return null;
  }

  const trendingStreams = streams
    .slice(0, 4)
    .sort((a, b) => (b.viewers || 0) - (a.viewers || 0));

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="mr-2">🔥</span>
          Trending Now
        </h2>
        <a href="#trending" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
          View All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingStreams.map((stream) => (
          <div 
            key={stream.id} 
            onClick={() => onStreamSelect(stream)}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-900/20 hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
          >
            <div className="relative aspect-video">
              <img 
                src={stream.thumbnails?.[0] || '/assets/fallbacks/stream-placeholder.jpg'} 
                alt={stream.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/fallbacks/stream-placeholder.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center">
                <span className="h-1.5 w-1.5 bg-white rounded-full inline-block animate-pulse mr-1"></span>
                <span>LIVE</span>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {(stream.viewers || Math.floor(Math.random() * 1000) + 100).toLocaleString()} viewers
              </div>
            </div>
            
            <div className="p-3">
              <div className="flex mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border border-purple-500">
                  <img 
                    src={stream.streamer?.avatars?.[0] || `https://ui-avatars.com/api/?name=${encodeURIComponent(stream.streamer?.name || 'Streamer')}`}
                    alt={stream.streamer?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(stream.streamer?.name || 'Streamer')}`;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm mb-1 truncate group-hover:text-purple-400 transition-colors">
                    {stream.title}
                  </h3>
                  <p className="text-gray-400 text-xs">{stream.streamer?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-gray-500">
                <span className="bg-gray-700 rounded px-2 py-0.5 mr-2">{stream.game}</span>
                <span className="opacity-75">{stream.isLive ? 'Live now' : 'Recorded'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingSection;
