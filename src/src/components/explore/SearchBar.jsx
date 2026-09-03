import { useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useExploreStore } from '../../store/exploreStore';
import { useDebounce } from '../../hooks/useDebounce';
import { cn } from '../../lib/cn';

export default function SearchBar({ autoFocus = false, className }) {
  const { query, setQuery, runSearch, clearSearch, searching } = useExploreStore();
  const debouncedQuery = useDebounce(query, 380);
  const inputRef = useRef(null);

  // Fire search whenever debounced query changes
  useEffect(() => {
    runSearch(debouncedQuery);
  }, [debouncedQuery, runSearch]);

  // Optional autofocus
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div className={cn('relative', className)}>
      {/* Leading icon */}
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        {searching ? (
          <Loader2 size={17} className="animate-spin text-accent" />
        ) : (
          <Search size={17} className="text-text-faint" />
        )}
      </div>

      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Pulse"
        aria-label="Search"
        className={cn(
          'h-11 w-full rounded-full border border-transparent bg-surface pl-11 pr-10',
          'text-sm text-text-primary placeholder:text-text-faint',
          'outline-none transition-colors focus-visible:border-accent focus-visible:bg-bg'
        )}
      />

      {/* Clear button */}
      {query && (
        <button
          onClick={clearSearch}
          aria-label="Clear search"
          className="absolute inset-y-0 right-3 flex items-center text-text-faint hover:text-text-primary"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-text-faint/20">
            <X size={12} />
          </span>
        </button>
      )}
    </div>
  );
}
