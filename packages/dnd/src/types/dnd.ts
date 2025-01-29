export interface DraggableComponent {
  id: string;
  label: string;
  color?: string;
  // Additional properties for customization
  className?: string;
  style?: React.CSSProperties;
}

export interface CanvasItem extends DraggableComponent {
  type: string;
}

export interface List {
  id: string;
  items: CanvasItem[];
  // Additional properties for customization
  className?: string;
  style?: React.CSSProperties;
} 