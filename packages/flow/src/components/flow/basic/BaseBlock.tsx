import { Card, CardContent } from "@packages/ui/components/ui/card";
import type { ComponentDefinition } from "@packages/flow/core/types";
import type { LucideIcon } from "lucide-react";

// Base props for all blocks
export interface BaseBlockProps {
  children?: React.ReactNode;
  className?: string;
  data?: Record<string, unknown>;
}

export function BaseBlock({ children, className }: BaseBlockProps) {
  return (
    <Card className="min-h-[100px]">
      <CardContent className={`p-4 ${className || ''}`}>
        {children}
      </CardContent>
    </Card>
  );
}

// Factory for creating component definitions
export function createBlockDefinition<T extends BaseBlockProps>(config: {
  type: string;
  title: string;
  description: string;
  icon: LucideIcon;
  component: React.ComponentType<T>;
  defaultData?: Record<string, unknown>;
}): ComponentDefinition {
  return {
    category: 'basic',
    ...config,
  };
} 