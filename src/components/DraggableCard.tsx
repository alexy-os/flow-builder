import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import type { ComponentDefinition } from "@/core/types";
import { LucideIcon } from "lucide-react";

interface DraggableCardProps {
  component: ComponentDefinition & {
    icon?: LucideIcon;
  };
}

export function DraggableCard({ component }: DraggableCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('componentType', component.type);
    // Добавляем эффект перемещения
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card 
      draggable
      onDragStart={handleDragStart}
      className="cursor-move hover:border-primary/50 transition-colors"
    >
      <CardHeader className="flex flex-row items-center gap-2 py-3">
        {component.icon ? (
          <component.icon 
            className="h-5 w-5 text-muted-foreground"
            aria-hidden="true"
          />
        ) : (
          <GripVertical 
            className="h-5 w-5 text-muted-foreground"
            aria-hidden="true"
          />
        )}
        <CardTitle className="text-sm font-medium">
          {component.title}
        </CardTitle>
      </CardHeader>
    </Card>
  );
} 