import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Button } from '@packages/ui/components/ui/button';
import { Link } from 'react-router-dom';
import FlowPage from './pages/flow';
import BuildPage from './pages/build';
import BoardPage from './pages/board';

function App() {
  return (
    <Router>
      <Routes><Route path="/" element={
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Welcome to Flow Builder</h1>
            <div className="mt-4 space-y-2">
              <Button asChild variant="outline">
                <Link to="/board">
                  Board Page
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/flow">
                  Flow Page
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/build">
                  Build Page
                </Link>
              </Button>
            </div>
          </div>

        } />
        <Route 
          path="/flow" 
          element={
            <MainLayout sidebar={<FlowPage />}>
              <FlowPage />
            </MainLayout>
          } 
        />
        <Route 
          path="/build" 
          element={
            <MainLayout sidebar={<BuildPage />}>
              <BuildPage />
            </MainLayout>
          } 
        />
        <Route path="/board" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
