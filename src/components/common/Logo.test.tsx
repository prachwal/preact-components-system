import { describe, it, expect } from 'vitest';

import { render } from '../../test/test-utils';

import { Logo } from './Logo';

describe('Logo', () => {
  it('renders SVG element', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has correct default dimensions', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('accepts custom width and height', () => {
    const { container } = render(<Logo width={64} height={64} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
  });

  it('has correct viewBox', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 32 32');
  });

  it('has aria-hidden attribute', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className', () => {
    const { container } = render(<Logo className="custom-logo" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-logo');
  });

  it('contains logo elements', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg?.querySelector('rect')).toBeInTheDocument();
    expect(svg?.querySelector('path')).toBeInTheDocument();
    expect(svg?.querySelector('circle')).toBeInTheDocument();
  });
});