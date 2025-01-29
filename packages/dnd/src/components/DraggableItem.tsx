import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { DraggableComponent } from "@packages/dnd/types/dnd";

interface DraggableItemProps {
  component: DraggableComponent;
  prefix: string;
  className?: string;
}

export function DraggableItem({ component, prefix, className = '' }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${prefix}${component.id}`,
    data: {
      type: 'sidebar',
      component
    }
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform)
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={className}
    >
      {component.label}
    </div>
  );
} 