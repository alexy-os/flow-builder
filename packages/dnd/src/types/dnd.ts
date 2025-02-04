import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

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

export interface DraggableComponent {
  id: string;
  label: string;
  color?: string;
  // Additional properties for customization
  className?: string;
  style?: React.CSSProperties;
}

export interface CanvasItem extends DraggableComponent {
  type: string;
}

export interface List {
  id: string;
  items: CanvasItem[];
  // Additional properties for customization
  className?: string;
  style?: React.CSSProperties;
} 