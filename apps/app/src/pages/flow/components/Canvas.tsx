import { memo } from "react";
import { Button } from "@packages/ui/components/ui/button";
import { Plus, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { SortableList } from "@packages/dnd";
import type { List } from "@packages/dnd";
import { ListItem } from "./ListItem";
import { cn } from "@packages/ui/lib/utils";
import { useDroppable } from '@dnd-kit/core';
import { useSidebar } from "@packages/ui/components/ui/sidebar";
import { ModeToggle } from "@apps/app/src/components/ui/mode-toggle";

export const CanvasHeader = memo(function CanvasHeader({
  onAddList
}: { 
  onAddList: () => void;
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
      <div className="flex gap-2 ml-auto flex-shrink-0 flex-nowrap">
        <Button onClick={onAddList} variant="default" size="sm" className="h-7 whitespace-nowrap bg-primary text-slate-100">
          <Plus className="mr-2" />
          Add List
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
});

export const Canvas = memo(function Canvas({ 
  lists, 
  onAddList, 
  header: HeaderComponent = CanvasHeader 
}: { 
  lists: List[]; 
  onAddList: () => void; 
  header?: React.ComponentType<{
    onAddList: () => void;
  }>;
}) {
  const { setNodeRef } = useDroppable({
    id: 'canvas-droppable',
  });

  const { state } = useSidebar();

  return (
    <div className="flex-1 flex flex-col">
      <HeaderComponent onAddList={onAddList} />
      <div className="flex-1 w-full flex flex-col">
        <div 
          ref={setNodeRef}
          className="h-[calc(100vh-64px)] w-full" 
        >
          <div className={cn(
            "h-full",
            state === "expanded" ? "w-[calc(100vw-345px)]" : "w-[calc(100vw-45px)]",
            "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-800"
          )}
          >
            <div className="p-4">
              <div className="flex space-x-4">
                {lists.map((list) => (
                  <SortableList
                    key={list.id}
                    list={list}
                    className="w-80 flex-shrink-0 sortable-list border border-gray-200 dark:bg-gray-800 rounded-lg"
                    headerClassName="p-4 border-b border-gray-200 dark:border-gray-700 cursor-move"
                    contentClassName="p-4 space-y-3"
                    itemClassName="mb-2"
                    renderItem={(item) => (
                      <ListItem key={item.id} item={item} listId={list.id} />
                    )}
                  >
                    <div className="h-20 rounded border-2 border-dashed border-gray-200 dark:border-gray-700 mt-3 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      Drop here
                    </div>
                  </SortableList>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}); 