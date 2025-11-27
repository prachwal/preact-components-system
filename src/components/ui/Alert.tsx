import clsx from 'clsx';
import type { ComponentChildren, JSX } from 'preact';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';
export type AlertVariant = 'standard' | 'filled' | 'outlined';

export interface AlertProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert severity
   */
  severity?: AlertSeverity;
  /**
   * Alert variant
   */
  variant?: AlertVariant;
  /**
   * Callback fired when the close button is clicked
   */
  onClose?: () => void;
  /**
   * Override the default icon. Set to false to remove icon
   */
  icon?: ComponentChildren | false;
  /**
   * Action element (usually a button)
   */
  action?: ComponentChildren;
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
}

const defaultIcons: Record<AlertSeverity, ComponentChildren> = {
  error: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
  warning: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
  info: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  success: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
};

export const Alert = ({
  severity = 'info',
  variant = 'standard',
  onClose,
  icon,
  action,
  className,
  style,
  children,
  ...rest
}: AlertProps) => {
  const classes = clsx(
    'alert',
    `alert-severity-${severity}`,
    `alert-variant-${variant}`,
    className
  );

  const displayIcon = icon === false ? null : icon ?? defaultIcons[severity];

  return (
    <div className={classes} style={style} role="alert" {...rest}>
      {displayIcon && <div className="alert-icon">{displayIcon}</div>}
      <div className="alert-message">{children}</div>
      {action && <div className="alert-action">{action}</div>}
      {onClose && (
        <button
          type="button"
          className="alert-close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export interface AlertTitleProps {
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

export const AlertTitle = ({ className, children }: AlertTitleProps) => {
  const classes = clsx('alert-title', className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
};
