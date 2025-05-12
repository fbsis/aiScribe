import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrimaryButton } from '../PrimaryButton';

describe('PrimaryButton', () => {
  it('renders with children', () => {
    render(<PrimaryButton>Click me</PrimaryButton>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies custom props', () => {
    render(
      <PrimaryButton data-testid="test-button" disabled>
        Click me
      </PrimaryButton>
    );
    const button = screen.getByTestId('test-button');
    expect(button).toBeDisabled();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<PrimaryButton onClick={handleClick}>Click me</PrimaryButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has correct default styles', () => {
    render(<PrimaryButton>Click me</PrimaryButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toHaveStyle({
      width: '100%',
      marginTop: '32px', // mt: 4
      paddingTop: '16px', // py: 2
      paddingBottom: '16px',
      fontSize: '18px',
    });
  });
}); 