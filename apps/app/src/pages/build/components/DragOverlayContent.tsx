import { memo } from "react";
import type { CanvasItem } from "@packages/dnd";

export const DragOverlayContent = memo(function DragOverlayContent({ item }: { item: CanvasItem }) {
  return (
    <div className={`${item.color} p-4 rounded text-white text-center mb-2 shadow-lg cursor-grabbing`} style={{ 
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 100,
      transform: 'translate3d(var(--dnd-draggable-offset-x, 0px), var(--dnd-draggable-offset-y, 0px), 0)'
    }}>
      {item.label}
    </div>
  );
}); 