import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

// Имитация компонентов из сайдбара
const SIDEBAR_COMPONENTS = [
  { id: 'button', label: 'Button', color: 'bg-blue-500' },
  { id: 'input', label: 'Input', color: 'bg-green-500' },
  { id: 'card', label: 'Card', color: 'bg-purple-500' },
];

function SidebarItem({ component }: { component: typeof SIDEBAR_COMPONENTS[0] }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `sidebar-${component.id}`,
    data: component
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
      className={`${component.color} w-full p-4 rounded cursor-move text-white text-center`}
    >
      {component.label}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 p-4 space-y-4 rounded-lg">
      <h2 className="font-semibold text-lg">Components</h2>
      {SIDEBAR_COMPONENTS.map(component => (
        <SidebarItem key={component.id} component={component} />
      ))}
    </div>
  );
}

interface CanvasItem {
  id: string;
  type: string;
  color: string;
  label: string;
}

function SortableCanvasItem({ item }: { item: CanvasItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${item.color} p-4 rounded text-white text-center cursor-move`}
    >
      {item.label}
    </div>
  );
}

function Canvas({ items }: { items: CanvasItem[] }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 h-[600px] border-2 border-dashed rounded-lg p-4 ${
        isOver ? 'border-primary bg-primary/5' : 'border-gray-300'
      }`}
    >
      <SortableContext items={items.map(item => item.id)}>
        <div className="grid grid-cols-2 gap-4">
          {items.map(item => (
            <SortableCanvasItem key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function SortPage() {
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    if (!over) return;

    // Если перетаскиваем из сайдбара
    if (active.id.toString().startsWith('sidebar-')) {
      if (over.id === 'canvas') {
        const componentId = active.id.toString().replace('sidebar-', '');
        const component = SIDEBAR_COMPONENTS.find(c => c.id === componentId);
        if (component) {
          const newItem: CanvasItem = {
            id: `${component.id}-${Date.now()}`,
            type: component.id,
            color: component.color,
            label: component.label
          };
          setCanvasItems(items => [...items, newItem]);
        }
      }
    } 
    // Если сортируем внутри канваса
    else {
      const oldIndex = canvasItems.findIndex(item => item.id === active.id);
      const newIndex = canvasItems.findIndex(item => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setCanvasItems(items => arrayMove(items, oldIndex, newIndex));
      }
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">DnD Sort Page</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-8">
          <Sidebar />
          <Canvas items={canvasItems} />
        </div>
      </DndContext>
    </div>
  );
} 