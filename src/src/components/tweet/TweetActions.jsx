import { motion } from 'framer-motion';
import {
  Heart, MessageCircle, Repeat2, Bookmark,
  Share2, BarChart2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useTweetStore } from '../../store/tweetStore';
import { formatCount } from '../../utils/formatCount';
import { cn } from '../../lib/cn';

function ActionButton({ icon: Icon, count, active, activeClass, label, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.82 }}
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'group flex items-center gap-1.5 text-text-faint transition-colors',
        active ? activeClass : 'hover:text-text-primary'
      )}
    >
      <span
        className={cn(
          'grid h-8 w-8 place-items-center rounded-full transition-colors group-hover:bg-surface',
          active && 'bg-transparent'
        )}
      >
        <Icon
          size={17}
          className={cn('transition-transform group-active:scale-90')}
          fill={active ? 'currentColor' : 'none'}
        />
      </span>
      {count !== undefined && (
        <span className="min-w-[1.5rem] text-xs font-medium tabular-nums">
          {formatCount(count)}
        </span>
      )}
    </motion.button>
  );
}

export default function TweetActions({ tweet, onComment }) {
  const { toggleLike, toggleBookmark, toggleRepost } = useTweetStore();

  function handleShare() {
    if (navigator.share) {
      navigator.share({ text: tweet.content, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  }

  return (
    <div className="mt-3 flex items-center justify-between">
      <ActionButton
        icon={MessageCircle}
        count={tweet.comments}
        label="Reply"
        onClick={onComment}
      />

      <ActionButton
        icon={Repeat2}
        count={tweet.reposts}
        active={tweet.isReposted}
        activeClass="text-positive"
        label={tweet.isReposted ? 'Undo repost' : 'Repost'}
        onClick={() => {
          toggleRepost(tweet.id);
          if (!tweet.isReposted) toast.success('Reposted!');
        }}
      />

      <ActionButton
        icon={Heart}
        count={tweet.likes}
        active={tweet.isLiked}
        activeClass="text-danger"
        label={tweet.isLiked ? 'Unlike' : 'Like'}
        onClick={() => toggleLike(tweet.id)}
      />

      <ActionButton
        icon={Bookmark}
        count={tweet.bookmarks}
        active={tweet.isBookmarked}
        activeClass="text-accent"
        label={tweet.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
        onClick={() => {
          toggleBookmark(tweet.id);
          toast.success(tweet.isBookmarked ? 'Removed from bookmarks' : 'Bookmarked!');
        }}
      />

      <div className="flex items-center gap-3">
        <ActionButton
          icon={BarChart2}
          count={tweet.views}
          label="Views"
          onClick={() => {}}
        />
        <ActionButton
          icon={Share2}
          label="Share"
          onClick={handleShare}
        />
      </div>
    </div>
  );
}
