import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import DetailCard from '@/components/features/DetailCard';
import { apiData } from '@/mocks/data';
import { IPeople } from '@/types';
import Card from './Card';

describe('Card', () => {
  const testData: IPeople = apiData[0];

  test('1. renders correctly', () => {
    const { getByText } = render(<Card content={testData} />, {
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

  test('2. clicking on a card opens a detailed card component with additional API call', () => {
    const spy = vi.spyOn(global, 'fetch');
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Card content={testData} />}>
            <Route path="characters/:id" element={<DetailCard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const linkToDetailCard = getByRole('link');
    fireEvent.click(linkToDetailCard);

    const detailCard = screen.getByTestId('detail-card');
    expect(detailCard).toBeInTheDocument();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('3. renders correctly when detail data is opened', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[`/characters/${testData.id}`]}>
        <Routes>
          <Route path="/" element={<Card content={testData} />}>
            <Route path="characters/:id" element={<DetailCard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const card = getByTestId('card');
    expect(card).toBeInTheDocument();
  });
});
