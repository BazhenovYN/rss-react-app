import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { renderWithProviders } from '@/utils/test-utils';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('renders correctly', () => {
    const { getByText } = renderWithProviders(
      <MemoryRouterProvider>
        <HomePage />
      </MemoryRouterProvider>
    );
    const header = getByText(/star wars/i);
    expect(header).toBeInTheDocument();
  });
});
