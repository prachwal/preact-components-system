# 🎯 FAZA 2: CORE COMPONENTS (Tydzień 4-7)

**Cel: Przejście z 5.5 → 7.5/10**

## 2.1 Navigation Components ⭐⭐

### ☐ Menu Component (Priorytet: NAJWYŻSZY)

- Stwórz `Menu.tsx`

```typescript
interface MenuProps {
  items: MenuItem[];
  mode?: 'vertical' | 'horizontal' | 'inline';
  theme?: 'light' | 'dark';
  collapsed?: boolean;
  selectedKeys?: string[];
  openKeys?: string[];
  onSelect?: (key: string) => void;
  onOpenChange?: (openKeys: string[]) => void;
}

interface MenuItem {
  key: string;
  label: string;
  icon?: ComponentChildren;
  children?: MenuItem[];
  disabled?: boolean;
  danger?: boolean;
  path?: string;
}
```

- Nested menu support (SubMenu)
- Keyboard navigation
- Collapse animations
- Menu divider
- Menu item group

### ☐ Breadcrumb Component (Priorytet: WYSOKI)

- Stwórz `Breadcrumb.tsx`

```typescript
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ComponentChildren;
  maxItems?: number;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ComponentChildren;
}
```

### ☐ Tabs Component (Priorytet: WYSOKI)

- Stwórz `Tabs.tsx`

```typescript
interface TabsProps {
  value: string | number;
  onChange: (value: string | number) => void;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  orientation?: 'horizontal' | 'vertical';
}

interface TabProps {
  value: string | number;
  label: string;
  icon?: ComponentChildren;
  disabled?: boolean;
}
```

- TabPanel component
- Scrollable tabs
- Tab indicators

### ☐ Pagination Component (Priorytet: ŚREDNI)

- Stwórz `Pagination.tsx`

```typescript
interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  size?: 'small' | 'medium' | 'large';
}
```

### ☐ Stepper Component (Priorytet: NISKI)

- Stwórz `Stepper.tsx`
- Step component
- StepLabel, StepContent

## 2.2 Data Display Components ⭐⭐⭐

### ☐ Card Component (Priorytet: NAJWYŻSZY)

- Stwórz `Card.tsx`

```typescript
interface CardProps {
  variant?: 'elevation' | 'outlined';
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  hoverable?: boolean;
}
```

- CardHeader component

```typescript
interface CardHeaderProps {
  avatar?: ComponentChildren;
  title: string;
  subheader?: string;
  action?: ComponentChildren;
}
```

- CardMedia component
- CardContent component
- CardActions component
- Card hover effects

### ☐ List Component (Priorytet: WYSOKI)

- Stwórz `List.tsx`

```typescript
interface ListProps {
  dense?: boolean;
  disablePadding?: boolean;
}

interface ListItemProps {
  button?: boolean;
  selected?: boolean;
  disabled?: boolean;
  divider?: boolean;
}
```

- ListItem component
- ListItemIcon
- ListItemText (primary, secondary)
- ListItemAvatar
- ListItemButton
- Virtual scrolling (opcjonalnie)

### ☐ Avatar Component (Priorytet: WYSOKI)

- Stwórz `Avatar.tsx`

```typescript
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | number;
  variant?: 'circular' | 'rounded' | 'square';
  children?: ComponentChildren; // fallback
}
```

- AvatarGroup component
- Image loading states
- Fallback to initials

### ☐ Badge Component (Priorytet: WYSOKI)

- Stwórz `Badge.tsx`

```typescript
interface BadgeProps {
  badgeContent?: number | string;
  color?: ColorOption;
  variant?: 'standard' | 'dot';
  max?: number; // max count before showing "99+"
  showZero?: boolean;
  invisible?: boolean;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
}
```

### ☐ Chip/Tag Component (Priorytet: WYSOKI)

- Stwórz `Chip.tsx`

```typescript
interface ChipProps {
  label: string;
  variant?: 'filled' | 'outlined';
  color?: ColorOption;
  size?: 'small' | 'medium';
  icon?: ComponentChildren;
  avatar?: ComponentChildren;
  onDelete?: () => void;
  onClick?: () => void;
  deleteIcon?: ComponentChildren;
}
```

### ☐ Tooltip Component (Priorytet: WYSOKI)

- Stwórz `Tooltip.tsx`

```typescript
interface TooltipProps {
  title: string | ComponentChildren;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | ...;
  arrow?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
}
```

- Popper positioning
- Portal rendering

### ☐ Divider Component (Priorytet: ŚREDNI)

- Stwórz `Divider.tsx`

```typescript
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  textAlign?: 'left' | 'center' | 'right';
  children?: ComponentChildren; // text in divider
}
```

### ☐ Accordion/Collapse Component (Priorytet: ŚREDNI)

- Stwórz `Accordion.tsx`

```typescript
interface AccordionProps {
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (expanded: boolean) => void;
  disabled?: boolean;
}
```

- AccordionSummary
- AccordionDetails
- AccordionActions
- Controlled/Uncontrolled modes

## 2.3 Feedback Components ⭐⭐⭐

### ☐ Alert Component (Priorytet: NAJWYŻSZY)

- Stwórz `Alert.tsx`

```typescript
interface AlertProps {
  severity?: 'error' | 'warning' | 'info' | 'success';
  variant?: 'standard' | 'filled' | 'outlined';
  onClose?: () => void;
  icon?: ComponentChildren | false;
  action?: ComponentChildren;
}
```

- AlertTitle component
- Icons for each severity
- Close button

### ☐ Dialog/Modal Component (Priorytet: NAJWYŻSZY)

- Stwórz `Dialog.tsx`

```typescript
interface DialogProps {
  open: boolean;
  onClose?: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  fullScreen?: boolean;
  disableEscapeKeyDown?: boolean;
  disableBackdropClick?: boolean;
}
```

- DialogTitle component
- DialogContent component
- DialogActions component
- DialogContentText component
- Backdrop component
- Focus trap
- Scroll lock
- Portal rendering
- Transitions

### ☐ Snackbar/Toast System (Priorytet: NAJWYŻSZY)

- Stwórz `Snackbar.tsx`

```typescript
interface SnackbarProps {
  open: boolean;
  message: string;
  autoHideDuration?: number;
  onClose?: () => void;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  action?: ComponentChildren;
}
```

- Toast manager/queue system

```typescript
const { showToast } = useToast();
showToast({ message: 'Success!', type: 'success' });
```

- Multiple toasts handling
- Auto-dismiss
- Custom positions

### ☐ Progress Components (Priorytet: WYSOKI)

- CircularProgress component

```typescript
interface CircularProgressProps {
  variant?: 'determinate' | 'indeterminate';
  value?: number; // 0-100
  size?: number;
  thickness?: number;
  color?: ColorOption;
}
```

- LinearProgress component

```typescript
interface LinearProgressProps {
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value?: number;
  valueBuffer?: number;
  color?: ColorOption;
}
```

### ☐ Skeleton Component (Priorytet: WYSOKI)

- Stwórz `Skeleton.tsx`

```typescript
interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
}
```

- Multiple skeleton layouts

### ☐ Backdrop Component (Priorytet: ŚREDNI)

- Stwórz `Backdrop.tsx`

```typescript
interface BackdropProps {
  open: boolean;
  invisible?: boolean;
  onClick?: () => void;
}
```

## 2.4 Advanced Input Components ⭐⭐

### ☐ Select Component (Priorytet: NAJWYŻSZY)

- Stwórz `Select.tsx`

```typescript
interface SelectProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  options: SelectOption<T>[];
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  renderValue?: (value: T) => ComponentChildren;
}

interface SelectOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}
```

- Native vs custom select
- Search/filter functionality
- Multi-select with chips
- Option groups

### ☐ Autocomplete Component (Priorytet: WYSOKI)

- Stwórz `Autocomplete.tsx`

```typescript
interface AutocompleteProps<T> {
  options: T[];
  value?: T | T[];
  onChange?: (value: T | T[]) => void;
  getOptionLabel?: (option: T) => string;
  filterOptions?: (options: T[], state: any) => T[];
  multiple?: boolean;
  freeSolo?: boolean;
  loading?: boolean;
  renderOption?: (props: any, option: T) => ComponentChildren;
}
```

- Async loading
- Custom filtering
- Multi-select
- Create new option (freeSolo)

### ☐ Slider Component (Priorytet: ŚREDNI)

- Stwórz `Slider.tsx`

```typescript
interface SliderProps {
  value?: number | number[];
  defaultValue?: number | number[];
  onChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean | Mark[];
  valueLabelDisplay?: 'auto' | 'on' | 'off';
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
}
```

- Range slider
- Marks/labels
- Value label

### ☐ DatePicker Component (Priorytet: NISKI)

- Podstawowy DatePicker
- TimePicker
- DateTimePicker
- DateRangePicker
- Integracja z date-fns lub day.js

## 2.5 Table Component ⭐⭐

### ☐ Table Component (Priorytet: WYSOKI)

- Stwórz `Table.tsx`

```typescript
interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  pagination?: PaginationConfig;
  sorting?: SortingConfig;
  selection?: SelectionConfig;
  onRowClick?: (row: T) => void;
  rowKey?: keyof T | ((row: T) => string);
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, row: T, index: number) => ComponentChildren;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  fixed?: 'left' | 'right';
}
```

- TableHead, TableBody, TableRow, TableCell components
- Sortable columns
- Pagination
- Row selection (checkbox)
- Fixed columns
- Loading state
- Empty state
- Expandable rows (opcjonalnie)
- Virtual scrolling (opcjonalnie)
