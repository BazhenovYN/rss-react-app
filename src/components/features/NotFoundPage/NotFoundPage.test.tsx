import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { render } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  test('renders correctly', () => {
    const { getByText } = render(<NotFoundPage />, {
      wrapper: MemoryRouterProvider,
    });
    const message = getByText(/not found/i);
    expect(message).toBeInTheDocument();
  });
});
