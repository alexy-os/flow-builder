import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { List } from "@packages/dnd/types/dnd";
import type { SortingStrategy } from "@dnd-kit/sortable";

interface DndContainerProps {
  lists: List[];
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  strategy?: SortingStrategy;
  children: React.ReactNode;
  overlayContent?: React.ReactNode;
  className?: string;
}

export function DndContainer({
  lists,
  onDragStart,
  onDragEnd,
  strategy = horizontalListSortingStrategy,
  children,
  overlayContent
}: DndContainerProps) {
  return (
    <div className="relative" style={{ isolation: 'isolate' }}>
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
        <DragOverlay style={{ 
          zIndex: 50,
          position: 'fixed',
          pointerEvents: 'none'
        }}>
          {overlayContent}
        </DragOverlay>
      </DndContext>
    </div>
  );
} 