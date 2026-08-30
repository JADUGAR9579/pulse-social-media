import { create } from 'zustand';
import { authService } from '../services/authService';

/**
 * Auth store — single source of truth for the authenticated user.
 * The store itself is not persisted (tokens live in storage, not Zustand)
 * so that sessionStorage "remember me off" works correctly across tabs.
 */
export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // true on first mount while session is being rehydrated

  /** Called once on app mount to restore a persisted session */
  rehydrate() {
    const session = authService.getStoredSession();
    if (session) {
      set({ user: session.user, token: session.token, isAuthenticated: true });
    }
    set({ isLoading: false });
  },

  async login(credentials) {
    const { user, token } = await authService.login(credentials);
    set({ user, token, isAuthenticated: true });
    return user;
  },

  async signup(data) {
    const { user, token } = await authService.signup(data);
    set({ user, token, isAuthenticated: true });
    return user;
  },

  logout() {
    authService.logout();
    set({ user: null, token: null, isAuthenticated: false });
  },

  /** Update user fields in-store (used by Edit Profile in Phase 4) */
  updateUser(patch) {
    set((state) => ({ user: { ...state.user, ...patch } }));
  },
}));
