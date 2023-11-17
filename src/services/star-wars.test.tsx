import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { renderHook, waitFor } from '@testing-library/react';
import { apiData } from '@/mocks/data';
import { setupStore } from '@/app/store';
import { useGetDataByIdQuery, useGetDataQuery } from './star-wars';

function Wrapper(props: { children: ReactNode }) {
  const store = setupStore();
  return <Provider store={store}>{props.children}</Provider>;
}

describe('sw-service', () => {
  describe('useGetDataQuery', () => {
    test('returns correct data with empty query', async () => {
      const { result } = renderHook(() => useGetDataQuery({ name: '' }), {
        wrapper: Wrapper,
      });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.totalCount).toEqual(apiData.length);
      expect(result.current.data?.results.length).toEqual(apiData.length);
    });

    test('returns correct data with search query', async () => {
      const searchTerm = 'solo';
      const testData = apiData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      const { result } = renderHook(
        () => useGetDataQuery({ name: searchTerm }),
        {
          wrapper: Wrapper,
        }
      );
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.totalCount).toEqual(testData.length);
      expect(result.current.data?.results.length).toEqual(testData.length);
    });

    test('returns correct page', async () => {
      const page = 2;
      const limit = 1;
      const testData = apiData[1];
      const { result } = renderHook(
        () => useGetDataQuery({ name: '', page, limit }),
        {
          wrapper: Wrapper,
        }
      );
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.totalCount).toEqual(limit);
      expect(result.current.data?.results.length).toEqual(limit);
      expect(result.current.data?.results[0]).toMatchObject(testData);
    });
  });

  describe('useGetDataByIdQuery', () => {
    test('returns correct data', async () => {
      const id = 5;
      const testData = apiData[4];
      const { result } = renderHook(() => useGetDataByIdQuery(id.toString()), {
        wrapper: Wrapper,
      });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toMatchObject(testData);
    });
  });
});
