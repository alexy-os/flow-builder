import { memo } from "react";
import { SortableItem } from "@packages/dnd";
import type { CanvasItem } from "@packages/dnd";

export const ListItem = memo(function ListItem({ 
  item, 
  listId 
}: { 
  item: CanvasItem; 
  listId: string; 
}) {
  return (
    <div className="relative z-[5]">
      <SortableItem
        key={item.id}
        item={item}
        listId={listId}
        className={`${item.color} p-4 rounded text-white text-center`}
      >
        <div className="cursor-grab active:cursor-grabbing">
          {item.label}
        </div>
      </SortableItem>
    </div>
  );
}); 