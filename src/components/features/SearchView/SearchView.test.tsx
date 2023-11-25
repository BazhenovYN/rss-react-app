import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import SearchView from './SearchView';
import { renderWithProviders } from '@/utils/test-utils';

describe('SearchView', () => {
  test('1. renders correctly', () => {
    const { getByTestId } = renderWithProviders(
      <MemoryRouterProvider>
        <SearchView />
      </MemoryRouterProvider>
    );
    const section = getByTestId('search-section');
    expect(section).toBeInTheDocument();
  });
});
