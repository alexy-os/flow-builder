import { RootLayout } from "@packages/flow/components/layout/RootLayout";
import { DraggableCard } from "@packages/flow/components/DraggableCard";
import { DropZone } from "@packages/flow/components/DropZone";
import { useRegistry } from "@packages/flow/core/registry";
import '@xyflow/react/dist/style.css'

export default function FlowPage() {
  const { getComponentsByCategory } = useRegistry();
  const components = getComponentsByCategory('basic');

  return (
    <RootLayout
      sidebar={
        <div className="p-4 space-y-4">
          <h2 className="font-semibold mb-4">Components</h2>
          {components.length > 0 ? (
            components.map((component) => (
              <DraggableCard 
                key={component.type}
                component={component}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No components available</p>
          )}
        </div>
      }
    >
      <div className="p-4 sm:p-6 lg:p-8">
        <DropZone />
      </div>
    </RootLayout>
  );
} 