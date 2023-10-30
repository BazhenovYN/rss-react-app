import { useCallback, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Button from '@/components/common/Button';
import TextField from '@/components/common/TextField';
import CardList from '@/components/features/CardList';
import Loader from '@/components/features/Loader';
import { getApiData } from '@/services/sw-service';
import type { IPeople } from '@/types';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/storageUtils';

import styles from './SearchView.module.scss';

const SEARCH_TERM_KEY = 'searchTerm';
const SEARCH_PLACEHOLDER = 'You looking for, who are?';

function SearchView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IPeople[] | null>(null);

  const getData = useCallback(async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const data = await getApiData(searchTerm);
      setData(data.results);
    } catch (error) {
      setData([]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = () => {
    getData(searchTerm);
    saveToLocalStorage(SEARCH_TERM_KEY, searchTerm.trim());
  };

  useEffect(() => {
    const initialTerm = getFromLocalStorage<string>(SEARCH_TERM_KEY) || '';
    setSearchTerm(initialTerm);
    getData(initialTerm);
  }, [getData]);

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
        data && <CardList items={data} />
      )}
    </div>
  );
}

export default SearchView;
