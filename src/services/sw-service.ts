import { API_URL, PATH } from '@/app/const';
import { get } from './utils';
import type { IDataFragment, IPeople, QueryParam } from '@/types';

export const getApiData = async (
  searchTerm: string,
  page?: number,
  limit?: number,
  init?: RequestInit
): Promise<IDataFragment> => {
  const queryParams: QueryParam[] = [];
  if (searchTerm) {
    queryParams.push({ key: 'name_like', value: searchTerm.trim() });
  }
  if (page && page > 1) {
    queryParams.push({ key: '_page', value: page.toString() });
  }
  if (limit) {
    queryParams.push({ key: '_limit', value: limit.toString() });
  }
  const { totalCount, data } = await get<IPeople[]>(
    API_URL,
    PATH,
    queryParams,
    init
  );
  return { totalCount, results: data };
};

export const getApiDataById = async (id: string) => {
  const { data } = await get<IPeople>(API_URL, `${PATH}/${id}`);
  return data;
};
