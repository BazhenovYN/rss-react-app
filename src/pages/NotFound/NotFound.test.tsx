import { render } from '@testing-library/react';
import { MemoryRouter, Routes } from 'react-router-dom';
import { routes } from '@/router';
import NotFound from './NotFound';

describe('NotFound', () => {
  test('renders correctly', () => {
    const { getByText } = render(<NotFound />, { wrapper: MemoryRouter });
    const message = getByText(/not found/i);
    expect(message).toBeInTheDocument();
  });

  test('is displayed when navigating to an invalid route', () => {
    const badRoute = '/some/invalid/route';
    const { getByText } = render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Routes>{routes}</Routes>
      </MemoryRouter>
    );
    const message = getByText(/not found/i);
    expect(message).toBeInTheDocument();
  });
});
