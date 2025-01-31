import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { CleanLayout } from './components/layout/CleanLayout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { LayoutProvider } from './contexts/LayoutContext';
import { SidebarProvider } from '@packages/ui/components/ui/sidebar';

const HomePage = lazy(() => import('./pages/home').then(module => ({ default: module.HomePage })));
const FlowPage = lazy(() => import('./pages/flow').then(module => ({ default: module.FlowPage })));

const router = createBrowserRouter([
  {
    element: <CleanLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <HomePage />
          </Suspense>
        )
      }
    ]
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/flow",
        element: (
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <FlowPage />
          </Suspense>
        )
      }
    ]
  }
]);

function App() {
  return (
    <SidebarProvider defaultOpen>
      <LayoutProvider>
        <RouterProvider router={router} />
      </LayoutProvider>
    </SidebarProvider>
  );
}

export default App;
