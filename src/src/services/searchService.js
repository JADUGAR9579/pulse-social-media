import { MOCK_TWEETS } from '../mock/tweets';
import { MOCK_PROFILES } from '../mock/profiles';
import { TRENDING_TOPICS } from '../mock/explore';

const DELAY = (ms = 400) => new Promise((r) => setTimeout(r, ms));

/**
 * Mock search service.
 * Replace each method with a real API call when the backend is ready.
 * All searches are case-insensitive substring matches.
 */
export const searchService = {
  async searchAll(query) {
    await DELAY(350);
    const q = query.toLowerCase().trim();
    if (!q) return { tweets: [], users: [], hashtags: [] };

    const tweets = MOCK_TWEETS.filter(
      (t) =>
        t.content.toLowerCase().includes(q) ||
        t.user.username.toLowerCase().includes(q) ||
        t.user.name.toLowerCase().includes(q)
    ).slice(0, 8);

    const users = Object.values(MOCK_PROFILES)
      .filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.bio?.toLowerCase().includes(q)
      )
      .slice(0, 5);

    const hashtags = TRENDING_TOPICS.filter((t) =>
      t.topic.toLowerCase().includes(q)
    ).slice(0, 6);

    return { tweets, users, hashtags };
  },

  async searchUsers(query) {
    await DELAY(300);
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return Object.values(MOCK_PROFILES).filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q)
    );
  },

  async searchTweets(query) {
    await DELAY(300);
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return MOCK_TWEETS.filter((t) => t.content.toLowerCase().includes(q));
  },

  async searchHashtags(query) {
    await DELAY(300);
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return TRENDING_TOPICS.filter((t) =>
      t.topic.toLowerCase().includes(q)
    );
  },
};
