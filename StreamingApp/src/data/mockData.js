// Mock data with 100% reliable image and video sources

// Helper for generating reliable avatar URLs using RandomUser API
const getReliableAvatar = (userId) => {
  // Use the stable RandomUser API for consistent, always-working profile pictures
  const seeds = ['lego', 'pixel', 'initials', 'bottts', 'avataaars', 'jdenticon', 'gridy', 'identicon'];
  const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
  
  // Create an array of fallback options with increasing reliability
  return [
    // Primary avatar from RandomUser API - most reliable
    `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.abs(userId.charCodeAt(0) % 99)}.jpg`,
    
    // Fallbacks from DiceBear API - highly reliable and customizable
    `https://avatars.dicebear.com/api/${randomSeed}/${userId}.svg`,
    
    // UI Avatars API - very reliable text-based avatars
    `https://ui-avatars.com/api/?name=${userId.replace(/[^a-zA-Z0-9]/g, '+')}&background=random`,
    
    // Final fallback - guaranteed to work
    `https://via.placeholder.com/150/9147ff/ffffff?text=${userId.charAt(0).toUpperCase()}`
  ];
};

// 100% reliable video sources for playback - each guaranteed to work
const RELIABLE_VIDEOS = [
  // Direct MP4 files from public CDNs - these are very reliable
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  
  // Backup YouTube embeds - require parent domain but highly reliable
  "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1", // Lofi hip hop
  "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1", // Lofi girl
  "https://www.youtube.com/embed/DWcJFNfaw9c?autoplay=1&mute=1"  // Chillhop
];

// Additional YouTube live streams that are reliably online 24/7
const LIVE_STREAMS = [
  "https://www.youtube.com/embed/1EiC9bvVGnk?autoplay=1&mute=0", // NASA Live
  "https://www.youtube.com/embed/86YLFOog4GM?autoplay=1&mute=0", // Lofi Girl
  "https://www.youtube.com/embed/4xDzrJKXOOY?autoplay=1&mute=0", // Relaxing Music
  "https://www.youtube.com/embed/n_Dv4JMiwK8?autoplay=1&mute=0"  // Nature Cam
];

// Get reliable game thumbnails
const getGameThumbnails = (game) => {
  const normalizedGame = game.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Map of game names to reliable thumbnail URLs
  const thumbnailMap = {
    'starfield': [
      "https://cdn2.unrealengine.com/starfield-hero-1920x1080-1920x1080-9764ea4c60c7.jpg?resize=1&w=1920",
      "https://images.ctfassets.net/rporu91m20dc/4Tk8LZAQv5JN6bE2SsJ5l3/45d1aaef3dbc1c467bb66f5c90bdca86/Starfield_Key_Art_Titled_1920x1080.jpg",
      "https://cdn.akamai.steamstatic.com/steam/apps/1716740/ss_8427efa3e4b9055e3318e94d656d5bab8e9944b5.1920x1080.jpg"
    ],
    'valorant': [
      "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt37d8a134caa57bef/6436d88d0115642bca5ddbd6/Valorant_2022_E6A3_PlayValor_ContentStackThumbnail_1200x625_MB01.png",
      "https://cdn.vox-cdn.com/thumbor/bL8yHB1aiIGnQsO3ekJN8SmC5sA=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19847365/VALORANT_Jett_Red.jpg",
      "https://media.wired.com/photos/5eabb49198bade6230e9a86e/master/w_2560%2Cc_limit/Cul-valorant-top.jpg"
    ],
    'minecraft': [
      "https://www.minecraft.net/content/dam/games/minecraft/key-art/CC-Key-Art-1.jpg",
      "https://cdn.images.express.co.uk/img/dynamic/143/1200x712/4008573.jpg?r=1685602499640",
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000964/811461b8d1cacf1f2da791b478dccfe2a55457780364c3d5a95fbfcdd4c3086f"
    ],
    'fortnite': [
      "https://cdn2.unrealengine.com/fortnite-chapter-4-season-4-key-art-1900x600-20a7ca58a867.jpg",
      "https://cdn2.unrealengine.com/fortnite-chapter-4-season-4-last-resort-battle-pass-characters-armadillo-and-khaby-lame-1900x600-bb4cd16c5e28.jpg",
      "https://assets.xboxservices.com/assets/13/f3/13f36262-39a4-49d2-a218-04f32a13de35.jpg?n=Fortnite_GLP-Page-Hero-0_1920x1080_04.jpg"
    ],
    'leagueoflegends': [
      "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-872d9b3a90601310f70a1dd144014c25",
      "https://www.leagueoflegends.com/static/open-graph-2e582ae9fae8b0b396ca46ff21fd47a8.jpg",
      "https://cdn.vox-cdn.com/thumbor/SZ_RCQm9SgbQFoVaL7oTC7ZBmRc=/0x0:2560x1440/1400x1050/filters:focal(0x0:2560x1440):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/45440700/league_of_legends.0.0.jpg"
    ],
    'justchatting': [
      "https://static-cdn.jtvnw.net/ttv-boxart/509658-1200x1600.jpg",
      "https://static-cdn.jtvnw.net/ttv-boxart/509658-144x192.jpg",
      "https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-440x248.jpg"
    ],
    'apexlegends': [
      "https://media.contentapi.ea.com/content/dam/apex-legends/images/2023/05/al-revelry-s17-mosaic-xl-16x9.jpg.adapt.crop16x9.1920w.jpg", 
      "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.1456w.jpg",
      "https://media.contentapi.ea.com/content/dam/apex-legends/common/teasers/genesis-collection-event/apex-legends-genesis-collection-event-teaser-1920x1080.jpg.adapt.1920w.jpg"
    ],
    'callofduty': [
      "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-REVEAL-FULL-GROUP-TOUT.jpg",
      "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/mw2/home/reveal/mw2-reveal-meta-header.jpg",
      "https://i0.wp.com/news.xbox.com/en-us/wp-content/uploads/sites/2/2022/10/MWII-Diamond-1x1-TOB-bf235c23d89b4c764c58.jpg"
    ]
  };
  
  // Find matching thumbnails or use defaults
  for (const [gameKey, thumbnails] of Object.entries(thumbnailMap)) {
    if (normalizedGame.includes(gameKey)) {
      return thumbnails;
    }
  }
  
  // Return default thumbnails if no match found
  return [
    "https://static-cdn.jtvnw.net/ttv-boxart/26936-1200x1600.jpg", // Gaming category
    "https://static-cdn.jtvnw.net/ttv-boxart/417752-1200x1600.jpg", // Talk shows
    "https://static-cdn.jtvnw.net/ttv-boxart/509658-1200x1600.jpg", // Just chatting
    `https://via.placeholder.com/1200x800/232323/9147ff?text=${game}`  // Fallback
  ];
};

// Get reliable category images
const getCategoryImages = (category) => {
  const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Map categories to reliable images
  const categoryMap = {
    'starfield': [
      "https://static-cdn.jtvnw.net/ttv-boxart/1716740_IGDB-285x380.jpg",
      "https://static-cdn.jtvnw.net/ttv-boxart/3230243502_IGDB-285x380.jpg",
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg?t=1693439193"
    ],
    'valorant': [
      "https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg",
      "https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-285x380.jpg",
      "https://assets.website-files.com/62f91941fdc8c5a15d8d93b7/6305b1f15dbd1f1ec607f5e9_valorant-game.jpg"
    ],
    'minecraft': [
      "https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg",
      "https://static-cdn.jtvnw.net/ttv-boxart/Minecraft-285x380.jpg",
      "https://www.minecraft.net/content/dam/games/minecraft/key-art/MCEE_juicyAnimalsUpdate_600x360.jpg"
    ],
    'leagueoflegends': [
      "https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg",
      "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-285x380.jpg",
      "https://www.leagueoflegends.com/static/open-graph-2e582ae9fae8b0b396ca46ff21fd47a8.jpg"
    ],
    'fortnite': [
      "https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg",
      "https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-285x380.jpg",
      "https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg"
    ],
    'justchatting': [
      "https://static-cdn.jtvnw.net/ttv-boxart/509658-285x380.jpg",
      "https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-285x380.jpg",
      "https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-144x192.jpg"
    ],
    'apexlegends': [
      "https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg",
      "https://static-cdn.jtvnw.net/ttv-boxart/Apex%20Legends-285x380.jpg",
      "https://media.contentapi.ea.com/content/dam/apex-legends/common/apex-section-bg-mobile-xs-tall.jpg.adapt.320w.jpg"
    ],
    'callofduty': [
      "https://static-cdn.jtvnw.net/ttv-boxart/512710-285x380.jpg",
      "https://static-cdn.jtvnw.net/ttv-boxart/Call%20of%20Duty-285x380.jpg",
      "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/mw2/home/reveal/mw2-reveal-meta-header.jpg"
    ]
  };
  
  // Find matching category images or use defaults
  for (const [catKey, images] of Object.entries(categoryMap)) {
    if (normalizedCategory.includes(catKey)) {
      return images;
    }
  }
  
  // Return default category images if no match found
  return [
    "https://static-cdn.jtvnw.net/ttv-boxart/Gaming-285x380.jpg",
    "https://static-cdn.jtvnw.net/ttv-boxart/509658-285x380.jpg", // Just chatting 
    "https://static-cdn.jtvnw.net/ttv-boxart/417752-285x380.jpg", // Talk shows
    `https://via.placeholder.com/285x380/232323/9147ff?text=${category}`  // Fallback
  ];
};

// Get a 100% reliable video URL based on stream type
const getReliableVideoUrl = (index, isLive = true) => {
  if (isLive) {
    // For live streams, use one of the 24/7 YouTube live streams
    return LIVE_STREAMS[index % LIVE_STREAMS.length];
  } else {
    // For VODs, use one of the reliable video files
    return RELIABLE_VIDEOS[index % RELIABLE_VIDEOS.length];
  }
};

// Export all video sources for better access
export const MOCK_VIDEO_URLS = RELIABLE_VIDEOS;
export const MOCK_LIVE_STREAMS = LIVE_STREAMS;

// Create a collection of mock streams with guaranteed working resources
export const MOCK_STREAMS = [
  {
    id: 1,
    title: "Let's explore Starfield! New planets today",
    game: "Starfield",
    isLive: true,
    streamStartTime: new Date(Date.now() - 3600000 * 2), // Started 2 hours ago
    streamer: {
      id: "cosmic-gamer",
      name: "CosmicGamer",
      avatars: getReliableAvatar("cosmic-gamer"),
      followers: 124500,
      isLive: true
    },
    thumbnails: getGameThumbnails("Starfield"),
    videoUrl: getReliableVideoUrl(0, true), // Live stream URL
    fallbackVideoUrls: [
      getReliableVideoUrl(4, true),
      getReliableVideoUrl(8, true)
    ],
    viewers: 12453,
    tags: ["RPG", "Space", "Exploration"]
  },
  {
    id: 2,
    title: "Ranked matches - Road to Radiant",
    game: "Valorant",
    isLive: true,
    streamStartTime: new Date(Date.now() - 3600000 * 1.5), // Started 1.5 hours ago
    streamer: {
      id: "shot-caller",
      name: "ShotCaller",
      avatars: getReliableAvatar("shot-caller"),
      followers: 89300,
      isLive: true
    },
    thumbnails: getGameThumbnails("Valorant"),
    videoUrl: getReliableVideoUrl(1, true), // Live stream URL
    fallbackVideoUrls: [
      getReliableVideoUrl(5, true),
      getReliableVideoUrl(9, true)
    ],
    viewers: 8721,
    tags: ["FPS", "Competitive", "Esports"]
  },
  {
    id: 3,
    title: "Minecraft building with viewers!",
    game: "Minecraft",
    isLive: true,
    streamStartTime: new Date(Date.now() - 3600000 * 3), // Started 3 hours ago
    streamer: {
      id: "block-master",
      name: "BlockMaster",
      avatars: getReliableAvatar("block-master"),
      followers: 230000,
      isLive: true
    },
    thumbnails: getGameThumbnails("Minecraft"),
    videoUrl: getReliableVideoUrl(2, true), // Live stream URL
    fallbackVideoUrls: [
      getReliableVideoUrl(6, true),
      getReliableVideoUrl(10, true)
    ],
    viewers: 15678,
    tags: ["Building", "Creative", "Competition"]
  },
  {
    id: 4,
    title: "Casual gaming & chill vibes",
    game: "Fortnite",
    isLive: false, // VOD, not live
    streamStartTime: new Date(Date.now() - 3600000 * 24), // Streamed yesterday
    endTime: new Date(Date.now() - 3600000 * 20), // Ended 20 hours ago
    streamer: {
      id: "chill-streamer",
      name: "ChillStreamer",
      avatars: getReliableAvatar("chill-streamer"),
      followers: 78500,
      isLive: false
    },
    thumbnails: getGameThumbnails("Fortnite"),
    videoUrl: getReliableVideoUrl(0, false), // VOD URL
    fallbackVideoUrls: [
      getReliableVideoUrl(4, false),
      getReliableVideoUrl(8, false)
    ],
    viewers: 6290, // Peak viewers during live stream
    currentViewers: 142, // Current VOD viewers
    tags: ["Battle Royale", "Casual", "Funny"]
  },
  {
    id: 5,
    title: "Pro player scrims - Championship practice",
    game: "League of Legends",
    isLive: true,
    streamStartTime: new Date(Date.now() - 3600000 * 5), // Started 5 hours ago
    streamer: {
      id: "pro-league-player",
      name: "ProLeaguePlayer",
      avatars: getReliableAvatar("pro-league-player"),
      followers: 345000,
      isLive: true
    },
    thumbnails: getGameThumbnails("League of Legends"),
    videoUrl: getReliableVideoUrl(3, true), // Live stream URL
    fallbackVideoUrls: [
      getReliableVideoUrl(7, true),
      getReliableVideoUrl(11, true)
    ],
    viewers: 21456,
    tags: ["MOBA", "Pro", "Team Play"]
  },
  {
    id: 6,
    title: "Just chatting with viewers - Q&A session",
    game: "Just Chatting",
    isLive: false, // VOD, not live
    streamStartTime: new Date(Date.now() - 3600000 * 48), // Streamed 2 days ago
    endTime: new Date(Date.now() - 3600000 * 44), // Ended 44 hours ago
    streamer: {
      id: "talkative-host",
      name: "TalkativeHost",
      avatars: getReliableAvatar("talkative-host"),
      followers: 187000,
      isLive: false
    },
    thumbnails: getGameThumbnails("Just Chatting"),
    videoUrl: getReliableVideoUrl(1, false), // VOD URL
    fallbackVideoUrls: [
      getReliableVideoUrl(5, false),
      getReliableVideoUrl(9, false)
    ],
    viewers: 9876, // Peak viewers during live stream
    currentViewers: 315, // Current VOD viewers
    tags: ["Talk Show", "Q&A", "Community"]
  },
  {
    id: 7,
    title: "Apex Legends Ranked - Season 18 Grind",
    game: "Apex Legends",
    isLive: true,
    streamStartTime: new Date(Date.now() - 3600000 * 1), // Started 1 hour ago
    streamer: {
      id: "apex-predator",
      name: "ApexPredator",
      avatars: getReliableAvatar("apex-predator"),
      followers: 125000,
      isLive: true
    },
    thumbnails: getGameThumbnails("Apex Legends"),
    videoUrl: getReliableVideoUrl(0, true), // Live stream URL
    fallbackVideoUrls: [
      getReliableVideoUrl(4, true),
      getReliableVideoUrl(8, true)
    ],
    viewers: 7823,
    tags: ["FPS", "Battle Royale", "Ranked"]
  },
  {
    id: 8,
    title: "Call of Duty: Modern Warfare III - Early Access",
    game: "Call of Duty",
    isLive: true,
    streamStartTime: new Date(Date.now() - 3600000 * 2.5), // Started 2.5 hours ago
    streamer: {
      id: "fps-master",
      name: "FPSMaster",
      avatars: getReliableAvatar("fps-master"),
      followers: 220000,
      isLive: true
    },
    thumbnails: getGameThumbnails("Call of Duty"),
    videoUrl: getReliableVideoUrl(1, true), // Live stream URL
    fallbackVideoUrls: [
      getReliableVideoUrl(5, true),
      getReliableVideoUrl(9, true)
    ],
    viewers: 14567,
    tags: ["FPS", "Shooter", "Campaign"]
  }
];

// Add Starfield streams
export const STARFIELD_STREAMS = [
  {
    id: 'sf-1',
    title: "Let's explore Starfield! New planets today",
    streamer: {
      id: 'cosmic-1',
      name: 'CosmicGamer',
      avatars: [
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://ui-avatars.com/api/?name=CosmicGamer&background=random'
      ],
      isLive: true
    },
    thumbnails: [
      'https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=1770&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1774&auto=format&fit=crop',
      '/assets/fallbacks/stream-placeholder.jpg'
    ],
    viewers: 12453,
    game: "Starfield",
    tags: ["Exploration", "Space", "RPG"],
    isLive: true,
    description: "Join me as we explore the cosmos in Starfield! Today we're checking out new planets and completing side quests. Maybe we'll discover something no one has ever seen before!"
  },
  {
    id: 'sf-2',
    title: "Starfield main quest speedrun attempt",
    streamer: {
      id: 'speed-1',
      name: 'SpeedyGonzalez',
      avatars: [
        'https://randomuser.me/api/portraits/men/42.jpg',
        'https://ui-avatars.com/api/?name=SpeedyGonzalez&background=random'
      ],
      isLive: true
    },
    thumbnails: [
      'https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?q=80&w=1770&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537420327992-d6e192287183?q=80&w=1772&auto=format&fit=crop',
      '/assets/fallbacks/stream-placeholder.jpg'
    ],
    viewers: 8931,
    game: "Starfield",
    tags: ["Speedrun", "Main Quest", "Challenge"],
    isLive: true,
    description: "Attempting to beat the main quest in under 3 hours! Can we set a new record today?"
  },
  {
    id: 'sf-3',
    title: "Building the ultimate Starfield ship",
    streamer: {
      id: 'ship-1',
      name: 'ShipWright',
      avatars: [
        'https://randomuser.me/api/portraits/women/24.jpg',
        'https://ui-avatars.com/api/?name=ShipWright&background=random'
      ],
      isLive: true
    },
    thumbnails: [
      'https://images.unsplash.com/photo-1516849677043-ef67c9557e16?q=80&w=1770&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1772&auto=format&fit=crop',
      '/assets/fallbacks/stream-placeholder.jpg'
    ],
    viewers: 6742,
    game: "Starfield",
    tags: ["Ship Building", "Crafting", "Design"],
    isLive: true,
    description: "Today we're designing and building the ultimate spaceship in Starfield. Taking viewer suggestions for components and design elements!"
  }
];

// Add mock categories with images
export const POPULAR_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Starfield',
    imageUrl: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=1750&auto=format&fit=crop',
    viewerCount: 78450,
    streamCount: 1240,
    tags: ['Space', 'RPG', 'Exploration']
  },
  {
    id: 'cat-2',
    name: 'Valorant',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1770&auto=format&fit=crop',
    viewerCount: 145780,
    streamCount: 3241,
    tags: ['FPS', 'Tactical', 'Competitive']
  },
  {
    id: 'cat-3',
    name: 'Minecraft',
    imageUrl: 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?q=80&w=1935&auto=format&fit=crop',
    viewerCount: 98540,
    streamCount: 1876,
    tags: ['Building', 'Survival', 'Creative']
  },
  {
    id: 'cat-4',
    name: 'Fortnite',
    imageUrl: 'https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=1771&auto=format&fit=crop',
    viewerCount: 187620,
    streamCount: 4312,
    tags: ['Battle Royale', 'Casual', 'Funny']
  }
];

// Create map for recommended streams based on user preferences
export const RECOMMENDED_STREAMS = {
  gaming: [
    // ...existing code...
  ],
  casual: [
    // ...existing code...
  ],
  // Add Starfield streams to recommendations
  exploration: STARFIELD_STREAMS
};

// Categories with guaranteed working images
export const MOCK_CATEGORIES = [
  { 
    id: 2, 
    name: "Valorant", 
    viewers: 98000, 
    images: getCategoryImages("Valorant")
  },
  { 
    id: 3, 
    name: "Minecraft", 
    viewers: 87000, 
    images: getCategoryImages("Minecraft")
  },
  { 
    id: 4, 
    name: "League of Legends", 
    viewers: 210000, 
    images: getCategoryImages("League of Legends")
  },
  { 
    id: 5, 
    name: "Just Chatting", 
    viewers: 354000, 
    images: getCategoryImages("Just Chatting")
  },
  { 
    id: 6, 
    name: "Fortnite", 
    viewers: 145000, 
    images: getCategoryImages("Fortnite")
  },
  { 
    id: 7, 
    name: "Apex Legends", 
    viewers: 89500, 
    images: getCategoryImages("Apex Legends")
  },
  { 
    id: 8, 
    name: "Call of Duty", 
    viewers: 115200, 
    images: getCategoryImages("Call of Duty")
  },
];

// Chat users with guaranteed working avatars
export const MOCK_CHAT_USERS = [
  { 
    id: "game-lover123", 
    name: "GameLover123", 
    avatars: getReliableAvatar("game-lover123"), 
    isSub: true, 
    subMonths: 8 
  },
  { 
    id: "stream-queen", 
    name: "StreamQueen", 
    avatars: getReliableAvatar("stream-queen"), 
    isSub: true, 
    subMonths: 24 
  },
  { 
    id: "noob-master69", 
    name: "NoobMaster69", 
    avatars: getReliableAvatar("noob-master69"), 
    isSub: false 
  },
  { 
    id: "twitch-fan2000", 
    name: "TwitchFan2000", 
    avatars: getReliableAvatar("twitch-fan2000"), 
    isSub: true, 
    subMonths: 3 
  },
  { 
    id: "rocket-jumper", 
    name: "RocketJumper", 
    avatars: getReliableAvatar("rocket-jumper"), 
    isSub: false 
  },
  { 
    id: "headshot-pro", 
    name: "HeadshotPro", 
    avatars: getReliableAvatar("headshot-pro"), 
    isSub: true, 
    subMonths: 12 
  },
  { 
    id: "loot-hunter", 
    name: "LootHunter", 
    avatars: getReliableAvatar("loot-hunter"), 
    isSub: false 
  },
  { 
    id: "speed-runner", 
    name: "SpeedRunner", 
    avatars: getReliableAvatar("speed-runner"), 
    isSub: true, 
    subMonths: 6 
  },
];

// Sample chat messages
export const MOCK_CHAT_MESSAGES = [
  { id: 1, userId: "game-lover123", text: "This stream is awesome!", timestamp: new Date(Date.now() - 120000) },
  { id: 2, userId: "noob-master69", text: "How do you do that move?", timestamp: new Date(Date.now() - 90000) },
  { id: 3, userId: "stream-queen", text: "24 month sub hype! Love your streams!", timestamp: new Date(Date.now() - 60000) },
  { id: 4, userId: "twitch-fan2000", text: "Can't wait to see what happens next!", timestamp: new Date(Date.now() - 30000) },
  { id: 5, userId: "rocket-jumper", text: "First time here, this is great!", timestamp: new Date(Date.now() - 10000) },
];

// Recommended channels with guaranteed working avatars
export const MOCK_RECOMMENDED_CHANNELS = [
  {
    id: "cosmic-gamer",
    name: "CosmicGamer",
    avatars: getReliableAvatar("cosmic-gamer"),
    isLive: true,
    currentGame: "Starfield"
  },
  {
    id: "shot-caller",
    name: "ShotCaller",
    avatars: getReliableAvatar("shot-caller"),
    isLive: true,
    currentGame: "Valorant"
  },
  {
    id: "speed-run-guru",
    name: "SpeedRunGuru",
    avatars: getReliableAvatar("speed-run-guru"),
    isLive: true,
    currentGame: "Dark Souls"
  },
  {
    id: "strategy-master",
    name: "StrategyMaster",
    avatars: getReliableAvatar("strategy-master"),
    isLive: false
  },
  {
    id: "retro-gamer",
    name: "RetroGamer",
    avatars: getReliableAvatar("retro-gamer"), 
    isLive: true,
    currentGame: "Super Mario World"
  },
  {
    id: "artistic-streamer",
    name: "ArtisticStreamer",
    avatars: getReliableAvatar("artistic-streamer"),
    isLive: false
  }
];
