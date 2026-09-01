import { motion } from 'framer-motion';
import { FileText, MessageSquare, Image, Heart } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import TweetCard from '../tweet/TweetCard';
import { staggerContainer } from '../../animations/variants';

function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-surface">
        <Icon size={28} className="text-text-faint" />
      </div>
      <div>
        <p className="font-display text-lg font-semibold text-text-primary">{title}</p>
        <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
      </div>
    </div>
  );
}

export default function ProfileTweetList() {
  const { activeTab, profile, getTweets, getMediaTweets, getLikedTweets } =
    useProfileStore();

  let tweets = [];

  if (activeTab === 'tweets') tweets = getTweets();
  else if (activeTab === 'replies') tweets = []; // replies coming in Phase 6
  else if (activeTab === 'media') tweets = getMediaTweets();
  else if (activeTab === 'likes') tweets = getLikedTweets();

  if (activeTab === 'replies') {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No replies yet"
        subtitle={`When ${profile?.name ?? 'this user'} replies to posts, they'll appear here.`}
      />
    );
  }

  if (!tweets.length) {
    const icons = { tweets: FileText, media: Image, likes: Heart };
    const subtitles = {
      tweets: "Posts will appear here once they're shared.",
      media: 'Photos and videos will appear here.',
      likes: "Posts liked by this account will appear here.",
    };
    return (
      <EmptyState
        icon={icons[activeTab] ?? FileText}
        title="Nothing here yet"
        subtitle={subtitles[activeTab]}
      />
    );
  }

  return (
    <motion.div
      key={activeTab}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </motion.div>
  );
}
