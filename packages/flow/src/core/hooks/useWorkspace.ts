import { create } from 'zustand';
import type { BaseNode, BaseEdge, Position } from '../types';

interface WorkspaceState {
  nodes: BaseNode[];
  edges: BaseEdge[];
  addNode: (type: string, position: Position, data?: Record<string, unknown>) => void;
  updateNode: (id: string, updates: Partial<BaseNode>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: BaseEdge) => void;
  removeEdge: (id: string) => void;
  updateNodePosition: (id: string, position: Position) => void;
}

export const useWorkspace = create<WorkspaceState>((set) => ({
  nodes: [],
  edges: [],

  addNode: (type, position, data) => set((state) => ({
    nodes: [...state.nodes, {
      id: crypto.randomUUID(),
      type,
      position,
      data
    }]
  })),

  updateNode: (id, updates) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === id ? { ...node, ...updates } : node
    )
  })),

  removeNode: (id) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== id),
    edges: state.edges.filter(edge => 
      edge.source !== id && edge.target !== id
    )
  })),

  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, edge]
  })),

  removeEdge: (id) => set((state) => ({
    edges: state.edges.filter(edge => edge.id !== id)
  })),

  updateNodePosition: (id, position) => set((state) => ({
    nodes: state.nodes.map(node =>
      node.id === id ? { ...node, position } : node
    )
  })),
})); 