import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import RightPanel from '../components/sidebar/RightPanel';
import MobileNav from '../components/navbar/MobileNav';
import TopBar from '../components/navbar/TopBar';

/**
 * Three-column shell used by every authenticated page:
 * Sidebar | page content (Outlet) | RightPanel
 * Collapses to a single column with a top bar + bottom nav on mobile.
 */
export default function MainLayout() {
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
