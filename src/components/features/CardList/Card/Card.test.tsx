import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DetailCard from '@/components/features/DetailCard';
import { apiData } from '@/mocks/data';
import { IPeople } from '@/types';
import { renderWithProviders } from '@/utils/test-utils';
import Card from './Card';

describe('Card', () => {
  const testData: IPeople = apiData[0];

  test('1. renders correctly', () => {
    const { getByText } = renderWithProviders(<Card content={testData} />, {
      wrapper: MemoryRouter,
    });
    const gender = getByText(testData.gender);
    const height = getByText(testData.height);
    const skinColor = getByText(testData.skin_color);
    const hairColor = getByText(testData.hair_color);

    expect(gender).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(skinColor).toBeInTheDocument();
    expect(hairColor).toBeInTheDocument();
  });

  test('2. clicking on a card opens a detailed card component with additional API call', async () => {
    const spy = vi.spyOn(global, 'fetch');
    const { findByRole, findByTestId } = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="" element={<Card content={testData} />}>
            <Route path="" element={<DetailCard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const button = await findByRole('button');
    fireEvent.click(button);

    const detailCard = await findByTestId('detail-card');
    expect(detailCard).toBeInTheDocument();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('3. renders correctly when detail data is opened', () => {
    const { getByTestId } = renderWithProviders(
      <MemoryRouter initialEntries={[`/?_details=${testData.id}`]}>
        <Routes>
          <Route path="" element={<Card content={testData} />}>
            <Route path="" element={<DetailCard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const card = getByTestId('card');
    const detailCard = getByTestId('detail-card');
    expect(card).toBeInTheDocument();
    expect(detailCard).toBeInTheDocument();
  });
});
