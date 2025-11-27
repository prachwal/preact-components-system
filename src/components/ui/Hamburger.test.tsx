import { describe, expect, it, vi } from 'vitest';

import { render, fireEvent } from '../../test/test-utils';

import { Hamburger } from './Hamburger';

describe('Hamburger', () => {
  it('renders button element', () => {
    const { container } = render(<Hamburger onClick={() => {}} isOpen={false} />);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('applies hamburger class', () => {
    const { container } = render(<Hamburger onClick={() => {}} isOpen={false} />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('hamburger');
  });

  it('renders three lines', () => {
    const { container } = render(<Hamburger onClick={() => {}} isOpen={false} />);
    const lines = container.querySelectorAll('.hamburger__line');
    expect(lines).toHaveLength(3);
  });

  it('has correct aria-label when closed', () => {
    const { container } = render(<Hamburger onClick={() => {}} isOpen={false} />);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-label', 'Open navigation');
  });

  it('has correct aria-label when open', () => {
    const { container } = render(<Hamburger onClick={() => {}} isOpen={true} />);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-label', 'Close navigation');
  });

  it('has correct aria-controls', () => {
    const { container } = render(<Hamburger onClick={() => {}} isOpen={false} />);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-controls', 'app-sidebar');
  });

  it('has correct aria-expanded when closed', () => {
    const { container } = render(<Hamburger onClick={() => {}} isOpen={false} />);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('has correct aria-expanded when open', () => {
    const { container } = render(<Hamburger onClick={() => {}} isOpen={true} />);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onClick when clicked', () => {
    const mockClick = vi.fn();
    const { container } = render(<Hamburger onClick={mockClick} isOpen={false} />);
    const button = container.querySelector('button');
    fireEvent.click(button!);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
