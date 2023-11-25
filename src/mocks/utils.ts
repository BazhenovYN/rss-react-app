import { IPeople } from '@/types';

export function filterData(
  data: IPeople[],
  name: string,
  page: number,
  limit: number
): IPeople[] {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return data
    .filter(
      (item) => !name || item.name.toLowerCase().includes(name.toLowerCase())
    )
    .slice(startIndex, endIndex);
}
