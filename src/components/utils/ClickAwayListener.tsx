import { useEffect, useRef } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

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
 * Component that detects clicks outside of its children
 * Useful for closing dropdowns, modals, and popovers
 * 
 * @example
 * ```tsx
 * <ClickAwayListener onClickAway={() => setOpen(false)}>
 *   <div>Content that can be clicked away from</div>
 * </ClickAwayListener>
 * ```
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

      // Ignore if the click is inside the component
      if (node && node.contains(event.target as Node)) {
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
