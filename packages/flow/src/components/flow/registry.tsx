import { LayoutIcon } from "lucide-react";
import { Card, CardContent } from "@packages/ui/components/ui/card";
import { TextBlock, textBlockDefinition } from "./basic/TextBlock";
import type { ComponentDefinition } from "@packages/flow/core/types";

// Define the section component
const sectionDefinition: ComponentDefinition = {
  type: 'section',
  category: 'basic',
  title: 'Section',
  description: 'Container for other components',
  icon: LayoutIcon,
  component: ({ children }: { children?: React.ReactNode }) => (
    <Card className="min-h-[100px]">
      <CardContent className="p-4">
        {children || 'Drop components here'}
      </CardContent>
    </Card>
  ),
};

// Export an array of components
export const defaultComponents: ComponentDefinition[] = [
  sectionDefinition,
  textBlockDefinition,
  // You can add other components here
]; 