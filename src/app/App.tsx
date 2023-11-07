import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from '@/components/features/ErrorBoundary';
import { SearchContext } from '@/context/SearchContext';
import router from '@/router';
import type { IDataFragment } from '@/types';
import { getFromLocalStorage } from '@/utils/storageUtils';
import { SEARCH_TERM_KEY } from './const';

function App() {
  const initialTerm = getFromLocalStorage<string>(SEARCH_TERM_KEY) || '';

  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [data, setData] = useState<IDataFragment | null>(null);

  return (
    <ErrorBoundary>
      <SearchContext.Provider
        value={{ searchTerm, setSearchTerm, data, setData }}
      >
        <RouterProvider router={router} />
      </SearchContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
