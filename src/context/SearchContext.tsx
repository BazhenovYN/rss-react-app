import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { SEARCH_TERM_KEY } from '@/app/const';
import type { IDataFragment } from '@/types';
import { getFromLocalStorage } from '@/utils/storageUtils';

interface ISearchContext {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  data: IDataFragment | null;
  setData: (value: IDataFragment) => void;
}

const defaultValue: ISearchContext = {
  searchTerm: '',
  setSearchTerm: () => {},
  data: null,
  setData: () => {},
};

const SearchContext = createContext<ISearchContext>(defaultValue);

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const initialTerm = getFromLocalStorage<string>(SEARCH_TERM_KEY) || '';

  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [data, setData] = useState<IDataFragment | null>(null);
  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, data, setData }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
