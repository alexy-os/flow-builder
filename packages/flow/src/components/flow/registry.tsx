import { LayoutIcon } from "lucide-react";
import type { ComponentDefinition } from "@packages/flow/core/types";

// Определение компонента секции
const sectionDefinition: ComponentDefinition = {
  type: 'section',
  category: 'basic',
  title: 'Section',
  description: 'Container for other components',
  icon: LayoutIcon,
  component: ({ children }: { children?: React.ReactNode }) => (
    <div className="p-4 border rounded-lg min-h-[100px]">
      {children || 'Drop components here'}
    </div>
  ),
};

// Экспортируем массив компонентов
export const defaultComponents: ComponentDefinition[] = [
  sectionDefinition,
  // здесь можно добавить другие компоненты
]; 