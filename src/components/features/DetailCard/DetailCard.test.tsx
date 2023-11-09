import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailCard from './DetailCard';
import { apiData } from '@/mocks/data';

describe('DetailCard', () => {
  const data = apiData[0];

  test('renders correctly', async () => {
    render(
      <MemoryRouter initialEntries={[`/characters/${data.id}`]}>
        <Routes>
          <Route path="characters/:id" element={<DetailCard />} />
        </Routes>
      </MemoryRouter>
    );
    const title = await screen.findByText(/homeworld/i);
    const value = await screen.findByText(data.homeworld);
    expect(title).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });
});
