import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MOCK_LISTS = [
  {
    id: 'list_001',
    name: 'React Devs',
    description: 'Top React developers and OSS contributors to follow.',
    owner: { id: 'user_admin', name: 'Pulse Admin', username: 'pulseadmin', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=admin' },
    members: ['user_001', 'user_002', 'user_003'],
    followers: 142,
    isFollowed: false,
    isOwn: false,
    coverColor: '#6e5bff',
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'list_002',
    name: 'Design Inspiration',
    description: 'Designers and design thinkers worth following.',
    owner: { id: 'user_002', name: 'Priya Patel', username: 'priyapatel', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=priya' },
    members: ['user_002', 'user_004'],
    followers: 89,
    isFollowed: true,
    isOwn: false,
    coverColor: '#ffb84d',
    createdAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'list_003',
    name: 'Accessibility Advocates',
    description: 'People building a more inclusive web.',
    owner: { id: 'user_004', name: 'Sam Torres', username: 'samtorres', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=sam' },
    members: ['user_004'],
    followers: 204,
    isFollowed: false,
    isOwn: false,
    coverColor: '#00e5a0',
    createdAt: '2024-01-20T00:00:00Z',
  },
];

export const useListStore = create(
  persist(
    (set, get) => ({
      lists: MOCK_LISTS,
      myLists: [], // lists owned by the current user
      isLoading: false,

      async loadLists() {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 400));
        set({ isLoading: false });
      },

      createList({ name, description, coverColor }) {
        const newList = {
          id: `list_${Date.now()}`,
          name,
          description,
          owner: { id: 'user_001', name: 'Alex Rivera', username: 'alexrivera', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=alex' },
          members: ['user_001'],
          followers: 0,
          isFollowed: false,
          isOwn: true,
          coverColor: coverColor || '#6e5bff',
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ lists: [newList, ...s.lists] }));
        return newList;
      },

      deleteList(id) {
        set((s) => ({ lists: s.lists.filter((l) => l.id !== id) }));
      },

      toggleFollow(id) {
        set((s) => ({
          lists: s.lists.map((l) =>
            l.id === id
              ? { ...l, isFollowed: !l.isFollowed, followers: l.isFollowed ? l.followers - 1 : l.followers + 1 }
              : l
          ),
        }));
      },
    }),
    { name: 'pulse-lists' }
  )
);
