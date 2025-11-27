import clsx from 'clsx';
import { h } from 'preact';
import type { ComponentChildren, JSX } from 'preact';
// import { useTheme } from '../../contexts/ThemeContext';
import './Paper.scss';

export interface PaperProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * Shadow depth (elevation)
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;
  /**
   * Paper variant
   */
  variant?: 'elevation' | 'outlined';
  /**
   * If true, rounded corners will be disabled
   */
  square?: boolean;
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
  style?: h.JSX.CSSProperties;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

export const Paper = ({
  elevation = 1,
  variant = 'elevation',
  square = false,
  component: Component = 'div',
  className,
  style = {},
  children,
  ...rest
}: PaperProps) => {
  const classes = clsx(
    'paper',
    `paper-variant-${variant}`,
    {
      [`paper-elevation-${elevation}`]: variant === 'elevation',
      'paper-square': square,
    },
    className
  );

  const paperStyle: h.JSX.CSSProperties = {
    ...style,
  };

  return (
    <Component className={classes} style={paperStyle} {...rest as any}>
      {children}
    </Component>
  );
};
