import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
import { Button } from "@packages/ui/components/ui/button";
import { Plus, ZoomIn, Move } from "lucide-react";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { 
  DndContainer, 
  SortableList, 
  DraggableItem,
  SortableItem,
  type CanvasItem, 
  type List, 
  type DraggableComponent 
} from "@packages/dnd";
import { zoom } from "d3-zoom";
import { select } from "d3-selection";

const SIDEBAR_COMPONENTS: DraggableComponent[] = [
  { id: 'button', label: 'Button', color: 'bg-blue-500' },
  { id: 'input', label: 'Input', color: 'bg-green-500' },
  { id: 'card', label: 'Card', color: 'bg-purple-500' },
];

const Sidebar = memo(function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 p-4 space-y-4 rounded-lg relative z-10">
      <h2 className="font-semibold text-lg">Components</h2>
      {SIDEBAR_COMPONENTS.map(component => (
        <DraggableItem
          key={component.id}
          component={component}
          prefix="sidebar-"
          className={`${component.color} w-full p-4 rounded cursor-move active:cursor-grabbing text-white text-center`}
        />
      ))}
    </div>
  );
});

const DragOverlayContent = memo(function DragOverlayContent({ item }: { item: CanvasItem }) {
  return (
    <div className={`${item.color} p-4 rounded text-white text-center mb-2 shadow-lg cursor-grabbing z-[100]`}>
      {item.label}
    </div>
  );
});

const ListItem = memo(function ListItem({ 
  item, 
  listId 
}: { 
  item: CanvasItem; 
  listId: string; 
}) {
  return (
    <div className="relative z-[5]">
      <SortableItem
        key={item.id}
        item={item}
        listId={listId}
        className={`${item.color} p-4 rounded text-white text-center`}
      >
        <div className="cursor-grab active:cursor-grabbing">
          {item.label}
        </div>
      </SortableItem>
    </div>
  );
});

function Canvas({ lists, onAddList }: { lists: List[]; onAddList: () => void }) {
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

export default function DndTest() {
  const [lists, setLists] = useState<List[]>([]);
  const [activeItem, setActiveItem] = useState<CanvasItem | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.data.current?.type === 'item') {
      setActiveItem(event.active.data.current.item);
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveItem(null);
    const { active, over } = event;
    
    if (!over) return;

    if (active.data.current?.type === 'sidebar') {
      const listId = over.id.toString().replace('droppable-', '');
      const component = active.data.current.component;
      
      if (component) {
        setLists(currentLists => 
          currentLists.map(list => 
            list.id === listId 
              ? {
                  ...list,
                  items: [...list.items, {
                    id: `${component.id}-${Date.now()}`,
                    type: component.id,
                    color: component.color,
                    label: component.label
                  }]
                }
              : list
          )
        );
      }
    } else if (active.data.current?.type === 'list') {
      const oldIndex = lists.findIndex(list => list.id === active.id);
      const newIndex = lists.findIndex(list => list.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        setLists(lists => arrayMove(lists, oldIndex, newIndex));
      }
    } else if (active.data.current?.type === 'item') {
      const { listId: activeListId, item: activeItem } = active.data.current;
      const overListId = over.id.toString().startsWith('droppable-')
        ? over.id.toString().replace('droppable-', '')
        : active.data.current.listId;

      setLists(currentLists => 
        currentLists.map(list => {
          if (list.id === activeListId) {
            if (activeListId === overListId) {
              const oldIndex = list.items.findIndex(item => item.id === active.id);
              const newIndex = list.items.findIndex(item => item.id === over.id);
              
              return oldIndex !== -1 && newIndex !== -1
                ? { ...list, items: arrayMove(list.items, oldIndex, newIndex) }
                : list;
            }
            return {
              ...list,
              items: list.items.filter(item => item.id !== activeItem.id)
            };
          }
          if (list.id === overListId && activeListId !== overListId) {
            return {
              ...list,
              items: [...list.items, activeItem]
            };
          }
          return list;
        })
      );
    }
  }, [lists]);

  const handleAddList = useCallback(() => {
    const newList: List = {
      id: `list-${Date.now()}`,
      items: []
    };
    setLists(prev => [...prev, newList]);
  }, []);

  return (
    <div className="p-8 h-screen overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">DnD Test Page</h1>
      <DndContainer
        lists={lists}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        strategy={horizontalListSortingStrategy}
        overlayContent={activeItem ? <DragOverlayContent item={activeItem} /> : null}
      >
        <div className="flex gap-8 h-[calc(100vh-120px)]">
          <Sidebar />
          <Canvas lists={lists} onAddList={handleAddList} />
        </div>
      </DndContainer>
    </div>
  );
}