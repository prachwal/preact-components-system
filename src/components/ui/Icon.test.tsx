import { render } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';

import { Icon } from './Icon';

describe('Icon', () => {
  it('renders icon with default size', () => {
    const { container } = render(<Icon name="Home" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
  });

  it('renders icon with small size', () => {
    const { container } = render(<Icon name="Star" size="small" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveAttribute('width', '16');
    expect(icon).toHaveAttribute('height', '16');
  });

  it('renders icon with large size', () => {
    const { container } = render(<Icon name="Info" size="large" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
  });

  it('renders icon with custom numeric size', () => {
    const { container } = render(<Icon name="Mail" size={48} />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveAttribute('width', '48');
    expect(icon).toHaveAttribute('height', '48');
  });

  it('applies custom className', () => {
    const { container } = render(<Icon name="Home" className="custom-class" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('icon');
    expect(icon).toHaveClass('custom-class');
  });

  it('applies custom color', () => {
    const { container } = render(<Icon name="Star" color="red" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveAttribute('stroke', 'red');
  });

  it('is accessible with aria-label', () => {
    const { container } = render(<Icon name="Home" aria-label="Home page" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveAttribute('aria-label', 'Home page');
    expect(icon).not.toHaveAttribute('aria-hidden');
  });

  it('is decorative when specified', () => {
    const { container } = render(<Icon name="Star" decorative />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).not.toHaveAttribute('aria-label');
  });

  it('uses icon name as default aria-label', () => {
    const { container } = render(<Icon name="Info" />);
    const icon = container.querySelector('svg');
    expect(icon).toHaveAttribute('aria-label', 'Info');
  });

  it('returns null for non-existent icon', () => {
    const { container } = render(<Icon name={'NonExistent' as any} />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});
