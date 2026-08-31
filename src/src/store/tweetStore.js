import { create } from 'zustand';
import { MOCK_TWEETS, generateMoreTweets } from '../mock/tweets';

const DELAY = (ms = 400) => new Promise((r) => setTimeout(r, ms));
const PAGE_SIZE = 8;

/**
 * Tweet feed store.
 * All mutations (like, bookmark, repost, delete, new tweet) are optimistic —
 * they update state immediately, then confirm or roll back after the mock API.
 * Replace the mock service calls with real API calls when the backend is ready.
 */
export const useTweetStore = create((set, get) => ({
  tweets: [],
  page: 0,
  hasMore: true,
  isLoading: false,
  activeTab: 'for-you', // 'for-you' | 'following' | 'latest' | 'media'

  /** Load the initial page */
  async loadFeed() {
    if (get().isLoading) return;
    set({ isLoading: true });
    await DELAY(600);
    set({ tweets: MOCK_TWEETS, page: 1, hasMore: true, isLoading: false });
  },

  /** Load the next page (called by InfiniteScroll) */
  async loadMore() {
    if (get().isLoading || !get().hasMore) return;
    set({ isLoading: true });
    await DELAY(700);
    const nextPage = get().page;
    const more = generateMoreTweets(nextPage);
    // Simulate end of feed after page 4
    const hasMore = nextPage < 4;
    set((s) => ({
      tweets: [...s.tweets, ...more],
      page: nextPage + 1,
      hasMore,
      isLoading: false,
    }));
  },

  setTab(tab) {
    set({ activeTab: tab, tweets: [], page: 0, hasMore: true });
    get().loadFeed();
  },

  /** Prepend a newly composed tweet to the top of the feed */
  addTweet(tweet) {
    set((s) => ({ tweets: [tweet, ...s.tweets] }));
  },

  /** Optimistic like toggle */
  toggleLike(tweetId) {
    set((s) => ({
      tweets: s.tweets.map((t) =>
        t.id === tweetId
          ? { ...t, isLiked: !t.isLiked, likes: t.isLiked ? t.likes - 1 : t.likes + 1 }
          : t
      ),
    }));
  },

  /** Optimistic bookmark toggle */
  toggleBookmark(tweetId) {
    set((s) => ({
      tweets: s.tweets.map((t) =>
        t.id === tweetId
          ? { ...t, isBookmarked: !t.isBookmarked, bookmarks: t.isBookmarked ? t.bookmarks - 1 : t.bookmarks + 1 }
          : t
      ),
    }));
  },

  /** Optimistic repost toggle */
  toggleRepost(tweetId) {
    set((s) => ({
      tweets: s.tweets.map((t) =>
        t.id === tweetId
          ? { ...t, isReposted: !t.isReposted, reposts: t.isReposted ? t.reposts - 1 : t.reposts + 1 }
          : t
      ),
    }));
  },

  /** Optimistic vote on a poll option */
  votePoll(tweetId, optionId) {
    set((s) => ({
      tweets: s.tweets.map((t) => {
        if (t.id !== tweetId || !t.poll || t.poll.userVote) return t;
        return {
          ...t,
          poll: {
            ...t.poll,
            userVote: optionId,
            totalVotes: t.poll.totalVotes + 1,
            options: t.poll.options.map((o) =>
              o.id === optionId ? { ...o, votes: o.votes + 1 } : o
            ),
          },
        };
      }),
    }));
  },

  /** Remove a tweet by ID (own tweets only — enforced in TweetCard) */
  deleteTweet(tweetId) {
    set((s) => ({ tweets: s.tweets.filter((t) => t.id !== tweetId) }));
  },

  /** Increment comment count (comment submission lands in Phase 6) */
  incrementComments(tweetId) {
    set((s) => ({
      tweets: s.tweets.map((t) =>
        t.id === tweetId ? { ...t, comments: t.comments + 1 } : t
      ),
    }));
  },
}));
