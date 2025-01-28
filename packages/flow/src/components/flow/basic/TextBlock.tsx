import { Type } from "lucide-react";
import { BaseBlock, createBlockDefinition } from "./BaseBlock";
import type { BaseBlockProps } from "./BaseBlock";

interface TextBlockProps extends BaseBlockProps {
  data?: {
    text?: string;
  };
}

export function TextBlock({ data, ...props }: TextBlockProps) {
  return (
    <BaseBlock {...props}>
      {data?.text || 'Drop text here'}
    </BaseBlock>
  );
}

export const textBlockDefinition = createBlockDefinition({
  type: 'text-block',
  title: 'Text Block',
  description: 'Simple text block component',
  icon: Type,
  component: TextBlock,
  defaultData: {
    text: 'Edit this text'
  }
}); 