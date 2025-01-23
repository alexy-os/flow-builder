import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Position } from '@/core/types';

interface DroppedComponentProps {
  id: string;
  position: Position;
  onRemove: () => void;
  children: React.ReactNode;
}

export function DroppedComponent({ 
  id, 
  position, 
  onRemove,
  children 
}: DroppedComponentProps) {
  return (
    <div
      data-component-id={id}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
      className="group"
    >
      <Card className="w-[200px] relative">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
          aria-label="Remove component"
        >
          <X className="h-4 w-4" />
        </Button>
        {children}
      </Card>
    </div>
  );
} 