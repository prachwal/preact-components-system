import { describe, it, expect } from 'vitest';

import { lighten, darken, alpha, getContrastText } from './colorUtils';
import { createTheme } from './createTheme';

describe('Theme System', () => {
  describe('createTheme', () => {
    it('creates a default light theme', () => {
      const theme = createTheme();
      expect(theme.palette.mode).toBe('light');
      expect(theme.palette.primary.main).toBeDefined();
      expect(theme.typography.fontFamily).toBeDefined();
      expect(theme.spacing).toBeInstanceOf(Function);
    });

    it('creates a dark theme when mode is dark', () => {
      const theme = createTheme({ palette: { mode: 'dark' } });
      expect(theme.palette.mode).toBe('dark');
    });

    it('merges custom palette colors', () => {
      const customColor = '#ff0000';
      const theme = createTheme({
        palette: {
          primary: { main: customColor },
        },
      });
      expect(theme.palette.primary.main).toBe(customColor);
    });

    it('generates light and dark variants for custom colors', () => {
      const theme = createTheme({
        palette: {
          primary: { main: '#1976d2' },
        },
      });
      expect(theme.palette.primary.light).toBeDefined();
      expect(theme.palette.primary.dark).toBeDefined();
      expect(theme.palette.primary.contrastText).toBeDefined();
    });

    it('creates spacing function correctly', () => {
      const theme = createTheme();
      expect(theme.spacing(1)).toBe('8px');
      expect(theme.spacing(2)).toBe('16px');
      expect(theme.spacing(1, 2)).toBe('8px 16px');
    });

    it('creates custom spacing when provided', () => {
      const theme = createTheme({ spacing: 4 });
      expect(theme.spacing(1)).toBe('4px');
      expect(theme.spacing(2)).toBe('8px');
    });

    it('merges custom typography', () => {
      const theme = createTheme({
        typography: {
          fontFamily: 'Arial',
        },
      });
      expect(theme.typography.fontFamily).toBe('Arial');
      expect(theme.typography.h1).toBeDefined(); // Other defaults should still exist
    });

    it('provides breakpoint utilities', () => {
      const theme = createTheme();
      expect(theme.breakpoints.up('md')).toBe('@media (min-width:900px)');
      expect(theme.breakpoints.down('md')).toBe('@media (max-width:899.95px)');
    });
  });

  describe('Color Utilities', () => {
    it('lightens a color', () => {
      const result = lighten('#000000', 0.5);
      // Should lighten black by 50%, resulting in gray
      expect(result).toMatch(/^#[78][0f][78][0f][78][0f]$/);
    });

    it('darkens a color', () => {
      const result = darken('#ffffff', 0.5);
      // Should darken white by 50%, resulting in gray
      expect(result).toMatch(/^#[78][0f][78][0f][78][0f]$/);
    });

    it('adds alpha to a color', () => {
      const result = alpha('#ff0000', 0.5);
      expect(result).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('gets correct contrast text for light backgrounds', () => {
      const result = getContrastText('#ffffff');
      expect(result).toBe('#000000');
    });

    it('gets correct contrast text for dark backgrounds', () => {
      const result = getContrastText('#000000');
      expect(result).toBe('#ffffff');
    });
  });
});
