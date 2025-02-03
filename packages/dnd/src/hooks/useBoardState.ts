import { useState, useCallback } from "react";
import type { List, CanvasItem, UseBoardState } from "@packages/dnd";

export const useBoardState = (): UseBoardState => {
  const [lists, setLists] = useState<List[]>([]);
  const [activeItem, setActiveItem] = useState<CanvasItem | null>(null);

  return {
    lists,
    activeItem,
    setLists: useCallback((value: List[] | ((prev: List[]) => List[])) => {
      setLists(value);
    }, []),
    setActiveItem
  };
}; 