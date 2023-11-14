import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, PATH } from '@/app/const';
import type { IDataFragment, IPeople } from '@/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getDataById: builder.query<IPeople, string>({
      query: (id) => `${PATH}/${id}`,
    }),
    getData: builder.query<
      IDataFragment,
      { name: string; page?: number; limit?: number }
    >({
      query: ({ name, page, limit }) => {
        const params = new URLSearchParams();
        if (name) {
          params.set('name_like', name.trim());
        }
        if (page && page > 1) {
          params.set('_page', page.toString());
        }
        if (limit && limit > 0) {
          params.set('_limit', limit.toString());
        }
        return `${PATH}${params.size && `?${params.toString()}`}`;
      },
      transformResponse(response: IPeople[], meta) {
        const totalCount = meta?.response
          ? Number(meta.response.headers.get('X-Total-Count'))
          : 0;
        return {
          results: response,
          totalCount,
        };
      },
    }),
  }),
});

export const { useGetDataByIdQuery, useGetDataQuery } = api;
