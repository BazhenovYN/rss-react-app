import type { QueryParam } from '@/types';

const generateQueryString = (queryParams: QueryParam[]): string => {
  if (!queryParams.length) {
    return '';
  }
  const params = queryParams.reduce((acc, curr) => {
    acc.append(curr.key, String(curr.value));
    return acc;
  }, new URLSearchParams());
  return `?${params.toString()}`;
};

export const get = async <T>(
  baseUrl: string,
  path: string,
  queryParams: QueryParam[] = [],
  init?: RequestInit
): Promise<T> => {
  const query = generateQueryString(queryParams);
  const response = await fetch(`${baseUrl}${path}${query}`, init);
  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as T;
  return data;
};
