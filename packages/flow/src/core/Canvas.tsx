import { useCallback, useState } from 'react';
import { cn } from '@packages/flow/core/lib/utils';
import type { Position } from '@packages/flow/core/types';

interface CanvasProps {
  children?: React.ReactNode;
  onDrop?: (type: string, position: Position) => void;
  className?: string;
}

export function Canvas({ children, onDrop, className }: CanvasProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const rect = e.currentTarget.getBoundingClientRect();
    const type = e.dataTransfer.getData('componentType');
    
    if (type) {
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      onDrop?.(type, position);
    }
  }, [onDrop]);

  return (
    <div 
      className={cn(
        "w-full h-full relative overflow-auto",
        "border-2 border-dashed rounded-lg",
        isDragOver ? "border-primary/50 bg-primary/5" : "border-muted",
        className
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
} 