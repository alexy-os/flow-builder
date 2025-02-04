import { memo } from "react";
import type { CanvasItem } from "@packages/dnd";

export const DragOverlayContent = memo(function DragOverlayContent({ item }: { item: CanvasItem }) {
  return (
    <div 
      className={`${item.color} p-4 text-white text-center cursor-grabbing`} 
      style={{ 
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        width: '100%',
        transform: 'translate3d(var(--dnd-draggable-offset-x, 0px), var(--dnd-draggable-offset-y, 0px), 0)'
      }}
    >
      {item.label}
    </div>
  );
}); 