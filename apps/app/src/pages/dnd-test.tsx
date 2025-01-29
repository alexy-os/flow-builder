import { useState } from "react";
import { Button } from "@packages/ui/components/ui/button";
import { Plus } from "lucide-react";
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

const SIDEBAR_COMPONENTS: DraggableComponent[] = [
  { id: 'button', label: 'Button', color: 'bg-blue-500' },
  { id: 'input', label: 'Input', color: 'bg-green-500' },
  { id: 'card', label: 'Card', color: 'bg-purple-500' },
];

function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 p-4 space-y-4 rounded-lg">
      <h2 className="font-semibold text-lg">Components</h2>
      {SIDEBAR_COMPONENTS.map(component => (
        <DraggableItem
          key={component.id}
          component={component}
          prefix="sidebar-"
          className={`${component.color} w-full p-4 rounded cursor-move text-white text-center`}
        />
      ))}
    </div>
  );
}

function DragOverlayContent({ item }: { item: CanvasItem }) {
  return (
    <div className={`${item.color} p-4 rounded text-white text-center mb-2 shadow-lg cursor-grabbing`}>
      {item.label}
    </div>
  );
}

function Canvas({ lists, onAddList }: { lists: List[]; onAddList: () => void }) {
  return (
    <div className="flex-1 overflow-hidden">
      <div className="mb-4">
        <Button onClick={onAddList} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add List
        </Button>
      </div>
      <div 
        className="flex gap-4 overflow-x-auto p-4 min-h-[600px] scrollbar-thin scrollbar-thumb-gray-300 horizontal-scroll"
        style={{
          width: 'calc(100vw - 350px)',
          overflowX: 'auto',
          overflowY: 'hidden'
        }}
      >
        {lists.map((list) => (
          <SortableList
            key={list.id}
            list={list}
            className="w-80 flex-shrink-0"
            headerClassName="bg-gray-100 p-2 rounded-t cursor-move"
            contentClassName="bg-gray-50 p-2 rounded-b min-h-[200px]"
            itemClassName="mb-2"
            renderItem={(item) => (
              <SortableItem
                key={item.id}
                item={item}
                listId={list.id}
                className={`${item.color} p-4 rounded text-white text-center touch-none`}
              >
                <div className="cursor-grab active:cursor-grabbing">
                  {item.label}
                </div>
              </SortableItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default function DndTest() {
  const [lists, setLists] = useState<List[]>([]);
  const [activeItem, setActiveItem] = useState<CanvasItem | null>(null);

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'item') {
      setActiveItem(event.active.data.current.item);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null);
    const { active, over } = event;
    
    if (!over) return;

    if (active.data.current?.type === 'sidebar') {
      const targetId = over.id.toString();
      const listId = targetId.replace('droppable-', '');
      const component = active.data.current.component;
      
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
    } else if (active.data.current?.type === 'list') {
      const oldIndex = lists.findIndex(list => list.id === active.id);
      const newIndex = lists.findIndex(list => list.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        setLists(lists => arrayMove(lists, oldIndex, newIndex));
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

  const handleAddList = () => {
    const newList: List = {
      id: `list-${Date.now()}`,
      items: []
    };
    setLists([...lists, newList]);
  };

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