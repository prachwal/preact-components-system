import clsx from 'clsx';
import type { ComponentChildren, JSX } from 'preact';
import './Container.scss';

export type MaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

export interface ContainerProps {
  /**
   * Determine the max-width of the container
   */
  maxWidth?: MaxWidth;
  /**
   * If true, the container will have a fixed width
   */
  fixed?: boolean;
  /**
   * If true, the left and right padding is removed
   */
  disableGutters?: boolean;
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
   * Semantic role for the container
   */
  role?: 'main' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'nav';
  /**
   * ARIA label for screen readers
   */
  'aria-label'?: string;
  /**
   * ARIA labelledby reference
   */
  'aria-labelledby'?: string;
}

/**
 * Container component - responsive layout container
 *
 * Provides a responsive container with configurable max-width and gutters.
 * Centers content horizontally and applies consistent spacing.
 *
 * @example
 * ```tsx
 * // Basic container
 * <Container>Content</Container>
 *
 * // Fixed width container
 * <Container fixed maxWidth="md">Fixed content</Container>
 *
 * // Container without gutters
 * <Container disableGutters>Full-width content</Container>
 * ```
 */
export const Container = ({
  maxWidth = 'lg',
  fixed = false,
  disableGutters = false,
  className,
  style,
  children,
  component: Component = 'div',
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: ContainerProps) => {
  const classes = clsx(
    'container',
    {
      'container-fixed': fixed,
      'container-disable-gutters': disableGutters,
      [`container-max-width-${maxWidth}`]: maxWidth !== false,
    },
    className
  );

  return (
    <Component
      className={classes}
      style={style}
      role={role as any}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </Component>
  );
};
