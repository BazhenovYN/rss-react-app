import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  test('renders correctly', () => {
    const { getByRole } = render(<Footer />, { wrapper: MemoryRouterProvider });
    const footer = getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
