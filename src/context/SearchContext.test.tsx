import { renderHook, act } from '@testing-library/react';
import { apiData } from '@/mocks/data';
import { IDataFragment } from '@/types';
import { SearchProvider, useSearchContext } from './SearchContext';

describe('useSearchContext', () => {
  const searchTerm = 'Han Solo';
  const data: IDataFragment = {
    totalCount: 1,
    results: apiData.slice(0, 1),
  };

  test('renders with default values', () => {
    const { result } = renderHook(useSearchContext);
    expect(result.current.searchTerm).toBe('');
    expect(result.current.data).toBeNull();
  });

  test('renders with the initial value', () => {
    const { result } = renderHook(useSearchContext, {
      wrapper: ({ children }) => (
        <SearchProvider initialTerm={searchTerm}>{children}</SearchProvider>
      ),
    });
    expect(result.current.searchTerm).toBe(searchTerm);
  });

  test('renders with changed values', () => {
    const { result } = renderHook(useSearchContext, {
      wrapper: SearchProvider,
    });
    act(() => {
      result.current.setSearchTerm(searchTerm);
      result.current.setData(data);
    });
    expect(result.current.searchTerm).toBe(searchTerm);
    expect(result.current.data).toEqual(data);
  });
});
