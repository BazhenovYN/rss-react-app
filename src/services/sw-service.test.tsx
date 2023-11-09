import { apiData } from '@/mocks/data';
import { getApiData, getApiDataById } from './sw-service';

describe('sw-service', () => {
  describe('getApiData', () => {
    test('returns correct data with empty query', async () => {
      const data = await getApiData('');
      expect(data.totalCount).toEqual(apiData.length);
      expect(data.results.length).toEqual(apiData.length);
    });

    test('returns correct data with search query', async () => {
      const searchTerm = 'solo';
      const data = await getApiData(searchTerm);
      const result = apiData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      expect(data.totalCount).toEqual(result.length);
      expect(data.results.length).toEqual(result.length);
    });

    test('returns correct page', async () => {
      const page = 2;
      const limit = 10;
      const data = await getApiData('', page, limit);
      expect(data.totalCount).toEqual(limit);
      expect(data.results.length).toEqual(limit);
    });
  });

  test('getApiDataById returns correct data', async () => {
    const id = 5;
    const data = await getApiDataById(id.toString());
    expect(data?.id).toEqual(id);
  });

  test('getApiDataById returns null', async () => {
    const data = await getApiDataById();
    expect(data).toBeNull();
  });
});
