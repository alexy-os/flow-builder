import { useCallback } from "react";
import { horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContainer, type List } from "@packages/dnd";
import { SidebarPage } from "@apps/app/src/components/partials/Sidebar";
import { CanvasHeader } from "@apps/app/src/components/partials/CanvasHeader";
import { Canvas } from "./components/Canvas";
import { DragOverlayContent } from "./components/DragOverlayContent";
import { useBoardState } from "@packages/dnd";
import { useDragAndDrop } from "@packages/dnd";
import { createNewList } from "@packages/dnd";
import { cn } from "@packages/ui/lib/utils";
import { 
  SidebarProvider, 
  useSidebar 
} from "@packages/ui/components/ui/sidebar";

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
            strategy={horizontalListSortingStrategy}
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