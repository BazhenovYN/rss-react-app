import { http, HttpResponse } from 'msw';
import { API_URL, PATH } from '@/app/const';
import { apiData } from './data';
import { filterData } from './utils';

export const handlers = [
  http.get(`${API_URL}${PATH}`, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name_like') || '';
    const page = Number(url.searchParams.get('_page')) || 1;
    const limit = Number(url.searchParams.get('_limit')) || apiData.length;

    const data = filterData(apiData, name, page, limit);

    return new HttpResponse(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'X-Total-Count': data.length.toString(),
      },
    });
  }),

  http.get(`${API_URL}${PATH}/:id`, ({ params }) => {
    const { id } = params;
    const person = apiData.find((item) => item.id.toString() === id);
    return HttpResponse.json(person);
  }),
];
