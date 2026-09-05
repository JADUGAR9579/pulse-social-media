import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { useMessageStore } from '../../store/messageStore';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/cn';

const QUICK_EMOJIS = ['😊', '👍', '❤️', '🔥', '😂', '🙏', '✨', '💯'];

function MessageBubble({ msg, isOwn }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[72%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isOwn
            ? 'rounded-br-sm bg-accent text-white'
            : 'rounded-bl-sm bg-surface text-text-primary'
        )}
      >
        <p>{msg.text}</p>
        <p
          className={cn(
            'mt-0.5 text-right text-[10px]',
            isOwn ? 'text-white/60' : 'text-text-faint'
          )}
        >
          {dayjs(msg.sentAt).format('h:mm A')}
          {isOwn && <span className="ml-1">{msg.seen ? '✓✓' : '✓'}</span>}
        </p>
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="flex items-center gap-1.5 px-2"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-text-faint"
          style={{
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </motion.div>
  );
}

export default function ChatWindow() {
  const user = useAuthStore((s) => s.user);
  const {
    activeConvId,
    conversations,
    messages,
    typing,
    sendMessage,
    closeConversation,
    isLoadingMsgs,
  } = useMessageStore();

  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const bottomRef = useRef(null);

  const conv = conversations.find((c) => c.id === activeConvId);
  const msgs = messages[activeConvId] ?? [];
  const isTyping = typing[activeConvId];

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, isTyping]);

  function handleSend() {
    if (!text.trim() || !user) return;
    sendMessage(activeConvId, text, user.id);
    setText('');
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (!conv) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center p-8">
        <p className="font-display text-xl font-semibold">Your messages</p>
        <p className="text-sm text-text-muted">
          Select a conversation to start chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Chat header */}
      <div className="glass flex items-center gap-3 border-b border-border px-4 py-3">
        <button
          onClick={closeConversation}
          className="flex-shrink-0 md:hidden"
          aria-label="Back to conversations"
        >
          <ArrowLeft size={20} />
        </button>
        <Link to={`/profile/${conv.participant.username}`} className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img
              src={conv.participant.avatar}
              alt={conv.participant.name}
              className="h-9 w-9 rounded-full object-cover"
            />
            {conv.participant.online && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-bg bg-positive" />
            )}
          </div>
          <div>
            <p className="font-semibold text-text-primary leading-tight">
              {conv.participant.name}
            </p>
            <p className="text-xs text-text-muted">
              {conv.participant.online ? 'Active now' : 'Offline'}
            </p>
          </div>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {isLoadingMsgs ? (
          <div className="flex justify-center py-10">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent" />
          </div>
        ) : (
          <>
            {msgs.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                isOwn={msg.senderId === user?.id}
              />
            ))}
            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-border p-3">
        <div className="flex items-end gap-2">
          {/* Emoji picker */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowEmoji((v) => !v)}
              aria-label="Add emoji"
              className="grid h-10 w-10 place-items-center rounded-full text-text-faint transition-colors hover:bg-surface hover:text-text-primary"
            >
              <Smile size={20} />
            </button>
            <AnimatePresence>
              {showEmoji && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass absolute bottom-12 left-0 z-50 flex flex-wrap gap-1 rounded-2xl p-3 shadow-xl"
                  style={{ width: 200 }}
                >
                  {QUICK_EMOJIS.map((e) => (
                    <button
                      key={e}
                      onClick={() => { setText((t) => t + e); setShowEmoji(false); }}
                      className="grid h-9 w-9 place-items-center rounded-lg text-xl hover:bg-surface"
                    >
                      {e}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Text input */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Message ${conv.participant.name}…`}
            rows={1}
            maxLength={1000}
            className="flex-1 resize-none rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-faint outline-none transition-colors focus-visible:border-accent"
            style={{ minHeight: 40, maxHeight: 120 }}
          />

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            aria-label="Send message"
            className={cn(
              'grid h-10 w-10 flex-shrink-0 place-items-center rounded-full transition-colors',
              text.trim()
                ? 'bg-accent text-white hover:bg-accent-hover'
                : 'bg-surface text-text-faint'
            )}
          >
            <Send size={17} />
          </button>
        </div>
      </div>

      {/* Bounce keyframe for typing dots */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
