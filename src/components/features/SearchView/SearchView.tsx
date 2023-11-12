import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { ELEMENTS_PER_PAGE, SEARCH_TERM_KEY } from '@/app/const';
import Button from '@/components/common/Button';
import ItemPerPageSelector from '@/components/common/ItemPerPageSelector';
import Pagination from '@/components/common/Pagination';
import TextField from '@/components/common/TextField';
import CardList from '@/components/features/CardList';
import Loader from '@/components/features/Loader';
import { useSearchContext } from '@/context/SearchContext';
import { getApiData } from '@/services/sw-service';
import { saveToLocalStorage } from '@/utils/storageUtils';

import styles from './SearchView.module.scss';

const SEARCH_PLACEHOLDER = 'You looking for, who are?';
const FIRST_PAGE = 1;

function SearchView() {
  const { searchTerm, setSearchTerm, data, setData } = useSearchContext();

  const inputRef = useRef<HTMLInputElement>(null);
  if (inputRef.current) {
    inputRef.current.value = searchTerm;
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('_page');
  const page = pageParam ? parseInt(pageParam, 10) : FIRST_PAGE;

  const [itemsPerPage, setItemPerPage] = useState(ELEMENTS_PER_PAGE.sm);
  const [isLoading, setIsLoading] = useState(false);

  const getTotalPageCount = () => {
    if (!data) return 0;
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
    const getData = async () => {
      setIsLoading(true);
      try {
        const apiData = await getApiData(searchTerm, page, itemsPerPage);
        setData(apiData);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [searchTerm, page, itemsPerPage, setData]);

  return (
    <div className={styles.container} data-testid="search-section">
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
          data-testid="search-button"
        >
          Search
        </Button>
      </div>
      {isLoading && (
        <div className={styles['loader-container']}>
          <Loader />
        </div>
      )}
      {!isLoading && <CardList />}
      {!isLoading && data && data?.results.length > 0 && (
        <>
          <Pagination count={getTotalPageCount()} currentPage={page} />
          <ItemPerPageSelector
            sizes={ELEMENTS_PER_PAGE}
            onChange={handleChangeItemsPerPage}
            selectedValue={itemsPerPage}
          />
        </>
      )}
    </div>
  );
}

export default SearchView;
