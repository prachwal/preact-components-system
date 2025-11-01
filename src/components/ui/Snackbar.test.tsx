import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Snackbar } from './Snackbar';

describe('Snackbar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders when open is true', () => {
    render(<Snackbar open={true} message="Test message" />);
    const snackbar = document.querySelector('.snackbar');
    expect(snackbar).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<Snackbar open={false} message="Test message" />);
    const snackbar = document.querySelector('.snackbar');
    expect(snackbar).not.toBeInTheDocument();
  });

  it('auto-hides after specified duration', () => {
    const handleClose = vi.fn();
    render(
      <Snackbar 
        open={true} 
        message="Test message" 
        autoHideDuration={3000}
        onClose={handleClose}
      />
    );

    expect(handleClose).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(3000);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not auto-hide when autoHideDuration is 0', () => {
    const handleClose = vi.fn();
    render(
      <Snackbar 
        open={true} 
        message="Test message" 
        autoHideDuration={0}
        onClose={handleClose}
      />
    );

    vi.advanceTimersByTime(10000);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('applies position classes', () => {
    render(
      <Snackbar open={true} message="Test" position="top-right" />
    );
    const snackbar = document.querySelector('.snackbar');
    expect(snackbar).toHaveClass('snackbar-position-top-right');
  });

  it('applies severity classes', () => {
    render(
      <Snackbar open={true} message="Test" severity="success" />
    );
    const snackbar = document.querySelector('.snackbar');
    expect(snackbar).toHaveClass('snackbar-severity-success');
  });

  it('renders action element', () => {
    render(
      <Snackbar 
        open={true} 
        message="Test" 
        action={<button>Undo</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Snackbar open={true} message="Test" className="custom-snackbar" />
    );
    const snackbar = document.querySelector('.snackbar');
    expect(snackbar).toHaveClass('custom-snackbar');
  });
});
