import React from 'react';
import { render } from '@testing-library/react';
import { Mock } from 'vitest';
import ComponentThatThrowError from '@/components/features/ShowError/ComponentThatThrowError';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error');
    (console.error as Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as Mock).mockRestore();
  });

  test('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Children Content</div>
      </ErrorBoundary>
    );
    expect(getByText('Children Content')).toBeInTheDocument();
  });

  test('renders ErrorFallback component when an error occurs', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ComponentThatThrowError />
      </ErrorBoundary>
    );
    expect(getByText('Something went wrong')).toBeInTheDocument();
  });
});
