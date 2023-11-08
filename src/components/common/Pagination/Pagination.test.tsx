import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  test('renders correctly', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Pagination count={10} currentPage={1} />
      </MemoryRouter>
    );
    const pagination = getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  test('renders correctly when exist only 1 item', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Pagination count={1} currentPage={1} />
      </MemoryRouter>
    );
    const pagination = getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  test('renders correctly when current page exceeds the allowed value', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Pagination count={10} currentPage={100} />
      </MemoryRouter>
    );
    const pagination = getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });
});
