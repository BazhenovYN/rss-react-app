import { get } from './utils';
import type { IDataFragment, IPeople, QueryParam } from '@/types';

const API_URL = 'https://sw-json.vercel.app';

const path = {
  people: '/people/',
  planets: '/planets/',
  films: '/films/',
  species: '/species/',
  vehicles: '/vehicles/',
  starships: '/starships/',
};

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
    path.people,
    queryParams,
    init
  );
  return { totalCount, results: data };
};
