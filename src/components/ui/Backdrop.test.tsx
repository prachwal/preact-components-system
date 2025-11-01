import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Backdrop } from './Backdrop';

describe('Backdrop', () => {
  it('renders when open is true', () => {
    render(<Backdrop open={true} />);
    const backdrop = document.querySelector('.backdrop');
    expect(backdrop).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<Backdrop open={false} />);
    const backdrop = document.querySelector('.backdrop');
    expect(backdrop).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Backdrop open={true} onClick={handleClick} />);
    const backdrop = document.querySelector('.backdrop');
    
    if (backdrop) {
      await user.click(backdrop);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  it('applies invisible class when invisible prop is true', () => {
    render(<Backdrop open={true} invisible={true} />);
    const backdrop = document.querySelector('.backdrop');
    expect(backdrop).toHaveClass('backdrop-invisible');
  });

  it('applies custom className', () => {
    render(<Backdrop open={true} className="custom-class" />);
    const backdrop = document.querySelector('.backdrop');
    expect(backdrop).toHaveClass('custom-class');
  });

  it('applies custom zIndex', () => {
    render(<Backdrop open={true} zIndex={2000} />);
    const backdrop = document.querySelector('.backdrop');
    expect(backdrop).toHaveStyle({ zIndex: '2000' });
  });

  it('prevents body scroll when open', () => {
    render(<Backdrop open={true} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(<Backdrop open={true} />);
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(<Backdrop open={false} />);
    expect(document.body.style.overflow).toBe('');
  });
});
