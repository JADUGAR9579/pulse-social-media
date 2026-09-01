import { create } from 'zustand';
import { MOCK_PROFILES, MOCK_FOLLOWERS } from '../mock/profiles';
import { MOCK_TWEETS } from '../mock/tweets';

const DELAY = (ms = 500) => new Promise((r) => setTimeout(r, ms));

/**
 * Profile store.
 * Manages the currently-viewed profile, follow/unfollow, and edit profile.
 * Profile tabs (tweets / replies / media / likes) filter from the global mock tweets.
 */
export const useProfileStore = create((set, get) => ({
  profile: null,
  isLoading: false,
  following: new Set(), // set of userIds the current user follows
  activeTab: 'tweets',  // 'tweets' | 'replies' | 'media' | 'likes'

  /** Load a profile by username */
  async loadProfile(username) {
    set({ isLoading: true, profile: null });
    await DELAY(600);

    const profile = Object.values(MOCK_PROFILES).find(
      (p) => p.username === username
    );

    if (!profile) {
      set({ isLoading: false });
      return null;
    }

    // Seed initial follow state from mock data
    const followers = MOCK_FOLLOWERS[profile.id] ?? [];
    set({
      profile,
      isLoading: false,
      following: new Set(followers),
    });

    return profile;
  },

  setTab(tab) {
    set({ activeTab: tab });
  },

  /** Toggle follow/unfollow for a userId */
  toggleFollow(userId) {
    set((s) => {
      const next = new Set(s.following);
      const isFollowing = next.has(userId);
      if (isFollowing) {
        next.delete(userId);
      } else {
        next.add(userId);
      }

      // Optimistically update follower count on the displayed profile
      const profile =
        s.profile?.id === userId
          ? {
              ...s.profile,
              followers: isFollowing
                ? s.profile.followers - 1
                : s.profile.followers + 1,
            }
          : s.profile;

      return { following: next, profile };
    });
  },

  isFollowing(userId) {
    return get().following.has(userId);
  },

  /** Update profile fields (called from EditProfileModal) */
  updateProfile(patch) {
    set((s) => ({
      profile: s.profile ? { ...s.profile, ...patch } : s.profile,
    }));
  },

  /** Get tweets belonging to the viewed profile */
  getTweets() {
    const { profile } = get();
    if (!profile) return [];
    return MOCK_TWEETS.filter((t) => t.userId === profile.id);
  },

  /** Get media tweets (tweets with images) for the media tab */
  getMediaTweets() {
    return get()
      .getTweets()
      .filter((t) => t.media?.length > 0);
  },

  /** Get liked tweets (mock: return first 3 from global feed) */
  getLikedTweets() {
    return MOCK_TWEETS.slice(0, 3);
  },
}));
