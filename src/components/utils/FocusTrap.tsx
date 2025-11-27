import type { ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

export interface FocusTrapProps {
  /**
   * Children to render
   */
  children: ComponentChildren;
  /**
   * If true, focus will be trapped within the component
   */
  active?: boolean;
  /**
   * If true, focus will be automatically set to the first focusable element
   */
  autoFocus?: boolean;
  /**
   * If true, focus will be restored to the previously focused element when the trap is deactivated
   */
  restoreFocus?: boolean;
}

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]',
].join(',');

/**
 * Component that traps focus within its children
 * Useful for modals and dialogs to ensure keyboard navigation stays within the component
 * 
 * @example
 * ```tsx
 * <FocusTrap active={isOpen} autoFocus restoreFocus>
 *   <Dialog>
 *     <button>Close</button>
 *   </Dialog>
 * </FocusTrap>
 * ```
 */
export const FocusTrap = ({
  children,
  active = true,
  autoFocus = true,
  restoreFocus = true,
}: FocusTrapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (!active) {
      return;
    }

    // Store the previously focused element
    previousActiveElement.current = document.activeElement;

    const container = containerRef.current;
    if (!container) {
      return;
    }

    // Get all focusable elements
    const getFocusableElements = () => {
      const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
      return Array.from(elements).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
      );
    };

    // Auto focus the first element if requested
    if (autoFocus) {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    // Handle Tab key to trap focus
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);

      // Restore focus to the previously focused element
      if (restoreFocus && previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [active, autoFocus, restoreFocus]);

  return <div ref={containerRef}>{children}</div>;
};
