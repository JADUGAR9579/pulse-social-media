import { Helmet } from 'react-helmet-async';
import TweetComposer from '../../components/tweet/TweetComposer';
import TweetFeed from '../../components/tweet/TweetFeed';
import FeedTabs from '../../components/tweet/FeedTabs';

/**
 * Home timeline — composer at the top, tabbed feed below.
 * Infinite scroll is handled inside TweetFeed.
 */
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home · Pulse</title>
      </Helmet>

      {/* Sticky page header */}
      <div className="glass sticky top-0 z-30 md:top-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h1 className="font-display text-xl font-semibold">Home</h1>
        </div>
        <FeedTabs />
      </div>

      {/* Composer */}
      <TweetComposer />

      {/* Feed */}
      <TweetFeed />
    </>
  );
}
