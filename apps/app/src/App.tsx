import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { MainLayout } from './components/layout/MainLayout';
import { CleanLayout } from './components/layout/CleanLayout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import FlowPage from './pages/flow';
import BuildyPage from './pages/buildy';


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
        path: "/buildy",
        element: <BuildyPage />
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
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
