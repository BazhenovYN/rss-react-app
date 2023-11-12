import { MemoryRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';
import { render } from '@testing-library/react';
import { useSearchContext } from '@/context/SearchContext';
import { apiData } from '@/mocks/data';
import { IDataFragment } from '@/types';
import CardList from './CardList';

vi.mock('@/context/SearchContext', () => ({
  useSearchContext: vi.fn(),
}));

describe('CardList', () => {
  test('1. renders correctly', () => {
    const testData: IDataFragment = {
      results: apiData.slice(0, 5),
      totalCount: 5,
    };
    (useSearchContext as Mock).mockReturnValue({ data: testData });
    const { getAllByTestId } = render(<CardList />, { wrapper: MemoryRouter });
    const cards = getAllByTestId('card');
    expect(cards).toHaveLength(testData.totalCount);
  });

  test('2. renders correctly without data', () => {
    const testData: IDataFragment = {
      results: [],
      totalCount: 0,
    };
    (useSearchContext as Mock).mockReturnValue({ data: testData });
    const { getByText } = render(<CardList />);
    const message = getByText(/nothing found/i);
    expect(message).toBeInTheDocument();
  });

  test('3. renders correctly when data is not available', () => {
    (useSearchContext as Mock).mockReturnValue({ data: null });
    const { container } = render(<CardList />);
    expect(container.firstChild).toBeNull();
  });
});
