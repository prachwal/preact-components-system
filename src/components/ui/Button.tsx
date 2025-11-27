import clsx from 'clsx';
import type { ComponentChildren, JSX } from 'preact';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ButtonSize = 'small' | 'medium' | 'large';

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
  /**
   * ARIA label for screen readers
   */
  'aria-label'?: string;
  /**
   * ARIA labelledby reference
   */
  'aria-labelledby'?: string;
  /**
   * ARIA describedby reference
   */
  'aria-describedby'?: string;
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
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: ButtonProps) => {
  // Extract class computation to reduce complexity
  const getButtonClasses = () => clsx(
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

  // Extract content rendering to reduce complexity
  const renderButtonContent = () => (
    <>
      {loading && (
        <span className="button-loader" aria-hidden="true">
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
      {!loading && startIcon != null && <span className="button-start-icon">{startIcon}</span>}
      <span className={clsx('button-label', { 'button-label-hidden': loading })}>
        {children}
      </span>
      {!loading && endIcon != null && <span className="button-end-icon">{endIcon}</span>}
    </>
  );

  return (
    <button
      className={getButtonClasses()}
      disabled={disabled || loading}
      type={type}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-disabled={loading}
      {...rest}
    >
      {renderButtonContent()}
    </button>
  );
};
