import { memo } from "react";
import { SortableItem, type CanvasItem } from "@packages/dnd";

export const ListItem = memo(function ListItem({ 
  item, 
  listId 
}: { 
  item: CanvasItem; 
  listId: string; 
}) {
  return (
    <div className="relative" style={{ zIndex: 5 }}>
      <SortableItem
        key={item.id}
        item={item}
        listId={listId}
        className={`${item.color}  p-4 text-white text-center relative`}
      >
        <div className="w-full cursor-grab active:cursor-grabbing">
          {item.label}
        </div>
      </SortableItem>
    </div>
  );
}); 