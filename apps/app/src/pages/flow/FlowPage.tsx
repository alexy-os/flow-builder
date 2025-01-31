import { useEffect } from 'react';
import { useLayout } from '../../contexts/LayoutContext';
import { FlowLayout } from './FlowLayout';
import { Sidebar } from './components/Sidebar';

export function FlowPage() {
  const { setSidebar } = useLayout();

  useEffect(() => {
    setSidebar(<Sidebar />);
    return () => setSidebar(null);
  }, [setSidebar]);

  return <FlowLayout />;
} 