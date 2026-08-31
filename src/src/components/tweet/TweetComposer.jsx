import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image, Smile, BarChart2, Globe, X, Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { v4 as uuid } from 'uuid';

import { useAuthStore } from '../../store/authStore';
import { useTweetStore } from '../../store/tweetStore';
import Button from '../ui/Button';
import { cn } from '../../lib/cn';

const MAX = 280;

// Simple emoji picker — full library (emoji-mart) lands in a later refinement
const QUICK_EMOJIS = ['😊', '🚀', '❤️', '🔥', '✨', '💯', '👀', '🧵', '💡', '🎉'];

export default function TweetComposer({ onPosted, compact = false }) {
  const user = useAuthStore((s) => s.user);
  const addTweet = useTweetStore((s) => s.addTweet);

  const [text, setText] = useState('');
  const [images, setImages] = useState([]); // { url, file }
  const [showEmoji, setShowEmoji] = useState(false);
  const [posting, setPosting] = useState(false);
  const [focused, setFocused] = useState(false);
  const fileRef = useRef(null);
  const textRef = useRef(null);

  const remaining = MAX - text.length;
  const overLimit = remaining < 0;
  const isEmpty = !text.trim() && !images.length;

  const circleRadius = 10;
  const circumference = 2 * Math.PI * circleRadius;
  const progress = Math.min(text.length / MAX, 1);
  const dashOffset = circumference * (1 - progress);
  const nearLimit = remaining <= 20;

  // Image selection
  function handleImages(e) {
    const files = Array.from(e.target.files || []);
    const previews = files.slice(0, 4 - images.length).map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...previews].slice(0, 4));
    e.target.value = '';
  }

  function removeImage(idx) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function insertEmoji(emoji) {
    const el = textRef.current;
    if (!el) { setText((t) => t + emoji); return; }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = text.slice(0, start) + emoji + text.slice(end);
    setText(next);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
    setShowEmoji(false);
  }

  const handlePost = useCallback(async () => {
    if (isEmpty || overLimit || posting) return;
    setPosting(true);

    await new Promise((r) => setTimeout(r, 500)); // mock latency

    const newTweet = {
      id: `tweet_${uuid()}`,
      userId: user.id,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        verified: user.verified,
      },
      content: text.trim(),
      media: images.map((img) => ({
        type: 'image',
        url: img.url,
        alt: 'Uploaded image',
      })),
      likes: 0,
      comments: 0,
      reposts: 0,
      bookmarks: 0,
      views: 0,
      isLiked: false,
      isBookmarked: false,
      isReposted: false,
      isPinned: false,
      createdAt: new Date().toISOString(),
    };

    addTweet(newTweet);
    setText('');
    setImages([]);
    setPosting(false);
    toast.success('Posted!');
    onPosted?.();
  }, [text, images, isEmpty, overLimit, posting, user, addTweet, onPosted]);

  if (!user) return null;

  return (
    <div
      className={cn(
        'border-b border-border px-4',
        compact ? 'py-3' : 'py-4'
      )}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <img
          src={user.avatar}
          alt={user.name}
          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
        />

        {/* Composer area */}
        <div className="flex flex-1 flex-col gap-3">
          <textarea
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="What's happening?"
            rows={focused || text ? 3 : 1}
            maxLength={MAX + 20}
            aria-label="Compose a new post"
            className={cn(
              'w-full resize-none bg-transparent text-[15px] leading-relaxed text-text-primary placeholder:text-text-faint outline-none transition-[rows]',
              compact ? 'text-sm' : ''
            )}
          />

          {/* Image previews */}
          <AnimatePresence>
            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`grid gap-1 overflow-hidden rounded-2xl ${
                  images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                }`}
              >
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img.url}
                      alt="Preview"
                      className="h-40 w-full rounded-xl object-cover"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
                      aria-label="Remove image"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toolbar + post button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* Image upload */}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImages}
              />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={images.length >= 4}
                aria-label="Add image"
                className="grid h-9 w-9 place-items-center rounded-full text-accent transition-colors hover:bg-accent-muted disabled:opacity-40"
              >
                <Image size={18} />
              </button>

              {/* Emoji */}
              <div className="relative">
                <button
                  onClick={() => setShowEmoji((v) => !v)}
                  aria-label="Add emoji"
                  aria-expanded={showEmoji}
                  className="grid h-9 w-9 place-items-center rounded-full text-accent transition-colors hover:bg-accent-muted"
                >
                  <Smile size={18} />
                </button>

                <AnimatePresence>
                  {showEmoji && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="glass absolute left-0 top-10 z-50 flex flex-wrap gap-1 rounded-2xl p-3 shadow-xl"
                      style={{ width: 220 }}
                    >
                      {QUICK_EMOJIS.map((e) => (
                        <button
                          key={e}
                          onClick={() => insertEmoji(e)}
                          className="grid h-9 w-9 place-items-center rounded-lg text-xl transition-colors hover:bg-surface"
                        >
                          {e}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Poll */}
              <button
                aria-label="Add poll"
                className="grid h-9 w-9 place-items-center rounded-full text-accent transition-colors hover:bg-accent-muted"
                onClick={() => toast('Poll composer coming in a future update!', { icon: '📊' })}
              >
                <BarChart2 size={18} />
              </button>

              {/* Audience */}
              <button
                aria-label="Set audience"
                className="hidden items-center gap-1 rounded-full border border-accent px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent-muted sm:flex"
              >
                <Globe size={13} />
                Everyone
              </button>
            </div>

            {/* Character counter + post button */}
            <div className="flex items-center gap-3">
              {text.length > 0 && (
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <circle
                      cx="12" cy="12" r={circleRadius}
                      fill="none"
                      stroke="var(--color-border)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12" cy="12" r={circleRadius}
                      fill="none"
                      stroke={overLimit ? 'var(--color-danger)' : nearLimit ? 'var(--color-warning)' : 'var(--color-accent)'}
                      strokeWidth="2"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      transform="rotate(-90 12 12)"
                      style={{ transition: 'stroke-dashoffset 0.2s ease' }}
                    />
                  </svg>
                  {nearLimit && (
                    <span
                      className={cn(
                        'text-xs font-medium tabular-nums',
                        overLimit ? 'text-danger' : 'text-warning'
                      )}
                    >
                      {remaining}
                    </span>
                  )}
                </div>
              )}

              <Button
                onClick={handlePost}
                disabled={isEmpty || overLimit || posting}
                size="sm"
                className="px-5"
              >
                {posting ? <Loader2 size={14} className="animate-spin" /> : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
