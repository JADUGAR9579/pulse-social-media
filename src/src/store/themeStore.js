import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Theme store — controls dark/light mode across the app.
 * Dark mode is the default per the design spec.
 * Persists the user's choice across sessions.
 */
export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'dark', // 'dark' | 'light'

      setTheme: (theme) => {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
        set({ theme });
      },

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        get().setTheme(next);
      },
    }),
    {
      name: 'pulse-theme',
      onRehydrateStorage: () => (state) => {
        // Apply the persisted (or default) theme class on load
        const theme = state?.theme ?? 'dark';
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
      },
    }
  )
);
