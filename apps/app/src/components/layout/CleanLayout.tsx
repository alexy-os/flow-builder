import { Outlet } from 'react-router-dom';

export function CleanLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
} 