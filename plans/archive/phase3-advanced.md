# 🎯 FAZA 3: ADVANCED & POLISH (Tydzień 8-12)

**Cel: Przejście z 7.5 → 8.5-9/10**

## 3.1 Advanced Utilities ⭐⭐

### ☐ Portal Component (Priorytet: WYSOKI)

- Stwórz `Portal.tsx`

```typescript
interface PortalProps {
  children: ComponentChildren;
  container?: Element | null;
}
```

### ☐ Popper Component (Priorytet: WYSOKI)

- Stwórz `Popper.tsx` (positioning engine)

```typescript
interface PopperProps {
  open: boolean;
  anchorEl: Element | null;
  placement?: Placement;
  children: ComponentChildren;
  modifiers?: Modifier[];
}
```

- Integracja z Floating UI / Popper.js

### ☐ ClickAwayListener (Priorytet: ŚREDNI)

- Stwórz `ClickAwayListener.tsx`

```typescript
interface ClickAwayListenerProps {
  onClickAway: () => void;
  children: ComponentChildren;
  mouseEvent?: 'onClick' | 'onMouseDown' | 'onMouseUp';
  touchEvent?: 'onTouchStart' | 'onTouchEnd';
}
```

### ☐ FocusTrap Component (Priorytet: ŚREDNI)

- Trap focus within element
- Return focus on unmount

### ☐ Transition Components (Priorytet: ŚREDNI)

- Fade transition
- Slide transition
- Grow transition
- Collapse transition
- Zoom transition

## 3.2 Form Management ⭐⭐

### ☐ Form Component (Priorytet: WYSOKI)

- Stwórz `Form.tsx`

```typescript
interface FormProps {
  onSubmit: (values: any) => void;
  initialValues?: any;
  validate?: (values: any) => any;
  children: ComponentChildren;
}
```

- Form context
- Error handling
- Submit handling

### ☐ useForm Hook (Priorytet: WYSOKI)

- Form state management

```typescript
const {
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  setFieldError,
  resetForm,
} = useForm({
  initialValues: {},
  onSubmit: () => {},
  validate: () => {},
});
```

### ☐ FormField Component (Priorytet: ŚREDNI)

- Universal field wrapper
- Auto-connect to form context
- Validation display

## 3.3 Icons System ⭐⭐

### ☐ Icon Component (Priorytet: NAJWYŻSZY)

- Stwórz `Icon.tsx`

```typescript
interface IconProps {
  name: string;
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
  className?: string;
}
```

### ☐ Icons Library Integration (Priorytet: NAJWYŻSZY)

- Wybierz: Lucide, Heroicons, Material Icons, Feather Icons
- Stwórz wrapper dla wybranej biblioteki
- Tree-shaking support
- Custom icon registration

### ☐ Zastąp Emoji w Sidebar (Priorytet: WYSOKI)

- Zamień 🏠 → `<HomeIcon />`
- Zamień ⭐ → `<StarIcon />`
- Zamień ℹ️ → `<InfoIcon />`
- Zamień 📧 → `<MailIcon />`

## 3.4 Accessibility Improvements ⭐

### ☐ ARIA Attributes Audit (Priorytet: NAJWYŻSZY)

- Audit wszystkich komponentów pod kątem ARIA
- Dodaj role attributes gdzie potrzebne
- Dodaj aria-label, aria-labelledby, aria-describedby
- Dodaj aria-expanded, aria-selected, aria-checked
- Dodaj aria-hidden dla decorative elements
- Dodaj aria-live regions dla dynamic content

**Checklist:**

- Button - role="button"
- Dialog - role="dialog", aria-modal
- Menu - role="menu", role="menuitem"
- Tabs - role="tablist", role="tab", role="tabpanel"
- Accordion - aria-expanded, aria-controls
- Alert - role="alert" lub aria-live="polite"

### ☐ Keyboard Navigation (Priorytet: NAJWYŻSZY)

- Sprawdź wszystkie interactive elements
- Focusable z keyboard (Tab)
- Aktywowane przez Enter/Space
- Escape do zamykania modali/menu
- Arrow keys w menu/tabs/select
- Roving tabindex dla list/menu
- Focus visible indicators
- Focus restoration po zamknięciu modal
- Skip links improvements

### ☐ Focus Management (Priorytet: WYSOKI)

- Focus trap w Dialog/Modal
- Auto-focus na pierwszy element w Dialog
- Return focus po zamknięciu
- Focus indicators visible
- Custom focus ring styles
- Dodaj :focus-visible polyfill

### ☐ Screen Reader Support (Priorytet: WYSOKI)

- Test z NVDA/JAWS/VoiceOver
- Live regions dla notifications
- Status messages
- Error announcements
- Loading states announced
- Visually hidden text gdzie potrzebne

```typescript
<span className="sr-only">Loading...</span>
```

### ☐ Color Contrast (Priorytet: WYSOKI)

- Sprawdź wszystkie color combinations
- WCAG AA minimum (4.5:1 dla tekstu)
- WCAG AAA gdzie możliwe (7:1)
- Narzędzie: contrast checker utility
- High contrast mode support
- Test w prefers-contrast: high

### ☐ Motion & Animation (Priorytet: ŚREDNI)

- Sprawdź prefers-reduced-motion
- Wyłącz animacje gdy requested
- Alternatywne feedback bez motion
- Transition duration controls

### ☐ Form Accessibility (Priorytet: WYSOKI)

- Labels dla wszystkich inputs
- Error messages linked (aria-describedby)
- Required fields indicated
- Fieldset i legend dla grupy
- Autocomplete attributes
- Input types correct (email, tel, etc)

## 3.5 Documentation & Storybook ⭐⭐

### ☐ Storybook Stories (Priorytet: NAJWYŻSZY)

- Story dla każdego komponentu
- Wszystkie variants pokazane
- Interactive controls (args)
- Docs page z examples
- Props documentation
- Accessibility addon włączony

**Lista komponentów do pokrycia:**

- Grid
- Stack
- Container
- Box
- Button (wszystkie variants)
- TextField
- Checkbox
- Radio
- Switch
- Select
- Autocomplete
- Card
- List
- Avatar
- Badge
- Chip
- Tooltip
- Menu
- Breadcrumb
- Tabs
- Pagination
- Alert
- Dialog
- Snackbar
- Progress
- Skeleton
- Table

### ☐ Component Documentation (Priorytet: WYSOKI)

- README.md dla każdego komponentu
- API reference (props table)
- Usage examples
- Best practices
- Common patterns
- Accessibility notes
- Migration guides (jeśli applicable)

### ☐ TypeScript Documentation (Priorytet: ŚREDNI)

- TSDoc comments dla wszystkich exports
- Interface documentation
- Generic types explained
- Example types

### ☐ Getting Started Guide (Priorytet: WYSOKI)

- Installation instructions
- Quick start tutorial
- Theme customization guide
- Common recipes
- FAQ

### ☐ Design Guidelines (Priorytet: NISKI)

- Color palette guidelines
- Typography scale
- Spacing system
- Component usage guidelines
- Composition patterns

## 3.6 Testing ⭐⭐

### ☐ Unit Tests Setup (Priorytet: NAJWYŻSZY)

- Setup testing library (@testing-library/preact)
- Jest configuration
- Test utilities
- Custom matchers
- Mock providers (Theme, etc)

### ☐ Component Tests (Priorytet: NAJWYŻSZY)

- Test coverage > 80%
- Lista komponentów:

**Button** - wszystkie variants, states, interactions
**TextField** - input handling, validation, error states
**Checkbox/Radio** - controlled/uncontrolled
**Select** - options selection, search
**Card** - layout combinations
**Dialog** - open/close, focus management
**Menu** - navigation, keyboard
**Tabs** - switching, keyboard
**Table** - sorting, pagination, selection
**Form** - submission, validation
**Theme** - color switching, CSS variables

### ☐ Accessibility Tests (Priorytet: WYSOKI)

- jest-axe integration
- Test każdy komponent z axe
- Keyboard navigation tests
- Screen reader tests (manual)

### ☐ Visual Regression Tests (Priorytet: ŚREDNI)

- Chromatic lub Percy setup
- Snapshots dla Storybook stories
- Test w różnych breakpoints
- Test w light/dark mode

### ☐ Integration Tests (Priorytet: ŚREDNI)

- Test złożonych flow
- Multi-component interactions
- Form submission flows
- Navigation flows

## 3.7 Performance Optimization ⭐

### ☐ Bundle Size (Priorytet: WYSOKI)

- Tree-shaking verification
- Code splitting per component
- Lazy loading dla heavy components
- Bundle analyzer setup
- Target: < 50KB base bundle
- Target: < 10KB per component

### ☐ Component Optimization (Priorytet: WYSOKI)

- Memo dla expensive components
- useCallback/useMemo gdzie potrzebne
- Avoid unnecessary re-renders
- Virtual scrolling dla długich list
- Debounce/throttle w inputs

### ☐ CSS Optimization (Priorytet: ŚREDNI)

- Critical CSS extraction
- Remove unused styles
- CSS minification
- CSS-in-JS optimization (jeśli używane)

### ☐ Loading Performance (Priorytet: ŚREDNI)

- Lazy load components
- Preload critical assets
- Image optimization
- Font loading strategy

## 3.8 Developer Experience ⭐

### ☐ TypeScript Improvements (Priorytet: WYSOKI)

- Strict mode enabled
- Generic components properly typed
- Discriminated unions dla variants
- Utility types dla common patterns
- Export wszystkich types
- Type inference improvements

### ☐ Build Tools (Priorytet: WYSOKI)

- Fast refresh configuration
- Source maps
- Development warnings
- Production optimizations
- Build time < 10s dla dev

### ☐ IDE Support (Priorytet: ŚREDNI)

- IntelliSense improvements
- Snippets dla common patterns
- ESLint rules
- Prettier config
- EditorConfig

### ☐ CLI Tools (Priorytet: NISKI)

- Component generator

```bash
npm run generate:component Button
```

- Theme generator
- Migration scripts

## 3.9 Advanced Components (Nice to Have) ⭐

### ☐ Drawer Component (Priorytet: ŚREDNI)

- Side drawer (zamiennik Sidebar)

```typescript
interface DrawerProps {
  open: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'temporary' | 'persistent' | 'permanent';
  elevation?: number;
}
```

### ☐ AppBar Component (Priorytet: ŚREDNI)

- Zamiennik Header

```typescript
interface AppBarProps {
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  color?: 'default' | 'primary' | 'secondary' | 'transparent';
  elevation?: number;
}
```

- Toolbar component

### ☐ ImageList Component (Priorytet: NISKI)

- Grid layout dla obrazów
- Masonry layout
- Quilted layout

### ☐ Rating Component (Priorytet: NISKI)

- Star rating
- Custom icons
- Half-star support
- Read-only mode

### ☐ Timeline Component (Priorytet: NISKI)

- Vertical/horizontal timeline
- Custom connectors
- Icons/avatars

### ☐ TreeView Component (Priorytet: NISKI)

- Hierarchical data display
- Expand/collapse
- Selection
- Drag and drop

### ☐ Transfer/Dual List (Priorytet: NISKI)

- Move items between lists
- Search/filter
- Select all/none

### ☐ Upload Component (Priorytet: NISKI)

- File upload
- Drag and drop
- Preview
- Progress indicator

## 3.10 Advanced Features ⭐

### ☐ Responsive System Enhancement (Priorytet: ŚREDNI)

- Responsive prop utility

```typescript
<Box
  display={{ xs: 'block', md: 'flex' }}
  padding={{ xs: 1, md: 2, lg: 3 }}
/>
```

- Breakpoint props dla wszystkich komponentów

### ☐ CSS-in-JS System (Priorytet: ŚREDNI, OPCJONALNE)

- sx prop implementation

```typescript
<Box sx={{
  color: 'primary.main',
  '&:hover': { bgcolor: 'primary.light' }
}} />
```

- styled utility
- Theme-aware styling

### ☐ Animation System (Priorytet: NISKI)

- Predefined animations
- useTransition hook
- AnimatePresence equivalent
- Spring animations

### ☐ Theming Extras (Priorytet: NISKI)

- Multiple themes registry
- Theme switching animation
- Theme preview
- Theme export/import
