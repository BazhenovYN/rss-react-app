import { MemoryRouter } from 'react-router-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import { ELEMENTS_PER_PAGE, SEARCH_TERM_KEY } from '@/app/const';
import SearchView from './SearchView';
import { renderWithProviders } from '@/utils/test-utils';

describe('SearchView', () => {
  const searchTerm = 'Skywalker';

  test('1. renders correctly', () => {
    const { getByTestId } = renderWithProviders(
      <MemoryRouter>
        <SearchView />
      </MemoryRouter>
    );
    const section = getByTestId('search-section');
    expect(section).toBeInTheDocument();
  });

  test('2. clicking the Search button saves the entered value to the local storage', async () => {
    const { findByRole, findByTestId, findAllByTestId } = renderWithProviders(
      <MemoryRouter>
        <SearchView />
      </MemoryRouter>
    );

    await findAllByTestId('card');
    const input = await findByRole('textbox');
    fireEvent.change(input, { target: { value: searchTerm } });

    const searchButton = await findByTestId('search-button');
    fireEvent.click(searchButton);

    expect(localStorage.getItem(SEARCH_TERM_KEY)).toBe(
      JSON.stringify(searchTerm)
    );
  });

  test('3. retrieves the value from the local storage upon mounting', async () => {
    localStorage.setItem(SEARCH_TERM_KEY, JSON.stringify(searchTerm));

    const { findByRole } = renderWithProviders(
      <MemoryRouter>
        <SearchView />
      </MemoryRouter>
    );
    const input = (await findByRole('textbox')) as HTMLInputElement;
    waitFor(() => {
      expect(input.value).toBe(searchTerm);
    });
  });

  test('4. the number of cards on the page changes correctly', async () => {
    const { findByRole, findAllByTestId } = renderWithProviders(
      <MemoryRouter>
        <SearchView />
      </MemoryRouter>
    );

    const cardsBefore = await findAllByTestId('card');
    expect(cardsBefore).toHaveLength(ELEMENTS_PER_PAGE.sm);

    const select = await findByRole('combobox');
    fireEvent.change(select, { target: { value: ELEMENTS_PER_PAGE.md } });

    const cardsAfter = await findAllByTestId('card');
    waitFor(() => {
      expect(cardsAfter).toHaveLength(ELEMENTS_PER_PAGE.md);
    });
  });
});
