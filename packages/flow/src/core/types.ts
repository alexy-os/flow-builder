import type { LucideIcon } from 'lucide-react';

// Base types for the entire system
export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  width?: number;
  height?: number;
}

export interface BaseNode {
  id: string;
  type: string;
  position: Position;
  dimensions?: Dimensions;
  data?: Record<string, unknown>;
}

export interface BaseEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  data?: Record<string, unknown>;
}

export interface BasePort {
  id: string;
  type: 'input' | 'output';
  name: string;
  data?: Record<string, unknown>;
}

// Types for component registration
export interface ComponentDefinition {
  type: string;
  category: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  ports?: BasePort[];
  defaultData?: Record<string, unknown>;
  component: React.ComponentType<any>;
} 