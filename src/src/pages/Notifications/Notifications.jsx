import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCheck, Bell } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';
import NotificationItem from '../../components/notification/NotificationItem';
import { staggerContainer } from '../../animations/variants';
import { cn } from '../../lib/cn';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'mentions', label: 'Mentions' },
];

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-surface">
        <Bell size={28} className="text-text-faint" />
      </div>
      <p className="font-display text-xl font-semibold">Nothing here yet</p>
      <p className="max-w-xs text-sm text-text-muted">
        When someone likes, replies, or follows you, you'll see it here.
      </p>
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className="flex gap-3 border-b border-border px-4 py-4">
      <div className="h-9 w-9 animate-pulse rounded-full bg-surface" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-3.5 w-48 animate-pulse rounded-full bg-surface" />
        <div className="h-3 w-full animate-pulse rounded-full bg-surface" />
        <div className="h-3 w-16 animate-pulse rounded-full bg-surface" />
      </div>
    </div>
  );
}

export default function Notifications() {
  const {
    notifications,
    isLoading,
    activeTab,
    setTab,
    markAllRead,
    loadNotifications,
  } = useNotificationStore();

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const unread = notifications.filter((n) => !n.read).length;

  const filtered =
    activeTab === 'mentions'
      ? notifications.filter((n) => n.type === 'mention')
      : notifications;

  return (
    <>
      <Helmet><title>Notifications · Pulse</title></Helmet>

      {/* Sticky header */}
      <div className="glass sticky top-0 z-30">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <h1 className="font-display text-xl font-semibold">Notifications</h1>
            {unread > 0 && (
              <p className="text-xs text-text-muted">{unread} unread</p>
            )}
          </div>
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent-muted"
              aria-label="Mark all as read"
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border" role="tablist">
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
                    layoutId="notif-tab-indicator"
                    className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div>{Array.from({ length: 6 }).map((_, i) => <SkeletonItem key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filtered.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </motion.div>
      )}
    </>
  );
}
