import { RootLayout } from "@/components/layout/RootLayout";
import { DraggableCard } from "@/components/DraggableCard";
import { DropZone } from "@/components/DropZone";

export default function FlowPage() {
  return (
    <RootLayout
      sidebar={
        <div className="p-4 space-y-4">
          <h2 className="font-semibold mb-4">Components</h2>
          <DraggableCard 
            title="Pricing Section" 
            type="pricing-section" 
          />
          <DraggableCard 
            title="Feature Card" 
            type="feature-card" 
          />
        </div>
      }
    >
      <div className="p-4 sm:p-6 lg:p-8">
        <DropZone />
      </div>
    </RootLayout>
  );
} 