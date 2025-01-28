import { CardContent } from "@packages/ui/components/ui/card";
import { Type } from "lucide-react";

interface TextBlockProps {
  data?: {
    text?: string;
  };
}

export function TextBlock({ data }: TextBlockProps) {
  return (
    <CardContent>
      <p className="text-sm">{data?.text || 'Text Block'}</p>
    </CardContent>
  );
}

export const textBlockDefinition = {
  type: 'text-block',
  category: 'basic',
  title: 'Text Block',
  description: 'Simple text block component',
  icon: Type,
  component: TextBlock,
  defaultData: {
    text: 'Edit this text'
  }
}; 