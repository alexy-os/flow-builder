import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { MainLayout } from './components/layout/MainLayout';
import { CleanLayout } from './components/layout/CleanLayout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { LayoutProvider } from './contexts/LayoutContext';
import FlowPage from './pages/flow';

const HomePage = lazy(() => import('./pages/home').then(module => ({ default: module.HomePage })));
const WelcomePage = lazy(() => import('./pages/welcome').then(module => ({ default: module.WelcomePage })));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/flow",
        element: <FlowPage />
      },
      {
        path: "/welcome",
        element: (
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <WelcomePage />
          </Suspense>
        )
      }
    ]
  },
  {
    path: "/",
    element: <CleanLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <HomePage />
          </Suspense>
        )
      }
    ]
  }
]);

function App() {
  return (
    <LayoutProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </LayoutProvider>
  );
}

export default App;
