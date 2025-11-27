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
 * FocusTrap component - traps keyboard focus within its children
 *
 * Restricts keyboard navigation to focusable elements within the component,
 * preventing focus from escaping to elements outside. Essential for accessibility
 * in modals, dialogs, and other overlay components. Handles Tab key navigation
 * and can automatically focus the first element and restore focus when deactivated.
 *
 * @example
 * ```tsx
 * // Modal with focus trapping
 * <FocusTrap active={isModalOpen} autoFocus restoreFocus>
 *   <Modal>
 *     <h2>Modal Title</h2>
 *     <input type="text" placeholder="Focusable input" />
 *     <button>Action Button</button>
 *     <button onClick={closeModal}>Close</button>
 *   </Modal>
 * </FocusTrap>
 *
 * // Dropdown menu with focus trapping
 * <FocusTrap active={isDropdownOpen}>
 *   <DropdownMenu>
 *     <MenuItem>Option 1</MenuItem>
 *     <MenuItem>Option 2</MenuItem>
 *   </DropdownMenu>
 * </FocusTrap>
 * ```
 *
 * Features:
 * - Tab key trapping with circular navigation
 * - Automatic focus on first element when activated
 * - Focus restoration when deactivated
 * - Configurable activation state
 * - Support for all standard focusable elements
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
