import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { fireEvent, render } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  test('1. renders correctly', () => {
    const { getByRole } = render(<Pagination count={10} currentPage={1} />, {
      wrapper: MemoryRouterProvider,
    });
    const pagination = getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  test('2. renders correctly when exist only 1 item', () => {
    const { getByRole } = render(<Pagination count={1} currentPage={1} />, {
      wrapper: MemoryRouterProvider,
    });
    const pagination = getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  test('3. renders correctly when current page exceeds the allowed value', () => {
    const { getByRole } = render(<Pagination count={10} currentPage={100} />, {
      wrapper: MemoryRouterProvider,
    });
    const pagination = getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  test('4. updates URL query parameter when page changes', () => {
    const { getByText } = render(<Pagination count={10} currentPage={1} />, {
      wrapper: MemoryRouterProvider,
    });
    const pageLink = getByText('2');
    fireEvent.click(pageLink);
    expect(mockRouter.asPath).toBe('/?_page=2');
  });
});
