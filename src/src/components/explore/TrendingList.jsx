import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useExploreStore } from '../../store/exploreStore';
import { formatCount } from '../../utils/formatCount';
import { staggerContainer, staggerItem } from '../../animations/variants';

function TrendingSkeleton() {
  return (
    <div className="flex flex-col gap-0">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5 border-b border-border px-4 py-3">
          <div className="h-3 w-20 animate-pulse rounded-full bg-surface" />
          <div className="h-4 w-32 animate-pulse rounded-full bg-surface" />
          <div className="h-3 w-24 animate-pulse rounded-full bg-surface" />
        </div>
      ))}
    </div>
  );
}

export default function TrendingList() {
  const { trending, exploreLoading, setQuery } = useExploreStore();

  if (exploreLoading) return <TrendingSkeleton />;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {trending.map((item, i) => (
        <motion.button
          key={item.id}
          variants={staggerItem}
          onClick={() => setQuery(item.topic)}
          className="group flex w-full items-start justify-between border-b border-border px-4 py-3 text-left transition-colors hover:bg-surface/60"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-text-faint">
              {i + 1} · {item.category}
            </span>
            <span className="font-semibold text-text-primary group-hover:text-accent transition-colors">
              {item.topic}
            </span>
            <span className="text-xs text-text-muted">
              {formatCount(item.tweets)} posts
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-0.5 text-xs font-medium ${
                item.rising ? 'text-positive' : 'text-danger'
              }`}
            >
              {item.rising ? (
                <TrendingUp size={13} />
              ) : (
                <TrendingDown size={13} />
              )}
              {item.change}
            </span>
            <MoreHorizontal
              size={16}
              className="text-text-faint opacity-0 transition-opacity group-hover:opacity-100"
            />
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
