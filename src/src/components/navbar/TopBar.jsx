import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';

/**
 * Sticky top bar shown only on mobile, where the sidebar is hidden.
 */
export default function TopBar() {
  return (
    <header className="glass sticky top-0 z-40 flex items-center justify-between px-4 py-3 md:hidden">
      <Logo showLabel={false} />
      <ThemeToggle />
    </header>
  );
}
