import clsx from 'clsx';
import type { ComponentChildren, JSX } from 'preact';

import { useResponsiveBatch } from '../../hooks/useResponsiveBatch';
import { GRID_CONSTANTS } from '../../theme/constants';
import type { ResponsiveValue } from '../../theme/types';

export type GridSize = number | 'auto' | boolean;
export type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type JustifyContent =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type Wrap = 'wrap' | 'nowrap' | 'wrap-reverse';

export interface GridProps {
  /**
   * If true, the component will act as a container
   */
  container?: boolean;
  /**
   * If true, the component will act as an item
   */
  item?: boolean;
  /**
   * Defines spacing between items. Values from 0 to 10
   */
  spacing?: ResponsiveValue<number>;
  /**
   * Number of columns in the grid (default: 12)
   */
  columns?: ResponsiveValue<number>;
  /**
   * Defines column width for xs breakpoint
   */
  xs?: GridSize;
  /**
   * Defines column width for sm breakpoint
   */
  sm?: GridSize;
  /**
   * Defines column width for md breakpoint
   */
  md?: GridSize;
  /**
   * Defines column width for lg breakpoint
   */
  lg?: GridSize;
  /**
   * Defines column width for xl breakpoint
   */
  xl?: GridSize;
  /**
   * Defines flex-direction style property
   */
  direction?: ResponsiveValue<Direction>;
  /**
   * Defines flex-wrap style property
   */
  wrap?: Wrap;
  /**
   * Defines align-items style property
   */
  alignItems?: AlignItems;
  /**
   * Defines justify-content style property
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
}

/**
 * Grid component - flexible CSS grid system
 *
 * Implements a responsive grid system similar to Material-UI's Grid component.
 * Can be used as a container to create grid layouts or as an item within a grid.
 * Supports responsive breakpoints (xs, sm, md, lg, xl) and flexible spacing.
 *
 * @example
 * ```tsx
 * // Basic 12-column grid container
 * <Grid container spacing={2}>
 *   <Grid item xs={6}>Half width</Grid>
 *   <Grid item xs={6}>Half width</Grid>
 * </Grid>
 *
 * // Responsive grid
 * <Grid container>
 *   <Grid item xs={12} sm={6} md={4}>Responsive item</Grid>
 *   <Grid item xs={12} sm={6} md={4}>Responsive item</Grid>
 *   <Grid item xs={12} sm={6} md={4}>Responsive item</Grid>
 * </Grid>
 *
 * // Auto-sizing columns
 * <Grid container>
 *   <Grid item xs>Auto-sized</Grid>
 *   <Grid item xs={6}>Fixed width</Grid>
 * </Grid>
 * ```
 */
/**
 * Helper function to generate grid size classes for a specific breakpoint
 */
const getGridSizeClasses = (breakpoint: string, size?: GridSize) => {
  if (size === undefined || size === null) return {};

  return {
    [`grid-${breakpoint}-auto`]: size === 'auto',
    [`grid-${breakpoint}-true`]: size === true,
    [`grid-${breakpoint}-${size}`]: typeof size === 'number',
  };
};

/**
 * Helper function to generate container-specific classes
 */
const getContainerClasses = (
  container: boolean,
  resolvedSpacing: number,
  resolvedDirection: Direction,
  wrap: Wrap,
  alignItems?: AlignItems,
  justifyContent?: JustifyContent
) => {
  if (!container) return {};

  return {
    'grid-container': true,
    [`grid-spacing-${resolvedSpacing}`]: resolvedSpacing > 0,
    [`grid-direction-${resolvedDirection}`]: resolvedDirection !== 'row',
    [`grid-wrap-${wrap}`]: wrap !== 'wrap',
    [`grid-align-${alignItems ?? ''}`]: Boolean(alignItems),
    [`grid-justify-${justifyContent ?? ''}`]: Boolean(justifyContent),
  };
};

/**
 * Helper function to generate all grid item size classes
 */
const getGridItemClasses = (
  xs?: GridSize,
  sm?: GridSize,
  md?: GridSize,
  lg?: GridSize,
  xl?: GridSize
) => {
  return {
    ...getGridSizeClasses('xs', xs),
    ...getGridSizeClasses('sm', sm),
    ...getGridSizeClasses('md', md),
    ...getGridSizeClasses('lg', lg),
    ...getGridSizeClasses('xl', xl),
  };
};

export const Grid = ({
  container = false,
  item = false,
  spacing = GRID_CONSTANTS.DEFAULT_SPACING,
  columns = GRID_CONSTANTS.DEFAULT_COLUMNS,
  xs,
  sm,
  md,
  lg,
  xl,
  direction = 'row',
  wrap = 'wrap',
  alignItems,
  justifyContent,
  className,
  style = {},
  children,
  component: Component = 'div',
}: GridProps) => {
  const {
    spacing: resolvedSpacing,
    columns: resolvedColumns,
    direction: resolvedDirection,
  } = useResponsiveBatch({
    spacing,
    columns,
    direction,
  });

  const classes = clsx(
    'grid',
    {
      'grid-item': item,
      ...getContainerClasses(
        container,
        resolvedSpacing,
        resolvedDirection,
        wrap,
        alignItems,
        justifyContent
      ),
      ...getGridItemClasses(xs, sm, md, lg, xl),
    },
    className
  );

  const gridStyle: JSX.CSSProperties = {
    ...style,
    ...(container && ({ '--grid-columns': resolvedColumns.toString() } as JSX.CSSProperties)),
  };

  return (
    <Component className={classes} style={gridStyle}>
      {children}
    </Component>
  );
};
