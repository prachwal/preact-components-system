import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { ThemeProvider } from '../../providers/ThemeProvider';

import { Footer } from './Footer';

const renderWithTheme = (component: preact.ComponentChildren) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Footer', () => {
  it('renders footer element', () => {
    const { container } = renderWithTheme(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('applies footer class', () => {
    const { container } = renderWithTheme(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('footer');
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(<Footer className="custom-footer" />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('footer', 'custom-footer');
  });

  it('renders footer container', () => {
    const { container } = renderWithTheme(<Footer />);
    expect(container.querySelector('.footer__container')).toBeInTheDocument();
  });

  it('renders footer info section', () => {
    const { container } = renderWithTheme(<Footer />);
    expect(container.querySelector('.footer__info')).toBeInTheDocument();
  });

  it('renders footer brand', () => {
    const { container } = renderWithTheme(<Footer />);
    expect(container.querySelector('.footer__brand')).toBeInTheDocument();
  });

  it('renders footer title', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('Preact Components System')).toBeInTheDocument();
  });

  it('renders footer version', () => {
    const { container } = renderWithTheme(<Footer />);
    expect(container.querySelector('.footer__version')).toBeInTheDocument();
  });

  it('renders footer links navigation', () => {
    const { container } = renderWithTheme(<Footer />);
    const nav = container.querySelector('.footer__links');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Footer navigation');
  });

  it('renders all footer links', () => {
    const { container } = renderWithTheme(<Footer />);
    const links = container.querySelectorAll('.footer__link');
    expect(links).toHaveLength(4);
  });

  it('renders copyright section', () => {
    const { container } = renderWithTheme(<Footer />);
    expect(container.querySelector('.footer__copyright')).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('© 2025 MIT License')).toBeInTheDocument();
  });
});