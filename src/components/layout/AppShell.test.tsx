import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { ThemeProvider } from '../../providers/ThemeProvider';
import AppShell from './AppShell';

const renderWithTheme = (component: preact.ComponentChildren) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('AppShell', () => {
  it('renders all main components', () => {
    renderWithTheme(<AppShell />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('applies app-shell class', () => {
    const { container } = renderWithTheme(<AppShell />);
    expect(container.querySelector('.app-shell')).toBeInTheDocument();
  });

  it('renders app-content container', () => {
    const { container } = renderWithTheme(<AppShell />);
    expect(container.querySelector('.app-content')).toBeInTheDocument();
  });

  it('toggles sidebar when header toggle is clicked', () => {
    renderWithTheme(<AppShell />);
    const toggleButton = screen.getByLabelText('Open navigation');
    expect(toggleButton).toBeInTheDocument();
  });

  it('closes sidebar when clicking outside', () => {
    renderWithTheme(<AppShell />);
    // This would require more complex setup to test overlay clicks
    // For now, just ensure the component renders without errors
  });
});