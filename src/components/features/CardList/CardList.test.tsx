import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { apiData } from '@/mocks/data';
import CardList from './CardList';

vi.mock('@/context/SearchContext', () => ({
  useSearchContext: vi.fn(),
}));

describe('CardList', () => {
  test('1. renders correctly', () => {
    const testData = apiData.slice(0, 5);
    const { getAllByTestId } = render(<CardList items={testData} />, {
      wrapper: MemoryRouter,
    });
    const cards = getAllByTestId('card');
    expect(cards).toHaveLength(testData.length);
  });

  test('2. renders correctly without data', () => {
    const { getByText } = render(<CardList items={[]} />);
    const message = getByText(/nothing found/i);
    expect(message).toBeInTheDocument();
  });
});
