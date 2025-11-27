import { render } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { ThemeProvider } from '../../providers/ThemeProvider';

import { Grid } from './Grid';


const renderWithTheme = (component: preact.ComponentChildren) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Grid', () => {
  it('renders children correctly', () => {
    const { container } = renderWithTheme(<Grid>Content</Grid>);
    expect(container.textContent).toBe('Content');
  });

  it('applies container class when container prop is true', () => {
    const { container } = renderWithTheme(<Grid container>Content</Grid>);
    const grid = container.querySelector('.grid-container');
    expect(grid).toBeInTheDocument();
  });

  it('applies item class when item prop is true', () => {
    const { container } = renderWithTheme(<Grid item>Content</Grid>);
    const grid = container.querySelector('.grid-item');
    expect(grid).toBeInTheDocument();
  });

  it('applies direction class correctly', () => {
    const { container } = renderWithTheme(<Grid container direction="column">Content</Grid>);
    const grid = container.querySelector('.grid-direction-column');
    expect(grid).toBeInTheDocument();
  });

  it('applies alignment classes correctly', () => {
    const { container } = renderWithTheme(
      <Grid container alignItems="center" justifyContent="space-between">
        Content
      </Grid>
    );
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-align-center');
    expect(grid).toHaveClass('grid-justify-space-between');
  });

  it('sets custom columns via CSS variable', () => {
    const { container } = renderWithTheme(<Grid container columns={24}>Content</Grid>);
    const grid = container.querySelector('.grid') as HTMLElement;
    expect(grid?.style.getPropertyValue('--grid-columns')).toBe('24');
  });

  it('renders as custom component when specified', () => {
    const { container } = renderWithTheme(<Grid component="section">Content</Grid>);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
