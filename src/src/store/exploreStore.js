import { create } from 'zustand';
import { searchService } from '../services/searchService';
import {
  TRENDING_TOPICS,
  SUGGESTED_USERS,
  POPULAR_MEDIA,
} from '../mock/explore';

/**
 * Explore & Search store.
 * Manages trending data, suggested users, search state, and results.
 */
export const useExploreStore = create((set, get) => ({
  // ── Explore data ───────────────────────────────────────────────────────
  trending: [],
  suggestedUsers: [],
  popularMedia: [],
  exploreLoading: false,
  activeTab: 'trending', // 'trending' | 'people' | 'media' | 'news'

  // ── Search state ───────────────────────────────────────────────────────
  query: '',
  searchTab: 'all', // 'all' | 'tweets' | 'people' | 'hashtags'
  results: { tweets: [], users: [], hashtags: [] },
  searching: false,
  hasSearched: false,

  // ── Explore actions ────────────────────────────────────────────────────
  async loadExplore() {
    set({ exploreLoading: true });
    await new Promise((r) => setTimeout(r, 500));
    set({
      trending: TRENDING_TOPICS,
      suggestedUsers: SUGGESTED_USERS,
      popularMedia: POPULAR_MEDIA,
      exploreLoading: false,
    });
  },

  setExploreTab(tab) {
    set({ activeTab: tab });
  },

  // ── Search actions ─────────────────────────────────────────────────────
  setQuery(query) {
    set({ query });
  },

  setSearchTab(tab) {
    set({ searchTab: tab });
  },

  async runSearch(query) {
    if (!query.trim()) {
      set({ results: { tweets: [], users: [], hashtags: [] }, hasSearched: false });
      return;
    }
    set({ searching: true });
    try {
      const results = await searchService.searchAll(query);
      set({ results, searching: false, hasSearched: true });
    } catch {
      set({ searching: false });
    }
  },

  clearSearch() {
    set({
      query: '',
      results: { tweets: [], users: [], hashtags: [] },
      hasSearched: false,
    });
  },
}));
