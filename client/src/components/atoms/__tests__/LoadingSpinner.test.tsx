import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders the spinner', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<LoadingSpinner size={60} />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toHaveStyle({ width: '60px', height: '60px' });
  });

  it('renders with custom props', () => {
    render(<LoadingSpinner data-testid="test-spinner" />);
    expect(screen.getByTestId('test-spinner')).toBeInTheDocument();
  });
}); 