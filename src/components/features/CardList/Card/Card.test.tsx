import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { fireEvent } from '@testing-library/react';
import { apiData } from '@/mocks/data';
import { IPeople } from '@/types';
import { renderWithProviders } from '@/utils/test-utils';
import Card from './Card';

describe('Card', () => {
  const testData: IPeople = apiData[0];

  test('1. renders correctly', () => {
    const { getByText } = renderWithProviders(<Card content={testData} />, {
      wrapper: MemoryRouterProvider,
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

  test('2. clicking on a card opens a detailed card component', async () => {
    const { findByRole } = renderWithProviders(<Card content={testData} />, {
      wrapper: MemoryRouterProvider,
    });
    const button = await findByRole('button');
    fireEvent.click(button);
    expect(mockRouter.asPath).toEqual(`/?_details=${testData.id}`);
  });

  test('3. renders correctly when detail data is opened', () => {
    const { getByTestId } = renderWithProviders(
      <MemoryRouterProvider url={`/?_details=${testData.id}`}>
        <Card content={testData} />
      </MemoryRouterProvider>
    );
    const card = getByTestId('card');
    const detailCard = getByTestId('detail-card');
    expect(card).toBeInTheDocument();
    expect(detailCard).toBeInTheDocument();
  });
});
