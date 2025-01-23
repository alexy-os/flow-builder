import { create } from 'zustand';

export interface DroppedComponent {
  id: string;
  type: string;
  position: { x: number; y: number };
}

interface ComponentsState {
  components: DroppedComponent[];
  addComponent: (type: string, position: { x: number; y: number }) => void;
  removeComponent: (id: string) => void;
}

export const useComponentsStore = create<ComponentsState>((set) => ({
  components: [],
  addComponent: (type, position) => set((state) => ({
    components: [...state.components, {
      id: crypto.randomUUID(),
      type,
      position,
    }],
  })),
  removeComponent: (id) => set((state) => ({
    components: state.components.filter(component => component.id !== id),
  })),
})); 