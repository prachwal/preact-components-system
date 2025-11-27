import type { JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import clsx from 'clsx';
import { Portal } from '../utils/Portal';

export interface BackdropProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * If true, the backdrop is visible
   */
  open: boolean;
  /**
   * Callback when the backdrop is clicked
   */
  onClick?: () => void;
  /**
   * If true, the backdrop will be invisible
   */
  invisible?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Z-index of the backdrop
   */
  zIndex?: number;
}

/**
 * Backdrop component for modals and dialogs
 * Creates a dark overlay that blocks interaction with the page
 * 
 * @example
 * ```tsx
 * <Backdrop open={isOpen} onClick={() => setIsOpen(false)} />
 * ```
 */
export const Backdrop = ({
  open,
  onClick,
  invisible = false,
  className,
  zIndex = 1000,
  ...rest
}: BackdropProps) => {
  // Prevent body scroll when backdrop is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const classes = clsx(
    'backdrop',
    {
      'backdrop-invisible': invisible,
    },
    className
  );

  const handleClick = (event: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && onClick) {
      onClick();
    }
  };

  return (
    <Portal>
      <div
        className={classes}
        onClick={handleClick}
        style={{ zIndex }}
        role="presentation"
        {...rest}
      />
    </Portal>
  );
};
