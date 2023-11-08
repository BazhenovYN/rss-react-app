import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import ItemPerPageSelector from './ItemPerPageSelector';

describe('ItemPerPageSelector', () => {
  const sizes = {
    sm: 10,
    md: 20,
    lg: 30,
  };
  test('renders correctly', () => {
    const { getByRole } = render(
      <ItemPerPageSelector
        sizes={sizes}
        selectedValue={sizes.sm}
        onChange={() => {}}
      />
    );
    const select = getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  test('calls onChange handler when option is changed', () => {
    const onChangeMock = vi.fn();
    const { getByRole } = render(
      <ItemPerPageSelector
        sizes={sizes}
        selectedValue={sizes.sm}
        onChange={onChangeMock}
      />
    );
    const select = getByRole('combobox');
    fireEvent.change(select);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
