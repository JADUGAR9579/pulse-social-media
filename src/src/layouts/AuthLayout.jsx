import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Logo from '../components/common/Logo';
import ThemeToggle from '../components/common/ThemeToggle';
import PageLoader from '../components/loaders/PageLoader';

/**
 * Shell for unauthenticated pages.
 * Rehydrates session on mount; redirects already-logged-in users to /home.
 */
export default function AuthLayout() {
  const { isAuthenticated, isLoading, rehydrate } = useAuthStore();

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  if (isLoading) return <PageLoader />;
  if (isAuthenticated) return <Navigate to="/home" replace />;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12">
      {/* Top-right theme toggle */}
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <Logo />

      <div className="w-full max-w-sm">
        <Outlet />
      </div>

      <p className="text-xs text-text-faint">© {new Date().getFullYear()} Pulse. All rights reserved.</p>
    </div>
  );
}
