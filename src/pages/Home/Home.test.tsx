import { render } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Home />, { wrapper: MemoryRouter });
    const header = getByText(/star wars/i);
    expect(header).toBeInTheDocument();
  });
});
