import { render } from '@testing-library/react';
import { MemoryRouter, Routes } from 'react-router-dom';
import { routes } from '@/router';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  test('1. renders correctly', () => {
    const { getByText } = render(<NotFoundPage />, { wrapper: MemoryRouter });
    const message = getByText(/not found/i);
    expect(message).toBeInTheDocument();
  });

  test('2. is displayed when navigating to an invalid route', () => {
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
