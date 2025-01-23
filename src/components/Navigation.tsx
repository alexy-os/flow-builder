import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Navigation() {
  return (
    <nav className="flex gap-4">
      <Link to="/flow-components">
        <Button>
          Open Flow Builder
        </Button>
      </Link>
    </nav>
  );
} 