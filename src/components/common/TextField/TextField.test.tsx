import { render } from '@testing-library/react';
import TextField from './TextField';

describe('TextField', () => {
  test('renders correctly', () => {
    const { getByRole } = render(<TextField />);
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('applies custom class', () => {
    const { getByRole } = render(<TextField className="custom-class" />);
    const input = getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });
});
