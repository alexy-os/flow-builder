import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { CanvasItem, List } from "@packages/dnd";

export interface UseBoardState {
  lists: List[];
  activeItem: CanvasItem | null;
  setLists: (value: List[] | ((prev: List[]) => List[])) => void;
  setActiveItem: (item: CanvasItem | null) => void;
}

export interface UseDragAndDropProps {
  lists: List[];
  setLists: (value: List[] | ((prev: List[]) => List[])) => void;
  setActiveItem: (item: CanvasItem | null) => void;
}

export interface UseDragAndDrop {
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
} 