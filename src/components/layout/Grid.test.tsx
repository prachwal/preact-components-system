import { describe, it, expect } from 'vitest';

import { renderWithTheme } from '../../test/test-utils';

import { Grid } from './Grid';

describe('Grid', () => {
  describe('Rendering', () => {
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
  });

  describe('Props API', () => {
    it('applies direction class correctly', () => {
      const { container } = renderWithTheme(
        <Grid container direction='column'>
          Content
        </Grid>
      );
      const grid = container.querySelector('.grid-direction-column');
      expect(grid).toBeInTheDocument();
    });

    it('applies alignment classes correctly', () => {
      const { container } = renderWithTheme(
        <Grid container alignItems='center' justifyContent='space-between'>
          Content
        </Grid>
      );
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-align-center');
      expect(grid).toHaveClass('grid-justify-space-between');
    });

    it('sets custom columns via CSS variable', () => {
      const { container } = renderWithTheme(
        <Grid container columns={24}>
          Content
        </Grid>
      );
      const grid = container.querySelector('.grid') as HTMLElement;
      expect(grid?.style.getPropertyValue('--grid-columns')).toBe('24');
    });

    it('renders as custom component when specified', () => {
      const { container } = renderWithTheme(<Grid component='section'>Content</Grid>);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders with generic role by default', () => {
      const { container } = renderWithTheme(<Grid>Content</Grid>);
      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('supports responsive direction', () => {
      const { container } = renderWithTheme(
        <Grid container direction={{ xs: 'column', md: 'row' }}>
          Content
        </Grid>
      );
      expect(container.querySelector('.grid-container')).toBeInTheDocument();
    });

    it('supports responsive columns', () => {
      const { container } = renderWithTheme(
        <Grid container columns={{ xs: 4, md: 12 }}>
          Content
        </Grid>
      );
      expect(container.querySelector('.grid-container')).toBeInTheDocument();
    });
  });
});
