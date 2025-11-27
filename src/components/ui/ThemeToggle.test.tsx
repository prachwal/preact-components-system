import { fireEvent, render, screen } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '../../providers/ThemeProvider';

import { ThemeToggle } from './ThemeToggle';

const renderWithTheme = (component: preact.ComponentChildren) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ThemeToggle', () => {
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

  it('has correct aria-label', () => {
    const { container } = renderWithTheme(<ThemeToggle />);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('Change theme to'));
  });

  it('changes theme when clicked', () => {
    const { container } = renderWithTheme(<ThemeToggle />);
    const button = container.querySelector('button');
    const initialLabel = button?.getAttribute('aria-label');

    fireEvent.click(button!);
    const newLabel = button?.getAttribute('aria-label');

    expect(newLabel).not.toBe(initialLabel);
  });
});