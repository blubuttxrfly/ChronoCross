export type ActivityType = "earned" | "spent" | "offer" | "request";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  time: string;
  hours?: number;
  person?: string;
};

export type OfferItem = {
  id: string;
  title: string;
  category: string;
  hours: number;
  status: "active" | "pending" | "completed";
  posted: string;
  memberId: string;
  memberName: string;
  description: string;
};

export type RequestItem = {
  id: string;
  title: string;
  category: string;
  hours: number;
  status: "open" | "matched" | "completed";
  posted: string;
  memberId: string;
  memberName: string;
  description: string;
};

export type CommunityMember = {
  id: string;
  name: string;
  skills: string[];
  neighborsHelped: number;
  bio: string;
  activeThisWeek: boolean;
};

export type FeedOpportunity = {
  id: string;
  type: "offer" | "request";
  title: string;
  category: string;
  hours: number;
  memberId: string;
  memberName: string;
  posted: string;
  description: string;
};

export const HOUR_BALANCE = {
  current: 4.0,
  trend: 1.0,
  trendLabel: "vs last week",
  history: [2.5, 2.5, 3.0, 3.0, 3.5, 3.5, 4.0],
};

export const USER_TRUST = {
  neighborsHelped: 8,
  hoursGiven: 12,
  hoursReceived: 8,
  memberSince: "March 2026",
};

export const COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: "m1",
    name: "Maya Chen",
    skills: ["Career coaching", "Resume review"],
    neighborsHelped: 14,
    bio: "Happy to help with job searches and interview prep.",
    activeThisWeek: true,
  },
  {
    id: "m2",
    name: "Alex Rivera",
    skills: ["Bike repair", "Woodworking"],
    neighborsHelped: 22,
    bio: "Weekend mechanic. Bring your bike by anytime.",
    activeThisWeek: true,
  },
  {
    id: "m3",
    name: "Jordan Lee",
    skills: ["Math tutoring", "Test prep"],
    neighborsHelped: 9,
    bio: "Former teacher, grades 6–12.",
    activeThisWeek: true,
  },
  {
    id: "m4",
    name: "Sam Okonkwo",
    skills: ["Gardening", "Meal prep"],
    neighborsHelped: 11,
    bio: "Love getting hands dirty in the garden.",
    activeThisWeek: false,
  },
  {
    id: "m5",
    name: "Priya Sharma",
    skills: ["Tech support", "Furniture assembly"],
    neighborsHelped: 17,
    bio: "Can fix most household tech headaches.",
    activeThisWeek: true,
  },
  {
    id: "m6",
    name: "Chris Taylor",
    skills: ["Dog walking", "Errands"],
    neighborsHelped: 6,
    bio: "Flexible afternoons, happy to lend a hand.",
    activeThisWeek: true,
  },
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    type: "earned",
    title: "Helped Maya with resume review",
    detail: "Career · 1 hour",
    time: "2 days ago",
    hours: 1,
    person: "Maya Chen",
  },
  {
    id: "2",
    type: "spent",
    title: "Bike tune-up from Alex",
    detail: "Repair · 1 hour",
    time: "5 days ago",
    hours: -1,
    person: "Alex Rivera",
  },
  {
    id: "3",
    type: "offer",
    title: "Posted weekend gardening",
    detail: "2 hours available",
    time: "1 week ago",
  },
  {
    id: "4",
    type: "earned",
    title: "Dog walking for the Chen family",
    detail: "Errands · 30 min",
    time: "2 weeks ago",
    hours: 0.5,
    person: "Chen family",
  },
];

export const MOCK_OFFERS: OfferItem[] = [
  {
    id: "o1",
    title: "Weekend gardening",
    category: "Outdoors",
    hours: 2,
    status: "active",
    posted: "2 days ago",
    memberId: "dev",
    memberName: "You",
    description: "Happy to help weed, plant, or tidy up your yard.",
  },
  {
    id: "o2",
    title: "Math tutoring (grades 6–8)",
    category: "Education",
    hours: 1,
    status: "active",
    posted: "Jun 5",
    memberId: "m3",
    memberName: "Jordan Lee",
    description: "Patient explanations, homework help, or test prep.",
  },
  {
    id: "o3",
    title: "Furniture assembly",
    category: "Home",
    hours: 1.5,
    status: "active",
    posted: "Jun 3",
    memberId: "m5",
    memberName: "Priya Sharma",
    description: "IKEA, Wayfair, whatever — I've assembled it all.",
  },
  {
    id: "o4",
    title: "Bike repair & tune-ups",
    category: "Repair",
    hours: 1,
    status: "active",
    posted: "Yesterday",
    memberId: "m2",
    memberName: "Alex Rivera",
    description: "Flat tires, brake adjustments, general maintenance.",
  },
];

export const MOCK_REQUESTS: RequestItem[] = [
  {
    id: "r1",
    title: "Bike repair & tune-up",
    category: "Repair",
    hours: 1,
    status: "open",
    posted: "Today",
    memberId: "dev",
    memberName: "You",
    description: "Chain keeps slipping. Need someone who knows bikes.",
  },
  {
    id: "r2",
    title: "Resume review before job fair",
    category: "Career",
    hours: 0.5,
    status: "open",
    posted: "Yesterday",
    memberId: "m6",
    memberName: "Chris Taylor",
    description: "Applying to retail roles, would love a second pair of eyes.",
  },
  {
    id: "r3",
    title: "Grocery pickup this Saturday",
    category: "Errands",
    hours: 0.5,
    status: "open",
    posted: "2 days ago",
    memberId: "m4",
    memberName: "Sam Okonkwo",
    description: "Can't drive this week — list is ready, store is nearby.",
  },
];

export const HOME_FEED: FeedOpportunity[] = [
  {
    id: "r2",
    type: "request",
    title: "Resume review before job fair",
    category: "Career",
    hours: 0.5,
    memberId: "m6",
    memberName: "Chris Taylor",
    posted: "Yesterday",
    description: "Applying to retail roles, would love a second pair of eyes.",
  },
  {
    id: "o4",
    type: "offer",
    title: "Bike repair & tune-ups",
    category: "Repair",
    hours: 1,
    memberId: "m2",
    memberName: "Alex Rivera",
    posted: "Yesterday",
    description: "Flat tires, brake adjustments, general maintenance.",
  },
  {
    id: "o2",
    type: "offer",
    title: "Math tutoring (grades 6–8)",
    category: "Education",
    hours: 1,
    memberId: "m3",
    memberName: "Jordan Lee",
    posted: "Jun 5",
    description: "Patient explanations, homework help, or test prep.",
  },
  {
    id: "r3",
    type: "request",
    title: "Grocery pickup this Saturday",
    category: "Errands",
    hours: 0.5,
    memberId: "m4",
    memberName: "Sam Okonkwo",
    posted: "2 days ago",
    description: "Can't drive this week — list is ready, store is nearby.",
  },
];
