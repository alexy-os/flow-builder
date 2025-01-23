import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

interface RootLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function RootLayout({ children, sidebar }: RootLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "w-64 border-r bg-background relative",
        "hidden md:block" // Responsive
      )}>
        {sidebar}
        <ThemeToggle />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
} 