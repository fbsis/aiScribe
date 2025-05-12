import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusChip } from '../StatusChip';

describe('StatusChip', () => {
  it('renders with correct status label', () => {
    render(<StatusChip status="Assigned" />);
    expect(screen.getByText('Assigned')).toBeInTheDocument();
  });

  it('applies success color for Assigned status', () => {
    render(<StatusChip status="Assigned" />);
    const chip = screen.getByText('Assigned');
    expect(chip.closest('.MuiChip-root')).toHaveClass('MuiChip-colorSuccess');
  });

  it('applies error color for On Hold status', () => {
    render(<StatusChip status="On Hold" />);
    const chip = screen.getByText('On Hold');
    expect(chip.closest('.MuiChip-root')).toHaveClass('MuiChip-colorError');
  });

  it('applies custom props', () => {
    render(<StatusChip status="Assigned" data-testid="test-chip" />);
    expect(screen.getByTestId('test-chip')).toBeInTheDocument();
  });

  it('has small size by default', () => {
    render(<StatusChip status="Assigned" />);
    const chip = screen.getByText('Assigned');
    expect(chip.closest('.MuiChip-root')).toHaveClass('MuiChip-sizeSmall');
  });
}); 