import { Canvas } from "@packages/flow/core/Canvas";
import { useWorkspace } from "@packages/flow/core/hooks/useWorkspace";
import { useRegistry } from "@packages/flow/core/registry";
import type { Position } from "@packages/flow/core/types";
import { DroppedComponent } from "./DroppedComponent";

export function DropZone() {
  const { nodes, addNode, removeNode } = useWorkspace();
  const { getComponent } = useRegistry();

  const handleDrop = (type: string, position: Position) => {
    const componentDef = getComponent(type);
    if (componentDef) {
      addNode(type, position, componentDef.defaultData);
    }
  };

  return (
    <Canvas 
      onDrop={handleDrop}
      className="h-[calc(100vh-32px)] sm:h-[calc(100vh-48px)] lg:h-[calc(100vh-64px)] min-h-[300px]"
    >
      {nodes.map((node) => {
        const componentDef = getComponent(node.type);
        if (!componentDef) return null;

        const Component = componentDef.component;
        return (
          <DroppedComponent
            key={node.id}
            id={node.id}
            position={node.position}
            onRemove={() => removeNode(node.id)}
          >
            <Component data={node.data} />
          </DroppedComponent>
        );
      })}
    </Canvas>
  );
} 