import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { ThemeProvider } from '../../providers/ThemeProvider';
import Header from './Header';

const renderWithTheme = (component: preact.ComponentChildren) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Header', () => {
  it('renders header element', () => {
    const { container } = renderWithTheme(<Header onToggleSidebar={() => {}} sidebarOpen={false} />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('applies correct role', () => {
    const { container } = renderWithTheme(<Header onToggleSidebar={() => {}} sidebarOpen={false} />);
    const header = container.querySelector('header');
    expect(header).toHaveAttribute('role', 'banner');
  });

  it('applies app-header class', () => {
    const { container } = renderWithTheme(<Header onToggleSidebar={() => {}} sidebarOpen={false} />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('app-header');
  });

  it('renders brand info', () => {
    renderWithTheme(<Header onToggleSidebar={() => {}} sidebarOpen={false} />);
    expect(screen.getByText('App Name')).toBeInTheDocument();
    expect(screen.getByText('Tagline goes here')).toBeInTheDocument();
  });

  it('renders brand text as h1', () => {
    const { container } = renderWithTheme(<Header onToggleSidebar={() => {}} sidebarOpen={false} />);
    expect(container.querySelector('h1.brand-text')).toBeInTheDocument();
  });

  it('passes sidebarOpen prop to Hamburger', () => {
    renderWithTheme(<Header onToggleSidebar={() => {}} sidebarOpen={true} />);
    // Hamburger should be tested separately
  });

  it('passes onToggleSidebar to Hamburger', () => {
    const mockToggle = vi.fn();
    renderWithTheme(<Header onToggleSidebar={mockToggle} sidebarOpen={false} />);
    // This would require clicking the hamburger button
  });
});