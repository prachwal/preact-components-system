import clsx from 'clsx';
import type { ComponentChildren, JSX } from 'preact';

import { useResponsiveBatch } from '../../hooks/useResponsiveBatch';
import type { ResponsiveValue } from '../../theme/types';

export type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

export interface StackProps {
  /**
   * Defines the flex-direction style property
   */
  direction?: ResponsiveValue<Direction>;
  /**
   * Defines the spacing between immediate children
   */
  spacing?: ResponsiveValue<number>;
  /**
   * If provided, will add a divider between children
   */
  divider?: ComponentChildren;
  /**
   * Defines the align-items style property
   */
  alignItems?: AlignItems;
  /**
   * Defines the justify-content style property
   */
  justifyContent?: JustifyContent;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: JSX.CSSProperties;
  /**
   * Children elements
   */
  children?: ComponentChildren;
  /**
   * Component to render as
   */
  component?: keyof JSX.IntrinsicElements;
  /**
   * ARIA role for the stack
   * @default 'group'
   */
  role?: string;
  /**
   * ARIA label for screen readers
   */
  'aria-label'?: string;
  /**
   * Whether this is a landmark element
   */
  landmark?: boolean;
}

/**
 * Stack component - flexible flexbox layout container
 *
 * Arranges children in a vertical or horizontal stack with configurable spacing.
 * Supports optional dividers between children and responsive direction changes.
 * Uses CSS flexbox for layout with automatic spacing calculations.
 *
 * @example
 * ```tsx
 * // Vertical stack with spacing
 * <Stack spacing={2}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 *
 * // Horizontal stack with divider
 * <Stack direction="row" spacing={1} divider={<span>•</span>}>
 *   <span>Tag 1</span>
 *   <span>Tag 2</span>
 *   <span>Tag 3</span>
 * </Stack>
 *
 * // Responsive direction
 * <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
 *   <div>Responsive content</div>
 *   <div>Responsive content</div>
 * </Stack>
 * ```
 */
export const Stack = ({
  direction = 'column',
  spacing = 0,
  divider,
  alignItems,
  justifyContent,
  className,
  style,
  children,
  component: Component = 'div',
  role = 'group',
  'aria-label': ariaLabel,
  landmark = false,
}: StackProps) => {
  const { spacing: resolvedSpacing, direction: resolvedDirection } = useResponsiveBatch({
    spacing,
    direction,
  });

  const classes = clsx(
    'stack',
    {
      [`stack-direction-${resolvedDirection}`]: resolvedDirection !== 'column',
      [`stack-spacing-${resolvedSpacing}`]: resolvedSpacing > 0,
      [`stack-align-${alignItems}`]: alignItems,
      [`stack-justify-${justifyContent}`]: justifyContent,
    },
    className
  );

  // Convert children to array and filter out null/undefined
  const childArray = Array.isArray(children) ? children : (children !== undefined && children !== null) ? [children] : [];
  const validChildren = childArray.filter((child) => child != null);

  // If divider is provided, insert it between children
  const childrenWithDivider = divider
    ? validChildren.reduce<ComponentChildren[]>((acc, child, index) => {
        acc.push(child);
        if (index < validChildren.length - 1) {
          acc.push(
            <div key={`divider-${index}`} className="stack-divider">
              {divider}
            </div>
          );
        }
        return acc;
      }, [])
    : validChildren;

  const semanticRole = landmark ? undefined : role;

  return (
    <Component
      className={classes}
      style={style}
      role={semanticRole as any}
      aria-label={ariaLabel}
    >
      {childrenWithDivider}
    </Component>
  );
};
