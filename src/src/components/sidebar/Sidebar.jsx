import { NavLink, useNavigate } from 'react-router-dom';
import { Feather, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

import Logo from '../common/Logo';
import Button from '../ui/Button';
import { PRIMARY_NAV } from '../../constants/navigation';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/cn';

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  function handleLogout() {
    logout();
    toast.success('Logged out.');
    navigate('/login');
  }

  return (
    <aside
      className="sticky top-0 hidden h-screen w-[88px] flex-col items-center justify-between border-r border-border py-6 lg:w-64 lg:items-stretch lg:px-4 md:flex"
      aria-label="Primary navigation"
    >
      {/* Top section */}
      <div className="flex w-full flex-col gap-2">
        <div className="mb-4 px-2 lg:px-2">
          <Logo showLabel className="justify-center lg:justify-start" />
        </div>

        <nav className="flex flex-col gap-1">
          {PRIMARY_NAV.map(({ label, icon: Icon, path }) => {
            // Profile link uses the actual username for correct active matching
            const resolvedPath =
              path === '/profile' && user ? `/profile/${user.username}` : path;
            return (
            <NavLink
              key={path}
              to={resolvedPath}
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
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="flex w-full flex-col items-center gap-3 lg:items-stretch">
        {/* Compose button */}
        <Button
          size="lg"
          onClick={() => navigate('/home')}
          className="hidden w-full lg:flex"
          aria-label="Compose a new post"
        >
          <Feather size={18} />
          <span>Compose</span>
        </Button>
        <Button
          size="md"
          onClick={() => navigate('/home')}
          className="flex w-12 !rounded-full !p-0 lg:hidden"
          aria-label="Compose a new post"
        >
          <Feather size={18} />
        </Button>

        {/* User row */}
        {isAuthenticated && user && (
          <div className="flex w-full items-center justify-between gap-3 rounded-full px-2 py-2 hover:bg-surface lg:rounded-2xl lg:px-3">
            <div className="flex min-w-0 items-center gap-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-9 w-9 flex-shrink-0 rounded-full bg-surface object-cover"
              />
              <div className="hidden min-w-0 flex-col lg:flex">
                <span className="truncate text-sm font-semibold leading-tight">
                  {user.name}
                </span>
                <span className="truncate text-xs text-text-muted">
                  @{user.username}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="hidden flex-shrink-0 rounded-full p-1.5 text-text-faint transition-colors hover:bg-surface hover:text-danger lg:flex"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
