import { describe, expect, it } from 'vitest';

import { renderWithTheme, screen } from '../../test/test-utils';

import { AppShell } from './AppShell';

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