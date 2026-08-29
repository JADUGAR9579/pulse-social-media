import { lazy } from 'react';

// Lazy-loaded so each page is its own chunk (Performance section of spec).
const Home = lazy(() => import('../pages/Home/Home'));
const Explore = lazy(() => import('../pages/Explore/Explore'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const Notifications = lazy(() => import('../pages/Notifications/Notifications'));
const Messages = lazy(() => import('../pages/Messages/Messages'));
const Bookmarks = lazy(() => import('../pages/Bookmarks/Bookmarks'));
const Lists = lazy(() => import('../pages/Lists/Lists'));
const Settings = lazy(() => import('../pages/Settings/Settings'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Signup = lazy(() => import('../pages/Auth/Signup'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

/**
 * Route table consumed by App.jsx. Kept declarative and centralized
 * so ProtectedRoute / AdminRoute wrappers (Phase 2) can be layered on
 * without touching the layouts.
 */
export const mainRoutes = [
  { path: '/home', element: Home },
  { path: '/explore', element: Explore },
  { path: '/profile', element: Profile },
  { path: '/notifications', element: Notifications },
  { path: '/messages', element: Messages },
  { path: '/bookmarks', element: Bookmarks },
  { path: '/lists', element: Lists },
  { path: '/settings', element: Settings },
];

export const adminRoutes = [{ path: '/admin', element: Admin }];

export const authRoutes = [
  { path: '/login', element: Login },
  { path: '/signup', element: Signup },
];

export const NotFoundPage = NotFound;
