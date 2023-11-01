import { useCallback, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import Button from '@/components/common/Button';
import Pagination from '@/components/common/Pagination';
import TextField from '@/components/common/TextField';
import CardList from '@/components/features/CardList';
import Loader from '@/components/features/Loader';
import { getApiData } from '@/services/sw-service';
import type { IDataFragment, IPeople } from '@/types';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/storageUtils';

import styles from './SearchView.module.scss';

const SEARCH_TERM_KEY = 'searchTerm';
const SEARCH_PLACEHOLDER = 'You looking for, who are?';
const FIRST_PAGE = 1;
const ELEMENTS_PER_PAGE = 10;

function SearchView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : FIRST_PAGE;

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IDataFragment<IPeople> | null>(null);

  const getData = useCallback(async (searchTerm: string, page?: number) => {
    setIsLoading(true);
    try {
      const data = await getApiData(searchTerm, page);
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTotalPageCount = (data: IDataFragment<IPeople>) => {
    return Math.ceil(data.count / ELEMENTS_PER_PAGE);
  };

  const handleSearch = () => {
    getData(searchTerm);
    saveToLocalStorage(SEARCH_TERM_KEY, searchTerm.trim());
    const newSearchParams = [...searchParams.entries()].filter(
      ([key]) => key !== 'page'
    );
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const initialTerm = getFromLocalStorage<string>(SEARCH_TERM_KEY) || '';
    setSearchTerm(initialTerm);
    getData(initialTerm, page);
  }, [getData, page]);

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <TextField
          name="search"
          className={styles.input}
          placeholder={SEARCH_PLACEHOLDER}
          autoComplete="off"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
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
      {isLoading ? (
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      ) : (
        data && (
          <>
            <CardList items={data.results} />
            <Pagination count={getTotalPageCount(data)} currentPage={page} />
          </>
        )
      )}
    </div>
  );
}

export default SearchView;
