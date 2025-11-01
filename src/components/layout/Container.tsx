import { h } from 'preact';
import type { ComponentChildren } from 'preact';
import clsx from 'clsx';
import './Container.scss';

type MaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

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
  style?: h.JSX.CSSProperties;
  /**
   * Children elements
   */
  children?: ComponentChildren;
  /**
   * Component to render as
   */
  component?: keyof h.JSX.IntrinsicElements;
}

export const Container = ({
  maxWidth = 'lg',
  fixed = false,
  disableGutters = false,
  className,
  style,
  children,
  component: Component = 'div',
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
    <Component className={classes} style={style}>
      {children}
    </Component>
  );
};
