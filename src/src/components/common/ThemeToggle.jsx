import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

/**
 * Toggles between dark (default) and light theme.
 * Reads/writes the persisted theme store.
 */
export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`grid h-9 w-9 place-items-center rounded-full text-text-muted transition-colors hover:bg-surface hover:text-text-primary ${className ?? ''}`}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
