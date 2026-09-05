import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Trash2, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

import { useBookmarkStore } from '../../store/bookmarkStore';
import TweetCard from '../../components/tweet/TweetCard';
import Button from '../../components/ui/Button';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { cn } from '../../lib/cn';

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center px-6">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-surface">
        <Bookmark size={28} className="text-text-faint" />
      </div>
      <p className="font-display text-xl font-semibold">No bookmarks yet</p>
      <p className="max-w-xs text-sm text-text-muted">
        Save posts by tapping the bookmark icon — they'll all appear here.
      </p>
    </div>
  );
}

function AddCategoryModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass w-full max-w-sm rounded-2xl p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">New category</h2>
          <button onClick={onClose}><X size={18} className="text-text-muted" /></button>
        </div>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name…"
          className="h-11 w-full rounded-xl border border-border bg-bg px-3 text-sm outline-none focus-visible:border-accent"
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button
            size="sm"
            disabled={!name.trim()}
            onClick={() => { onAdd(name.trim()); onClose(); }}
          >
            Create
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Bookmarks() {
  const {
    bookmarks, categories, activeCategory,
    setCategory, clearAll, addCategory, deleteCategory,
  } = useBookmarkStore();

  const [showAddCat, setShowAddCat] = useState(false);

  function handleAddCategory(name) {
    addCategory(name);
    toast.success(`"${name}" created!`);
  }

  function handleClear() {
    if (!window.confirm('Clear all bookmarks?')) return;
    clearAll();
    toast.success('Bookmarks cleared.');
  }

  return (
    <>
      <Helmet><title>Bookmarks · Pulse</title></Helmet>

      {/* Sticky header */}
      <div className="glass sticky top-0 z-30 border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold">Bookmarks</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddCat(true)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent-muted"
            >
              <Plus size={14} />
              Category
            </button>
            {bookmarks.length > 0 && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-danger transition-colors hover:bg-danger/10"
              >
                <Trash2 size={14} />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <div key={cat.id} className="group relative flex-shrink-0">
              <button
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
                  activeCategory === cat.id
                    ? 'bg-accent text-white'
                    : 'bg-surface text-text-muted hover:bg-surface-hover'
                )}
              >
                {cat.name}
              </button>
              {cat.id !== 'cat_default' && (
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="absolute -right-1 -top-1 hidden h-4 w-4 items-center justify-center rounded-full bg-danger text-white group-hover:flex"
                  aria-label={`Delete ${cat.name}`}
                >
                  <X size={9} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bookmark feed */}
      {bookmarks.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {bookmarks.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </motion.div>
      )}

      {/* Add category modal */}
      <AnimatePresence>
        {showAddCat && (
          <AddCategoryModal
            onClose={() => setShowAddCat(false)}
            onAdd={handleAddCategory}
          />
        )}
      </AnimatePresence>
    </>
  );
}
