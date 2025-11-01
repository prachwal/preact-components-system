import type { JSX, ComponentChildren } from 'preact';
import { useEffect } from 'preact/hooks';
import clsx from 'clsx';
import { Portal } from '../utils/Portal';
import { FocusTrap } from '../utils/FocusTrap';
import { Backdrop } from './Backdrop';
import './Dialog.scss';

type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

export interface DialogProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onClose'> {
  /**
   * If true, the dialog is visible
   */
  open: boolean;
  /**
   * Callback when the dialog should close
   */
  onClose: () => void;
  /**
   * Dialog content
   */
  children: ComponentChildren;
  /**
   * Size of the dialog
   */
  size?: DialogSize;
  /**
   * If true, clicking the backdrop will not close the dialog
   */
  disableBackdropClick?: boolean;
  /**
   * If true, pressing the Escape key will not close the dialog
   */
  disableEscapeKeyDown?: boolean;
  /**
   * If true, the backdrop will be invisible
   */
  invisibleBackdrop?: boolean;
  /**
   * CSS class name
   */
  className?: string;
}

/**
 * Dialog/Modal component for displaying content in a focused overlay
 * Supports various sizes and accessibility features
 * 
 * @example
 * ```tsx
 * <Dialog open={isOpen} onClose={() => setIsOpen(false)} size="md">
 *   <DialogTitle>Confirm Action</DialogTitle>
 *   <DialogContent>Are you sure?</DialogContent>
 *   <DialogActions>
 *     <Button onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button onClick={handleConfirm}>Confirm</Button>
 *   </DialogActions>
 * </Dialog>
 * ```
 */
export const Dialog = ({
  open,
  onClose,
  children,
  size = 'md',
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  invisibleBackdrop = false,
  className,
  ...rest
}: DialogProps) => {
  // Handle Escape key
  useEffect(() => {
    if (!open || disableEscapeKeyDown) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, disableEscapeKeyDown]);

  if (!open) {
    return null;
  }

  const classes = clsx(
    'dialog',
    `dialog-size-${size}`,
    className
  );

  const handleBackdropClick = () => {
    if (!disableBackdropClick) {
      onClose();
    }
  };

  return (
    <Portal>
      <Backdrop 
        open={open} 
        onClick={handleBackdropClick} 
        invisible={invisibleBackdrop}
        zIndex={1300}
      />
      <div className="dialog-container" style={{ zIndex: 1300 }}>
        <FocusTrap active={open} autoFocus restoreFocus>
          <div
            className={classes}
            role="dialog"
            aria-modal="true"
            {...rest}
          >
            {children}
          </div>
        </FocusTrap>
      </div>
    </Portal>
  );
};

export interface DialogTitleProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: ComponentChildren;
  className?: string;
}

/**
 * Dialog title component
 */
export const DialogTitle = ({ children, className, ...rest }: DialogTitleProps) => {
  const classes = clsx('dialog-title', className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export interface DialogContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: ComponentChildren;
  className?: string;
}

/**
 * Dialog content component
 */
export const DialogContent = ({ children, className, ...rest }: DialogContentProps) => {
  const classes = clsx('dialog-content', className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export interface DialogActionsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: ComponentChildren;
  className?: string;
}

/**
 * Dialog actions component (for buttons)
 */
export const DialogActions = ({ children, className, ...rest }: DialogActionsProps) => {
  const classes = clsx('dialog-actions', className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
