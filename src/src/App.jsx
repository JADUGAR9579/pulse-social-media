import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import PageLoader from './components/loaders/PageLoader';
import { mainRoutes, adminRoutes, authRoutes, NotFoundPage } from './routes/routes.config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000, retry: 1 },
  },
});

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* ── Protected app shell ──────────────────────────────── */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  {mainRoutes.map(({ path, element: Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                  ))}
                </Route>
              </Route>

              {/* ── Admin-only routes ─────────────────────────────────── */}
              <Route element={<AdminRoute />}>
                <Route element={<MainLayout />}>
                  {adminRoutes.map(({ path, element: Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                  ))}
                </Route>
              </Route>

              {/* ── Public auth shell ─────────────────────────────────── */}
              <Route element={<AuthLayout />}>
                {authRoutes.map(({ path, element: Element }) => (
                  <Route key={path} path={path} element={<Element />} />
                ))}
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>

          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--color-bg-elevated)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
