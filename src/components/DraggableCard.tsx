import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical } from "lucide-react";

interface DraggableCardProps {
  title: string;
  type: string;
}

export function DraggableCard({ title, type }: DraggableCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('componentType', type);
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
        <GripVertical className="h-5 w-5 text-muted-foreground" />
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
} 