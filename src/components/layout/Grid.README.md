# Grid Component

The Grid component implements a flexible CSS grid system similar to Material-UI's Grid component. It provides a responsive layout system with configurable columns, spacing, and alignment options.

## Features

- **12-Column Grid**: Standard 12-column responsive grid system
- **Flexible Containers**: Can act as both container and item
- **Responsive Breakpoints**: Supports xs, sm, md, lg, xl breakpoints
- **Auto-sizing**: Support for auto-sized and full-width columns
- **CSS Grid**: Uses modern CSS Grid for layout

## Basic Usage

```tsx
import { Grid } from 'preact-components-system';

// Basic grid container
<Grid container spacing={2}>
  <Grid item xs={6}>Half width</Grid>
  <Grid item xs={6}>Half width</Grid>
</Grid>

// Simple 3-column layout
<Grid container spacing={3}>
  <Grid item xs={4}>Column 1</Grid>
  <Grid item xs={4}>Column 2</Grid>
  <Grid item xs={4}>Column 3</Grid>
</Grid>
```

## Responsive Grid

The Grid component supports responsive breakpoints for different screen sizes:

```tsx
// Responsive columns
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    Responsive column
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    Responsive column
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    Responsive column
  </Grid>
</Grid>

// Mobile-first approach
<Grid container>
  <Grid item xs={12} md={8}>Main content</Grid>
  <Grid item xs={12} md={4}>Sidebar</Grid>
</Grid>
```

## Grid Items

Grid items can span multiple columns and have different sizes at different breakpoints:

```tsx
<Grid container spacing={2}>
  {/* Full width on mobile, half on tablet+ */}
  <Grid item xs={12} sm={6}>Item 1</Grid>

  {/* Auto-sized based on content */}
  <Grid item xs>Auto-sized item</Grid>

  {/* Fixed 6 columns on all sizes */}
  <Grid item xs={6}>Fixed width</Grid>

  {/* Span multiple columns */}
  <Grid item xs={8}>8 columns</Grid>
  <Grid item xs={4}>4 columns</Grid>
</Grid>
```

## Spacing and Layout

Control spacing between grid items and alignment:

```tsx
// Different spacing values
<Grid container spacing={1}>  {/* 8px gaps */}
<Grid container spacing={2}>  {/* 16px gaps */}
<Grid container spacing={3}>  {/* 24px gaps */}

// Flex alignment
<Grid container justifyContent="center" alignItems="center">
  <Grid item>Centered content</Grid>
</Grid>

// Direction control
<Grid container direction="column" spacing={2}>
  <Grid item>Vertical item 1</Grid>
  <Grid item>Vertical item 2</Grid>
</Grid>
```

## Advanced Layouts

```tsx
// Complex responsive layout
<Grid container spacing={3}>
  <Grid item xs={12} lg={8}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>Content 1</Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>Content 2</Card>
      </Grid>
    </Grid>
  </Grid>
  <Grid item xs={12} lg={4}>
    <Sidebar />
  </Grid>
</Grid>

// Masonry-style layout
<Grid container spacing={2}>
  {items.map((item, index) => (
    <Grid key={index} item xs={12} sm={6} lg={4}>
      <Card style={{ height: item.height }}>
        {item.content}
      </Card>
    </Grid>
  ))}
</Grid>
```

## Props

### Container Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `container` | `boolean` | `false` | Makes this grid a container |
| `spacing` | `ResponsiveValue<number>` | `0` | Spacing between items (0-10) |
| `columns` | `ResponsiveValue<number>` | `12` | Number of columns in grid |
| `direction` | `ResponsiveValue<Direction>` | `'row'` | Flex direction |
| `wrap` | `Wrap` | `'wrap'` | Flex wrap behavior |
| `alignItems` | `AlignItems` | - | Vertical alignment |
| `justifyContent` | `JustifyContent` | - | Horizontal alignment |

### Item Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `item` | `boolean` | `false` | Makes this grid an item |
| `xs`, `sm`, `md`, `lg`, `xl` | `GridSize` | - | Column span at breakpoint |
| `component` | `keyof JSX.IntrinsicElements` | `'div'` | HTML element to render |

### Common Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `style` | `JSX.CSSProperties` | - | Inline styles |
| `children` | `ComponentChildren` | - | Child elements |

## GridSize Values

- `number`: Column span (1-12)
- `boolean`: Full width if `true`
- `'auto'`: Size based on content

## Responsive Breakpoints

- `xs`: Extra small (0px+)
- `sm`: Small (600px+)
- `md`: Medium (900px+)
- `lg`: Large (1200px+)
- `xl`: Extra large (1536px+)

## CSS Grid vs Flexbox

The Grid component uses CSS Grid internally for layout, providing:

- Precise column spanning
- Automatic row creation
- Better performance for complex grids
- Consistent spacing and alignment

## Accessibility

- Maintains proper DOM order
- Supports semantic HTML elements
- Keyboard navigation friendly
- Screen reader compatible

## Performance

- CSS Grid for efficient rendering
- Responsive hooks for breakpoint detection
- Minimal re-renders with memoized calculations</content>
<parameter name="filePath">/home/prachwal/src/preact/preact-components-system/src/components/layout/Grid.README.md
