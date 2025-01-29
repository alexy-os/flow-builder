import { useDroppable } from "@dnd-kit/core";
import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { List } from "@packages/dnd/types/dnd";
import { SortableItem } from "./SortableItem";

interface SortableListProps {
  list: List;
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  renderItem?: (item: List['items'][0]) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  children?: React.ReactNode;
}

export function SortableList({
  list,
  className = '',
  itemClassName = '',
  headerClassName = '',
  contentClassName = '',
  renderItem,
  renderHeader,
  children
}: SortableListProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: list.id,
    data: {
      type: 'list',
      list
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    ...list.style
  };

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `droppable-${list.id}`,
    data: {
      type: 'list',
      listId: list.id
    }
  });

  return (
    <div ref={setNodeRef} style={style} className={className}>
      <div {...attributes} {...listeners} className={headerClassName}>
        {renderHeader?.() || <h3>List</h3>}
      </div>
      <div ref={setDroppableRef} className={contentClassName}>
        <SortableContext items={list.items.map(item => item.id)}>
          {list.items.map((item) => (
            renderItem ? (
              <div key={item.id} className="relative z-[5]">
                {renderItem(item)}
              </div>
            ) : (
              <SortableItem
                key={item.id}
                item={item}
                listId={list.id}
                className={itemClassName}
              />
            )
          ))}
        </SortableContext>
        {children}
      </div>
    </div>
  );
} 