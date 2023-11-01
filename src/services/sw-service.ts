import { get } from './utils';
import type { IDataFragment, IPeople, QueryParam } from '@/types';

const API_URL = 'https://swapi.dev/api';

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
  init?: RequestInit
) => {
  const queryParams: QueryParam[] = [];
  if (searchTerm) {
    queryParams.push({ key: 'search', value: searchTerm.trim() });
  }
  if (page && page > 1) {
    queryParams.push({ key: 'page', value: page.toString() });
  }
  return get<IDataFragment<IPeople>>(API_URL, path.people, queryParams, init);
};
