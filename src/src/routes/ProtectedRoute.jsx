import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import PageLoader from '../components/loaders/PageLoader';

/**
 * Wraps any route that requires authentication.
 * While the store is rehydrating (first mount), shows a loader.
 * Once settled, redirects to /login with the intended path saved in state
 * so the user lands back where they were after logging in.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) return <PageLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
