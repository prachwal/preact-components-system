/**
 * Theme types for the component system
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export interface PaletteColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface SimplePaletteColor {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

export interface TextColor {
  primary: string;
  secondary: string;
  disabled: string;
}

export interface Background {
  default: string;
  paper: string;
}

export interface Action {
  active: string;
  hover: string;
  selected: string;
  disabled: string;
  disabledBackground: string;
  focus: string;
}

export interface PaletteOptions {
  mode: 'light' | 'dark';
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  grey: Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;
  text: TextColor;
  background: Background;
  divider: string;
  action: Action;
}

export interface TypographyStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: number | string;
  letterSpacing?: string;
}

export interface TypographyOptions {
  fontFamily: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  h4: TypographyStyle;
  h5: TypographyStyle;
  h6: TypographyStyle;
  subtitle1: TypographyStyle;
  subtitle2: TypographyStyle;
  body1: TypographyStyle;
  body2: TypographyStyle;
  button: TypographyStyle;
  caption: TypographyStyle;
  overline: TypographyStyle;
}

export interface BreakpointsValues {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export type Breakpoint = keyof BreakpointsValues;

export interface BreakpointsOptions {
  values: BreakpointsValues;
  unit: string;
}

export type SpacingArgument = number | string;
export type SpacingFunction = (...args: SpacingArgument[]) => string;

export interface Shadows {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  6: string;
  8: string;
  12: string;
  16: string;
  24: string;
}

export interface Transitions {
  easing: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
  };
  duration: {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
  };
}

export interface ZIndex {
  mobileStepper: number;
  fab: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}

export interface Shape {
  borderRadius: number;
}

export interface Accessibility {
  focusRing: {
    width: string;
    style: string;
    color: string;
    offset: string;
  };
  highContrast: {
    border: string;
    background: string;
  };
}

export interface Theme {
  palette: PaletteOptions;
  typography: TypographyOptions;
  spacing: SpacingFunction;
  breakpoints: BreakpointsOptions & {
    up: (key: Breakpoint | number) => string;
    down: (key: Breakpoint | number) => string;
    between: (start: Breakpoint | number, end: Breakpoint | number) => string;
    only: (key: Breakpoint) => string;
  };
  shadows: Shadows;
  transitions: Transitions;
  zIndex: ZIndex;
  shape: Shape;
  accessibility: Accessibility;
}

export interface ThemeOptions {
  palette?: Partial<PaletteOptions> & {
    primary?: Partial<PaletteColor> | SimplePaletteColor;
    secondary?: Partial<PaletteColor> | SimplePaletteColor;
    error?: Partial<PaletteColor> | SimplePaletteColor;
    warning?: Partial<PaletteColor> | SimplePaletteColor;
    info?: Partial<PaletteColor> | SimplePaletteColor;
    success?: Partial<PaletteColor> | SimplePaletteColor;
  };
  typography?: Partial<TypographyOptions>;
  spacing?: number | ((factor: number) => string);
  breakpoints?: Partial<BreakpointsOptions>;
  shadows?: Partial<Shadows>;
  transitions?: Partial<Transitions>;
  zIndex?: Partial<ZIndex>;
  shape?: Partial<Shape>;
  accessibility?: Partial<Accessibility>;
}

export type ResponsiveValue<T> = T | {
  [K in Breakpoint]?: T;
} & {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};
