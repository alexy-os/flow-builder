import { LayoutIcon } from "lucide-react";
import type { ComponentDefinition } from "@packages/flow/core/types";

// Define the section component
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

// Export an array of components
export const defaultComponents: ComponentDefinition[] = [
  sectionDefinition,
  // You can add other components here
]; 