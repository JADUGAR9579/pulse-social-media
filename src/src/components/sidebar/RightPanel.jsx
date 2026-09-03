import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BadgeCheck } from 'lucide-react';
import { useExploreStore } from '../../store/exploreStore';
import { useProfileStore } from '../../store/profileStore';
import { formatCount } from '../../utils/formatCount';
import SearchBar from '../explore/SearchBar';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

function TrendingWidget({ trending }) {
  const { setQuery } = useExploreStore();

  return (
    <div className="glass flex flex-col rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <TrendingUp size={16} className="text-accent" />
        <h2 className="font-display text-base font-semibold">Trending</h2>
      </div>
      {trending.slice(0, 5).map((item) => (
        <button
          key={item.id}
          onClick={() => setQuery(item.topic)}
          className="flex flex-col gap-0.5 px-4 py-2.5 text-left transition-colors hover:bg-surface/60"
        >
          <span className="text-xs text-text-faint">{item.category}</span>
          <span className="text-sm font-semibold text-text-primary hover:text-accent transition-colors">
            {item.topic}
          </span>
          <span className="text-xs text-text-muted">{formatCount(item.tweets)} posts</span>
        </button>
      ))}
      <Link
        to="/explore"
        className="block px-4 py-3 text-sm text-accent hover:bg-surface/60 transition-colors"
      >
        Show more
      </Link>
    </div>
  );
}

function SuggestWidget({ users }) {
  const [followed, setFollowed] = useState(new Set());

  function toggle(userId, username) {
    setFollowed((prev) => {
      const next = new Set(prev);
      const isFollowing = next.has(userId);
      isFollowing ? next.delete(userId) : next.add(userId);
      toast.success(isFollowing ? `Unfollowed @${username}` : `Following @${username}`);
      return next;
    });
  }

  return (
    <div className="glass flex flex-col rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="font-display text-base font-semibold">Who to follow</h2>
      </div>
      {users.slice(0, 3).map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/60"
        >
          <Link to={`/profile/${user.username}`} className="flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-9 w-9 rounded-full object-cover"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link
              to={`/profile/${user.username}`}
              className="flex items-center gap-1"
            >
              <span className="truncate text-sm font-semibold text-text-primary hover:underline">
                {user.name}
              </span>
              {user.verified && (
                <BadgeCheck size={13} className="flex-shrink-0 text-accent" />
              )}
            </Link>
            <span className="text-xs text-text-muted">@{user.username}</span>
          </div>
          <Button
            size="sm"
            variant={followed.has(user.id) ? 'secondary' : 'primary'}
            onClick={() => toggle(user.id, user.username)}
            className="flex-shrink-0 px-3 text-xs"
          >
            {followed.has(user.id) ? 'Following' : 'Follow'}
          </Button>
        </div>
      ))}
      <Link
        to="/explore?tab=people"
        className="block px-4 py-3 text-sm text-accent hover:bg-surface/60 transition-colors"
      >
        Show more
      </Link>
    </div>
  );
}

/**
 * Right column — live search box, trending topics, suggested follows.
 * Populated with real data from the explore store.
 */
export default function RightPanel() {
  const { trending, suggestedUsers, loadExplore, exploreLoading } = useExploreStore();

  useEffect(() => {
    loadExplore();
  }, [loadExplore]);

  return (
    <aside className="sticky top-6 hidden h-fit w-[320px] flex-col gap-4 py-4 xl:flex">
      <SearchBar />

      {exploreLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="glass flex flex-col gap-2 rounded-2xl p-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-3.5 w-full animate-pulse rounded-full bg-surface" />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          {trending.length > 0 && <TrendingWidget trending={trending} />}
          {suggestedUsers.length > 0 && <SuggestWidget users={suggestedUsers} />}
        </>
      )}

      <p className="px-1 text-xs text-text-faint">
        © {new Date().getFullYear()} Pulse · Privacy · Terms
      </p>
    </aside>
  );
}
