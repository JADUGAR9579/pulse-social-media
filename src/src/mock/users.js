/**
 * Mock user store — replaces a real database in development.
 * Any registered users are appended here at runtime (session-only).
 * Replace this entire module with an API call when connecting a real backend.
 */

export const MOCK_USERS = [
  {
    id: 'user_001',
    name: 'Alex Rivera',
    username: 'alexrivera',
    email: 'alex@pulse.dev',
    password: 'Password1',
    avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=alex`,
    bio: 'Building the future one tweet at a time.',
    location: 'San Francisco, CA',
    website: 'https://alexrivera.dev',
    followers: 1240,
    following: 380,
    verified: true,
    role: 'user',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'user_admin',
    name: 'Pulse Admin',
    username: 'pulseadmin',
    email: 'admin@pulse.dev',
    password: 'Password1',
    avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=admin`,
    bio: 'Platform administrator.',
    location: 'Remote',
    website: 'https://pulse.dev',
    followers: 9800,
    following: 42,
    verified: true,
    role: 'admin',
    createdAt: '2023-06-01T00:00:00Z',
  },
];

// Runtime registry — users created during this session are appended here
export const runtimeUsers = [...MOCK_USERS];
