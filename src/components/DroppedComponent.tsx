import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useComponentsStore } from '@/store/components';

interface DroppedComponentProps {
  id: string;
  type: string;
  position: { x: number; y: number };
}

export function DroppedComponent({ id, type, position }: DroppedComponentProps) {
  const removeComponent = useComponentsStore(state => state.removeComponent);

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Card className="w-[200px]">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-sm font-medium">
            {type}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => removeComponent(id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
} 