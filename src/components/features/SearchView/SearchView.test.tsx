import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ELEMENTS_PER_PAGE, SEARCH_TERM_KEY } from '@/app/const';
import { SearchProvider } from '@/context/SearchContext';
import SearchView from './SearchView';

describe('SearchView', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const searchTerm = 'Skywalker';

  test('renders correctly', () => {
    const { getByTestId } = render(<SearchView />, { wrapper: MemoryRouter });
    const section = getByTestId('search-section');
    expect(section).toBeInTheDocument();
  });

  test('clicking the Search button saves the entered value to the local storage', async () => {
    const { findByRole, findByTestId } = render(<SearchView />, {
      wrapper: MemoryRouter,
    });

    const input = await findByRole('textbox');
    fireEvent.change(input, { target: { value: searchTerm } });

    const searchButton = await findByTestId('search-button');
    fireEvent.click(searchButton);

    expect(localStorage.getItem(SEARCH_TERM_KEY)).toBe(
      JSON.stringify(searchTerm)
    );
  });

  test('retrieves the value from the local storage upon mounting', async () => {
    localStorage.setItem(SEARCH_TERM_KEY, JSON.stringify(searchTerm));

    const { findByRole } = render(
      <SearchProvider>
        <SearchView />
      </SearchProvider>,
      { wrapper: MemoryRouter }
    );

    const input = (await findByRole('textbox')) as HTMLInputElement;
    expect(input.value).toBe(searchTerm);
  });

  test('the number of cards on the page changes correctly', async () => {
    const { findByRole, findAllByTestId } = render(
      <SearchProvider>
        <SearchView />
      </SearchProvider>,
      {
        wrapper: MemoryRouter,
      }
    );

    const cardsBefore = await findAllByTestId('card');
    expect(cardsBefore).toHaveLength(ELEMENTS_PER_PAGE.sm);

    const select = await findByRole('combobox');
    fireEvent.change(select, { target: { value: ELEMENTS_PER_PAGE.md } });

    const cardsAfter = await findAllByTestId('card');
    expect(cardsAfter).toHaveLength(ELEMENTS_PER_PAGE.md);
  });

  test('renders correctly without data', async () => {
    const badSearchTerm = 'hldjdhfpuhjhIJDHFIJIJ';
    localStorage.setItem(SEARCH_TERM_KEY, JSON.stringify(badSearchTerm));

    const { findByText } = render(
      <SearchProvider>
        <SearchView />
      </SearchProvider>,
      {
        wrapper: MemoryRouter,
      }
    );

    const text = await findByText(/nothing found/i);
    expect(text).toBeInTheDocument();
  });
});
