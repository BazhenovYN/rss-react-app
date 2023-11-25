import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { fireEvent, render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { apiData } from '@/mocks/data';
import { useGetDataByIdQuery } from '@/services/star-wars';
import DetailCard from './DetailCard';

vi.mock('@/services/star-wars', () => ({
  useGetDataByIdQuery: vi.fn(),
}));

describe('DetailCard', () => {
  const testData = apiData[0];

  test('1. renders correctly', async () => {
    (useGetDataByIdQuery as Mock).mockReturnValue({
      data: testData,
      isLoading: false,
    });
    render(
      <MemoryRouterProvider url={`/?_details=${testData.id}`}>
        <DetailCard onClose={vi.fn()} />
      </MemoryRouterProvider>
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

  test('2. loading indicator is displayed while fetching data', () => {
    (useGetDataByIdQuery as Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });
    render(
      <MemoryRouterProvider url={`/?_details=${testData.id}`}>
        <DetailCard onClose={vi.fn()} />
      </MemoryRouterProvider>
    );
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
  });

  test('3. clicking the close button hides the component', async () => {
    (useGetDataByIdQuery as Mock).mockReturnValue({
      data: testData,
      isLoading: false,
    });
    const onCloseMock = vi.fn();
    const { findByRole } = render(
      <MemoryRouterProvider url={`/?_details=${testData.id}`}>
        <DetailCard onClose={onCloseMock} />
      </MemoryRouterProvider>
    );

    const closeButton = await findByRole('button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
