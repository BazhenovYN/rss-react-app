import { vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with text content', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const buttonElement = getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders button with start and end icons', () => {
    const startIcon = <span>🚀</span>;
    const endIcon = <span>🛸</span>;
    const { getByText } = render(
      <Button startIcon={startIcon} endIcon={endIcon}>
        Click me
      </Button>
    );
    const startIconElement = getByText(/🚀/i);
    const endIconElement = getByText(/🛸/i);
    expect(startIconElement).toBeInTheDocument();
    expect(endIconElement).toBeInTheDocument();
  });

  test('calls onClick handler when button is clicked', () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(
      <Button onClick={onClickMock}>Click me</Button>
    );
    const buttonElement = getByRole('button');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('applies custom class', () => {
    const { getByRole } = render(
      <Button className="custom-class">Click me</Button>
    );
    const buttonElement = getByRole('button');
    expect(buttonElement).toHaveClass('custom-class');
  });
});
