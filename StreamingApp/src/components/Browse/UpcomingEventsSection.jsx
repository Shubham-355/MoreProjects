import React from 'react';

function UpcomingEventsSection({ events = [] }) {
  // Default events if none provided
  const defaultEvents = [
    {
      id: 'event-1',
      title: 'Charity Stream Marathon',
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      streamer: { 
        name: 'StreamingForGood', 
        avatar: 'https://ui-avatars.com/api/?name=StreamingForGood'
      },
      description: 'Join our 24-hour charity stream to raise funds for children in need!',
      thumbnailUrl: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'event-2',
      title: 'Battle Royale Tournament Finals',
      date: new Date(Date.now() + 86400000 * 5), // 5 days from now
      streamer: { 
        name: 'TournamentTV', 
        avatar: 'https://ui-avatars.com/api/?name=TournamentTV'
      },
      description: 'The top 10 teams battle it out for the grand prize of $50,000!',
      thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'event-3',
      title: 'New Game Launch: Starfall Chronicles',
      date: new Date(Date.now() + 86400000 * 7), // 7 days from now
      streamer: { 
        name: 'GameLaunchNetwork', 
        avatar: 'https://ui-avatars.com/api/?name=GameLaunchNetwork'
      },
      description: 'Exclusive first look at the most anticipated game of the year!',
      thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  const displayEvents = events.length > 0 ? events : defaultEvents;
  
  // Format the date
  const formatEventDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  // Calculate days remaining
  const getDaysRemaining = (date) => {
    const diffTime = Math.abs(date - new Date());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="mr-2">📅</span>
          Upcoming Events
        </h2>
        <a href="#events" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
          View Calendar
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayEvents.map((event) => (
          <div 
            key={event.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-600/10 transition-all duration-300 border border-gray-700/50 group"
          >
            <div className="relative aspect-[16/9]">
              <img 
                src={event.thumbnailUrl} 
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=2070&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-purple-600/90 backdrop-blur rounded-lg px-3 py-2 text-white text-xs font-medium inline-block mb-2">
                  {formatEventDate(event.date)}
                </div>
                <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md group-hover:text-purple-300 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2">{event.description}</p>
              </div>
              
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                In {getDaysRemaining(event.date)} days
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border border-purple-500">
                  <img 
                    src={event.streamer.avatar} 
                    alt={event.streamer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.streamer.name)}`;
                    }}
                  />
                </div>
                <span className="text-gray-300 text-sm">{event.streamer.name}</span>
              </div>
              
              <button className="text-white bg-purple-600 hover:bg-purple-700 rounded-full px-3 py-1 text-xs font-medium transition-colors">
                Remind Me
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEventsSection;
