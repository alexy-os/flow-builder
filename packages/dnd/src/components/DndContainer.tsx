import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { List } from "@packages/dnd/types/dnd";

interface DndContainerProps {
  lists: List[];
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  strategy?: any;
  children: React.ReactNode;
  overlayContent?: React.ReactNode;
  className?: string;
}

export function DndContainer({
  lists,
  onDragStart,
  onDragEnd,
  strategy,
  children,
  overlayContent
}: DndContainerProps) {
  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext 
        items={lists.map(list => list.id)}
        strategy={strategy}
      >
        {children}
      </SortableContext>
      <DragOverlay>
        {overlayContent}
      </DragOverlay>
    </DndContext>
  );
} 