import type { ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

export interface ClickAwayListenerProps {
  /**
   * Callback fired when a click occurs outside the element
   */
  onClickAway: () => void;
  /**
   * Children to render
   */
  children: ComponentChildren;
  /**
   * Mouse event to listen for
   */
  mouseEvent?: 'onClick' | 'onMouseDown' | 'onMouseUp';
  /**
   * Touch event to listen for
   */
  touchEvent?: 'onTouchStart' | 'onTouchEnd';
  /**
   * If true, the listener will not be active
   */
  disabled?: boolean;
}

const eventTypeMap = {
  onClick: 'click',
  onMouseDown: 'mousedown',
  onMouseUp: 'mouseup',
  onTouchStart: 'touchstart',
  onTouchEnd: 'touchend',
};

/**
 * ClickAwayListener component - detects clicks outside of its children
 *
 * Listens for mouse and touch events outside the component's boundaries and
 * triggers a callback when such events occur. Useful for closing dropdowns,
 * modals, popovers, and other overlay components when clicking outside.
 *
 * @example
 * ```tsx
 * // Basic dropdown with click-away behavior
 * <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
 *   <div className="dropdown">
 *     <button>Toggle</button>
 *     {isOpen && <div className="dropdown-menu">Menu content</div>}
 *   </div>
 * </ClickAwayListener>
 *
 * // Modal with custom event types
 * <ClickAwayListener
 *   onClickAway={() => setModalOpen(false)}
 *   mouseEvent="onMouseDown"
 *   touchEvent="onTouchStart"
 * >
 *   <Modal>Modal content</Modal>
 * </ClickAwayListener>
 * ```
 *
 * Features:
 * - Configurable mouse and touch event types
 * - Automatic event listener cleanup
 * - Disabled state support
 * - Delayed event attachment to prevent mount-time triggers
 */
export const ClickAwayListener = ({
  onClickAway,
  children,
  mouseEvent = 'onClick',
  touchEvent = 'onTouchEnd',
  disabled = false,
}: ClickAwayListenerProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const handleEvent = (event: Event) => {
      const node = nodeRef.current;

      if (node?.contains(event.target as Node)) {
        return;
      }

      onClickAway();
    };

    const mouseEventType = eventTypeMap[mouseEvent];
    const touchEventType = eventTypeMap[touchEvent];

    // Add event listeners with a slight delay to avoid triggering on mount
    const timeoutId = setTimeout(() => {
      document.addEventListener(mouseEventType, handleEvent);
      document.addEventListener(touchEventType, handleEvent);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener(mouseEventType, handleEvent);
      document.removeEventListener(touchEventType, handleEvent);
    };
  }, [onClickAway, disabled, mouseEvent, touchEvent]);

  return <div ref={nodeRef}>{children}</div>;
};
