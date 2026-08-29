import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  ListChecks,
  User,
  Settings,
  ShieldCheck,
} from 'lucide-react';

/**
 * Primary navigation — drives the sidebar (desktop) and bottom nav (mobile).
 * Single source of truth so both layouts stay in sync.
 */
export const PRIMARY_NAV = [
  { label: 'Home', icon: Home, path: '/home' },
  { label: 'Explore', icon: Search, path: '/explore' },
  { label: 'Notifications', icon: Bell, path: '/notifications' },
  { label: 'Messages', icon: Mail, path: '/messages' },
  { label: 'Bookmarks', icon: Bookmark, path: '/bookmarks' },
  { label: 'Lists', icon: ListChecks, path: '/lists' },
  { label: 'Profile', icon: User, path: '/profile' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export const ADMIN_NAV = [
  { label: 'Admin', icon: ShieldCheck, path: '/admin' },
];

export const APP_NAME = 'Pulse';
export const TWEET_MAX_LENGTH = 280;
