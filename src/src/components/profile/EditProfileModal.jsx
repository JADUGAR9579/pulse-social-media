import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Camera, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { useProfileStore } from '../../store/profileStore';
import { useAuthStore } from '../../store/authStore';
import FormField from '../forms/FormField';
import Button from '../ui/Button';
import { scaleIn } from '../../animations/variants';

const editSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  bio: z.string().max(160, 'Bio cannot exceed 160 characters').optional(),
  location: z.string().max(30, 'Location cannot exceed 30 characters').optional(),
  website: z
    .string()
    .optional()
    .refine(
      (v) => !v || v.startsWith('http://') || v.startsWith('https://'),
      'Website must start with http:// or https://'
    ),
});

export default function EditProfileModal({ profile, onClose }) {
  const updateProfile = useProfileStore((s) => s.updateProfile);
  const updateUser = useAuthStore((s) => s.updateUser);
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const [coverPreview, setCoverPreview] = useState(profile.coverImage);
  const avatarRef = useRef(null);
  const coverRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: profile.name,
      bio: profile.bio || '',
      location: profile.location || '',
      website: profile.website || '',
    },
  });

  const bio = watch('bio', '');

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  }

  function handleCoverChange(e) {
    const file = e.target.files?.[0];
    if (file) setCoverPreview(URL.createObjectURL(file));
  }

  async function onSubmit(data) {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));

    const patch = {
      ...data,
      avatar: avatarPreview,
      coverImage: coverPreview,
    };

    updateProfile(patch);
    updateUser(patch);
    toast.success('Profile updated!');
    setSaving(false);
    onClose();
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label="Edit profile"
      >
        {/* Modal */}
        <motion.div
          key="modal"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
          className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full text-text-muted transition-colors hover:bg-surface"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <h2 className="font-display text-lg font-semibold">Edit profile</h2>
            </div>
            <Button
              size="sm"
              onClick={handleSubmit(onSubmit)}
              disabled={saving}
              className="px-5"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : 'Save'}
            </Button>
          </div>

          {/* Scrollable body */}
          <div className="max-h-[80vh] overflow-y-auto">
            {/* Cover image */}
            <div className="relative h-36 bg-surface">
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
              )}
              <button
                onClick={() => coverRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/50"
                aria-label="Change cover image"
              >
                <Camera size={22} className="text-white" />
              </button>
              <input
                ref={coverRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
              />
            </div>

            {/* Avatar */}
            <div className="relative -mt-10 ml-4 w-fit">
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="h-20 w-20 rounded-full border-4 border-bg object-cover"
              />
              <button
                onClick={() => avatarRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 transition-colors hover:bg-black/50"
                aria-label="Change avatar"
              >
                <Camera size={16} className="text-white" />
              </button>
              <input
                ref={avatarRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* Form fields */}
            <form className="flex flex-col gap-4 p-4 pt-3">
              <FormField
                id="edit-name"
                label="Name"
                error={errors.name?.message}
                {...register('name')}
              />

              {/* Bio with character counter */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="edit-bio"
                  className="text-sm font-medium text-text-muted"
                >
                  Bio
                </label>
                <div className="relative">
                  <textarea
                    id="edit-bio"
                    rows={3}
                    maxLength={160}
                    placeholder="Tell the world about yourself…"
                    className="w-full resize-none rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-faint outline-none transition-colors focus-visible:border-accent"
                    {...register('bio')}
                  />
                  <span className="absolute bottom-2 right-3 text-xs text-text-faint">
                    {bio.length}/160
                  </span>
                </div>
                {errors.bio && (
                  <p className="text-xs text-danger">{errors.bio.message}</p>
                )}
              </div>

              <FormField
                id="edit-location"
                label="Location"
                placeholder="San Francisco, CA"
                error={errors.location?.message}
                {...register('location')}
              />

              <FormField
                id="edit-website"
                label="Website"
                type="url"
                placeholder="https://yourwebsite.com"
                error={errors.website?.message}
                {...register('website')}
              />
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
