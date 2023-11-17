import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '@/utils/test-utils';
import Home from './Home';

describe('Home', () => {
  test('renders correctly', () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const header = getByText(/star wars/i);
    expect(header).toBeInTheDocument();
  });
});
