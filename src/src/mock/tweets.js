import dayjs from 'dayjs';

const now = dayjs();

/**
 * Seeded tweet data used before real backend is connected.
 * Covers all tweet types: regular, with media, with poll, pinned, repost.
 */
export const MOCK_TWEETS = [
  {
    id: 'tweet_001',
    userId: 'user_001',
    user: {
      id: 'user_001',
      name: 'Alex Rivera',
      username: 'alexrivera',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=alex',
      verified: true,
    },
    content:
      'Just shipped the first version of Pulse 🚀 A Twitter-inspired platform built with React 19, Tailwind v4, and a ton of care. Thread incoming on the architecture decisions 🧵',
    media: [],
    likes: 142,
    comments: 38,
    reposts: 24,
    bookmarks: 17,
    views: 4820,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    isPinned: true,
    createdAt: now.subtract(2, 'hour').toISOString(),
  },
  {
    id: 'tweet_002',
    userId: 'user_admin',
    user: {
      id: 'user_admin',
      name: 'Pulse Admin',
      username: 'pulseadmin',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=admin',
      verified: true,
    },
    content:
      'Welcome to Pulse ✨ The platform is live and we\'re onboarding our first wave of users. Dark mode is the default — light mode is available in Settings. Let us know what you think!',
    media: [],
    likes: 389,
    comments: 72,
    reposts: 91,
    bookmarks: 44,
    views: 12400,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    isPinned: false,
    createdAt: now.subtract(5, 'hour').toISOString(),
  },
  {
    id: 'tweet_003',
    userId: 'user_002',
    user: {
      id: 'user_002',
      name: 'Priya Patel',
      username: 'priyapatel',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=priya',
      verified: false,
    },
    content:
      'Hot take: the best thing about building with React 19 is finally having first-class support for async components. No more waterfall patterns, no more excessive useEffect chains. The mental model just clicks.',
    media: [],
    likes: 87,
    comments: 21,
    reposts: 13,
    bookmarks: 9,
    views: 3210,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    isPinned: false,
    createdAt: now.subtract(8, 'hour').toISOString(),
  },
  {
    id: 'tweet_004',
    userId: 'user_003',
    user: {
      id: 'user_003',
      name: 'Jordan Kim',
      username: 'jordankim',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=jordan',
      verified: false,
    },
    content:
      'Tailwind CSS v4 with the @theme directive is genuinely exciting. No more tailwind.config.js for most projects — just CSS custom properties and the cascade. It feels like the library finally grew up.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        alt: 'Code editor showing Tailwind CSS configuration',
      },
    ],
    likes: 204,
    comments: 45,
    reposts: 67,
    bookmarks: 31,
    views: 8760,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    isPinned: false,
    createdAt: now.subtract(12, 'hour').toISOString(),
  },
  {
    id: 'tweet_005',
    userId: 'user_004',
    user: {
      id: 'user_004',
      name: 'Sam Torres',
      username: 'samtorres',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=sam',
      verified: false,
    },
    content:
      'Which state management library do you actually use in production in 2025?',
    media: [],
    poll: {
      options: [
        { id: 'p1', label: 'Zustand', votes: 1420 },
        { id: 'p2', label: 'Redux Toolkit', votes: 830 },
        { id: 'p3', label: 'Jotai', votes: 540 },
        { id: 'p4', label: 'Context API only', votes: 290 },
      ],
      totalVotes: 3080,
      endsAt: now.add(1, 'day').toISOString(),
      userVote: null,
    },
    likes: 56,
    comments: 88,
    reposts: 12,
    bookmarks: 6,
    views: 5430,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    isPinned: false,
    createdAt: now.subtract(1, 'day').toISOString(),
  },
  {
    id: 'tweet_006',
    userId: 'user_002',
    user: {
      id: 'user_002',
      name: 'Priya Patel',
      username: 'priyapatel',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=priya',
      verified: false,
    },
    content:
      'The Framer Motion v12 API is so clean now. Shared layout animations that just work, exit animations that don\'t require AnimatePresence everywhere. Whoever designed this DX deserves an award.',
    media: [],
    likes: 119,
    comments: 14,
    reposts: 28,
    bookmarks: 22,
    views: 4100,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    isPinned: false,
    createdAt: now.subtract(2, 'day').toISOString(),
  },
  {
    id: 'tweet_007',
    userId: 'user_003',
    user: {
      id: 'user_003',
      name: 'Jordan Kim',
      username: 'jordankim',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=jordan',
      verified: false,
    },
    content:
      'Building in public day 14: Added infinite scroll to the feed today. The trick with react-infinite-scroll-component is making sure your threshold is generous — 400px works better than the default 200px on most viewport sizes.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
        alt: 'Code on a monitor',
      },
    ],
    likes: 73,
    comments: 19,
    reposts: 8,
    bookmarks: 14,
    views: 2800,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    isPinned: false,
    createdAt: now.subtract(3, 'day').toISOString(),
  },
  {
    id: 'tweet_008',
    userId: 'user_004',
    user: {
      id: 'user_004',
      name: 'Sam Torres',
      username: 'samtorres',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=sam',
      verified: false,
    },
    content:
      'Accessibility tip of the day: Never remove focus outlines. Instead of `outline: none`, use `outline-offset` and style it to match your design. Keyboard users depend on it. Your CSS reset is silently excluding millions of people.',
    media: [],
    likes: 512,
    comments: 34,
    reposts: 198,
    bookmarks: 87,
    views: 19200,
    isLiked: false,
    isBookmarked: false,
    isReposted: false,
    isPinned: false,
    createdAt: now.subtract(4, 'day').toISOString(),
  },
];

// Generate extra tweets for infinite scroll pagination
export function generateMoreTweets(page) {
  const users = [
    { id: 'user_001', name: 'Alex Rivera', username: 'alexrivera', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=alex', verified: true },
    { id: 'user_002', name: 'Priya Patel', username: 'priyapatel', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=priya', verified: false },
    { id: 'user_003', name: 'Jordan Kim', username: 'jordankim', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=jordan', verified: false },
    { id: 'user_004', name: 'Sam Torres', username: 'samtorres', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=sam', verified: false },
  ];

  const contents = [
    'Shipping features is a skill. Shipping the *right* features is an art. Most teams are great at the former, terrible at the latter.',
    'If your PR description is just "fixes" with no context, we need to talk.',
    'Code review culture tip: praise what you like, question what you don\'t understand, only block what actually matters. Most PRs should ship same-day.',
    'The best documentation is code that doesn\'t need any.',
    'You don\'t need a rewrite. You need to delete half of what you have and understand the other half.',
    'Design systems are team agreements frozen into code. Treat them like contracts, not suggestions.',
    'Spent an hour debugging a race condition. It was a missing `await`. Every time.',
  ];

  return Array.from({ length: 5 }, (_, i) => {
    const idx = (page * 5 + i) % contents.length;
    const user = users[(page * 5 + i) % users.length];
    return {
      id: `tweet_page${page}_${i}`,
      userId: user.id,
      user,
      content: contents[idx],
      media: [],
      likes: Math.floor(Math.random() * 200),
      comments: Math.floor(Math.random() * 50),
      reposts: Math.floor(Math.random() * 30),
      bookmarks: Math.floor(Math.random() * 20),
      views: Math.floor(Math.random() * 5000) + 500,
      isLiked: false,
      isBookmarked: false,
      isReposted: false,
      isPinned: false,
      createdAt: now.subtract(page * 5 + i + 5, 'day').toISOString(),
    };
  });
}
