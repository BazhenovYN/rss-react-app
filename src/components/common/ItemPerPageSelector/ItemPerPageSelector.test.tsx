import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { ELEMENTS_PER_PAGE } from '@/app/const';
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
    fireEvent.change(select, { target: { value: ELEMENTS_PER_PAGE.md } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(ELEMENTS_PER_PAGE.md);
  });
});
