# Component Showcase Demo

This demo showcases all the advanced features implemented in Phase 3 of the Preact Components System.

## View the Demo

Run Storybook to see the interactive demo:

```bash
npm run storybook
```

Then navigate to **Demo → Complete Showcase** in the sidebar.

## Features Demonstrated

### 🎨 Icon System

- Integration with lucide-preact
- Multiple sizes (small, medium, large)
- Accessibility support (decorative mode, aria-labels)
- Beautiful, scalable SVG icons

### 📦 Core Components

- **Card**: Content containers with header, media, and actions
- **Button**: Multiple variants (contained, outlined, text) and colors
- **Alert**: Success, error, warning, info states with dismissible option
- **Typography**: Complete typography scale (h1-h6, body1-2, caption)
- **Paper**: Elevation system for depth

### ��️ Advanced Utilities

- **Portal**: Render content outside the DOM hierarchy (perfect for modals)
- **FocusTrap**: Keep keyboard focus within a component (accessibility)
- **ClickAwayListener**: Detect clicks outside an element (dropdowns, menus)

### 📐 Layout System

- **Grid**: 12-column responsive grid system
- **Stack**: Flexbox-based layout with spacing
- **Container**: Content width management

### ♿ Accessibility Features

- Full keyboard navigation support
- Focus management with FocusTrap
- ARIA labels and roles
- Screen reader friendly
- Proper semantic HTML

### 🎯 Interactive Examples

1. **Modal Dialog**: Click "Open Modal" to see Portal + FocusTrap in action
   - Try pressing Tab to see focus cycling
   - Press Escape or click outside to close
   - Focus returns to trigger button

2. **Dropdown Menu**: Click "Toggle Dropdown" to see ClickAwayListener
   - Click outside the dropdown to close it
   - Demonstrates click-away detection

3. **Dismissible Alert**: Click the X button on the info alert
   - Shows interactive alerts with close functionality

## Component Features

### Icon Component

```tsx
import { Icon } from 'preact-components-system';

// Basic usage
<Icon name="Home" />

// With size and color
<Icon name="Star" size="large" color="#FFD700" />

// Accessible
<Icon name="Settings" aria-label="Open settings" />

// Decorative
<Icon name="Heart" decorative />
```

### Portal Component

```tsx
import { Portal } from 'preact-components-system';

// Render to document.body
<Portal>
  <div>This renders at document.body</div>
</Portal>

// Custom container
<Portal container={customElement}>
  <div>This renders in customElement</div>
</Portal>
```

### FocusTrap Component

```tsx
import { FocusTrap } from 'preact-components-system';

<FocusTrap active={isOpen} autoFocus restoreFocus>
  <Dialog>
    <button>Focus will cycle here</button>
    <button>And here</button>
  </Dialog>
</FocusTrap>
```

### ClickAwayListener Component

```tsx
import { ClickAwayListener } from 'preact-components-system';

<ClickAwayListener onClickAway={() => setOpen(false)}>
  <Menu>Menu items...</Menu>
</ClickAwayListener>
```

## Design Highlights

- **Modern Gradient Header**: Purple gradient with centered content
- **Card-Based Layout**: Clean, organized presentation
- **Responsive Grid**: Adapts to different screen sizes
- **Consistent Spacing**: Stack component for uniform spacing
- **Visual Hierarchy**: Typography scale and elevation system

## Testing

All components are fully tested:

- 77 tests passing
- Coverage includes accessibility features
- Portal, Icon, and core components tested

## Build Information

- **Bundle Size**: 1,023 kB (includes lucide-preact icons)
- **CSS Size**: 23.52 kB
- **TypeScript**: Full type safety
- **Tree-shaking**: Supported for optimal production builds

## Next Steps

Future enhancements planned:

- Form components with validation
- Additional transition components
- More icon variants
- Performance optimizations (bundle size reduction)
