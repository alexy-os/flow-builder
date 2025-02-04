import { useCallback } from "react";
import { SidebarPage, CanvasHeader } from "@apps/app/partials";
import { Canvas, DragOverlayContent } from "./components";
import {
  DndContainer,
  useBoardState,
  useDragAndDrop,
  createNewList,
  type List
} from "@packages/dnd";
import { 
  SidebarProvider, 
  useSidebar 
} from "@packages/ui/components/ui/sidebar";
import { cn } from "@packages/ui/lib/utils";

export default function FlowPage() {
  const { lists, activeItem, setLists, setActiveItem } = useBoardState();
  const { handleDragStart, handleDragEnd } = useDragAndDrop({
    lists,
    setLists,
    setActiveItem
  });

  const handleAddList = useCallback(() => {
    setLists((prev: List[]) => [...prev, createNewList()]);
  }, [setLists]);

  return (
    <SidebarProvider key="main-sidebar-trigger" defaultOpen={true}>
      <div className="flex flex-col h-screen w-full overflow-hidden relative">
        <CanvasHeader 
          onAddList={handleAddList}
        />
        
        <div className="flex flex-1 overflow-hidden">
          <DndContainer
            lists={lists}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            overlayContent={activeItem ? <DragOverlayContent item={activeItem} /> : null}
          >
            <div className="flex w-full overflow-hidden relative">
              <FlowSidebar />
              <div className="flex-1 relative z-10 flex flex-col">
                <Canvas 
                  lists={lists} 
                  onAddList={handleAddList} 
                  header={() => null}
                />
              </div>
            </div>
          </DndContainer>
        </div>
      </div>
    </SidebarProvider>
  );
}

function FlowSidebar() {
  const { state } = useSidebar();

  return (
    <aside 
      className={cn(
        "border-r bg-background transition-all duration-200 ease-in-out z-20",
        state === "expanded" ? "w-[300px]" : "w-0"
      )}
    >
      <div className={cn(
        "w-[300px] h-full transition-all duration-200",
        state === "expanded" ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarPage />
      </div>
    </aside>
  );
}