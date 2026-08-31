import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Returns a relative timestamp string (e.g. "3 minutes ago") that updates
 * automatically every minute so displayed times stay accurate.
 */
export function useRelativeTime(iso) {
  const [label, setLabel] = useState(() => dayjs(iso).fromNow());

  useEffect(() => {
    setLabel(dayjs(iso).fromNow());
    const interval = setInterval(() => {
      setLabel(dayjs(iso).fromNow());
    }, 60_000);
    return () => clearInterval(interval);
  }, [iso]);

  return label;
}
