import { motion } from 'framer-motion';
import { useProfileStore } from '../../store/profileStore';
import { cn } from '../../lib/cn';

const TABS = [
  { id: 'tweets', label: 'Posts' },
  { id: 'replies', label: 'Replies' },
  { id: 'media', label: 'Media' },
  { id: 'likes', label: 'Likes' },
];

export default function ProfileTabs() {
  const { activeTab, setTab } = useProfileStore();

  return (
    <div
      className="flex border-b border-border"
      role="tablist"
      aria-label="Profile content tabs"
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
              active
                ? 'text-text-primary'
                : 'text-text-muted hover:text-text-primary hover:bg-surface/60'
            )}
          >
            {tab.label}
            {active && (
              <motion.div
                layoutId="profile-tab-indicator"
                className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
