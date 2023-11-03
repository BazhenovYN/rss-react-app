import { useCallback, useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import Button from '@/components/common/Button';
import ItemPerPageSelector from '@/components/common/ItemPerPageSelector';
import Pagination from '@/components/common/Pagination';
import TextField from '@/components/common/TextField';
import CardList from '@/components/features/CardList';
import Loader from '@/components/features/Loader';
import { getApiData } from '@/services/sw-service';
import type { IDataFragment } from '@/types';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/storageUtils';

import styles from './SearchView.module.scss';

const SEARCH_TERM_KEY = 'searchTerm';
const SEARCH_PLACEHOLDER = 'You looking for, who are?';
const FIRST_PAGE = 1;
const ELEMENTS_PER_PAGE = {
  sm: 10,
  md: 20,
  lg: 30,
};

function SearchView() {
  const initialTerm = getFromLocalStorage<string>(SEARCH_TERM_KEY) || '';

  const inputRef = useRef<HTMLInputElement>(null);
  if (inputRef.current) {
    inputRef.current.value = initialTerm;
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('_page');
  const page = pageParam ? parseInt(pageParam, 10) : FIRST_PAGE;

  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [itemsPerPage, setItemPerPage] = useState(ELEMENTS_PER_PAGE.sm);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IDataFragment | null>(null);

  const getData = useCallback(
    async (searchTerm: string, page?: number, limit?: number) => {
      setIsLoading(true);
      try {
        const data = await getApiData(searchTerm, page, limit);
        setData(data);
      } catch (error) {
        console.log('Unsuccessful fetch');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getTotalPageCount = (data: IDataFragment) => {
    return Math.ceil(data.totalCount / itemsPerPage);
  };

  const resetPage = () => {
    const newSearchParams = [...searchParams.entries()].filter(
      ([key]) => key !== '_page'
    );
    setSearchParams(newSearchParams);
  };

  const handleSearch = () => {
    const newSearchTerm = inputRef.current?.value ?? '';
    setSearchTerm(newSearchTerm);
    saveToLocalStorage(SEARCH_TERM_KEY, newSearchTerm.trim());
    resetPage();
  };

  const handleChangeItemsPerPage = (newValue: number) => {
    resetPage();
    setItemPerPage(newValue);
  };

  useEffect(() => {
    getData(searchTerm, page, itemsPerPage);
  }, [getData, searchTerm, page, itemsPerPage]);

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <TextField
          name="search"
          className={styles.input}
          placeholder={SEARCH_PLACEHOLDER}
          autoComplete="off"
          ref={inputRef}
        />
        <Button
          onClick={handleSearch}
          startIcon={<FaSearch />}
          className={styles.btn}
          disabled={isLoading}
        >
          Search
        </Button>
      </div>
      {isLoading && (
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      )}
      {!isLoading && data && data.results.length > 0 && (
        <>
          <CardList items={data.results} />
          <Pagination count={getTotalPageCount(data)} currentPage={page} />
          <ItemPerPageSelector
            sizes={ELEMENTS_PER_PAGE}
            onChange={handleChangeItemsPerPage}
            selectedValue={itemsPerPage}
          />
        </>
      )}
      {!isLoading && data?.results.length === 0 && <h2>Nothing found</h2>}
    </div>
  );
}

export default SearchView;
