import { ChevronLeft, Plus, Move, ZoomIn } from 'lucide-react';
import { useLayout } from '../../../contexts/LayoutContext';
import { Button } from '@packages/ui/components/ui/button';
import { cn } from '@packages/ui/lib/utils';

interface HeaderProps {
  onAddList: () => void;
  isZoomMode: boolean;
  toggleZoomMode: () => void;
}

export function Header({ onAddList, isZoomMode, toggleZoomMode }: HeaderProps) {
  const { 
    sidebar, 
    isBuilderSidebarVisible, 
    setIsBuilderSidebarVisible 
  } = useLayout();

  return (
    <div className="flex items-center gap-4 border-b p-4 h-16">
      {/* Левая часть: кнопка сайдбара */}
      {sidebar && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsBuilderSidebarVisible(!isBuilderSidebarVisible)}
          className={cn(
            "shrink-0",
            !isBuilderSidebarVisible && "rotate-180"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Центр: заголовок */}
      <div className="text-base font-medium text-foreground">Flow Editor</div>

      {/* Правая часть: кнопки управления */}
      <div className="flex items-center gap-2 ml-auto">
        <Button onClick={onAddList} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add List
        </Button>
        <Button 
          onClick={toggleZoomMode} 
          variant={isZoomMode ? "default" : "outline"} 
          size="sm"
        >
          {isZoomMode ? <Move className="w-4 h-4 mr-2" /> : <ZoomIn className="w-4 h-4 mr-2" />}
          {isZoomMode ? 'Pan Mode' : 'List Mode'}
        </Button>
      </div>
    </div>
  );
} 