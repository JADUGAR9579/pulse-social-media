import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useExploreStore } from '../../store/exploreStore';
import { formatCount } from '../../utils/formatCount';
import Button from '../ui/Button';
import { staggerContainer, staggerItem } from '../../animations/variants';

function UserCard({ user }) {
  const [following, setFollowing] = useState(false);

  function handleFollow() {
    setFollowing((f) => !f);
    toast.success(
      following ? `Unfollowed @${user.username}` : `Following @${user.username}`
    );
  }

  return (
    <motion.div
      variants={staggerItem}
      className="glass flex flex-col gap-3 rounded-2xl p-4 transition-shadow hover:shadow-lg"
    >
      <Link
        to={`/profile/${user.username}`}
        className="flex items-center gap-3"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate font-semibold text-text-primary hover:underline">
              {user.name}
            </span>
            {user.verified && (
              <BadgeCheck size={15} className="flex-shrink-0 text-accent" />
            )}
          </div>
          <span className="truncate text-sm text-text-muted">
            @{user.username}
          </span>
        </div>
      </Link>

      {user.bio && (
        <p className="line-clamp-2 text-sm text-text-muted">{user.bio}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-text-faint">
          {formatCount(user.followers)} followers
        </span>
        <Button
          size="sm"
          variant={following ? 'secondary' : 'primary'}
          onClick={handleFollow}
          className="px-4"
        >
          {following ? 'Following' : 'Follow'}
        </Button>
      </div>
    </motion.div>
  );
}

export default function SuggestedUsers() {
  const { suggestedUsers, exploreLoading } = useExploreStore();

  if (exploreLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass flex flex-col gap-3 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 animate-pulse rounded-full bg-surface" />
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="h-3.5 w-24 animate-pulse rounded-full bg-surface" />
                <div className="h-3 w-16 animate-pulse rounded-full bg-surface" />
              </div>
            </div>
            <div className="h-3 w-full animate-pulse rounded-full bg-surface" />
            <div className="h-3 w-3/4 animate-pulse rounded-full bg-surface" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-3 sm:grid-cols-2"
    >
      {suggestedUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </motion.div>
  );
}
