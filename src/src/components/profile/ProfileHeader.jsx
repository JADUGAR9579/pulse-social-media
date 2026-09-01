import { useState } from 'react';
import { MapPin, Link2, Calendar, BadgeCheck } from 'lucide-react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

import { useAuthStore } from '../../store/authStore';
import { useProfileStore } from '../../store/profileStore';
import { formatCount } from '../../utils/formatCount';
import Button from '../ui/Button';
import EditProfileModal from './EditProfileModal';

export default function ProfileHeader({ profile }) {
  const currentUser = useAuthStore((s) => s.user);
  const { toggleFollow, isFollowing } = useProfileStore();
  const [editOpen, setEditOpen] = useState(false);

  const isOwnProfile = currentUser?.id === profile.id;
  const following = isFollowing(profile.id);

  function handleFollow() {
    toggleFollow(profile.id);
    toast.success(following ? `Unfollowed @${profile.username}` : `Following @${profile.username}`);
  }

  return (
    <>
      {/* Cover image */}
      <div className="relative h-36 w-full overflow-hidden bg-surface sm:h-48">
        {profile.coverImage ? (
          <img
            src={profile.coverImage}
            alt={`${profile.name}'s cover`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-accent/30 to-accent/10" />
        )}
      </div>

      {/* Profile info section */}
      <div className="relative px-4 pb-4">
        {/* Avatar */}
        <div className="absolute -top-10 left-4 sm:-top-14">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-20 w-20 rounded-full border-4 border-bg object-cover sm:h-28 sm:w-28"
          />
        </div>

        {/* Action button — top right */}
        <div className="flex justify-end pt-3">
          {isOwnProfile ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditOpen(true)}
            >
              Edit profile
            </Button>
          ) : (
            <Button
              variant={following ? 'secondary' : 'primary'}
              size="sm"
              onClick={handleFollow}
            >
              {following ? 'Following' : 'Follow'}
            </Button>
          )}
        </div>

        {/* Name + username */}
        <div className="mt-6 sm:mt-8">
          <div className="flex items-center gap-1.5">
            <h1 className="font-display text-xl font-bold leading-tight text-text-primary sm:text-2xl">
              {profile.name}
            </h1>
            {profile.verified && (
              <BadgeCheck size={20} className="flex-shrink-0 text-accent" aria-label="Verified" />
            )}
          </div>
          <p className="text-sm text-text-muted">@{profile.username}</p>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="mt-3 text-[15px] leading-relaxed text-text-primary">
            {profile.bio}
          </p>
        )}

        {/* Meta — location / website / joined */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {profile.location && (
            <span className="flex items-center gap-1.5 text-sm text-text-muted">
              <MapPin size={14} className="flex-shrink-0" />
              {profile.location}
            </span>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-accent hover:underline"
            >
              <Link2 size={14} className="flex-shrink-0" />
              {profile.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          <span className="flex items-center gap-1.5 text-sm text-text-muted">
            <Calendar size={14} className="flex-shrink-0" />
            Joined {dayjs(profile.joinedAt).format('MMMM YYYY')}
          </span>
        </div>

        {/* Followers / following counts */}
        <div className="mt-3 flex gap-5">
          <button className="group flex items-center gap-1 text-sm hover:underline">
            <span className="font-bold text-text-primary">
              {formatCount(profile.following)}
            </span>
            <span className="text-text-muted">Following</span>
          </button>
          <button className="group flex items-center gap-1 text-sm hover:underline">
            <span className="font-bold text-text-primary">
              {formatCount(profile.followers)}
            </span>
            <span className="text-text-muted">
              {profile.followers === 1 ? 'Follower' : 'Followers'}
            </span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  );
}
