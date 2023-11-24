import { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { ELEMENTS_PER_PAGE, FIRST_PAGE, SEARCH_TERM_KEY } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Button from '@/components/common/Button';
import ItemPerPageSelector from '@/components/common/ItemPerPageSelector';
import Pagination from '@/components/common/Pagination';
import TextField from '@/components/common/TextField';
import CardList from '@/components/features/CardList';
import Loader from '@/components/features/Loader';
import { useGetDataQuery } from '@/services/star-wars';
import {
  selectItemPerPage,
  selectSearchTerm,
  setItemsPerPage,
  setSearchTerm,
} from '@/store/searchSlice';
import { saveToLocalStorage } from '@/utils/storageUtils';

import styles from './SearchView.module.scss';

const SEARCH_PLACEHOLDER = 'You looking for, who are?';

function SearchView() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const searchTerm = useAppSelector(selectSearchTerm);
  const itemsPerPage = useAppSelector(selectItemPerPage);

  const inputRef = useRef<HTMLInputElement>(null);
  if (inputRef.current) {
    inputRef.current.value = searchTerm;
  }

  const _page = router.query['_page'];
  const page = typeof _page === 'string' ? Number(_page) : FIRST_PAGE;

  const { data, isLoading } = useGetDataQuery({
    name: searchTerm,
    page,
    limit: itemsPerPage,
  });

  const getTotalPageCount = () => {
    if (!data) return 0;
    return Math.ceil(data.totalCount / itemsPerPage);
  };

  const resetPage = () => {
    // setSearchParams((searchParams) => {
    //   searchParams.delete('_page');
    //   return searchParams;
    // });
  };

  const handleSearch = () => {
    const newSearchTerm = inputRef.current?.value ?? '';
    dispatch(setSearchTerm(newSearchTerm));
    saveToLocalStorage(SEARCH_TERM_KEY, newSearchTerm.trim());
    resetPage();
  };

  const handleChangeItemsPerPage = (newValue: number) => {
    resetPage();
    dispatch(setItemsPerPage(newValue));
  };

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
      {!isLoading && data && <CardList items={data.results} />}
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
