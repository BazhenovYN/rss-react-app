import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  test('renders correctly', () => {
    const { getByRole } = render(<Loader />);
    const loader = getByRole('status');
    expect(loader).toBeInTheDocument();
  });
});
