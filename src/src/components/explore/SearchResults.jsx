import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hash, User2, FileText, BadgeCheck } from 'lucide-react';
import { useExploreStore } from '../../store/exploreStore';
import TweetCard from '../tweet/TweetCard';
import { formatCount } from '../../utils/formatCount';
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants';
import { cn } from '../../lib/cn';

// ── Search sub-tabs ────────────────────────────────────────────────────────
const SEARCH_TABS = [
  { id: 'all', label: 'All' },
  { id: 'tweets', label: 'Posts' },
  { id: 'people', label: 'People' },
  { id: 'hashtags', label: 'Hashtags' },
];

function SearchTabs() {
  const { searchTab, setSearchTab } = useExploreStore();
  return (
    <div className="flex border-b border-border" role="tablist">
      {SEARCH_TABS.map((tab) => {
        const active = searchTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            onClick={() => setSearchTab(tab.id)}
            className={cn(
              'relative flex-1 py-3 text-sm font-medium transition-colors',
              active ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
            )}
          >
            {tab.label}
            {active && (
              <motion.div
                layoutId="search-tab-indicator"
                className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Sub-sections ───────────────────────────────────────────────────────────
function UserResult({ user }) {
  return (
    <motion.div variants={staggerItem}>
      <Link
        to={`/profile/${user.username}`}
        className="flex items-center gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-surface/60"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate font-semibold text-text-primary">
              {user.name}
            </span>
            {user.verified && (
              <BadgeCheck size={15} className="flex-shrink-0 text-accent" />
            )}
          </div>
          <span className="text-sm text-text-muted">@{user.username}</span>
          {user.bio && (
            <p className="mt-0.5 line-clamp-1 text-sm text-text-muted">
              {user.bio}
            </p>
          )}
        </div>
        <span className="flex-shrink-0 text-xs text-text-faint">
          {formatCount(user.followers)} followers
        </span>
      </Link>
    </motion.div>
  );
}

function HashtagResult({ item, onClick }) {
  return (
    <motion.button
      variants={staggerItem}
      onClick={() => onClick(item.topic)}
      className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-surface/60"
    >
      <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-accent-muted">
        <Hash size={18} className="text-accent" />
      </div>
      <div>
        <p className="font-semibold text-text-primary">{item.topic}</p>
        <p className="text-sm text-text-muted">
          {formatCount(item.tweets)} posts
        </p>
      </div>
    </motion.button>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 border-b border-border px-4 py-3">
      <Icon size={16} className="text-text-faint" />
      <h2 className="font-display text-sm font-semibold text-text-muted uppercase tracking-wide">
        {title}
      </h2>
    </div>
  );
}

function Empty({ query }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-2 py-16 text-center"
    >
      <p className="font-display text-xl font-semibold">
        No results for "{query}"
      </p>
      <p className="text-sm text-text-muted">
        Try different keywords or check the spelling.
      </p>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function SearchResults() {
  const { query, results, searching, hasSearched, searchTab, setQuery } =
    useExploreStore();

  if (!hasSearched && !searching) return null;

  const { tweets, users, hashtags } = results;
  const totalResults = tweets.length + users.length + hashtags.length;

  const showTweets = searchTab === 'all' || searchTab === 'tweets';
  const showPeople = searchTab === 'all' || searchTab === 'people';
  const showHashtags = searchTab === 'all' || searchTab === 'hashtags';

  return (
    <div>
      <SearchTabs />

      {searching && (
        <div className="flex justify-center py-10">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
        </div>
      )}

      {!searching && hasSearched && totalResults === 0 && (
        <Empty query={query} />
      )}

      {!searching && totalResults > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={searchTab}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Hashtag results */}
            {showHashtags && hashtags.length > 0 && (
              <>
                {searchTab === 'all' && (
                  <SectionHeader icon={Hash} title="Hashtags" />
                )}
                {hashtags.map((item) => (
                  <HashtagResult
                    key={item.id}
                    item={item}
                    onClick={setQuery}
                  />
                ))}
              </>
            )}

            {/* People results */}
            {showPeople && users.length > 0 && (
              <>
                {searchTab === 'all' && (
                  <SectionHeader icon={User2} title="People" />
                )}
                {users.map((user) => (
                  <UserResult key={user.id} user={user} />
                ))}
              </>
            )}

            {/* Tweet results */}
            {showTweets && tweets.length > 0 && (
              <>
                {searchTab === 'all' && (
                  <SectionHeader icon={FileText} title="Posts" />
                )}
                {tweets.map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} />
                ))}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
