import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Paper } from './Paper';
import { ThemeProvider } from '../../providers/ThemeProvider';

const renderWithTheme = (component: preact.ComponentChildren) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Paper', () => {
  it('renders children correctly', () => {
    renderWithTheme(<Paper>Content</Paper>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies elevation class', () => {
    const { container } = renderWithTheme(<Paper elevation={3}>Content</Paper>);
    const paper = container.querySelector('.paper-elevation-3');
    expect(paper).toBeInTheDocument();
  });

  it('applies outlined variant', () => {
    const { container } = renderWithTheme(<Paper variant="outlined">Content</Paper>);
    const paper = container.querySelector('.paper-variant-outlined');
    expect(paper).toBeInTheDocument();
  });

  it('applies square prop', () => {
    const { container } = renderWithTheme(<Paper square>Content</Paper>);
    const paper = container.querySelector('.paper-square');
    expect(paper).toBeInTheDocument();
  });

  it('renders as custom component', () => {
    const { container } = renderWithTheme(<Paper component="section">Content</Paper>);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
