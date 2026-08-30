import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Sidebar from '../components/sidebar/Sidebar';
import RightPanel from '../components/sidebar/RightPanel';
import MobileNav from '../components/navbar/MobileNav';
import TopBar from '../components/navbar/TopBar';

/**
 * Three-column authenticated shell.
 * Also responsible for rehydrating the auth session on first mount.
 */
export default function MainLayout() {
  const rehydrate = useAuthStore((s) => s.rehydrate);

  useEffect(() => {
    rehydrate();
  }, [rehydrate]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1280px]">
      <Sidebar />

      <div className="flex min-h-screen w-full flex-1 flex-col border-r border-border">
        <TopBar />
        <main className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      <div className="px-6">
        <RightPanel />
      </div>

      <MobileNav />
    </div>
  );
}
