import type { ComponentChildren } from 'preact';
import { createPortal } from 'preact/compat';
import { useEffect, useRef } from 'preact/hooks';

export interface PortalProps {
  /**
   * Children to render in the portal
   */
  children: ComponentChildren;
  /**
   * Container element to render the portal into
   * Defaults to document.body
   */
  container?: Element | null;
  /**
   * Whether to disable the portal and render inline
   */
  disabled?: boolean;
}

/**
 * Portal component - renders content outside the current component tree
 *
 * Uses Preact's createPortal to render children into a DOM node that exists
 * outside the current component's DOM hierarchy. Essential for modals, tooltips,
 * dropdowns, and other overlay components that need to break out of parent
 * containers with overflow:hidden or z-index issues.
 *
 * @example
 * ```tsx
 * // Modal rendered at document.body
 * <Portal>
 *   <Modal>
 *     <h2>Modal Content</h2>
 *     <p>This renders outside the normal DOM tree.</p>
 *   </Modal>
 * </Portal>
 *
 * // Tooltip in custom container
 * <Portal container={tooltipContainer}>
 *   <Tooltip>Tooltip content</Tooltip>
 * </Portal>
 *
 * // Disabled portal (renders inline)
 * <Portal disabled>
 *   <div>Rendered normally in component tree</div>
 * </Portal>
 * ```
 *
 * Features:
 * - Automatic container creation (defaults to document.body)
 * - Custom container support
 * - Cleanup on unmount
 * - Disabled state for conditional portal usage
 * - SSR-safe with proper mounting checks
 */
export const Portal = ({ children, container, disabled = false }: PortalProps) => {
  const defaultContainer = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(false);

  // Create portal container on mount if needed
  if (!container && !disabled && !defaultContainer.current && !mountedRef.current) {
    const div = document.createElement('div');
    div.className = 'portal-container';
    document.body.appendChild(div);
    defaultContainer.current = div;
    mountedRef.current = true;
  }

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (defaultContainer.current && !container) {
        document.body.removeChild(defaultContainer.current);
        defaultContainer.current = null;
        mountedRef.current = false;
      }
    };
  }, [container]);

  if (disabled) {
    return <>{children}</>;
  }

  const targetContainer = container ?? defaultContainer.current;

  if (!targetContainer) {
    return null;
  }

  return createPortal(children, targetContainer);
};
