import ErrorBoundary from '@/components/features/ErrorBoundary';
import Home from '@/pages/Home';

function App() {
  return (
    <ErrorBoundary>
      <main>
        <Home />
      </main>
    </ErrorBoundary>
  );
}

export default App;
