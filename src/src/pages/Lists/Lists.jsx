import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ListChecks, Plus, Trash2, X, Users } from 'lucide-react';
import toast from 'react-hot-toast';

import { useListStore } from '../../store/listStore';
import { formatCount } from '../../utils/formatCount';
import Button from '../../components/ui/Button';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { cn } from '../../lib/cn';

// ── Create List Modal ──────────────────────────────────────────────────────
const COLORS = ['#6e5bff', '#00e5a0', '#ffb84d', '#ff5c72', '#3b82f6', '#a855f7'];

function CreateListModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(COLORS[0]);

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
        className="glass w-full max-w-md rounded-2xl p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Create list</h2>
          <button onClick={onClose}><X size={18} className="text-text-muted" /></button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-muted">Name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={25}
              placeholder="e.g. React Devs"
              className="h-11 w-full rounded-xl border border-border bg-bg px-3 text-sm outline-none focus-visible:border-accent"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-muted">
              Description <span className="text-text-faint">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              maxLength={100}
              placeholder="What's this list about?"
              className="w-full resize-none rounded-xl border border-border bg-bg px-3 py-2.5 text-sm outline-none focus-visible:border-accent"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-muted">Colour</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    'h-7 w-7 rounded-full transition-transform',
                    color === c ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-bg' : 'hover:scale-110'
                  )}
                  style={{ background: c }}
                  aria-label={`Select colour ${c}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button
            size="sm"
            disabled={!name.trim()}
            onClick={() => { onCreate({ name: name.trim(), description, coverColor: color }); onClose(); }}
          >
            Create list
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ── List Card ──────────────────────────────────────────────────────────────
function ListCard({ list }) {
  const { toggleFollow, deleteList } = useListStore();

  function handleFollow() {
    toggleFollow(list.id);
    toast.success(list.isFollowed ? `Unfollowed "${list.name}"` : `Following "${list.name}"`);
  }

  function handleDelete() {
    if (!window.confirm(`Delete "${list.name}"?`)) return;
    deleteList(list.id);
    toast.success('List deleted.');
  }

  return (
    <motion.div
      variants={staggerItem}
      className="glass flex flex-col gap-3 rounded-2xl p-4 transition-shadow hover:shadow-lg"
    >
      {/* Cover strip */}
      <div
        className="h-10 rounded-xl"
        style={{ background: `linear-gradient(135deg, ${list.coverColor}33, ${list.coverColor}66)`,
                 borderLeft: `4px solid ${list.coverColor}` }}
      />

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-text-primary truncate">{list.name}</h3>
          {list.description && (
            <p className="mt-0.5 line-clamp-2 text-sm text-text-muted">{list.description}</p>
          )}
        </div>
        {list.isOwn && (
          <button
            onClick={handleDelete}
            aria-label="Delete list"
            className="flex-shrink-0 text-text-faint transition-colors hover:text-danger"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Users size={12} />
            {formatCount(list.members.length)} members
          </span>
          <span>·</span>
          <span>{formatCount(list.followers)} followers</span>
        </div>
        {!list.isOwn && (
          <Button
            size="sm"
            variant={list.isFollowed ? 'secondary' : 'primary'}
            onClick={handleFollow}
            className="px-3 text-xs"
          >
            {list.isFollowed ? 'Following' : 'Follow'}
          </Button>
        )}
        {list.isOwn && (
          <span className="rounded-full bg-accent-muted px-2.5 py-1 text-xs font-medium text-accent">
            Your list
          </span>
        )}
      </div>

      {/* Member avatars */}
      <div className="flex items-center gap-1">
        {list.members.slice(0, 5).map((_, i) => (
          <img
            key={i}
            src={`https://api.dicebear.com/8.x/avataaars/svg?seed=member${i}`}
            alt="member"
            className="-ml-2 first:ml-0 h-6 w-6 rounded-full border border-bg object-cover"
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Lists() {
  const { lists, loadLists, isLoading, createList } = useListStore();
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => { loadLists(); }, [loadLists]);

  function handleCreate(data) {
    createList(data);
    toast.success(`"${data.name}" created!`);
  }

  return (
    <>
      <Helmet><title>Lists · Pulse</title></Helmet>

      <div className="glass sticky top-0 z-30 flex items-center justify-between border-b border-border px-4 py-3">
        <h1 className="font-display text-xl font-semibold">Lists</h1>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus size={16} />
          New list
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass flex flex-col gap-3 rounded-2xl p-4">
              <div className="h-10 animate-pulse rounded-xl bg-surface" />
              <div className="h-4 w-32 animate-pulse rounded-full bg-surface" />
              <div className="h-3 w-full animate-pulse rounded-full bg-surface" />
            </div>
          ))}
        </div>
      ) : lists.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center px-6">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-surface">
            <ListChecks size={28} className="text-text-faint" />
          </div>
          <p className="font-display text-xl font-semibold">No lists yet</p>
          <p className="text-sm text-text-muted">Create a list to organise the accounts you follow.</p>
          <Button onClick={() => setShowCreate(true)} size="sm">Create your first list</Button>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-3 p-4 sm:grid-cols-2"
        >
          {lists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {showCreate && (
          <CreateListModal
            onClose={() => setShowCreate(false)}
            onCreate={handleCreate}
          />
        )}
      </AnimatePresence>
    </>
  );
}
