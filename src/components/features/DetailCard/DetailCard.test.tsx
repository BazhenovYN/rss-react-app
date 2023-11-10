import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { apiData } from '@/mocks/data';
import DetailCard from './DetailCard';
import Card from '../CardList/Card';

describe('DetailCard', () => {
  const testData = apiData[0];

  test('renders correctly', async () => {
    render(
      <MemoryRouter initialEntries={[`/characters/${testData.id}`]}>
        <Routes>
          <Route path="characters/:id" element={<DetailCard />} />
        </Routes>
      </MemoryRouter>
    );
    const gender = await screen.findByText(testData.gender);
    const birthYear = await screen.findByText(testData.birth_year);
    const height = await screen.findByText(testData.height);
    const mass = await screen.findByText(testData.mass);
    const skinColor = await screen.findByText(testData.skin_color);
    const hairColor = await screen.findByText(testData.hair_color);
    const eyeColor = await screen.findByText(testData.eye_color);
    const homeworld = await screen.findByText(testData.homeworld);

    expect(gender).toBeInTheDocument();
    expect(birthYear).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(mass).toBeInTheDocument();
    expect(skinColor).toBeInTheDocument();
    expect(hairColor).toBeInTheDocument();
    expect(eyeColor).toBeInTheDocument();
    expect(homeworld).toBeInTheDocument();
  });

  test('loading indicator is displayed while fetching data', () => {
    render(
      <MemoryRouter initialEntries={[`/characters/${testData.id}`]}>
        <Routes>
          <Route path="characters/:id" element={<DetailCard />} />
        </Routes>
      </MemoryRouter>
    );
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
  });

  test('clicking the close button hides the component', () => {
    const { getByRole, getByTestId } = render(
      <MemoryRouter initialEntries={[`/characters/${testData.id}`]}>
        <Routes>
          <Route path="/" element={<Card content={testData} />}>
            <Route path="characters/:id" element={<DetailCard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const detailCard = getByTestId('detail-card');
    expect(detailCard).toBeInTheDocument();

    const closeButton = getByRole('button');
    fireEvent.click(closeButton);
    expect(detailCard).not.toBeInTheDocument();
  });
});
