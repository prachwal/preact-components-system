# 🎯 FAZA 1: FOUNDATION (Tydzień 1-3)

**Cel: Przejście z 3.4 → 5.5/10**

## 1.1 System Grid/Layout ⭐⭐⭐ [KRYTYCZNE]

### ☐ Grid Component (Priorytet: NAJWYŻSZY)

- Stwórz `Grid.tsx` z container/item system

```typescript
interface GridProps {
  container?: boolean;
  item?: boolean;
  spacing?: ResponsiveValue<number>;
  columns?: ResponsiveValue<number>;
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  direction?: 'row' | 'column';
  wrap?: 'wrap' | 'nowrap';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
}
```

- Implementuj responsive spacing: `spacing={{ xs: 1, md: 2, lg: 3 }}`
- Dodaj 12-column system (jak MUI) lub 24-column (jak Ant Design)
- Obsługa nested grids
- Generate CSS dla wszystkich breakpointów
- Testy jednostkowe dla Grid

### ☐ Stack Component (Priorytet: WYSOKI)

- Stwórz `Stack.tsx` dla 1D layout

```typescript
interface StackProps {
  direction?: 'row' | 'column';
  spacing?: ResponsiveValue<number>;
  divider?: ComponentChildren;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
}
```

- Dodaj divider support
- Responsive direction change

### ☐ Container Component (Priorytet: ŚREDNI)

- Stwórz `Container.tsx`

```typescript
interface ContainerProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fixed?: boolean;
  disableGutters?: boolean;
}
```

### ☐ Box Component (Priorytet: ŚREDNI)

- Universal wrapper z system props

```typescript
interface BoxProps {
  component?: keyof JSX.IntrinsicElements;
  sx?: SystemStyleObject;
  p?: ResponsiveValue<number>; // padding
  m?: ResponsiveValue<number>; // margin
  display?: ResponsiveValue<string>;
}
```

### ☐ Usuń/Zastąp ContentSection

- Migruj wszystkie użycia na Grid
- Usuń stary komponent
- Update dokumentacji

## 1.2 Theme System 2.0 ⭐⭐⭐ [KRYTYCZNE]

### ☐ Theme Configuration (Priorytet: NAJWYŻSZY)

- Stwórz `theme/types.ts` z kompletnymi typami

```typescript
interface Theme {
  palette: PaletteOptions;
  typography: TypographyOptions;
  spacing: SpacingFunction;
  breakpoints: BreakpointsOptions;
  shadows: Shadows;
  transitions: Transitions;
  zIndex: ZIndex;
  shape: Shape;
  components?: ComponentsOverrides;
}
```

### ☐ Palette System (Priorytet: NAJWYŻSZY)

- Dodaj semantic colors:

```typescript
interface PaletteOptions {
  mode: 'light' | 'dark';
  primary: PaletteColor; // main, light, dark, contrastText
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  grey: PaletteColor; // 50, 100, ..., 900
  text: TextColor; // primary, secondary, disabled
  background: Background; // default, paper
  divider: string;
  action: Action; // active, hover, selected, disabled, focus
}
```

- Color generator utility (lighten/darken)
- Contrast ratio checker
- Alpha channel utilities

### ☐ createTheme Function (Priorytet: NAJWYŻSZY)

- Implementuj `createTheme(options)`

```typescript
export function createTheme(options?: ThemeOptions): Theme {
  // Deep merge with defaults
  // Generate missing colors
  // Validate theme
  return theme;
}
```

- Deep merge utility
- Default theme fallbacks
- Theme validation

### ☐ ThemeProvider v2 (Priorytet: WYSOKI)

- Update ThemeProvider do obsługi custom themes

```typescript
<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

- CSS variables generation z theme
- Theme nesting support

### ☐ Typography System (Priorytet: WYSOKI)

- Dodaj typography variants:

```typescript
interface TypographyOptions {
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
```

- Typography component
- Responsive typography

### ☐ Spacing System (Priorytet: ŚREDNI)

- Spacing function

```typescript
const spacing = (factor: number) => `${factor * 8}px`;
theme.spacing(2); // '16px'
theme.spacing(1, 2); // '8px 16px'
```

### ☐ Breakpoints System (Priorytet: ŚREDNI)

- Breakpoints configuration

```typescript
interface BreakpointsOptions {
  values: {
    xs: 0;
    sm: 600;
    md: 900;
    lg: 1200;
    xl: 1536;
  };
  unit: 'px';
}
```

- up/down/between/only utilities

## 1.3 Core Utility Hooks ⭐⭐⭐ [KRYTYCZNE]

### ☐ useTheme (Priorytet: NAJWYŻSZY)

- Hook zwracający pełny theme object

```typescript
const theme = useTheme();
const color = theme.palette.primary.main;
const spacing = theme.spacing(2);
```

### ☐ useMediaQuery (Priorytet: NAJWYŻSZY)

- Custom media query hook

```typescript
const matches = useMediaQuery('(min-width: 768px)');
const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
```

- SSR support
- noSsr option

### ☐ useBreakpoint (Priorytet: WYSOKI)

- Current breakpoint detection

```typescript
const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
const isSmallScreen = useBreakpoint('down', 'md');
const isLargeScreen = useBreakpoint('up', 'lg');
```

### ☐ useResponsive (Priorytet: ŚREDNI)

- Responsive value resolver

```typescript
const value = useResponsive({ xs: 1, md: 2, lg: 4 });
```

## 1.4 Basic Input Components ⭐⭐⭐ [KRYTYCZNE]

### ☐ Button Component (Priorytet: NAJWYŻSZY)

- Stwórz `Button.tsx`

```typescript
interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: ComponentChildren;
  endIcon?: ComponentChildren;
  loading?: boolean;
  onClick?: (e: MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
}
```

- Ripple effect (opcjonalnie)
- Loading state z spinner
- Icon buttons variant
- Button group component
- Storybook stories
- Accessibility (ARIA)

### ☐ TextField Component (Priorytet: NAJWYŻSZY)

- Stwórz `TextField.tsx`

```typescript
interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  startAdornment?: ComponentChildren;
  endAdornment?: ComponentChildren;
  variant?: 'outlined' | 'filled' | 'standard';
}
```

- Error states styling
- Character counter
- Clear button
- Password visibility toggle
- Storybook stories

### ☐ Checkbox Component (Priorytet: WYSOKI)

- Stwórz `Checkbox.tsx`

```typescript
interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size?: 'small' | 'medium' | 'large';
  label?: string;
}
```

- Indeterminate state
- Checkbox group

### ☐ Radio Component (Priorytet: WYSOKI)

- Stwórz `Radio.tsx`
- RadioGroup component

```typescript
<RadioGroup value={value} onChange={setValue}>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>
```

### ☐ Switch Component (Priorytet: ŚREDNI)

- Stwórz `Switch.tsx`

```typescript
interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  color?: ColorOption;
  size?: 'small' | 'medium';
}
```

### ☐ FormControl/FormLabel (Priorytet: ŚREDNI)

- FormControl wrapper
- FormLabel component
- FormHelperText component
- FormGroup for checkboxes/radios
