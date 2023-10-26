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
  queryParams: QueryParam[] = [],
  init?: RequestInit
) => {
  return get<IDataFragment<IPeople>>(API_URL, path.people, queryParams, init);
};
