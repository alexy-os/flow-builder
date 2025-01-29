import { memo } from "react";
import type { CanvasItem } from "@packages/dnd";

export const DragOverlayContent = memo(function DragOverlayContent({ item }: { item: CanvasItem }) {
  return (
    <div className={`${item.color} p-4 rounded text-white text-center mb-2 shadow-lg cursor-grabbing z-[100]`}>
      {item.label}
    </div>
  );
}); 