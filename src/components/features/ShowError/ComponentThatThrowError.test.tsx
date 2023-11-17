import { render } from '@testing-library/react';
import ComponentThatThrowError from './ComponentThatThrowError';
import { Mock, vi } from 'vitest';

describe('ComponentThatThrowError', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error');
    (console.error as Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as Mock).mockRestore();
  });

  test('throw an error', () => {
    expect(() => render(<ComponentThatThrowError />)).toThrowError(
      new Error('Oops! Our Death Star just exploded...')
    );
  });
});
