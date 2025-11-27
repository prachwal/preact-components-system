import type { ComponentChildren, JSX } from 'preact';
import clsx from 'clsx';

type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'size'> {
  /**
   * Button variant
   */
  variant?: ButtonVariant;
  /**
   * Button color
   */
  color?: ButtonColor;
  /**
   * Button size
   */
  size?: ButtonSize;
  /**
   * If true, the button is disabled
   */
  disabled?: boolean;
  /**
   * If true, the button takes full width of container
   */
  fullWidth?: boolean;
  /**
   * Element placed before the children
   */
  startIcon?: ComponentChildren;
  /**
   * Element placed after the children
   */
  endIcon?: ComponentChildren;
  /**
   * If true, show loading state
   */
  loading?: boolean;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

export const Button = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  loading = false,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) => {
  const classes = clsx(
    'button',
    `button-variant-${variant}`,
    `button-color-${color}`,
    `button-size-${size}`,
    {
      'button-disabled': disabled || loading,
      'button-full-width': fullWidth,
      'button-loading': loading,
    },
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      type={type}
      {...rest}
    >
      {loading && (
        <span className="button-loader">
          <svg className="button-spinner" viewBox="0 0 24 24">
            <circle
              className="button-spinner-circle"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="3"
            />
          </svg>
        </span>
      )}
      {!loading && startIcon && <span className="button-start-icon">{startIcon}</span>}
      <span className={clsx('button-label', { 'button-label-hidden': loading })}>
        {children}
      </span>
      {!loading && endIcon && <span className="button-end-icon">{endIcon}</span>}
    </button>
  );
};
