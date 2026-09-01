import { formatCount } from '../../utils/formatCount';

/**
 * Compact stat strip shown between the profile header and tabs.
 * Gives a at-a-glance summary of the user's activity.
 */
export default function ProfileStats({ profile }) {
  const stats = [
    { label: 'Posts', value: formatCount(profile.totalTweets ?? 0) },
    { label: 'Likes received', value: formatCount(profile.totalLikes ?? 0) },
  ];

  return (
    <div className="flex gap-6 border-b border-border px-4 py-3">
      {stats.map(({ label, value }) => (
        <div key={label} className="flex flex-col">
          <span className="text-base font-bold text-text-primary">{value}</span>
          <span className="text-xs text-text-muted">{label}</span>
        </div>
      ))}
    </div>
  );
}
