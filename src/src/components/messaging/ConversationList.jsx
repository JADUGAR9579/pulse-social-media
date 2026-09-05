import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { useMessageStore } from '../../store/messageStore';
import { useRelativeTime } from '../../hooks/useRelativeTime';
import { cn } from '../../lib/cn';
import { staggerContainer, staggerItem } from '../../animations/variants';

function ConvItem({ conv, active, onClick }) {
  const time = useRelativeTime(conv.lastMessage?.sentAt ?? conv.createdAt);
  return (
    <motion.button
      variants={staggerItem}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors',
        active ? 'bg-accent-muted/40' : 'hover:bg-surface/60'
      )}
    >
      {/* Avatar with online dot */}
      <div className="relative flex-shrink-0">
        <img
          src={conv.participant.avatar}
          alt={conv.participant.name}
          className="h-11 w-11 rounded-full object-cover"
        />
        {conv.participant.online && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-bg bg-positive" />
        )}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1">
            <span className={cn(
              'truncate text-sm font-semibold',
              conv.unread > 0 ? 'text-text-primary' : 'text-text-primary'
            )}>
              {conv.participant.name}
            </span>
            {conv.participant.verified && (
              <BadgeCheck size={13} className="flex-shrink-0 text-accent" />
            )}
          </div>
          <span className="flex-shrink-0 text-xs text-text-faint">{time}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className={cn(
            'truncate text-sm',
            conv.unread > 0 ? 'font-medium text-text-primary' : 'text-text-muted'
          )}>
            {conv.lastMessage?.text}
          </p>
          {conv.unread > 0 && (
            <span className="flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
              {conv.unread}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

export default function ConversationList() {
  const { conversations, activeConvId, openConversation, isLoadingConvs } =
    useMessageStore();

  if (isLoadingConvs) {
    return (
      <div className="flex flex-col gap-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 border-b border-border px-4 py-3">
            <div className="h-11 w-11 animate-pulse rounded-full bg-surface" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-3.5 w-32 animate-pulse rounded-full bg-surface" />
              <div className="h-3 w-full animate-pulse rounded-full bg-surface" />
            </div>
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
    >
      {conversations.map((conv) => (
        <ConvItem
          key={conv.id}
          conv={conv}
          active={conv.id === activeConvId}
          onClick={() => openConversation(conv.id)}
        />
      ))}
    </motion.div>
  );
}
