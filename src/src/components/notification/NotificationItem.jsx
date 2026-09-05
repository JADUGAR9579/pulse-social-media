import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, MessageCircle, Repeat2, UserPlus,
  AtSign, Bell, X,
} from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import { useRelativeTime } from '../../hooks/useRelativeTime';
import { cn } from '../../lib/cn';
import { staggerItem } from '../../animations/variants';

const TYPE_CONFIG = {
  like:    { icon: Heart,          color: 'text-danger',   bg: 'bg-danger/10',   label: 'liked your post' },
  comment: { icon: MessageCircle,  color: 'text-accent',   bg: 'bg-accent-muted',label: 'replied to your post' },
  repost:  { icon: Repeat2,        color: 'text-positive', bg: 'bg-positive/10', label: 'reposted your post' },
  follow:  { icon: UserPlus,       color: 'text-accent',   bg: 'bg-accent-muted',label: 'followed you' },
  mention: { icon: AtSign,         color: 'text-warning',  bg: 'bg-warning/10',  label: 'mentioned you' },
  system:  { icon: Bell,           color: 'text-accent',   bg: 'bg-accent-muted',label: '' },
};

export default function NotificationItem({ notification: n }) {
  const { markRead, deleteNotification } = useNotificationStore();
  const time = useRelativeTime(n.createdAt);
  const config = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.system;
  const Icon = config.icon;

  function handleClick() {
    if (!n.read) markRead(n.id);
  }

  return (
    <motion.div
      variants={staggerItem}
      onClick={handleClick}
      className={cn(
        'group relative flex gap-3 border-b border-border px-4 py-4 transition-colors',
        n.read ? 'hover:bg-surface/40' : 'bg-accent-muted/30 hover:bg-accent-muted/50'
      )}
    >
      {/* Unread indicator */}
      {!n.read && (
        <span className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent" />
      )}

      {/* Type icon */}
      <div
        className={cn(
          'mt-0.5 grid h-9 w-9 flex-shrink-0 place-items-center rounded-full',
          config.bg
        )}
      >
        <Icon size={17} className={config.color} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {n.type === 'system' ? (
          <>
            <p className="font-semibold text-text-primary">{n.title}</p>
            <p className="mt-0.5 text-sm text-text-muted">{n.body}</p>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              {n.actor && (
                <>
                  <Link
                    to={`/profile/${n.actor.username}`}
                    className="font-semibold text-text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {n.actor.name}
                  </Link>
                  <img
                    src={n.actor.avatar}
                    alt={n.actor.name}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                </>
              )}
              <span className="text-sm text-text-muted">{config.label}</span>
            </div>

            {n.comment && (
              <p className="mt-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-muted">
                "{n.comment}"
              </p>
            )}

            {n.tweet && (
              <p className="mt-0.5 truncate text-sm text-text-faint">
                {n.tweet.excerpt}
              </p>
            )}
          </>
        )}

        <span className="mt-1 block text-xs text-text-faint">{time}</span>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
        aria-label="Dismiss notification"
        className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-text-faint opacity-0 transition-opacity hover:bg-surface hover:text-text-primary group-hover:opacity-100"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}
