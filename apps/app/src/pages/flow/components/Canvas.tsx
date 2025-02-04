import { memo } from "react";
import { SortableList, type List } from "@packages/dnd";
import { CanvasHeader } from "@apps/app/partials";
import { ListItem } from "./ListItem";
import { useSidebar } from "@packages/ui/components/ui/sidebar";
import { cn } from "@packages/ui/lib/utils";


export const Canvas = memo(function Canvas({ 
  lists, 
  onAddList, 
  header: HeaderComponent = CanvasHeader 
}: { 
  lists: List[]; 
  onAddList: () => void; 
  header?: React.ComponentType<{
    onAddList: () => void;
  }>;
}) {
  const { state } = useSidebar();

  return (
    <div className="flex-1 flex flex-col">
      <HeaderComponent onAddList={onAddList} />
      <div className="flex-1 w-full flex flex-col">
        <div className="h-[calc(100vh-64px)]">
          <div className={cn(
            "h-full",
            state === "expanded" ? "w-[calc(100vw-348px)]" : "w-[calc(100vw-48px)]",
            "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-800"
          )}>
            <div className="p-4">
              <div className="flex space-x-4">
                <div className="flex space-x-4 min-w-fit pr-4 pb-4">
                  {lists.map((list) => (
                    <SortableList
                      key={list.id}
                      list={list}
                      className="w-80 flex-shrink-0 border border-gray-200 dark:bg-gray-800 rounded"
                      headerClassName="p-4 border-b border-gray-200 dark:border-gray-700 cursor-move"
                      contentClassName="p-4 space-y-3"
                      itemClassName="mb-2"
                      renderItem={(item) => (
                        <ListItem key={item.id} item={item} listId={list.id} />
                      )}
                    >
                      <div className="h-20 rounded border-2 border-dashed border-gray-200 dark:border-gray-700 mt-3 flex items-center justify-center text-gray-500 dark:text-gray-400">
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
    </div>
  );
}); 