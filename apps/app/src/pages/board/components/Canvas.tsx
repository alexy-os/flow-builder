import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@packages/ui/components/ui/button";
import { Plus, ZoomIn, Move } from "lucide-react";
import { SortableList } from "@packages/dnd";
import type { List } from "@packages/dnd";
import { zoom } from "d3-zoom";
import { select } from "d3-selection";
import { ListItem } from "./ListItem";

export function Canvas({ lists, onAddList }: { lists: List[]; onAddList: () => void }) {
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
    `w-[calc(100vw-350px)] h-[calc(100vh-180px)] border rounded-md ${
      isZoomMode 
        ? 'overflow-hidden cursor-all-scroll' 
        : 'overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'
    }`
  ), [isZoomMode]);

  return (
    <div className="flex-1">
      <div className="mb-4 flex gap-2 items-center">
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
          <div className="flex space-x-4 h-full">
            {lists.map((list) => (
              <SortableList
                key={list.id}
                list={list}
                className={`w-80 flex-shrink-0 sortable-list cursor-default ${
                  isZoomMode ? "h-auto" : "h-full"
                }`}
                headerClassName={`bg-gray-100 p-2 rounded-t ${isZoomMode ? "cursor-grabbing" : "cursor-move"}`}
                contentClassName="bg-gray-50 p-2 rounded-b space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                itemClassName="mb-2"
                renderItem={(item) => (
                  <ListItem key={item.id} item={item} listId={list.id} />
                )}
              >
                <div className="h-20 rounded border-2 border-dashed border-gray-200 mt-3 flex items-center justify-center text-gray-400">
                  Drop here
                </div>
              </SortableList>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 