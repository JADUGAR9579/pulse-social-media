import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';

import { useTweetStore } from '../../store/tweetStore';
import TweetCard from './TweetCard';
import TweetSkeleton from './TweetSkeleton';
import { staggerContainer } from '../../animations/variants';

function EndMessage() {
  return (
    <div className="py-10 text-center text-sm text-text-faint">
      You're all caught up ✓
    </div>
  );
}

function LoadingMore() {
  return (
    <div className="flex justify-center py-6">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent" />
    </div>
  );
}

export default function TweetFeed() {
  const { tweets, hasMore, isLoading, loadFeed, loadMore } = useTweetStore();

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  if (isLoading && !tweets.length) {
    return <TweetSkeleton count={6} />;
  }

  return (
    <InfiniteScroll
      dataLength={tweets.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<LoadingMore />}
      endMessage={<EndMessage />}
      scrollThreshold={0.7}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </motion.div>
    </InfiniteScroll>
  );
}
