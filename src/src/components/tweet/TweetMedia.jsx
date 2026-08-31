/**
 * Renders the media grid for a tweet (1–4 images).
 * Layout adapts based on image count to mimic Twitter's grid style.
 */
export default function TweetMedia({ media }) {
  if (!media?.length) return null;

  const count = media.length;

  const gridClass =
    count === 1
      ? 'grid-cols-1'
      : count === 2
      ? 'grid-cols-2'
      : count === 3
      ? 'grid-cols-2'
      : 'grid-cols-2';

  return (
    <div className={`mt-3 grid gap-1 overflow-hidden rounded-2xl ${gridClass}`}>
      {media.slice(0, 4).map((item, i) => (
        <div
          key={i}
          className={`relative overflow-hidden bg-surface ${
            count === 3 && i === 0 ? 'row-span-2' : ''
          }`}
          style={{ aspectRatio: count === 1 ? '16/9' : '1' }}
        >
          <img
            src={item.url}
            alt={item.alt || 'Tweet media'}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          {count > 4 && i === 3 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="text-2xl font-bold text-white">+{count - 4}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
