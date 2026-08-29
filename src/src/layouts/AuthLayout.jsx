import { Outlet } from 'react-router-dom';
import Logo from '../components/common/Logo';

/**
 * Centered single-column shell for unauthenticated pages.
 * Built out fully in Phase 2 (Authentication module).
 */
export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <Logo />
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
