import { useState } from "react";
import { cn } from "@packages/ui/lib/utils";
import { Button } from "@packages/ui/components/ui/button";
import { MenuIcon, PanelLeftClose, PanelLeft } from "lucide-react";
import { Navigation } from "./Navigation";

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function MainLayout({ children, sidebar }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isBuilderSidebarVisible, setIsBuilderSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Main Navigation Sidebar */}
      <aside className={cn(
        "bg-background border-r shrink-0 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className="h-16 border-b flex items-center gap-2 px-4 shrink-0">
          <div className={cn("font-semibold flex-1", isCollapsed && "hidden")}>
            App Name
          </div>
          
          {isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBuilderSidebarVisible(!isBuilderSidebarVisible)}
              title={isBuilderSidebarVisible ? "Hide sidebar" : "Show sidebar"}
            >
              {isBuilderSidebarVisible ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <PanelLeft className="h-4 w-4" />
              )}
            </Button>
          )}

          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <Navigation isCollapsed={isCollapsed} />
        </nav>
      </aside>

      {/* Builder Sidebar + Content */}
      <div className="flex-1 flex min-w-0">
        {isBuilderSidebarVisible && sidebar}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
} 