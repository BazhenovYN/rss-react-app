import { createContext, useContext, useState } from 'react';
import type { IDataFragment } from '@/types';

interface ISearchContext {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  data: IDataFragment | null;
  setData: (value: IDataFragment) => void;
}

interface IProviderProps {
  children: React.ReactNode;
  initialTerm?: string;
}

const defaultValue: ISearchContext = {
  searchTerm: '',
  setSearchTerm: () => {},
  data: null,
  setData: () => {},
};

const SearchContext = createContext<ISearchContext>(defaultValue);

export const SearchProvider = ({
  initialTerm = '',
  children,
}: IProviderProps) => {
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
