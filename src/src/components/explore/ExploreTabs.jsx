import { motion } from 'framer-motion';
import { useExploreStore } from '../../store/exploreStore';
import { cn } from '../../lib/cn';

const TABS = [
  { id: 'trending', label: 'Trending' },
  { id: 'people', label: 'People' },
  { id: 'media', label: 'Media' },
  { id: 'news', label: 'News' },
];

export default function ExploreTabs() {
  const { activeTab, setExploreTab } = useExploreStore();

  return (
    <div
      className="flex border-b border-border"
      role="tablist"
      aria-label="Explore tabs"
    >
      {TABS.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            onClick={() => setExploreTab(tab.id)}
            className={cn(
              'relative flex-1 py-3.5 text-sm font-medium transition-colors',
              active
                ? 'text-text-primary'
                : 'text-text-muted hover:text-text-primary hover:bg-surface/60'
            )}
          >
            {tab.label}
            {active && (
              <motion.div
                layoutId="explore-tab-indicator"
                className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
