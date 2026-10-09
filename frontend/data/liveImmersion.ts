export interface LiveChannel {
  id: string;
  camNumber: string;
  name: string;
  subTitle: string;
  streamUrl: string;
  statusColor: string; // Tailwind class e.g. "bg-liveRed" or "bg-emerald-500"
  isActive?: boolean;
}

export interface ImmersionQueueItem {
  id: string;
  queueNumber: number;
  pandalName: string;
  description: string;
  status: "IMMERSING" | "NEXT" | "WAITING";
  statusText: string;
  eta: string;
  location: string;
}

export interface DevotionalComment {
  id: string;
  author: string;
  initials: string;
  location: string;
  timeAgo: string;
  message: string;
  avatarBg: string; 
}

export interface EmergencyHelpline {
  id: string;
  title: string;
  phone: string;
  badgeText: string;
  badgeBg: string;
}

export interface RouteCheckPoint {
  id: string;
  stepNumber: number;
  name: string;
  statusText: string;
  statusColor: string;
  isHead?: boolean;
}

export const liveImmersionData = {
  header: {
    title: "Jagadhatri Shobhajatra & Immersion",
    year: "2026",
    subtitle:
      "Watch the world-famous 3D light procession live and track real-time idol immersion queues at Rani Ghat.",
    officialBadge: "Official Stream",
    locationTag: "Strand Road, Chandannagar",
    strandDensity: {
      label: "Strand Road Density",
      status: "Heavy Crowd",
      estWait: "Est. wait 40m",
    },
  },

  activeStream: {
    liveBadgeText: "SHOBHAJATRA LIVE",
    streamTitle: "Channel 1: Strand Road Main Camera",
    watchingCount: "4,820",
    embedUrl:
      "https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID&autoplay=1&mute=1",
    audioQualityText: "4K Ultra-HD Audio Stream",
    reactions: [
      { id: "pranam", label: "Pranam", emoji: "🪷", count: "1.2k" },
      { id: "dhak", label: "Dhak Beats", emoji: "🥁", count: "" },
      { id: "joy_maa", label: "Joy Maa Jagadhatri", emoji: "❤️", count: "" },
    ],
  },

  channels: [
    {
      id: "cam-1",
      camNumber: "Cam 1",
      name: "Strand Main Gate",
      subTitle: "3D Light Procession",
      streamUrl:
        "https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID&autoplay=1&mute=1",
      statusColor: "bg-liveRed",
      isActive: true,
    },
    {
      id: "cam-2",
      camNumber: "Cam 2",
      name: "Rani Ghat Immersion",
      subTitle: "Bisarjan Ghat View",
      streamUrl:
        "https://www.youtube.com/embed/live_stream?channel=CAM_2_ID&autoplay=1&mute=1",
      statusColor: "bg-emerald-500",
      isActive: false,
    },
    {
      id: "cam-3",
      camNumber: "Cam 3",
      name: "Drone Aerial View",
      subTitle: "Overhead City View",
      streamUrl:
        "https://www.youtube.com/embed/live_stream?channel=CAM_3_ID&autoplay=1&mute=1",
      statusColor: "bg-emerald-500",
      isActive: false,
    },
    {
      id: "cam-4",
      camNumber: "Cam 4",
      name: "GT Road Turning",
      subTitle: "Parade Entrance",
      streamUrl:
        "https://www.youtube.com/embed/live_stream?channel=CAM_4_ID&autoplay=1&mute=1",
      statusColor: "bg-emerald-500",
      isActive: false,
    },
  ] as LiveChannel[],

  immersionQueue: {
    title: "Live Immersion Queue",
    subtitle: "Realtime Rani Ghat sequence feed",
    totalPandalsCount: 64,
    items: [
      {
        id: "q-1",
        queueNumber: 1,
        pandalName: "Central Barasat Puja Committee",
        description: "Theme: Golden Temple Artistry",
        status: "IMMERSING",
        statusText: "At Rani Ghat",
        eta: "IMMERSING",
        location: "Rani Ghat",
      },
      {
        id: "q-2",
        queueNumber: 2,
        pandalName: "Surer Pukur Sarbojanin",
        description: "At Strand Road Gate 1",
        status: "NEXT",
        statusText: "Next in Queue",
        eta: "Est. 10m",
        location: "Strand Road Gate 1",
      },
      {
        id: "q-3",
        queueNumber: 3,
        pandalName: "Laldighi Sarbojanin",
        description: "At GT Road Crossing",
        status: "WAITING",
        statusText: "In Procession",
        eta: "Est. 25m",
        location: "GT Road Crossing",
      },
      {
        id: "q-4",
        queueNumber: 4,
        pandalName: "Bhadreswar Gate Club",
        description: "Approaching Strand Road",
        status: "WAITING",
        statusText: "In Procession",
        eta: "Est. 40m",
        location: "Approaching Strand Road",
      },
    ] as ImmersionQueueItem[],
  },

  routeGpsStatus: {
    title: "Procession Head Location",
    tagline: "Procession Route GPS",
    circuitName: "Strand Road Circuit",
    description:
      "The front 3D illumination float has entered Strand Road Stretch #2.",
    activeStatus: "📍 Rani Ghat Immersion Active",
    ctaText: "Open Full Map",
  },

  routeMilestones: {
    sectionTitle: "Shobhajatra Procession Route",
    sectionTagline: "Immersion Schedule & Map",
    statusBadges: ["Route Open", "Traffic Diverted"],
    checkpoints: [
      {
        id: "cp-1",
        stepNumber: 1,
        name: "GT Road Entry",
        statusText: "✓ Cleared (18/64)",
        statusColor: "text-emerald-600",
      },
      {
        id: "cp-2",
        stepNumber: 2,
        name: "Church Gate Turning",
        statusText: "✓ Active Flow",
        statusColor: "text-emerald-600",
      },
      {
        id: "cp-3",
        stepNumber: 3,
        name: "Strand Road Promenade",
        statusText: "🔴 Slow Moving",
        statusColor: "text-saffronGoldBright",
        isHead: true,
      },
      {
        id: "cp-4",
        stepNumber: 4,
        name: "Rani Ghat Immersion",
        statusText: "Final Destination",
        statusColor: "text-[#7a6c60]",
      },
    ] as RouteCheckPoint[],
  },

  devotionalComments: {
    title: "Live Devotional Comments",
    subtitle: "Messages from devotees across the globe",
    realtimeSyncBadge: "Realtime Socket Sync",
    comments: [
      {
        id: "c-1",
        author: "Abhiraj Mukherjee",
        initials: "AB",
        location: "Chandannagar",
        timeAgo: "Just now",
        message:
          "Joy Maa Jagadhatri! The light decoration at Strand Road Gate 1 is unbelievable this year! 🙏✨",
        avatarBg: "bg-saffronGold text-sacredWine",
      },
      {
        id: "c-2",
        author: "Priyanka Sen",
        initials: "PS",
        location: "Kolkata",
        timeAgo: "2m ago",
        message:
          "Watching live stream from home. Audio quality of the Dhak beats is crystal clear! ❤️🥁",
        avatarBg: "bg-sacredWine text-white",
      },
      {
        id: "c-3",
        author: "Rakesh Das",
        initials: "RD",
        location: "London, UK",
        timeAgo: "4m ago",
        message:
          "Missing home so much! Thanks for this live 4K stream feed! 🪷",
        avatarBg: "bg-amber-500 text-white",
      },
    ] as DevotionalComment[],
  },

  emergencyHelplines: {
    headerTag: "Emergency Helplines",
    title: "Chandannagar Police Control",
    footerText: "Chandannagar Jagadhatri Central Puja Committee © 2026",
    helplines: [
      {
        id: "h-1",
        title: "Police Control Room",
        phone: "100 / 033-2683-0000",
        badgeText: "24x7",
        badgeBg: "bg-emerald-500/20 text-emerald-300",
      },
      {
        id: "h-2",
        title: "Medical Emergency & Ambulance",
        phone: "102 / 033-2683-5050",
        badgeText: "24x7",
        badgeBg: "bg-emerald-500/20 text-emerald-300",
      },
      {
        id: "h-3",
        title: "Lost & Found Booth",
        phone: "Strand Gate #1",
        badgeText: "Active",
        badgeBg: "bg-saffronGold/20 text-saffronGoldBright",
      },
    ] as EmergencyHelpline[],
  },
};
