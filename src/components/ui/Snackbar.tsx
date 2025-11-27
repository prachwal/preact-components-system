import type { JSX, ComponentChildren } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import clsx from 'clsx';
import { Portal } from '../utils/Portal';

type SnackbarPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the snackbar is visible
   */
  open: boolean;
  /**
   * Callback when the snackbar should close
   */
  onClose?: () => void;
  /**
   * Message to display
   */
  message: ComponentChildren;
  /**
   * Duration in milliseconds before auto-hide (0 to disable)
   */
  autoHideDuration?: number;
  /**
   * Position of the snackbar
   */
  position?: SnackbarPosition;
  /**
   * Severity of the snackbar (affects styling)
   */
  severity?: SnackbarSeverity;
  /**
   * Action button/element
   */
  action?: ComponentChildren;
  /**
   * CSS class name
   */
  className?: string;
}

/**
 * Snackbar/Toast component for brief notifications
 * 
 * @example
 * ```tsx
 * <Snackbar 
 *   open={isOpen} 
 *   message="Item saved successfully" 
 *   severity="success"
 *   autoHideDuration={3000}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */
export const Snackbar = ({
  open,
  onClose,
  message,
  autoHideDuration = 6000,
  position = 'bottom-center',
  severity,
  action,
  className,
  ...rest
}: SnackbarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      
      if (autoHideDuration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoHideDuration);
        
        return () => clearTimeout(timer);
      }
    } else {
      setVisible(false);
    }
  }, [open, autoHideDuration]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!visible) {
    return null;
  }

  const classes = clsx(
    'snackbar',
    `snackbar-position-${position}`,
    severity && `snackbar-severity-${severity}`,
    className
  );

  return (
    <Portal>
      <div className={classes} {...rest}>
        <div className="snackbar-content">
          <div className="snackbar-message">{message}</div>
          {action && <div className="snackbar-action">{action}</div>}
        </div>
      </div>
    </Portal>
  );
};
