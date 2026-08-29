import { NavLink } from 'react-router-dom';
import { Feather } from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../ui/Button';
import { PRIMARY_NAV } from '../../constants/navigation';
import { cn } from '../../lib/cn';

/**
 * Persistent left sidebar — desktop and tablet only.
 * Hidden on mobile in favor of the bottom nav (see MobileNav).
 */
export default function Sidebar() {
  return (
    <aside
      className="sticky top-0 hidden h-screen w-[88px] flex-col items-center justify-between border-r border-border py-6 lg:w-64 lg:items-stretch lg:px-4 md:flex"
      aria-label="Primary navigation"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="mb-4 px-2 lg:px-2">
          <Logo showLabel className="justify-center lg:justify-start" />
        </div>

        <nav className="flex flex-col gap-1">
          {PRIMARY_NAV.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  'group flex items-center justify-center gap-4 rounded-full px-3 py-3 text-text-primary transition-colors lg:justify-start',
                  isActive ? 'bg-surface font-semibold' : 'hover:bg-surface'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={22}
                    className={isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-primary'}
                  />
                  <span className="hidden text-base lg:inline">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <Button size="lg" className="hidden w-full lg:flex" aria-label="Compose a new tweet">
        <Feather size={18} />
        <span>Compose</span>
      </Button>
      <Button
        size="md"
        className="flex w-12 !rounded-full !p-0 lg:hidden"
        aria-label="Compose a new tweet"
      >
        <Feather size={18} />
      </Button>
    </aside>
  );
}
