import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState, useCallback, useMemo } from "react";
import { Button } from "@packages/ui/components/ui/button";
import { Plus } from "lucide-react";

// Имитация компонентов из сайдбара
const SIDEBAR_COMPONENTS = [
  { id: 'button', label: 'Button', color: 'bg-blue-500' },
  { id: 'input', label: 'Input', color: 'bg-green-500' },
  { id: 'card', label: 'Card', color: 'bg-purple-500' },
];

function SidebarItem({ component }: { component: typeof SIDEBAR_COMPONENTS[0] }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `sidebar-${component.id}`,
    data: component
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform)
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${component.color} w-full p-4 rounded cursor-grab active:cursor-grabbing text-white text-center`}
    >
      {component.label}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 p-4 space-y-4 rounded-lg">
      <h2 className="font-semibold text-lg">Components</h2>
      {SIDEBAR_COMPONENTS.map(component => (
        <SidebarItem key={component.id} component={component} />
      ))}
    </div>
  );
}

interface CanvasItem {
  id: string;
  type: string;
  color: string;
  label: string;
}

interface List {
  id: string;
  items: CanvasItem[];
}

function SortableCanvasItem({ item, listId }: { item: CanvasItem; listId: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: item.id,
    data: {
      type: 'item',
      listId,
      item
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${item.color} p-4 rounded text-white text-center mb-2 touch-none ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div 
        {...attributes} 
        {...listeners} 
        className="cursor-grab active:cursor-grabbing"
      >
        {item.label}
      </div>
    </div>
  );
}

function SortableList({ list }: { list: List }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: list.id,
    data: {
      type: 'list',
      list
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `droppable-${list.id}`,
    data: {
      type: 'list',
      listId: list.id
    }
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-80 flex-shrink-0"
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-gray-100 p-2 rounded-t cursor-grab active:cursor-grabbing"
      >
        <h3 className="font-medium">List</h3>
      </div>
      <div
        ref={setDroppableRef}
        className="bg-gray-50 p-2 rounded-b min-h-[200px]"
      >
        <SortableContext items={list.items.map(item => item.id)}>
          {list.items.map((item) => (
            <SortableCanvasItem 
              key={item.id} 
              item={item} 
              listId={list.id}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

function Canvas({ lists, onAddList, children }: { 
  lists: List[]; 
  onAddList: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="mb-4">
        <Button onClick={onAddList} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add List
        </Button>
      </div>
      <div 
        className="
          flex gap-4 
          overflow-x-auto 
          p-4 
          min-h-[600px] 
          scrollbar-thin 
          scrollbar-thumb-gray-300
          horizontal-scroll
        "
        style={{
          width: 'calc(100vw - 350px)',
          overflowX: 'auto',
          overflowY: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
}

function DragOverlayContent({ 
  item, 
  component,
  list 
}: { 
  item?: CanvasItem; 
  component?: typeof SIDEBAR_COMPONENTS[0];
  list?: List;
}) {
  if (component) {
    return (
      <div
        className={`${component.color} w-64 p-4 rounded cursor-grabbing text-white text-center shadow-lg`}
      >
        {component.label}
      </div>
    );
  }

  if (item) {
    return (
      <div
        className={`${item.color} p-4 rounded text-white text-center mb-2 shadow-lg cursor-grabbing`}
      >
        {item.label}
      </div>
    );
  }

  if (list) {
    return (
      <div className="w-80 flex-shrink-0 shadow-lg">
        <div className="bg-gray-100 p-2 rounded cursor-grabbing">
          <h3 className="font-medium">List</h3>
        </div>
      </div>
    );
  }

  return null;
}

export default function KanbanPage() {
  const [lists, setLists] = useState<List[]>([]);
  const [activeItem, setActiveItem] = useState<CanvasItem | null>(null);
  const [activeSidebarItem, setActiveSidebarItem] = useState<typeof SIDEBAR_COMPONENTS[0] | null>(null);
  const [activeList, setActiveList] = useState<List | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.id.toString().startsWith('sidebar-')) {
      const componentId = event.active.id.toString().replace('sidebar-', '');
      const component = SIDEBAR_COMPONENTS.find(c => c.id === componentId);
      if (component) {
        setActiveSidebarItem(component);
      }
    } else if (event.active.data.current?.type === 'item') {
      setActiveItem(event.active.data.current.item);
    } else if (event.active.data.current?.type === 'list') {
      setActiveList(event.active.data.current.list);
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveItem(null);
    setActiveSidebarItem(null);
    setActiveList(null);

    if (!over) return;

    if (active.data.current?.type === 'list' && over.data.current?.type === 'list') {
      const oldIndex = lists.findIndex(list => list.id === active.id);
      const newIndex = lists.findIndex(list => list.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        setLists(lists => arrayMove(lists, oldIndex, newIndex));
      }
    } else {
      if (active.id.toString().startsWith('sidebar-')) {
        const targetId = over.id.toString();
        const listId = targetId.replace('droppable-', '');
        const componentId = active.id.toString().replace('sidebar-', '');
        const component = SIDEBAR_COMPONENTS.find(c => c.id === componentId);
        
        if (component) {
          setLists(currentLists => {
            return currentLists.map(list => {
              if (list.id === listId) {
                return {
                  ...list,
                  items: [...list.items, {
                    id: `${component.id}-${Date.now()}`,
                    type: component.id,
                    color: component.color,
                    label: component.label
                  }]
                };
              }
              return list;
            });
          });
        }
      } else if (active.data.current?.type === 'item') {
        const activeListId = active.data.current.listId;
        const activeItem = active.data.current.item;
        const overId = over.id.toString();
        
        const overListId = overId.startsWith('droppable-') 
          ? overId.replace('droppable-', '')
          : active.data.current.listId;

        if (activeListId === overListId) {
          setLists(currentLists => {
            return currentLists.map(list => {
              if (list.id === activeListId) {
                const oldIndex = list.items.findIndex(item => item.id === active.id);
                const newIndex = list.items.findIndex(item => item.id === over.id);
                
                if (oldIndex !== -1 && newIndex !== -1) {
                  return {
                    ...list,
                    items: arrayMove(list.items, oldIndex, newIndex)
                  };
                }
              }
              return list;
            });
          });
        } else {
          setLists(currentLists => {
            return currentLists.map(list => {
              if (list.id === activeListId) {
                return {
                  ...list,
                  items: list.items.filter(item => item.id !== activeItem.id)
                };
              }
              if (list.id === overListId) {
                return {
                  ...list,
                  items: [...list.items, activeItem]
                };
              }
              return list;
            });
          });
        }
      }
    }
  }, [lists]);

  const handleAddList = () => {
    const newList: List = {
      id: `list-${Date.now()}`,
      items: []
    };
    setLists([...lists, newList]);
  };

  const sortableListIds = useMemo(() => lists.map(list => list.id), [lists]);

  return (
    <div className="p-8 h-screen overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">DnD Kanban Page</h1>
      <DndContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-8 h-[calc(100vh-120px)]">
          <Sidebar />
          <Canvas lists={lists} onAddList={handleAddList}>
            <SortableContext 
              items={sortableListIds}
              strategy={horizontalListSortingStrategy}
            >
              {lists.map((list) => (
                <SortableList 
                  key={list.id} 
                  list={list}
                />
              ))}
            </SortableContext>
          </Canvas>
        </div>

        <DragOverlay>
          {activeSidebarItem ? (
            <DragOverlayContent component={activeSidebarItem} />
          ) : activeItem ? (
            <DragOverlayContent item={activeItem} />
          ) : activeList ? (
            <DragOverlayContent list={activeList} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// Стили для скролла
const styles = `
  .horizontal-scroll::-webkit-scrollbar {
    height: 8px;
  }
  
  .horizontal-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  .horizontal-scroll::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  .horizontal-scroll::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
} 