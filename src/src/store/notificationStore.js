import { create } from 'zustand';
import { MOCK_NOTIFICATIONS } from '../mock/notifications';
import dayjs from 'dayjs';

/**
 * Notifications store.
 * Simulates real-time delivery by injecting a new notification
 * every 45 seconds while the app is open.
 */
export const useNotificationStore = create((set, get) => ({
  notifications: [],
  isLoading: false,
  activeTab: 'all', // 'all' | 'mentions'
  simulationTimer: null,

  get unreadCount() {
    return get().notifications.filter((n) => !n.read).length;
  },

  async loadNotifications() {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 500));
    set({ notifications: MOCK_NOTIFICATIONS, isLoading: false });
    get().startSimulation();
  },

  setTab(tab) {
    set({ activeTab: tab });
  },

  markRead(id) {
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllRead() {
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  deleteNotification(id) {
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    }));
  },

  /** Inject a simulated incoming notification */
  injectNotification(notif) {
    set((s) => ({ notifications: [notif, ...s.notifications] }));
  },

  /** Simulate real-time notifications every 45s */
  startSimulation() {
    const existing = get().simulationTimer;
    if (existing) return; // already running

    const SIMULATED = [
      {
        type: 'like',
        actor: {
          id: 'user_004',
          name: 'Sam Torres',
          username: 'samtorres',
          avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=sam',
        },
        tweet: { id: 'tweet_002', excerpt: 'Welcome to Pulse ✨' },
      },
      {
        type: 'follow',
        actor: {
          id: 'user_002',
          name: 'Priya Patel',
          username: 'priyapatel',
          avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=priya',
        },
      },
      {
        type: 'comment',
        actor: {
          id: 'user_003',
          name: 'Jordan Kim',
          username: 'jordankim',
          avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=jordan',
        },
        tweet: { id: 'tweet_001', excerpt: 'Just shipped Pulse 🚀' },
        comment: 'So clean! What\'s the tech stack?',
      },
    ];

    let idx = 0;
    const timer = setInterval(() => {
      const template = SIMULATED[idx % SIMULATED.length];
      get().injectNotification({
        ...template,
        id: `notif_sim_${Date.now()}`,
        read: false,
        createdAt: dayjs().toISOString(),
      });
      idx++;
    }, 45_000);

    set({ simulationTimer: timer });
  },

  stopSimulation() {
    const timer = get().simulationTimer;
    if (timer) clearInterval(timer);
    set({ simulationTimer: null });
  },
}));
