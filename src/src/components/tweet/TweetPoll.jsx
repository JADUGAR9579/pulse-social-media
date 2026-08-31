import { useTweetStore } from '../../store/tweetStore';
import { useAuthStore } from '../../store/authStore';
import { formatCount } from '../../utils/formatCount';
import dayjs from 'dayjs';

export default function TweetPoll({ poll, tweetId }) {
  if (!poll) return null;

  const votePoll = useTweetStore((s) => s.votePoll);
  const user = useAuthStore((s) => s.user);
  const hasVoted = !!poll.userVote;
  const isExpired = dayjs(poll.endsAt).isBefore(dayjs());

  const maxVotes = Math.max(...poll.options.map((o) => o.votes), 1);

  function getPercent(votes) {
    if (!poll.totalVotes) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  }

  return (
    <div className="mt-3 flex flex-col gap-2">
      {poll.options.map((option) => {
        const pct = getPercent(option.votes);
        const isWinner =
          hasVoted && option.votes === maxVotes;
        const isChosen = poll.userVote === option.id;

        return (
          <button
            key={option.id}
            disabled={hasVoted || isExpired || !user}
            onClick={() => votePoll(tweetId, option.id)}
            className="relative w-full overflow-hidden rounded-full border border-border text-left text-sm transition-colors hover:border-accent disabled:cursor-default"
            aria-label={`Vote for ${option.label}`}
          >
            {/* Progress fill */}
            <div
              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${
                isChosen ? 'bg-accent' : 'bg-surface-hover'
              }`}
              style={{ width: hasVoted ? `${pct}%` : '0%' }}
            />
            <div className="relative flex items-center justify-between px-4 py-2.5">
              <span className={`font-medium ${isChosen ? 'text-white' : 'text-text-primary'}`}>
                {option.label}
                {isWinner && hasVoted && (
                  <span className="ml-2 text-xs text-accent">✓ Leading</span>
                )}
              </span>
              {hasVoted && (
                <span className={`text-xs font-semibold ${isChosen ? 'text-white' : 'text-text-muted'}`}>
                  {pct}%
                </span>
              )}
            </div>
          </button>
        );
      })}

      <p className="text-xs text-text-faint">
        {formatCount(poll.totalVotes)} vote{poll.totalVotes !== 1 ? 's' : ''} ·{' '}
        {isExpired ? 'Poll ended' : `Ends ${dayjs(poll.endsAt).fromNow()}`}
      </p>
    </div>
  );
}
