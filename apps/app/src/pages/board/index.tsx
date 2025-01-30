import { useCallback } from "react";
import { horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContainer, type List } from "@packages/dnd";
import { Sidebar } from "./components/Sidebar";
import { Canvas } from "./components/Canvas";
import { DragOverlayContent } from "./components/DragOverlayContent";
import { useBoardState } from "./hooks/useBoardState";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { createNewList } from "./utils/list-utils";

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
    <div className="p-8 h-screen overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">DnD Test Page</h1>
      <DndContainer
        lists={lists}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        strategy={horizontalListSortingStrategy}
        overlayContent={activeItem ? <DragOverlayContent item={activeItem} /> : null}
      >
        <div className="flex gap-8 h-[calc(100vh-120px)]">
          <Sidebar />
          <Canvas lists={lists} onAddList={handleAddList} />
        </div>
      </DndContainer>
    </div>
  );
}