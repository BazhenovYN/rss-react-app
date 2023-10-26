import { get } from './utils';
import type { IDataFragment, IPeople } from '@/types';

const API_URL = 'https://swapi.dev/api';

const path = {
  people: '/people/',
  planets: '/planets/',
  films: '/films/',
  species: '/species/',
  vehicles: '/vehicles/',
  starships: '/starships/',
};

export const getApiData = async (searchTerm: string, init?: RequestInit) => {
  const queryParams = searchTerm
    ? [{ key: 'search', value: searchTerm.trim() }]
    : [];
  return get<IDataFragment<IPeople>>(API_URL, path.people, queryParams, init);
};
