import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SortPage from './pages/dnd-sort';
import KanbanPage from './pages/dnd-kanban';
import { Button } from '@packages/ui/components/ui/button';
import { Link } from 'react-router-dom';
import DndTest from './pages/dnd-test';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Welcome to Flow Builder</h1>
            <div className="mt-4 space-y-2">
              <Button asChild variant="outline">
                <Link to="/dnd-sort">
                  DnD Sort Page
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/dnd-kanban">
                  DnD Kanban Page
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/dnd-test">
                  DnD Test Page
                </Link>
              </Button>
            </div>
          </div>

        } />
        <Route path="/dnd-sort" element={<SortPage />} />
        <Route path="/dnd-kanban" element={<KanbanPage />} />
        <Route path="/dnd-test" element={<DndTest />} />
      </Routes>
    </Router>

  );
}

export default App;
