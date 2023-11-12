import { RouterProvider } from 'react-router-dom';
import { SearchProvider } from '@/context/SearchContext';
import router from '@/router';

function App() {
  return (
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  );
}

export default App;
