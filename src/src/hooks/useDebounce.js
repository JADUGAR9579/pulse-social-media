import { useState, useEffect } from 'react';

/**
 * Delays updating the returned value until the input stops changing.
 * Used by the search bar to avoid firing a query on every keystroke.
 *
 * @param {*}      value - The value to debounce
 * @param {number} delay - Milliseconds to wait (default 350ms)
 */
export function useDebounce(value, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
