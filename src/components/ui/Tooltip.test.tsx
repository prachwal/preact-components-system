import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children', () => {
    render(
      <Tooltip title="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('shows tooltip on mouse enter', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <Tooltip title="Tooltip text" enterDelay={0}>
        <button>Hover me</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    vi.runAllTimers();
    
    await waitFor(() => {
      expect(document.querySelector('.tooltip')).toBeInTheDocument();
    });
  });

  it('applies placement classes', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <Tooltip title="Tooltip text" placement="right" enterDelay={0}>
        <button>Hover me</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    vi.runAllTimers();
    
    await waitFor(() => {
      const tooltip = document.querySelector('.tooltip');
      expect(tooltip).toHaveClass('tooltip-placement-right');
    });
  });

  it('shows arrow when arrow prop is true', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <Tooltip title="Tooltip text" arrow enterDelay={0}>
        <button>Hover me</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    vi.runAllTimers();
    
    await waitFor(() => {
      const tooltip = document.querySelector('.tooltip');
      expect(tooltip).toHaveClass('tooltip-arrow');
      expect(document.querySelector('.tooltip-arrow-element')).toBeInTheDocument();
    });
  });
});
