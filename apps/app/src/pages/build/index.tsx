import { useCallback } from "react";
import { horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContainer, type List } from "@packages/dnd";
import { Sidebar } from "./components/Sidebar";
import { Canvas } from "./components/Canvas";
import { DragOverlayContent } from "./components/DragOverlayContent";
import { useBoardState } from "./hooks/useBoardState";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { createNewList } from "./utils/list-utils";
import { SidebarProvider, SidebarInset } from "@packages/ui/components/ui/sidebar";

export default function Board() {
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
    <DndContainer
      lists={lists}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      strategy={horizontalListSortingStrategy}
      overlayContent={activeItem ? <DragOverlayContent item={activeItem} /> : null}
    >
      <SidebarProvider
        style={{
          "--sidebar-width": "300px",
        } as React.CSSProperties}
      >
        <div className="flex h-screen w-full overflow-hidden relative">
          <div className="absolute inset-0 flex">
            <Sidebar />
            <SidebarInset className="flex flex-col flex-1 w-full">
              <Canvas lists={lists} onAddList={handleAddList} />
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </DndContainer>
  );
}