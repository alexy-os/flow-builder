import { useDndContext as useOriginalDndContext } from "@dnd-kit/core";

export function useDndContext() {
  return useOriginalDndContext();
} 