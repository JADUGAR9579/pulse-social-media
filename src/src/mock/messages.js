import dayjs from 'dayjs';

const now = dayjs();

export const MOCK_CONVERSATIONS = [
  {
    id: 'conv_001',
    participant: {
      id: 'user_002',
      name: 'Priya Patel',
      username: 'priyapatel',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=priya',
      online: true,
    },
    lastMessage: {
      text: 'Haha totally agree — the DX is just so much better now 🔥',
      sentAt: now.subtract(4, 'minute').toISOString(),
      senderId: 'user_002',
    },
    unread: 2,
  },
  {
    id: 'conv_002',
    participant: {
      id: 'user_003',
      name: 'Jordan Kim',
      username: 'jordankim',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=jordan',
      online: true,
    },
    lastMessage: {
      text: 'Let me know when you push the repo — I\'d love to contribute!',
      sentAt: now.subtract(1, 'hour').toISOString(),
      senderId: 'user_003',
    },
    unread: 1,
  },
  {
    id: 'conv_003',
    participant: {
      id: 'user_004',
      name: 'Sam Torres',
      username: 'samtorres',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=sam',
      online: false,
    },
    lastMessage: {
      text: 'Thanks for the shoutout! Appreciate it 🙏',
      sentAt: now.subtract(3, 'hour').toISOString(),
      senderId: 'user_001',
    },
    unread: 0,
  },
  {
    id: 'conv_004',
    participant: {
      id: 'user_admin',
      name: 'Pulse Admin',
      username: 'pulseadmin',
      avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=admin',
      online: true,
    },
    lastMessage: {
      text: 'Welcome to Pulse! Let us know if you need anything.',
      sentAt: now.subtract(1, 'day').toISOString(),
      senderId: 'user_admin',
    },
    unread: 0,
  },
];

export const MOCK_MESSAGES = {
  conv_001: [
    { id: 'msg_001', senderId: 'user_002', text: 'Hey! Saw your post about the launch — congrats! 🎉', sentAt: now.subtract(45, 'minute').toISOString(), seen: true },
    { id: 'msg_002', senderId: 'user_001', text: 'Thank you!! It\'s been a long journey building this thing out 😅', sentAt: now.subtract(40, 'minute').toISOString(), seen: true },
    { id: 'msg_003', senderId: 'user_002', text: 'What stack did you end up going with?', sentAt: now.subtract(35, 'minute').toISOString(), seen: true },
    { id: 'msg_004', senderId: 'user_001', text: 'React 19 + Tailwind v4 + Zustand. Really happy with it, the new @theme CSS config in TW4 is a game changer', sentAt: now.subtract(30, 'minute').toISOString(), seen: true },
    { id: 'msg_005', senderId: 'user_002', text: 'Oh nice! I\'ve been meaning to try Tailwind v4 — how\'s the migration from v3?', sentAt: now.subtract(20, 'minute').toISOString(), seen: true },
    { id: 'msg_006', senderId: 'user_001', text: 'Honestly smoother than expected. The PostCSS plugin approach is clean once you get used to it', sentAt: now.subtract(15, 'minute').toISOString(), seen: true },
    { id: 'msg_007', senderId: 'user_002', text: 'Haha totally agree — the DX is just so much better now 🔥', sentAt: now.subtract(4, 'minute').toISOString(), seen: false },
  ],
  conv_002: [
    { id: 'msg_101', senderId: 'user_003', text: 'Yo saw the Pulse launch — looks incredible!', sentAt: now.subtract(3, 'hour').toISOString(), seen: true },
    { id: 'msg_102', senderId: 'user_001', text: 'Thanks Jordan! Took a while but really happy with how it turned out', sentAt: now.subtract(2, 'hour').toISOString(), seen: true },
    { id: 'msg_103', senderId: 'user_003', text: 'Let me know when you push the repo — I\'d love to contribute!', sentAt: now.subtract(1, 'hour').toISOString(), seen: false },
  ],
  conv_003: [
    { id: 'msg_201', senderId: 'user_001', text: 'Hey Sam — shared your accessibility post, really solid content', sentAt: now.subtract(4, 'hour').toISOString(), seen: true },
    { id: 'msg_202', senderId: 'user_004', text: 'Thanks for the shoutout! Appreciate it 🙏', sentAt: now.subtract(3, 'hour').toISOString(), seen: true },
  ],
  conv_004: [
    { id: 'msg_301', senderId: 'user_admin', text: 'Welcome to Pulse! Let us know if you need anything.', sentAt: now.subtract(1, 'day').toISOString(), seen: true },
  ],
};
