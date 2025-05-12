import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageTitle } from '../PageTitle';

describe('PageTitle', () => {
  it('renders with children', () => {
    render(<PageTitle>Test Title</PageTitle>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('uses h4 variant', () => {
    render(<PageTitle>Test Title</PageTitle>);
    const title = screen.getByText('Test Title');
    expect(title.tagName.toLowerCase()).toBe('h4');
  });

  it('renders with custom props', () => {
    render(
      <PageTitle data-testid="test-title">
        Test Title
      </PageTitle>
    );
    expect(screen.getByTestId('test-title')).toBeInTheDocument();
  });
}); 