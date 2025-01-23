import { cn } from "@/lib/utils";
import { useState } from "react";
import { useComponentsStore } from "@/store/components";
import { DroppedComponent as DroppedComponentView } from "@/components/DroppedComponent";

export function DropZone() {
  const [isDragOver, setIsDragOver] = useState(false);
  const { components, addComponent } = useComponentsStore();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const type = e.dataTransfer.getData('componentType');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    addComponent(type, { x, y });
  };

  return (
    <div 
      className={cn(
        "w-full h-full min-h-[300px]",
        "border-2 border-dashed rounded-lg",
        "transition-colors duration-200",
        "p-4 sm:p-6 lg:p-8",
        "relative", // Добавляем для абсолютного позиционирования компонентов
        isDragOver ? "border-primary/50 bg-primary/5" : "border-muted",
        "h-[calc(100vh-32px)] sm:h-[calc(100vh-48px)] lg:h-[calc(100vh-64px)]"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {components.map((component) => (
        <DroppedComponentView
          key={component.id}
          {...component}
        />
      ))}
      
      {!isDragOver && components.length === 0 && (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <p className="text-center">
            Перетащите компоненты сюда
            <br />
            <span className="text-sm">Drag and drop components here</span>
          </p>
        </div>
      )}
    </div>
  );
} 