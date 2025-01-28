import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import FlowPage from './pages/flow';
import { Button } from '@packages/ui/components/ui/button';
import { Link } from 'react-router-dom';
import { defaultComponents } from '@packages/flow/components/flow/registry';
import { useRegistry } from '@packages/flow/core/registry';
import { useEffect } from 'react';

function App() {
  const registerMany = useRegistry(state => state.registerMany);

  useEffect(() => {
    registerMany(defaultComponents);
  }, [registerMany]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Welcome to UI Builder</h1>
            <div className="mt-4">
              <Button asChild variant="outline">
                <Link to="/flow">
                  Let's start
                </Link>
              </Button>
            </div>
          </div>
        } />
        <Route path="/flow" element={<FlowPage />} />
      </Routes>
    </Router>
  );
}

export default App;
