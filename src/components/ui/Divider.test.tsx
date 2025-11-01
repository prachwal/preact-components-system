import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/preact';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    const { container } = render(<Divider />);
    const divider = container.querySelector('.divider');
    expect(divider).toHaveClass('divider-horizontal');
  });

  it('renders vertical divider', () => {
    const { container } = render(<Divider orientation="vertical" />);
    const divider = container.querySelector('.divider');
    expect(divider).toHaveClass('divider-vertical');
  });

  it('renders with text content', () => {
    const { container } = render(<Divider>OR</Divider>);
    expect(container.textContent).toBe('OR');
    const divider = container.querySelector('.divider');
    expect(divider).toHaveClass('divider-with-text');
  });

  it('applies variant classes', () => {
    const { container } = render(<Divider variant="inset" />);
    const divider = container.querySelector('.divider');
    expect(divider).toHaveClass('divider-inset');
  });

  it('applies text alignment', () => {
    const { container } = render(<Divider textAlign="left">Text</Divider>);
    const divider = container.querySelector('.divider');
    expect(divider).toHaveClass('divider-text-left');
  });

  it('applies bold class', () => {
    const { container } = render(<Divider bold />);
    const divider = container.querySelector('.divider');
    expect(divider).toHaveClass('divider-bold');
  });

  it('applies custom className', () => {
    const { container } = render(<Divider className="custom" />);
    const divider = container.querySelector('.divider');
    expect(divider).toHaveClass('custom');
  });
});
