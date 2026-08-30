import { lazy } from 'react';

// ── App pages ──────────────────────────────────────────────────────────────
const Home = lazy(() => import('../pages/Home/Home'));
const Explore = lazy(() => import('../pages/Explore/Explore'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const Notifications = lazy(() => import('../pages/Notifications/Notifications'));
const Messages = lazy(() => import('../pages/Messages/Messages'));
const Bookmarks = lazy(() => import('../pages/Bookmarks/Bookmarks'));
const Lists = lazy(() => import('../pages/Lists/Lists'));
const Settings = lazy(() => import('../pages/Settings/Settings'));
const Admin = lazy(() => import('../pages/Admin/Admin'));

// ── Auth pages ─────────────────────────────────────────────────────────────
const Login = lazy(() => import('../pages/Auth/Login'));
const Signup = lazy(() => import('../pages/Auth/Signup'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'));
const VerifyOtp = lazy(() => import('../pages/Auth/VerifyOtp'));

// ── 404 ────────────────────────────────────────────────────────────────────
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

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
  { path: '/forgot-password', element: ForgotPassword },
  { path: '/verify-otp', element: VerifyOtp },
];

export const NotFoundPage = NotFound;
