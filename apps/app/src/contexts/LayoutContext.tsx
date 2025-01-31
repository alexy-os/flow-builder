import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type LayoutContextType = {
  sidebar: ReactNode | null;
  setSidebar: (content: ReactNode | null) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isBuilderSidebarVisible: boolean;
  setIsBuilderSidebarVisible: (visible: boolean) => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return context;
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [sidebar, setSidebar] = useState<ReactNode | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isBuilderSidebarVisible, setIsBuilderSidebarVisible] = useState(true);

  return (
    <LayoutContext.Provider
      value={{
        sidebar,
        setSidebar,
        isCollapsed,
        setIsCollapsed,
        isBuilderSidebarVisible,
        setIsBuilderSidebarVisible,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
} 