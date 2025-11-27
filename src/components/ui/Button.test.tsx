import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(<Button variant="outlined">Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('button-variant-outlined');
  });

  it('applies color classes correctly', () => {
    const { container } = render(<Button color="secondary">Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('button-color-secondary');
  });

  it('applies size classes correctly', () => {
    const { container } = render(<Button size="large">Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('button-size-large');
  });

  it('shows loading state correctly', () => {
    const { container } = render(<Button loading>Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('button-loading');
    expect(button).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    const { container } = render(<Button disabled>Test</Button>);
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('renders with start icon', () => {
    const { container } = render(
      <Button startIcon={<span>→</span>}>Test</Button>
    );
    expect(container.querySelector('.button-start-icon')).toBeInTheDocument();
  });

  it('renders with end icon', () => {
    const { container } = render(
      <Button endIcon={<span>←</span>}>Test</Button>
    );
    expect(container.querySelector('.button-end-icon')).toBeInTheDocument();
  });

  it('applies full width class correctly', () => {
    const { container } = render(<Button fullWidth>Test</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('button-full-width');
  });

  it('renders as submit type when specified', () => {
    const { container } = render(<Button type="submit">Submit</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
