import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CanvasItem } from "@packages/dnd/types/dnd";

interface SortableItemProps {
  item: CanvasItem;
  listId: string;
  className?: string;
  children?: React.ReactNode;
}

export function SortableItem({ 
  item, 
  listId, 
  className = '',
  children 
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: item.id,
    data: {
      type: 'item',
      listId,
      item
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...item.style
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} ${isDragging ? 'opacity-50' : ''}`}
    >
      <div {...attributes} {...listeners}>
        {children || item.label}
      </div>
    </div>
  );
} 