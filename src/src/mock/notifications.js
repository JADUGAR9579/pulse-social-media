import dayjs from 'dayjs';

const now = dayjs();

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif_001',
    type: 'like',
    read: false,
    createdAt: now.subtract(3, 'minute').toISOString(),
    actor: {
      id: 'user_002',
      name: 'Priya Patel',
      username: 'priyapatel',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=priya',
    },
    tweet: {
      id: 'tweet_001',
      excerpt: 'Just shipped the first version of Pulse 🚀',
    },
  },
  {
    id: 'notif_002',
    type: 'follow',
    read: false,
    createdAt: now.subtract(12, 'minute').toISOString(),
    actor: {
      id: 'user_003',
      name: 'Jordan Kim',
      username: 'jordankim',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=jordan',
    },
  },
  {
    id: 'notif_003',
    type: 'comment',
    read: false,
    createdAt: now.subtract(28, 'minute').toISOString(),
    actor: {
      id: 'user_004',
      name: 'Sam Torres',
      username: 'samtorres',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=sam',
    },
    tweet: {
      id: 'tweet_001',
      excerpt: 'Just shipped the first version of Pulse 🚀',
    },
    comment: 'This is amazing! Love the design direction you went with 🔥',
  },
  {
    id: 'notif_004',
    type: 'repost',
    read: true,
    createdAt: now.subtract(1, 'hour').toISOString(),
    actor: {
      id: 'user_admin',
      name: 'Pulse Admin',
      username: 'pulseadmin',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=admin',
    },
    tweet: {
      id: 'tweet_001',
      excerpt: 'Just shipped the first version of Pulse 🚀',
    },
  },
  {
    id: 'notif_005',
    type: 'mention',
    read: true,
    createdAt: now.subtract(2, 'hour').toISOString(),
    actor: {
      id: 'user_002',
      name: 'Priya Patel',
      username: 'priyapatel',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=priya',
    },
    tweet: {
      id: 'tweet_003',
      excerpt: 'Hot take: the best thing about building with React 19…',
    },
    comment: 'Great point @alexrivera — totally agree on the async patterns!',
  },
  {
    id: 'notif_006',
    type: 'system',
    read: true,
    createdAt: now.subtract(3, 'hour').toISOString(),
    title: 'Welcome to Pulse! 🎉',
    body: 'Your account is set up and ready to go. Start by exploring trending topics or composing your first post.',
  },
  {
    id: 'notif_007',
    type: 'like',
    read: true,
    createdAt: now.subtract(5, 'hour').toISOString(),
    actor: {
      id: 'user_003',
      name: 'Jordan Kim',
      username: 'jordankim',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=jordan',
    },
    tweet: {
      id: 'tweet_001',
      excerpt: 'Just shipped the first version of Pulse 🚀',
    },
  },
  {
    id: 'notif_008',
    type: 'follow',
    read: true,
    createdAt: now.subtract(1, 'day').toISOString(),
    actor: {
      id: 'user_004',
      name: 'Sam Torres',
      username: 'samtorres',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=sam',
    },
  },
  {
    id: 'notif_009',
    type: 'system',
    read: true,
    createdAt: now.subtract(2, 'day').toISOString(),
    title: 'Pulse is live in beta 🚀',
    body: 'We\'re onboarding our first wave of users. Share your feedback and help shape the platform.',
  },
];
