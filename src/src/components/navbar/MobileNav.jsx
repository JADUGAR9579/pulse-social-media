import { NavLink } from 'react-router-dom';
import { PRIMARY_NAV } from '../../constants/navigation';
import { cn } from '../../lib/cn';

const MOBILE_ITEMS = PRIMARY_NAV.slice(0, 5);

/**
 * Bottom tab bar shown only on small screens, mirroring the sidebar's
 * top items so navigation stays reachable with one thumb.
 */
export default function MobileNav() {
  return (
    <nav
      className="glass fixed inset-x-0 bottom-0 z-40 flex items-center justify-between px-2 py-2 md:hidden"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      aria-label="Primary navigation"
    >
      {MOBILE_ITEMS.map(({ label, icon: Icon, path }) => (
        <NavLink
          key={path}
          to={path}
          className="flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5"
          aria-label={label}
        >
          {({ isActive }) => (
            <Icon size={22} className={cn(isActive ? 'text-accent' : 'text-text-muted')} />
          )}
        </NavLink>
      ))}
    </nav>
  );
}
