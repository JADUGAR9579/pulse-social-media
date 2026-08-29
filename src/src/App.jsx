import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import PageLoader from './components/loaders/PageLoader';
import { mainRoutes, adminRoutes, authRoutes, NotFoundPage } from './routes/routes.config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
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

              {/* Authenticated app shell — auth guarding added in Phase 2 */}
              <Route element={<MainLayout />}>
                {mainRoutes.map(({ path, element: Element }) => (
                  <Route key={path} path={path} element={<Element />} />
                ))}
                {/* Admin guarding (role check) added in Phase 2/8 */}
                {adminRoutes.map(({ path, element: Element }) => (
                  <Route key={path} path={path} element={<Element />} />
                ))}
              </Route>

              {/* Unauthenticated shell */}
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
              style: {
                background: 'var(--color-bg-elevated)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border)',
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
