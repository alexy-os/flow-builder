import { useCallback } from "react";
import { Canvas } from "./components/Canvas";
import { useBoardState } from "../../hooks/useBoardState";
import { createNewList } from "../../utils/lists";

export function FlowLayout() {
  const { lists, setLists } = useBoardState();

  const handleAddList = useCallback(() => {
    setLists(prev => [...prev, createNewList()]);
  }, [setLists]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Canvas lists={lists} onAddList={handleAddList} />
    </div>
  );
} 