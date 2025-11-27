import type { ComponentChildren, JSX } from 'preact';
import clsx from 'clsx';
import type { ResponsiveValue } from '../../theme/types';
import { useResponsive } from '../../hooks/useResponsive';

type GridSize = number | 'auto' | boolean;
type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type Wrap = 'wrap' | 'nowrap' | 'wrap-reverse';

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

export const Grid = ({
  container = false,
  item = false,
  spacing = 0,
  columns = 12,
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
  const resolvedSpacing = useResponsive(spacing);
  const resolvedColumns = useResponsive(columns);
  const resolvedDirection = useResponsive(direction);

  const classes = clsx(
    'grid',
    {
      'grid-container': container,
      'grid-item': item,
      [`grid-spacing-${resolvedSpacing}`]: container && resolvedSpacing > 0,
      [`grid-direction-${resolvedDirection}`]: container && resolvedDirection !== 'row',
      [`grid-wrap-${wrap}`]: container && wrap !== 'wrap',
      [`grid-align-${alignItems}`]: container && alignItems,
      [`grid-justify-${justifyContent}`]: container && justifyContent,
      // Grid item sizes
      'grid-xs-auto': xs === 'auto',
      'grid-xs-true': xs === true,
      [`grid-xs-${xs}`]: xs && typeof xs === 'number',
      'grid-sm-auto': sm === 'auto',
      'grid-sm-true': sm === true,
      [`grid-sm-${sm}`]: sm && typeof sm === 'number',
      'grid-md-auto': md === 'auto',
      'grid-md-true': md === true,
      [`grid-md-${md}`]: md && typeof md === 'number',
      'grid-lg-auto': lg === 'auto',
      'grid-lg-true': lg === true,
      [`grid-lg-${lg}`]: lg && typeof lg === 'number',
      'grid-xl-auto': xl === 'auto',
      'grid-xl-true': xl === true,
      [`grid-xl-${xl}`]: xl && typeof xl === 'number',
    },
    className
  );

  const gridStyle = {
    ...style,
    ...(container && { '--grid-columns': resolvedColumns.toString() } as any),
  };

  return (
    <Component className={classes} style={gridStyle}>
      {children}
    </Component>
  );
};
