import { memo } from "react";
import { Plus, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@packages/ui/components/ui/sidebar";
import { Button } from "@packages/ui/components/ui/button";
import { cn } from "@packages/ui/lib/utils";

export const CanvasHeader = memo(function CanvasHeader({
    onAddList,
  }: { 
    onAddList?: () => void;
  }) {
    const { state, toggleSidebar } = useSidebar();
  
    return (
      <div className={cn(
        "flex gap-2 items-center border-b p-4",
        "transition-all duration-200 ease-in-out",
        "w-full",
        "max-w-full"
      )}>
        <Button
          key="main-sidebar-trigger"
          data-sidebar="trigger"
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={toggleSidebar}
        >
          {state === "expanded" ? (
            <PanelLeftClose />
          ) : (
            <PanelLeftOpen />
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <div className="text-base font-medium text-foreground flex-shrink-0">Canvas</div>
        {onAddList && (
          <div className="flex gap-2 ml-auto flex-shrink-0 flex-nowrap">
            <Button 
              onClick={onAddList} 
              variant="default" 
              size="sm" 
              className="h-7 whitespace-nowrap bg-primary text-slate-100"
            >
              <Plus className="mr-2" />
              Add List
            </Button>
          </div>
        )}
      </div>
    );
  });