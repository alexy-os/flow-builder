import { create } from 'zustand';
import type { ComponentDefinition } from './types';

interface RegistryState {
  components: Map<string, ComponentDefinition>;
  categories: Set<string>;
  register: (component: ComponentDefinition) => void;
  registerMany: (components: ComponentDefinition[]) => void;
  unregister: (type: string) => void;
  getComponent: (type: string) => ComponentDefinition | undefined;
  getComponentsByCategory: (category: string) => ComponentDefinition[];
}

export const useRegistry = create<RegistryState>((set, get) => ({
  components: new Map(),
  categories: new Set(),
  
  register: (component) => set((state) => {
    const newComponents = new Map(state.components);
    newComponents.set(component.type, component);
    const newCategories = new Set(state.categories);
    newCategories.add(component.category);
    return { 
      components: newComponents,
      categories: newCategories
    };
  }),

  registerMany: (components) => set((state) => {
    const newComponents = new Map(state.components);
    const newCategories = new Set(state.categories);
    
    components.forEach(component => {
      newComponents.set(component.type, component);
      newCategories.add(component.category);
    });

    return { 
      components: newComponents,
      categories: newCategories
    };
  }),

  unregister: (type) => set((state) => {
    const newComponents = new Map(state.components);
    newComponents.delete(type);
    return { components: newComponents };
  }),

  getComponent: (type) => get().components.get(type),
  
  getComponentsByCategory: (category) => 
    Array.from(get().components.values())
      .filter(c => c.category === category)
})); 