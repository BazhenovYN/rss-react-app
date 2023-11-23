import { render } from '@testing-library/react';
import { useRouteError } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { MemoryRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<object>('react-router-dom');
  return {
    ...actual,
    useRouteError: vi.fn(),
  };
});

describe('ErrorPage', () => {
  test('renders correctly', () => {
    (useRouteError as Mock).mockReturnValue(new Error('Some error message'));
    const { getByText } = render(<ErrorPage />, { wrapper: MemoryRouter });
    const header = getByText(/something went wrong/i);
    const errorMessage = getByText(/some error message/i);
    expect(header).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders correctly with unexpected error', () => {
    (useRouteError as Mock).mockReturnValue(null);
    const { getByText } = render(<ErrorPage />, { wrapper: MemoryRouter });
    const header = getByText(/something went wrong/i);
    const errorMessage = getByText(/unexpected error/i);
    expect(header).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
});
