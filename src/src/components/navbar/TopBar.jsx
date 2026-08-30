import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import { useAuthStore } from '../../store/authStore';

export default function TopBar() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  function handleLogout() {
    logout();
    toast.success('Logged out.');
    navigate('/login');
  }

  return (
    <header className="glass sticky top-0 z-40 flex items-center justify-between px-4 py-3 md:hidden">
      <Logo showLabel={false} />

      <div className="flex items-center gap-2">
        <ThemeToggle />
        {isAuthenticated && (
          <>
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="grid h-9 w-9 place-items-center rounded-full text-text-muted hover:text-danger"
            >
              <LogOut size={18} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
