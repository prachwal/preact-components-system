# Box Component

The Box component is a flexible container component that provides responsive spacing, styling, and layout utilities. It serves as a fundamental building block for creating consistent layouts throughout your application.

## Features

- **Responsive Spacing**: Apply different spacing values for different breakpoints
- **Flexible Styling**: Supports custom CSS classes, inline styles, and semantic HTML elements
- **Layout Control**: Control display, flex properties, and positioning
- **Theme Integration**: Uses theme spacing and responsive utilities

## Basic Usage

```tsx
import { Box } from 'preact-components-system';

// Simple container
<Box>Content</Box>

// With padding
<Box padding={2}>Padded content</Box>

// Custom element
<Box as="article" padding={3}>
  <h2>Article Title</h2>
  <p>Article content...</p>
</Box>
```

## Responsive Spacing

The Box component supports responsive spacing using the theme's breakpoint system:

```tsx
// Different padding for different screen sizes
<Box padding={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
  Responsive padding
</Box>

// Responsive margins
<Box margin={{ xs: 0, md: 2 }} padding={2}>
  Centered on medium screens and up
</Box>
```

## Layout Examples

```tsx
// Flexbox container
<Box display="flex" gap={2} alignItems="center">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Box>

// Grid layout
<Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
  <Box padding={2} border="1px solid #ccc">Grid Item 1</Box>
  <Box padding={2} border="1px solid #ccc">Grid Item 2</Box>
  <Box padding={2} border="1px solid #ccc">Grid Item 3</Box>
</Box>
```

## Custom Components

Box can render as different HTML elements or custom components:

```tsx
// Semantic HTML
<Box as='section' padding={4}>
  <h2>Section Title</h2>
  <p>Section content...</p>
</Box>;

// Custom component
const CustomCard = ({ children, ...props }) => (
  <Box
    as='article'
    padding={3}
    borderRadius={4}
    boxShadow='0 2px 4px rgba(0,0,0,0.1)'
    {...props}
  >
    {children}
  </Box>
);
```

## Props

| Prop                             | Type                                | Default | Description                      |
| -------------------------------- | ----------------------------------- | ------- | -------------------------------- |
| `children`                       | `ComponentChildren`                 | -       | Content to render inside the box |
| `as`                             | `keyof JSX.IntrinsicElements`       | `'div'` | HTML element to render as        |
| `className`                      | `string`                            | -       | Additional CSS classes           |
| `style`                          | `JSX.CSSProperties`                 | -       | Inline styles                    |
| `padding`                        | `ResponsiveValue<number \| string>` | -       | Padding spacing                  |
| `margin`                         | `ResponsiveValue<number \| string>` | -       | Margin spacing                   |
| `display`                        | `string`                            | -       | CSS display property             |
| `flexDirection`                  | `ResponsiveValue<string>`           | -       | Flex direction                   |
| `alignItems`                     | `string`                            | -       | Flex align-items                 |
| `justifyContent`                 | `string`                            | -       | Flex justify-content             |
| `gap`                            | `ResponsiveValue<number \| string>` | -       | Gap between flex items           |
| `width`                          | `ResponsiveValue<string \| number>` | -       | Width property                   |
| `height`                         | `ResponsiveValue<string \| number>` | -       | Height property                  |
| `position`                       | `string`                            | -       | CSS position property            |
| `top`, `right`, `bottom`, `left` | `ResponsiveValue<string \| number>` | -       | Position offsets                 |
| `borderRadius`                   | `ResponsiveValue<string \| number>` | -       | Border radius                    |
| `boxShadow`                      | `string`                            | -       | Box shadow                       |
| `backgroundColor`                | `string`                            | -       | Background color                 |
| `color`                          | `string`                            | -       | Text color                       |

## Responsive Values

All spacing and sizing props accept responsive values:

```tsx
type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// Examples
padding={2}                    // Same padding on all screens
padding={{ xs: 1, md: 2 }}     // 1 on mobile, 2 on medium and up
margin={{ xs: 0, lg: 4 }}      // 0 on mobile/tablet, 4 on large and up
```

## Accessibility

- Box renders semantic HTML elements when using the `as` prop
- Maintains proper content flow and reading order
- Supports all standard accessibility attributes

## Performance

- Uses responsive hooks for efficient breakpoint detection
- Minimal re-renders through optimized responsive value resolution
- CSS-in-JS approach with theme integration
