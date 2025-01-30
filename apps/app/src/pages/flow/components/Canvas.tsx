import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { Button } from "@packages/ui/components/ui/button";
import { Plus, ZoomIn, Move } from "lucide-react";
import { SortableList } from "@packages/dnd";
import type { List } from "@packages/dnd";
import { zoom } from "d3-zoom";
import { select } from "d3-selection";
import { ListItem } from "./ListItem";
import { cn } from "@packages/ui/lib/utils";
import {
  useDroppable
} from '@dnd-kit/core';

export const Canvas = memo(function Canvas({ lists, onAddList }: { lists: List[]; onAddList: () => void }) {
  const [isZoomMode, setIsZoomMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleZoomMode = useCallback(() => {
    setIsZoomMode(prev => !prev);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !isZoomMode) return;

    const zoomBehavior = zoom()
      .scaleExtent([0.3, 2.5])
      .filter(event => {
        const target = event.target as HTMLElement;
        return !target.closest('.sortable-list');
      })
      .on('zoom', (event) => {
        select(contentRef.current)
          .style('transform', `translate(${event.transform.x}px, ${event.transform.y}px) scale(${event.transform.k})`);
      });

    const container = select(containerRef.current);
    container.call(zoomBehavior as any).on('dblclick.zoom', null);

    return () => {
      select(contentRef.current).style('transform', '');
      container.on('.zoom', null);
    };
  }, [isZoomMode]);

  const containerClassName = useMemo(() => (
    `w-[calc(100vw-300px)] h-[calc(100vh-64px)] border rounded-md ${
      isZoomMode 
        ? 'overflow-hidden cursor-all-scroll' 
        : 'overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'
    }`
  ), [isZoomMode]);

  const { setNodeRef } = useDroppable({
    id: 'canvas-droppable',
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className={cn(
        "flex-1 w-full flex flex-col",
        isZoomMode ? "overflow-hidden" : "overflow-hidden"
      )}>
        <div className="flex gap-3.5 items-center border-b p-4 h-16 flex-shrink-0">
          <div className="text-base font-medium text-foreground">Canvas</div>
          <div className="flex gap-2 ml-auto">
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
        <div 
          ref={setNodeRef}
          className={cn(
            "h-full w-full relative",
            isZoomMode ? "overflow-hidden" : "overflow-visible"
          )}
        >
          <div 
            ref={containerRef}
            className={containerClassName}
            data-scrollable={!isZoomMode}
          >
            <div 
              ref={contentRef}
              className="h-full"
              style={{ transformOrigin: '0 0' }}
            >
              <div className="flex space-x-4 h-full p-4">
                {lists.map((list) => (
                  <SortableList
                    key={list.id}
                    list={list}
                    className={`w-80 flex-shrink-0 sortable-list bg-white border border-gray-200 rounded-lg ${
                      isZoomMode ? "h-auto cursor-default" : "h-full"
                    }`}
                    headerClassName={`p-4 border-b ${isZoomMode ? "cursor-grabbing" : "cursor-move"}`}
                    contentClassName="p-4 space-y-3 overflow-y-auto"
                    itemClassName="mb-2"
                    renderItem={(item) => (
                      <ListItem key={item.id} item={item} listId={list.id} />
                    )}
                  >
                    <div className="h-20 rounded border-2 border-dashed border-gray-200 mt-3 flex items-center justify-center text-gray-500">
                      Drop here
                    </div>
                  </SortableList>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}); 