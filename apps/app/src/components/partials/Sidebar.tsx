import { memo } from "react";
import { DraggableItem, type DraggableComponent } from "@packages/dnd";
import { 
  SidebarMenu, 
  SidebarMenuItem
} from "@packages/ui/components/ui/sidebar";

const DEFAULT_SIDEBAR_COMPONENTS: DraggableComponent[] = [
  { id: 'button', label: 'Button', color: 'bg-blue-500' },
  { id: 'input', label: 'Input', color: 'bg-green-500' },
  { id: 'card', label: 'Card', color: 'bg-purple-500' },
];

export const SidebarPage = memo(({ 
  items = DEFAULT_SIDEBAR_COMPONENTS 
}: { 
  items?: DraggableComponent[] 
}) => {
  return (
    <>
      <SidebarMenu>
        <div className="p-4 space-y-4">
          {items.map(component => (
            <SidebarMenuItem key={component.id}>
              <DraggableItem
                key={component.id}
                component={component}
                prefix="sidebar-"
                className={`${component.color} w-full min-w-lg p-4 rounded-lg cursor-move active:cursor-grabbing text-white text-center shadow-sm hover:shadow-md transition-shadow`}
              />
            </SidebarMenuItem>
          ))}
        </div>
      </SidebarMenu>
    </>
  );
});