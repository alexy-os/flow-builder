import { useCallback } from "react";
import { horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContainer, type List } from "@packages/dnd";
import { Sidebar } from "./components/Sidebar";
import { Canvas } from "./components/Canvas";
import { DragOverlayContent } from "./components/DragOverlayContent";
import { useBoardState } from "./hooks/useBoardState";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { createNewList } from "./utils/list-utils";
import { useLayout } from "../../contexts/LayoutContext";
import { cn } from "@packages/ui/lib/utils";

export default function FlowPage() {
  const { lists, activeItem, setLists, setActiveItem } = useBoardState();
  const { isBuilderSidebarVisible } = useLayout();
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
      <div className="flex h-screen w-full overflow-hidden relative">
        <div className="absolute inset-0 flex">
          {/* Сайдбар */}
          <aside 
            className={cn(
              "border-r bg-background transition-all duration-200 ease-in-out z-20",
              isBuilderSidebarVisible ? "w-[300px]" : "w-0"
            )}
          >
            <div className={cn(
              "w-[300px] h-full transition-all duration-200",
              isBuilderSidebarVisible ? "translate-x-0" : "-translate-x-full"
            )}>
              <Sidebar />
            </div>
          </aside>

          {/* Основной контент */}
          <div className="flex-1 relative z-10">
            <Canvas lists={lists} onAddList={handleAddList} />
          </div>
        </div>

        {/* DragOverlay с максимальным z-index */}
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* DragOverlay будет рендериться здесь */}
        </div>
      </div>
    </DndContainer>
  );
}