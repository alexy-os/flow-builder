import type { List, CanvasItem } from "@packages/dnd";

export const createNewList = (): List => ({
  id: `list-${Date.now()}`,
  items: []
});

export const moveItemBetweenLists = (
  lists: List[],
  activeListId: string,
  overListId: string,
  activeItem: CanvasItem,
): List[] => {
  return lists.map(list => {
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
};

export const addItemToList = (
  lists: List[],
  listId: string,
  component: { id: string; color: string; label: string }
): List[] => {
  return lists.map(list =>
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
  );
}; 