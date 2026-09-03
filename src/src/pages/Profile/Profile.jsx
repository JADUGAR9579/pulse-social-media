import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

import { useAuthStore } from '../../store/authStore';
import { useProfileStore } from '../../store/profileStore';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileTabs from '../../components/profile/ProfileTabs';
import ProfileTweetList from '../../components/profile/ProfileTweetList';
import ProfileSkeleton from '../../components/profile/ProfileSkeleton';
import ProfileStats from '../../components/profile/ProfileStats';

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore((s) => s.user);
  const { profile, isLoading, loadProfile } = useProfileStore();

  // If no username param, show the logged-in user's own profile
  const targetUsername = username ?? currentUser?.username;

  useEffect(() => {
    if (targetUsername) {
      loadProfile(targetUsername);
    }
  }, [targetUsername, loadProfile]);

  if (isLoading) {
    return (
      <>
        <Helmet><title>Profile · Pulse</title></Helmet>
        <div className="glass sticky top-0 z-30 flex items-center gap-4 border-b border-border px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="grid h-9 w-9 place-items-center rounded-full text-text-primary hover:bg-surface"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display text-xl font-semibold">Profile</h1>
        </div>
        <ProfileSkeleton />
      </>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <p className="font-display text-2xl font-bold">Account not found</p>
        <p className="text-sm text-text-muted">
          @{targetUsername} doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="mt-2 text-sm text-accent hover:underline"
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{profile.name} (@{profile.username}) · Pulse</title>
      </Helmet>

      {/* Sticky back + name header */}
      <div className="glass sticky top-0 z-30 flex items-center gap-4 border-b border-border px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="grid h-9 w-9 place-items-center rounded-full text-text-primary transition-colors hover:bg-surface"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-display text-lg font-semibold leading-tight">
            {profile.name}
          </h1>
          <p className="text-xs text-text-muted">
            {profile.totalTweets ?? 0} posts
          </p>
        </div>
      </div>

      {/* Profile content */}
      <ProfileHeader profile={profile} />
      <ProfileStats profile={profile} />
      <ProfileTabs />
      <ProfileTweetList />
    </>
  );
}
