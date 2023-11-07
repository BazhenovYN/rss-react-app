import { createContext, useContext } from 'react';
import type { IDataFragment } from '@/types';

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

export const SearchContext = createContext<ISearchContext>(defaultValue);

export const useSearchContext = () => useContext(SearchContext);
