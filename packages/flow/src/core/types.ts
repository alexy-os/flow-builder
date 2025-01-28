import type { LucideIcon } from 'lucide-react';

// Базовые типы для всей системы
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

// Типы для регистрации компонентов
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