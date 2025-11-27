import { describe, expect, it } from 'vitest';

import { renderWithTheme, screen, fireEvent } from '../../test/test-utils';

import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  describe('Rendering', () => {
    it('renders button element', () => {
      const { container } = renderWithTheme(<ThemeToggle />);
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('applies theme-toggle class', () => {
      const { container } = renderWithTheme(<ThemeToggle />);
      const button = container.querySelector('button');
      expect(button).toHaveClass('theme-toggle');
    });

    it('renders theme icon', () => {
      renderWithTheme(<ThemeToggle />);
      // Should render one of the theme icons
      const button = screen.getByRole('button');
      expect(button.textContent).toMatch(/☀️|🌙|🖥️/);
    });
  });

  describe('Props API', () => {
    it('has correct aria-label', () => {
      const { container } = renderWithTheme(<ThemeToggle />);
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('Change theme to'));
    });
  });

  describe('User Interactions', () => {
    it('changes theme when clicked', () => {
      const { container } = renderWithTheme(<ThemeToggle />);
      const button = container.querySelector('button');
      const initialLabel = button?.getAttribute('aria-label');

      fireEvent.click(button!);
      const newLabel = button?.getAttribute('aria-label');

      expect(newLabel).not.toBe(initialLabel);
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      renderWithTheme(<ThemeToggle />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has descriptive aria-label', () => {
      const { container } = renderWithTheme(<ThemeToggle />);
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('aria-label');
    });
  });
});
