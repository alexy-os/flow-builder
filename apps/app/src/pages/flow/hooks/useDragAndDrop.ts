import { useCallback } from "react";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { moveItemBetweenLists, addItemToList } from "../utils/list-utils";
import type { UseDragAndDropProps, UseDragAndDrop } from "../types";

export const useDragAndDrop = ({
  lists,
  setLists,
  setActiveItem
}: UseDragAndDropProps): UseDragAndDrop => {
  const handleDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.data.current?.type === 'item') {
      setActiveItem(event.active.data.current.item);
    }
  }, [setActiveItem]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveItem(null);
    const { active, over } = event;
    
    if (!over) return;

    if (active.data.current?.type === 'sidebar') {
      const listId = over.id.toString().replace('droppable-', '');
      const component = active.data.current.component;
      
      if (component) {
        setLists(currentLists => addItemToList(currentLists, listId, component));
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

      if (activeListId === overListId) {
        setLists(currentLists =>
          currentLists.map(list => {
            if (list.id === activeListId) {
              const oldIndex = list.items.findIndex(item => item.id === active.id);
              const newIndex = list.items.findIndex(item => item.id === over.id);
              
              return oldIndex !== -1 && newIndex !== -1
                ? { ...list, items: arrayMove(list.items, oldIndex, newIndex) }
                : list;
            }
            return list;
          })
        );
      } else {
        setLists(currentLists => 
          moveItemBetweenLists(currentLists, activeListId, overListId, activeItem)
        );
      }
    }
  }, [lists, setLists, setActiveItem]);

  return {
    handleDragStart,
    handleDragEnd
  };
}; 