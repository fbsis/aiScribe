import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders with default placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search for...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} placeholder="Custom search..." />);
    expect(screen.getByPlaceholderText('Custom search...')).toBeInTheDocument();
  });

  it('displays the provided value', () => {
    render(<SearchBar value="test search" onChange={() => {}} />);
    expect(screen.getByDisplayValue('test search')).toBeInTheDocument();
  });

  it('calls onChange for each character typed', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<SearchBar value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'test');
    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(handleChange).toHaveBeenCalledWith('t');
    expect(handleChange).toHaveBeenCalledWith('e');
    expect(handleChange).toHaveBeenCalledWith('s');
    expect(handleChange).toHaveBeenCalledWith('t');
  });

  it('renders with custom props', () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        data-testid="test-search"
      />
    );
    expect(screen.getByTestId('test-search')).toBeInTheDocument();
  });
}); 