/**
 * Theme constants - centralized magic numbers
 * 
 * This file contains all the numeric constants used throughout the theme system
 * to eliminate magic numbers and improve maintainability.
 */

/**
 * Grid system constants
 */
export const GRID_CONSTANTS = {
  /** Default number of columns in the grid system */
  DEFAULT_COLUMNS: 12,
  /** Maximum spacing value for grid gaps */
  MAX_SPACING: 10,
  /** Default spacing between grid items */
  DEFAULT_SPACING: 0,
} as const;

/**
 * Breakpoint pixel values
 */
export const BREAKPOINT_VALUES = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

/**
 * Common spacing multiplier values
 */
export const SPACING_MULTIPLIERS = {
  NONE: 0,
  TINY: 0.5,
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  XL: 4,
  XXL: 6,
  XXXL: 8,
  HUGE: 12,
  MASSIVE: 16,
  GIANT: 24,
} as const;

/**
 * Typography scale values
 */
export const TYPOGRAPHY_SCALE = {
  h1: 6,
  h2: 3.75,
  h3: 3,
  h4: 2.125,
  h5: 1.5,
  h6: 1.25,
} as const;

/**
 * Common pixel values
 */
export const PIXEL_VALUES = {
  ICON_SIZE_SMALL: 20,
  ICON_SIZE_MEDIUM: 24,
  ICON_SIZE_LARGE: 32,
  LOGO_SIZE: 32,
  BORDER_RADIUS_SMALL: 4,
  BORDER_RADIUS_MEDIUM: 8,
  BORDER_RADIUS_LARGE: 16,
} as const;

/**
 * Transition duration values (in milliseconds)
 */
export const TRANSITION_DURATIONS = {
  SHORTEST: 150,
  SHORTER: 200,
  SHORT: 250,
  STANDARD: 300,
  COMPLEX: 375,
  ENTERING: 225,
  LEAVING: 195,
} as const;

/**
 * Z-index layer values
 */
export const Z_INDEX_LAYERS = {
  MOBILE_STEPPER: 1000,
  FAB: 1050,
  SPEED_DIAL: 1050,
  APP_BAR: 1100,
  DRAWER: 1200,
  MODAL: 1300,
  SNACKBAR: 1400,
  TOOLTIP: 1500,
} as const;

/**
 * Responsive breakpoint pixel values
 */
export const RESPONSIVE_BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

/**
 * TextField default values
 */
export const TEXTFIELD_CONSTANTS = {
  DEFAULT_ROWS: 4,
} as const;

/**
 * Color opacity values
 */
export const OPACITY_VALUES = {
  TRANSPARENT: 0,
  LIGHT: 0.1,
  MEDIUM: 0.5,
  HEAVY: 0.8,
  OPAQUE: 1,
} as const;
