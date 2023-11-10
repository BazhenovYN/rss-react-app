import { RouterProvider } from 'react-router-dom';
import { SearchProvider } from '@/context/SearchContext';
import router from '@/router';
import { getFromLocalStorage } from '@/utils/storageUtils';
import { SEARCH_TERM_KEY } from './const';

function App() {
  const initialTerm = getFromLocalStorage<string>(SEARCH_TERM_KEY) || '';

  return (
    <SearchProvider initialTerm={initialTerm}>
      <RouterProvider router={router} />
    </SearchProvider>
  );
}

export default App;
