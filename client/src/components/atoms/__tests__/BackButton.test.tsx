import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BackButton from '../BackButton';

describe('BackButton', () => {
  it('renders back button with text', () => {
    render(<BackButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<BackButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders without onClick handler', () => {
    render(<BackButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
}); 