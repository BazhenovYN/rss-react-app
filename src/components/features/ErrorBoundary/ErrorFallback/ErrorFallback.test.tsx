import { render } from '@testing-library/react';
import ErrorFallback from './ErrorFallback';

describe('ErrorFallback', () => {
  test('renders correctly', () => {
    const { container } = render(<ErrorFallback />);
    expect(container).toBeInTheDocument();
  });

  test('renders the error message when provided', () => {
    const errorMessage = 'Test error message';
    const { getByText } = render(<ErrorFallback message={errorMessage} />);
    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
