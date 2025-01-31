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
    <div className="w-[300px] bg-white border-r relative z-10">
      <div className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">Components</div>
          
          <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Button
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