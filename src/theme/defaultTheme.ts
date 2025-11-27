import { 
  BREAKPOINT_VALUES, 
  TRANSITION_DURATIONS, 
  Z_INDEX_LAYERS, 
  SPACING_MULTIPLIERS 
} from './constants';
import type { PaletteOptions, TypographyOptions, Shadows, Transitions, ZIndex } from './types';

/**
 * Default grey palette
 */
export const grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
};

/**
 * Default light palette
 */
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#ffffff',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
    contrastText: '#ffffff',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
    contrastText: '#ffffff',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    contrastText: '#ffffff',
  },
  grey,
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  background: {
    default: '#ffffff',
    paper: '#f5f5f5',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    focus: 'rgba(0, 0, 0, 0.12)',
  },
};

/**
 * Default dark palette
 */
export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  secondary: {
    main: '#ce93d8',
    light: '#f3e5f5',
    dark: '#ab47bc',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ffa726',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: {
    main: '#29b6f6',
    light: '#4fc3f7',
    dark: '#0288d1',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  success: {
    main: '#66bb6a',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  grey,
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  action: {
    active: '#ffffff',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: 'rgba(255, 255, 255, 0.12)',
  },
};

/**
 * Default typography
 */
export const defaultTypography: TypographyOptions = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '6rem',
    fontWeight: 300,
    lineHeight: 1.167,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '3.75rem',
    fontWeight: 300,
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '3rem',
    fontWeight: 400,
    lineHeight: 1.167,
    letterSpacing: '0em',
  },
  h4: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '2.125rem',
    fontWeight: 400,
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  h6: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
  },
  subtitle1: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
  button: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
  },
  caption: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
  },
};

/**
 * Default shadows
 */
export const defaultShadows: Shadows = {
  0: 'none',
  1: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  2: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  3: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
  4: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  6: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
  8: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  12: '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
  16: '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
  24: '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
};

/**
 * Default transitions
 */
export const defaultTransitions: Transitions = {
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  duration: {
    shortest: TRANSITION_DURATIONS.SHORTEST,
    shorter: TRANSITION_DURATIONS.SHORTER,
    short: TRANSITION_DURATIONS.SHORT,
    standard: TRANSITION_DURATIONS.STANDARD,
    complex: TRANSITION_DURATIONS.COMPLEX,
    enteringScreen: TRANSITION_DURATIONS.ENTERING,
    leavingScreen: TRANSITION_DURATIONS.LEAVING,
  },
};

/**
 * Default z-index values
 */
export const defaultZIndex: ZIndex = {
  mobileStepper: Z_INDEX_LAYERS.MOBILE_STEPPER,
  fab: Z_INDEX_LAYERS.FAB,
  speedDial: Z_INDEX_LAYERS.SPEED_DIAL,
  appBar: Z_INDEX_LAYERS.APP_BAR,
  drawer: Z_INDEX_LAYERS.DRAWER,
  modal: Z_INDEX_LAYERS.MODAL,
  snackbar: Z_INDEX_LAYERS.SNACKBAR,
  tooltip: Z_INDEX_LAYERS.TOOLTIP,
};

/**
 * Default breakpoints
 */
export const defaultBreakpoints = {
  values: BREAKPOINT_VALUES,
  unit: 'px',
};

/**
 * Default spacing multiplier
 */
export const defaultSpacing = SPACING_MULTIPLIERS.XXXL;

/**
 * Default accessibility settings
 */
export const defaultAccessibility = {
  focusRing: {
    width: '2px',
    style: 'solid',
    color: '#007acc',
    offset: '2px',
  },
  highContrast: {
    border: '#000000',
    background: '#ffffff',
  },
};
