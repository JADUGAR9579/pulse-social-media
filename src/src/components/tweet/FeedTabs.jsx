import { motion } from 'framer-motion';
import { useTweetStore } from '../../store/tweetStore';
import { cn } from '../../lib/cn';

const TABS = [
  { id: 'for-you', label: 'For you' },
  { id: 'following', label: 'Following' },
  { id: 'latest', label: 'Latest' },
  { id: 'media', label: 'Media' },
];

export default function FeedTabs() {
  const { activeTab, setTab } = useTweetStore();

  return (
    <div
      className="flex border-b border-border"
      role="tablist"
      aria-label="Feed tabs"
    >
      {TABS.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            onClick={() => setTab(tab.id)}
            className={cn(
              'relative flex-1 py-3.5 text-sm font-medium transition-colors',
              active ? 'text-text-primary' : 'text-text-muted hover:text-text-primary hover:bg-surface/60'
            )}
          >
            {tab.label}
            {active && (
              <motion.div
                layoutId="feed-tab-indicator"
                className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
