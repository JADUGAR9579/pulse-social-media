import { motion } from 'framer-motion';
import { useExploreStore } from '../../store/exploreStore';
import { staggerContainer, staggerItem } from '../../animations/variants';

export default function PopularMedia() {
  const { popularMedia, exploreLoading } = useExploreStore();

  if (exploreLoading) {
    return (
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-lg bg-surface"
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 gap-1"
    >
      {popularMedia.map((item) => (
        <motion.div
          key={item.id}
          variants={staggerItem}
          className="group relative aspect-square overflow-hidden rounded-lg bg-surface"
        >
          <img
            src={item.url}
            alt={item.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-xs font-medium text-white">
              @{item.username}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
