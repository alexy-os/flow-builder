import { useState, useCallback } from "react";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { DndContainer, type CanvasItem, type List } from "@packages/dnd";
import { Sidebar } from "./components/Sidebar";
import { Canvas } from "./components/Canvas";
import { DragOverlayContent } from "./components/DragOverlayContent";

export default function Board() {
  const [lists, setLists] = useState<List[]>([]);
  const [activeItem, setActiveItem] = useState<CanvasItem | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.data.current?.type === 'item') {
      setActiveItem(event.active.data.current.item);
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveItem(null);
    const { active, over } = event;
    
    if (!over) return;

    if (active.data.current?.type === 'sidebar') {
      const listId = over.id.toString().replace('droppable-', '');
      const component = active.data.current.component;
      
      if (component) {
        setLists(currentLists => 
          currentLists.map(list => 
            list.id === listId 
              ? {
                  ...list,
                  items: [...list.items, {
                    id: `${component.id}-${Date.now()}`,
                    type: component.id,
                    color: component.color,
                    label: component.label
                  }]
                }
              : list
          )
        );
      }
    } else if (active.data.current?.type === 'list') {
      const oldIndex = lists.findIndex(list => list.id === active.id);
      const newIndex = lists.findIndex(list => list.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        setLists(lists => arrayMove(lists, oldIndex, newIndex));
      }
    } else if (active.data.current?.type === 'item') {
      const { listId: activeListId, item: activeItem } = active.data.current;
      const overListId = over.id.toString().startsWith('droppable-')
        ? over.id.toString().replace('droppable-', '')
        : active.data.current.listId;

      setLists(currentLists => 
        currentLists.map(list => {
          if (list.id === activeListId) {
            if (activeListId === overListId) {
              const oldIndex = list.items.findIndex(item => item.id === active.id);
              const newIndex = list.items.findIndex(item => item.id === over.id);
              
              return oldIndex !== -1 && newIndex !== -1
                ? { ...list, items: arrayMove(list.items, oldIndex, newIndex) }
                : list;
            }
            return {
              ...list,
              items: list.items.filter(item => item.id !== activeItem.id)
            };
          }
          if (list.id === overListId && activeListId !== overListId) {
            return {
              ...list,
              items: [...list.items, activeItem]
            };
          }
          return list;
        })
      );
    }
  }, [lists]);

  const handleAddList = useCallback(() => {
    const newList: List = {
      id: `list-${Date.now()}`,
      items: []
    };
    setLists(prev => [...prev, newList]);
  }, []);

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