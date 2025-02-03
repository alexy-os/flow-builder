import { memo } from "react";
import { DraggableItem } from "@packages/dnd";
import type { DraggableComponent } from "@packages/dnd";
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarTrigger 
} from "@packages/ui/components/ui/sidebar";

const SIDEBAR_COMPONENTS: DraggableComponent[] = [
  { id: 'button', label: 'Button', color: 'bg-blue-500' },
  { id: 'input', label: 'Input', color: 'bg-green-500' },
  { id: 'card', label: 'Card', color: 'bg-purple-500' },
];

export function SidebarPage() {
  return (
    <>
      <SidebarMenu>
        <div className="p-4 space-y-4">
          {SIDEBAR_COMPONENTS.map(component => (
            <SidebarMenuItem key={component.id}>
              <DraggableItem
                key={component.id}
                component={component}
                prefix="sidebar-"
                className={`${component.color} w-full p-4 rounded-lg cursor-move active:cursor-grabbing text-white text-center shadow-sm hover:shadow-md transition-shadow`}
              />
            </SidebarMenuItem>
          ))}
        </div>
      </SidebarMenu>
    </>
  );
}