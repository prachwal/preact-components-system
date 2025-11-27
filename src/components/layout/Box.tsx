import clsx from 'clsx';
import type { ComponentChildren, JSX } from 'preact';

import { useResponsiveStyles } from '../../hooks/useResponsiveStyles';
import type { ResponsiveValue } from '../../theme/types';

/**
 * Box component - flexible container with responsive spacing
 *
 * Provides a flexible container component with responsive padding, margin,
 * and display properties. Supports custom components and styling.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Box p={2}>Content</Box>
 *
 * // Responsive spacing
 * <Box p={{ xs: 1, md: 3 }}>Responsive content</Box>
 *
 * // Custom component
 * <Box component="article" className="article-box">
 *   Article content
 * </Box>
 * ```
 */
export interface BoxProps {
  /**
   * Component to render as
   */
  component?: keyof JSX.IntrinsicElements;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: JSX.CSSProperties;
  /**
   * Padding (multiplier of spacing unit, default 8px)
   */
  p?: ResponsiveValue<number>;
  /**
   * Padding top
   */
  pt?: ResponsiveValue<number>;
  /**
   * Padding right
   */
  pr?: ResponsiveValue<number>;
  /**
   * Padding bottom
   */
  pb?: ResponsiveValue<number>;
  /**
   * Padding left
   */
  pl?: ResponsiveValue<number>;
  /**
   * Padding horizontal (left & right)
   */
  px?: ResponsiveValue<number>;
  /**
   * Padding vertical (top & bottom)
   */
  py?: ResponsiveValue<number>;
  /**
   * Margin (multiplier of spacing unit, default 8px)
   */
  m?: ResponsiveValue<number>;
  /**
   * Margin top
   */
  mt?: ResponsiveValue<number>;
  /**
   * Margin right
   */
  mr?: ResponsiveValue<number>;
  /**
   * Margin bottom
   */
  mb?: ResponsiveValue<number>;
  /**
   * Margin left
   */
  ml?: ResponsiveValue<number>;
  /**
   * Margin horizontal (left & right)
   */
  mx?: ResponsiveValue<number>;
  /**
   * Margin vertical (top & bottom)
   */
  my?: ResponsiveValue<number>;
  /**
   * Display property
   */
  display?: ResponsiveValue<string>;
  /**
   * Children elements
   */
  children?: ComponentChildren;
  /**
   * Additional HTML attributes
   */
  [key: string]: unknown;
}

export const Box = ({
  component: Component = 'div',
  className,
  style = {},
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  display,
  children,
  ...rest
}: BoxProps) => {
  // Single hook call instead of 13+
  const responsiveStyles = useResponsiveStyles({
    p, pt, pr, pb, pl, px, py,
    m, mt, mr, mb, ml, mx, my,
    display
  });

  const boxStyle: JSX.CSSProperties = {
    ...style,
    ...responsiveStyles, // Apply all resolved styles at once
  };

  return (
    <Component className={clsx('box', className)} style={boxStyle} {...rest}>
      {children}
    </Component>
  );
};
