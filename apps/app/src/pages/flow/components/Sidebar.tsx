import { memo } from "react";
import { DraggableItem } from "@packages/dnd";
import type { DraggableComponent } from "@packages/dnd";
import { Button } from "@packages/ui/components/ui/button";
import { Plus } from "lucide-react";

const SIDEBAR_COMPONENTS: DraggableComponent[] = [
  { id: 'button', label: 'Button', color: 'bg-blue-500' },
  { id: 'input', label: 'Input', color: 'bg-green-500' },
  { id: 'card', label: 'Card', color: 'bg-purple-500' },
];

export const Sidebar = memo(function Sidebar() {
  return (
    <div className="h-full bg-background">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Components</h2>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Custom
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {SIDEBAR_COMPONENTS.map(component => (
          <DraggableItem
            key={component.id}
            component={component}
            prefix="sidebar-"
            className={`${component.color} w-full p-4 rounded-lg cursor-move active:cursor-grabbing text-white text-center shadow-sm hover:shadow-md transition-shadow`}
          />
        ))}
      </div>
    </div>
  );
}); 