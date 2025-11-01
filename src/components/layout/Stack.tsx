import type { ComponentChildren, JSX } from 'preact';
import clsx from 'clsx';
import type { ResponsiveValue } from '../../theme/types';
import { useResponsive } from '../../hooks/useResponsive';
import './Stack.scss';

type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';

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
}

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
}: StackProps) => {
  const resolvedSpacing = useResponsive(spacing);
  const resolvedDirection = useResponsive(direction);

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
  const childArray = Array.isArray(children) ? children : children ? [children] : [];
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

  return (
    <Component className={classes} style={style}>
      {childrenWithDivider}
    </Component>
  );
};
