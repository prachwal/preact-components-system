import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/preact';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders with image', () => {
    const { container } = render(<Avatar src="/test.jpg" alt="Test" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
    expect(img).toHaveAttribute('alt', 'Test');
  });

  it('renders with children when no src', () => {
    const { container } = render(<Avatar>JD</Avatar>);
    expect(container.textContent).toBe('JD');
  });

  it('applies variant classes', () => {
    const { container } = render(<Avatar variant="square">A</Avatar>);
    const avatar = container.querySelector('.avatar');
    expect(avatar).toHaveClass('avatar-square');
  });

  it('applies size classes', () => {
    const { container } = render(<Avatar size="large">A</Avatar>);
    const avatar = container.querySelector('.avatar');
    expect(avatar).toHaveClass('avatar-large');
  });

  it('applies custom numeric size', () => {
    const { container } = render(<Avatar size={64}>A</Avatar>);
    const avatar = container.querySelector('.avatar');
    expect(avatar).toHaveStyle({ width: '64px', height: '64px' });
  });

  it('applies custom className', () => {
    const { container } = render(<Avatar className="custom">A</Avatar>);
    const avatar = container.querySelector('.avatar');
    expect(avatar).toHaveClass('custom');
  });
});
