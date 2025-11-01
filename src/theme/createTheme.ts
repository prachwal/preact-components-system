import type { Theme, ThemeOptions, Breakpoint, SpacingArgument, PaletteColor, SimplePaletteColor } from './types';
import {
  lightPalette,
  darkPalette,
  defaultTypography,
  defaultShadows,
  defaultTransitions,
  defaultZIndex,
  defaultBreakpoints,
  defaultSpacing as defaultSpacingValue,
} from './defaultTheme';
import { generateColorVariants } from './colorUtils';

/**
 * Deep merge utility
 */
function deepMerge<T>(target: any, source: any): T {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  
  return output;
}

function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Generate palette color from simple color
 */
function generatePaletteColor(color: SimplePaletteColor | Partial<PaletteColor>): PaletteColor {
  const { main, light, dark, contrastText } = color;
  
  if (!main) {
    throw new Error('Main color is required');
  }
  
  const generated = generateColorVariants(main);
  
  return {
    main,
    light: light || generated.light,
    dark: dark || generated.dark,
    contrastText: contrastText || generated.contrastText,
  };
}

/**
 * Create spacing function
 */
function createSpacing(spacingInput: number | ((factor: number) => string) = defaultSpacingValue) {
  const spacing = typeof spacingInput === 'number' ? spacingInput : defaultSpacingValue;
  
  return (...args: SpacingArgument[]): string => {
    if (args.length === 0) {
      return `${spacing}px`;
    }
    
    return args
      .map((arg) => {
        if (typeof arg === 'string') {
          return arg;
        }
        return `${arg * spacing}px`;
      })
      .join(' ');
  };
}

/**
 * Create breakpoints utilities
 */
function createBreakpoints(breakpoints: typeof defaultBreakpoints) {
  const { values, unit } = breakpoints;
  
  const keys = Object.keys(values) as Breakpoint[];
  
  function up(key: Breakpoint | number): string {
    const value = typeof key === 'number' ? key : values[key];
    return `@media (min-width:${value}${unit})`;
  }
  
  function down(key: Breakpoint | number): string {
    const value = typeof key === 'number' ? key : values[key];
    return `@media (max-width:${value - 0.05}${unit})`;
  }
  
  function between(start: Breakpoint | number, end: Breakpoint | number): string {
    const startValue = typeof start === 'number' ? start : values[start];
    const endValue = typeof end === 'number' ? end : values[end];
    return `@media (min-width:${startValue}${unit}) and (max-width:${endValue - 0.05}${unit})`;
  }
  
  function only(key: Breakpoint): string {
    const index = keys.indexOf(key);
    if (index === keys.length - 1) {
      return up(key);
    }
    return between(key, keys[index + 1]);
  }
  
  return {
    values,
    unit,
    up,
    down,
    between,
    only,
  };
}

/**
 * Create a theme from options
 */
export function createTheme(options: ThemeOptions = {}): Theme {
  const {
    palette: paletteInput = {},
    typography: typographyInput = {},
    spacing: spacingInput,
    breakpoints: breakpointsInput = {},
    shadows: shadowsInput = {},
    transitions: transitionsInput = {},
    zIndex: zIndexInput = {},
    shape: shapeInput = {},
  } = options;
  
  // Determine mode
  const mode = paletteInput.mode || 'light';
  const basePalette = mode === 'light' ? lightPalette : darkPalette;
  
  // Generate palette colors
  const palette = {
    ...basePalette,
    ...paletteInput,
    primary: paletteInput.primary 
      ? generatePaletteColor(paletteInput.primary)
      : basePalette.primary,
    secondary: paletteInput.secondary
      ? generatePaletteColor(paletteInput.secondary)
      : basePalette.secondary,
    error: paletteInput.error
      ? generatePaletteColor(paletteInput.error)
      : basePalette.error,
    warning: paletteInput.warning
      ? generatePaletteColor(paletteInput.warning)
      : basePalette.warning,
    info: paletteInput.info
      ? generatePaletteColor(paletteInput.info)
      : basePalette.info,
    success: paletteInput.success
      ? generatePaletteColor(paletteInput.success)
      : basePalette.success,
  };
  
  // Merge typography
  const typography = deepMerge<typeof defaultTypography>(defaultTypography, typographyInput);
  
  // Create spacing
  const spacing = createSpacing(spacingInput);
  
  // Create breakpoints
  const breakpoints = createBreakpoints(
    deepMerge(defaultBreakpoints, breakpointsInput)
  );
  
  // Merge shadows
  const shadows = { ...defaultShadows, ...shadowsInput };
  
  // Merge transitions
  const transitions = deepMerge<typeof defaultTransitions>(defaultTransitions, transitionsInput);
  
  // Merge zIndex
  const zIndex = { ...defaultZIndex, ...zIndexInput };
  
  // Merge shape
  const shape = {
    borderRadius: 4,
    ...shapeInput,
  };
  
  return {
    palette,
    typography,
    spacing,
    breakpoints,
    shadows,
    transitions,
    zIndex,
    shape,
  };
}
