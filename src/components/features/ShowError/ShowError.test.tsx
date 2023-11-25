import { fireEvent, render } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import ShowError from './ShowError';

describe('ShowError', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error');
    (console.error as Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as Mock).mockRestore();
  });

  test('renders correctly without errors', () => {
    const { getByRole } = render(<ShowError />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('throw an error on click', () => {
    expect.assertions(1);
    const { getByRole } = render(<ShowError />);
    const button = getByRole('button');
    try {
      fireEvent.click(button);
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'Oops! Our Death Star just exploded...'
      );
    }
  });
});
