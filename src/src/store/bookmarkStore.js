import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_TWEETS } from '../mock/tweets';

/**
 * Bookmarks store.
 * Persisted to localStorage so saved tweets survive a page refresh.
 * Categories let users organise bookmarks (Phase 9 can add full CRUD for categories).
 */
export const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarkedIds: ['tweet_001', 'tweet_004', 'tweet_008'], // seeded
      categories: [
        { id: 'cat_default', name: 'All bookmarks', color: '#6e5bff' },
        { id: 'cat_dev', name: 'Dev & Code', color: '#00e5a0' },
        { id: 'cat_design', name: 'Design', color: '#ffb84d' },
      ],
      activeCategory: 'cat_default',

      get bookmarks() {
        const ids = get().bookmarkedIds;
        return MOCK_TWEETS.filter((t) => ids.includes(t.id));
      },

      isBookmarked(id) {
        return get().bookmarkedIds.includes(id);
      },

      addBookmark(id) {
        if (get().bookmarkedIds.includes(id)) return;
        set((s) => ({ bookmarkedIds: [id, ...s.bookmarkedIds] }));
      },

      removeBookmark(id) {
        set((s) => ({ bookmarkedIds: s.bookmarkedIds.filter((b) => b !== id) }));
      },

      clearAll() {
        set({ bookmarkedIds: [] });
      },

      setCategory(id) {
        set({ activeCategory: id });
      },

      addCategory(name, color = '#6e5bff') {
        const id = `cat_${Date.now()}`;
        set((s) => ({
          categories: [...s.categories, { id, name, color }],
        }));
        return id;
      },

      deleteCategory(id) {
        if (id === 'cat_default') return;
        set((s) => ({
          categories: s.categories.filter((c) => c.id !== id),
          activeCategory:
            s.activeCategory === id ? 'cat_default' : s.activeCategory,
        }));
      },
    }),
    { name: 'pulse-bookmarks' }
  )
);
