# 📋 Rekomendacje ulepszeń

## Priorytet 1: Krytyczne (Must Have)

### 1. Ulepsz ContentSection → Grid Component

```typescript
// Nowa implementacja
interface GridProps {
  container?: boolean;
  item?: boolean;
  spacing?: number | { xs?: number; md?: number; lg?: number };
  columns?: number | { xs?: number; md?: number; lg?: number };
  xs?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
}

// Użycie:
<Grid container spacing={2} columns={{ xs: 1, md: 2, lg: 4 }}>
  <Grid item xs={12} md={6} lg={3}>
    <FeatureCard />
  </Grid>
</Grid>
```

### 2. Dodaj podstawowe komponenty Input

```typescript
// Button Component
interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: ComponentChildren;
  endIcon?: ComponentChildren;
  onClick?: () => void;
}

// TextField Component
interface TextFieldProps {
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'text' | 'email' | 'password' | 'number';
  value?: string;
  onChange?: (e: Event) => void;
}
```

### 3. Ulepsz Theme System

```typescript
// theme.config.ts
export interface ThemeConfig {
  palette: {
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    warning: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
    mode: 'light' | 'dark';
  };
  typography: {
    fontFamily: string;
    h1: TypographyStyle;
    h2: TypographyStyle;
    // ...
  };
  spacing: (factor: number) => string;
  breakpoints: {
    values: { xs: number; sm: number; md: number; lg: number; xl: number };
  };
}

// Użycie:
export const createTheme = (config: Partial<ThemeConfig>): ThemeConfig => {
  return deepMerge(defaultTheme, config);
};

const customTheme = createTheme({
  palette: {
    primary: { main: '#00b96b', light: '#5cdba8', dark: '#008c54' },
  },
});

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

## Priorytet 2: Ważne (Should Have)

### 4. Dodaj Menu/Navigation Component

```typescript
interface MenuProps {
  items: MenuItem[];
  mode?: 'vertical' | 'horizontal' | 'inline';
  theme?: 'light' | 'dark';
  collapsed?: boolean;
  onSelect?: (key: string) => void;
  selectedKeys?: string[];
}

interface MenuItem {
  key: string;
  label: string;
  icon?: ComponentChildren;
  children?: MenuItem[];
  disabled?: boolean;
  badge?: number;
  path?: string;
}

// Użycie:
<Menu
  mode="inline"
  collapsed={isCollapsed}
  items={[
    { key: 'home', label: 'Home', icon: <HomeIcon />, path: '/' },
    {
      key: 'products',
      label: 'Products',
      icon: <ShoppingIcon />,
      badge: 5,
      children: [
        { key: 'all', label: 'All Products', path: '/products' },
        { key: 'categories', label: 'Categories', path: '/categories' },
      ],
    },
  ]}
/>
```

### 5. Dodaj Card Component

```typescript
interface CardProps {
  title?: string;
  subtitle?: string;
  cover?: ComponentChildren;
  actions?: ComponentChildren[];
  hoverable?: boolean;
  bordered?: boolean;
  loading?: boolean;
}

<Card
  title="Feature Card"
  subtitle="Description"
  cover={<img src="..." alt="..." />}
  actions={[
    <Button>Action 1</Button>,
    <Button>Action 2</Button>,
  ]}
  hoverable
/>
```

### 6. Dodaj Feedback Components

```typescript
// Alert
<Alert severity="error" onClose={handleClose}>
  This is an error message!
</Alert>

// Snackbar/Toast
showToast({
  message: 'Success!',
  type: 'success',
  duration: 3000,
});

// Dialog/Modal
<Dialog open={open} onClose={handleClose} title="Confirm">
  <DialogContent>Are you sure?</DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleConfirm}>Confirm</Button>
  </DialogActions>
</Dialog>
```

## Priorytet 3: Nice to Have

### 7. Dodaj Utility Hooks

```typescript
// useBreakpoint
const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
const isMobile = useBreakpoint('down', 'md');

// useTheme
const theme = useTheme();
const spacing = theme.spacing(2); // '16px'

// useMediaQuery
const matches = useMediaQuery('(min-width: 768px)');

// useClickAway
const ref = useClickAway(() => {
  console.log('Clicked outside');
});
```

### 8. Dodaj Table Component

```typescript
<Table
  columns={[
    { key: 'name', title: 'Name', dataIndex: 'name' },
    { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
    { key: 'action', title: 'Action', render: (row) => <Button>Edit</Button> },
  ]}
  dataSource={data}
  pagination={{ pageSize: 10 }}
  loading={loading}
/>
```

# 🎯 Plan działania (Road map)

## Faza 1: Foundation (2-3 tygodnie)

- ✅ Przepisz Grid/Layout system
- ✅ Ulepsz Theme system z customization
- ✅ Dodaj Button, TextField, Checkbox
- ✅ Dodaj useBreakpoint, useTheme hooks

## Faza 2: Core Components (3-4 tygodnie)

- ✅ Dodaj Card, Alert, Dialog
- ✅ Przepisz Menu/Navigation
- ✅ Dodaj Table component
- ✅ Dodaj Form helpers

## Faza 3: Advanced (2-3 tygodnie)

- ✅ Dodaj Toast/Snackbar system
- ✅ Dodaj DatePicker, Select
- ✅ Dodaj Progress, Skeleton
- ✅ Improve accessibility

# 📊 Analiza gap'u: Co trzeba zrobić

**Obecny stan: 3.4/10**
**Cel: 8-9/10**
**Gap do wypełnienia: ~5.5 punktów**
**Szacowany czas: 8-12 tygodni**
