import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Trash2, Pin, Flag } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuthStore } from '../../store/authStore';
import { useTweetStore } from '../../store/tweetStore';
import { useRelativeTime } from '../../hooks/useRelativeTime';
import TweetMedia from './TweetMedia';
import TweetPoll from './TweetPoll';
import TweetActions from './TweetActions';
import { staggerItem } from '../../animations/variants';

export default function TweetCard({ tweet }) {
  const user = useAuthStore((s) => s.user);
  const deleteTweet = useTweetStore((s) => s.deleteTweet);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const incrementComments = useTweetStore((s) => s.incrementComments);
  const time = useRelativeTime(tweet.createdAt);

  const isOwn = user?.id === tweet.userId;

  function handleDelete() {
    deleteTweet(tweet.id);
    toast.success('Tweet deleted.');
    setMenuOpen(false);
  }

  function handleComment(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    incrementComments(tweet.id);
    setComment('');
    setShowCommentBox(false);
    toast.success('Reply posted!');
  }

  // Linkify hashtags and mentions
  function renderContent(text) {
    const parts = text.split(/(#\w+|@\w+)/g);
    return parts.map((part, i) =>
      part.startsWith('#') || part.startsWith('@') ? (
        <span key={i} className="cursor-pointer text-accent hover:underline">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  return (
    <motion.article
      variants={staggerItem}
      className="border-b border-border px-4 py-4 transition-colors hover:bg-surface/40"
      aria-label={`Tweet by ${tweet.user.name}`}
    >
      {/* Pinned label */}
      {tweet.isPinned && (
        <div className="mb-2 flex items-center gap-1.5 text-xs text-text-faint">
          <Pin size={12} />
          Pinned post
        </div>
      )}

      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={tweet.user.avatar}
            alt={tweet.user.name}
            className="h-10 w-10 rounded-full bg-surface object-cover"
            loading="lazy"
          />
        </div>

        {/* Content column */}
        <div className="min-w-0 flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5">
              <span className="truncate font-semibold text-text-primary leading-tight">
                {tweet.user.name}
              </span>
              {tweet.user.verified && (
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] text-white"
                  aria-label="Verified"
                >
                  ✓
                </span>
              )}
              <span className="truncate text-sm text-text-muted">
                @{tweet.user.username}
              </span>
              <span className="text-text-faint" aria-hidden>·</span>
              <time
                dateTime={tweet.createdAt}
                className="flex-shrink-0 text-sm text-text-muted"
              >
                {time}
              </time>
            </div>

            {/* More menu */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="More options"
                aria-expanded={menuOpen}
                className="grid h-8 w-8 place-items-center rounded-full text-text-faint transition-colors hover:bg-surface hover:text-text-primary"
              >
                <MoreHorizontal size={16} />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="glass absolute right-0 top-9 z-50 w-44 overflow-hidden rounded-xl shadow-xl"
                  >
                    {isOwn && (
                      <button
                        onClick={handleDelete}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-danger transition-colors hover:bg-surface"
                      >
                        <Trash2 size={15} />
                        Delete post
                      </button>
                    )}
                    <button
                      onClick={() => { toast.success('Reported.'); setMenuOpen(false); }}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-text-primary transition-colors hover:bg-surface"
                    >
                      <Flag size={15} />
                      Report post
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tweet text */}
          <p className="mt-1 text-[15px] leading-relaxed text-text-primary">
            {renderContent(tweet.content)}
          </p>

          {/* Media */}
          <TweetMedia media={tweet.media} />

          {/* Poll */}
          <TweetPoll poll={tweet.poll} tweetId={tweet.id} />

          {/* Actions */}
          <TweetActions
            tweet={tweet}
            onComment={() => setShowCommentBox((v) => !v)}
          />

          {/* Inline comment box */}
          <AnimatePresence>
            {showCommentBox && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleComment}
                className="mt-3 flex gap-2 overflow-hidden"
              >
                {user && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                  />
                )}
                <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-bg px-3">
                  <input
                    autoFocus
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Post your reply…"
                    maxLength={280}
                    className="flex-1 bg-transparent py-2 text-sm text-text-primary placeholder:text-text-faint outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!comment.trim()}
                    className="text-xs font-semibold text-accent disabled:text-text-faint"
                  >
                    Reply
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
