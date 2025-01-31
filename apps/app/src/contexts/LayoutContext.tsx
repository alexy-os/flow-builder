import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface LayoutContextType {
  isBuilderSidebarVisible: boolean;
  toggleBuilderSidebar: () => void;
  setIsBuilderSidebarVisible: (value: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isBuilderSidebarVisible, setIsBuilderSidebarVisible] = useState(true);

  const toggleBuilderSidebar = () => {
    setIsBuilderSidebarVisible(prev => !prev);
  };

  return (
    <LayoutContext.Provider value={{
      isBuilderSidebarVisible,
      toggleBuilderSidebar,
      setIsBuilderSidebarVisible
    }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
} 