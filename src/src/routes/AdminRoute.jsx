import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import PageLoader from '../components/loaders/PageLoader';

/**
 * Wraps admin-only routes.
 * Non-admins are sent to /home rather than /login to avoid confusion.
 */
export default function AdminRoute() {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/home" replace />;

  return <Outlet />;
}
