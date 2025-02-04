import { memo } from "react";
import { SortableList, type List } from "@packages/dnd";
import { useSidebar } from "@packages/ui/components/ui/sidebar";
import { cn } from "@packages/ui/lib/utils";
import { ListItem } from "./ListItem";

export const Canvas = memo(function Canvas({ 
  lists
}: { 
  lists: List[];
  header?: React.ComponentType<{
    onAddList?: () => void;
  }>;
}) {
  const { state } = useSidebar();

  if (!lists || lists.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
        Loading canvas...
      </div>
    );
  }

  const list = lists[0];

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 w-full flex flex-col">
        <div className="h-[calc(100vh-64px)]">
          <div className={cn(
            "h-full",
            state === "expanded" ? "w-[calc(100vw-348px)]" : "w-[calc(100vw-48px)]",
            "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-800"
          )}>
            <div className="p-4">
              <div className="flex">
                <SortableList
                  key={list.id}
                  list={list}
                  className={cn(
                    state === "expanded" ? "w-[calc(100vw-380px)]" : "w-[calc(100vw-80px)]",
                    "border border-gray-200 dark:bg-gray-800 rounded"
                  )}
                  headerClassName="p-4 border-b border-gray-200 dark:border-gray-700"
                  contentClassName="p-4 space-y-3"
                  itemClassName="mb-2"
                  renderHeader={() => <div className="h-20 rounded border-2 border-dashed border-gray-200 dark:border-gray-700 mt-3 flex items-center justify-center text-gray-500 dark:text-gray-400">Drop components here</div>}
                  renderItem={(item) => (
                    <ListItem key={item.id} item={item} listId={list.id} />
                  )}
                >
                </SortableList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}); 