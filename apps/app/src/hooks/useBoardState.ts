import { useState, useCallback } from "react";
import type { List, CanvasItem } from "@packages/dnd";
import type { UseBoardState } from "../types/dnd";

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