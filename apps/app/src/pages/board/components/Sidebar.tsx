import { memo } from "react";
import { DraggableItem } from "@packages/dnd";
import type { DraggableComponent } from "@packages/dnd";

const SIDEBAR_COMPONENTS: DraggableComponent[] = [
  { id: 'button', label: 'Button', color: 'bg-blue-500' },
  { id: 'input', label: 'Input', color: 'bg-green-500' },
  { id: 'card', label: 'Card', color: 'bg-purple-500' },
];

export const Sidebar = memo(function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 p-4 space-y-4 rounded-lg relative z-10">
      <h2 className="font-semibold text-lg">Components</h2>
      {SIDEBAR_COMPONENTS.map(component => (
        <DraggableItem
          key={component.id}
          component={component}
          prefix="sidebar-"
          className={`${component.color} w-full p-4 rounded cursor-move active:cursor-grabbing text-white text-center`}
        />
      ))}
    </div>
  );
}); 