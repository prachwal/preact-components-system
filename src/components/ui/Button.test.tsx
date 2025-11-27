import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';

import { renderWithTheme, screen, fireEvent } from '../../test/test-utils';

import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      renderWithTheme(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('applies variant classes correctly', () => {
      const { container } = renderWithTheme(<Button variant="outlined">Test</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('button-variant-outlined');
    });

    it('applies color classes correctly', () => {
      const { container } = renderWithTheme(<Button color="secondary">Test</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('button-color-secondary');
    });

    it('applies size classes correctly', () => {
      const { container } = renderWithTheme(<Button size="large">Test</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('button-size-large');
    });

    it('shows loading state correctly', () => {
      const { container } = renderWithTheme(<Button loading>Test</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('button-loading');
      expect(button).toBeDisabled();
    });

    it('applies full width class correctly', () => {
      const { container } = renderWithTheme(<Button fullWidth>Test</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('button-full-width');
    });
  });

  describe('Props API', () => {
    it('is disabled when disabled prop is true', () => {
      const { container } = renderWithTheme(<Button disabled>Test</Button>);
      const button = container.querySelector('button');
      expect(button).toBeDisabled();
    });

    it('renders as submit type when specified', () => {
      const { container } = renderWithTheme(<Button type="submit">Submit</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders with start icon', () => {
      const { container } = renderWithTheme(
        <Button startIcon={<span>→</span>}>Test</Button>
      );
      expect(container.querySelector('.button-start-icon')).toBeInTheDocument();
    });

    it('renders with end icon', () => {
      const { container } = renderWithTheme(
        <Button endIcon={<span>←</span>}>Test</Button>
      );
      expect(container.querySelector('.button-end-icon')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      const { container } = renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
      const button = container.querySelector('button');
      fireEvent.click(button!);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('is accessible as a button', () => {
      renderWithTheme(<Button>Test</Button>);
      const button = screen.getByRole('button', { name: /test/i });
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });

    it('has accessible name when children provided', () => {
      const { container } = renderWithTheme(<Button>Test Button</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveAccessibleName('Test Button');
    });

    it('should have no accessibility violations', async () => {
      const { container } = renderWithTheme(<Button>Accessible Button</Button>);
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });
});
