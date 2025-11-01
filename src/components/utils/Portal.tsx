import { useEffect, useRef } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import type { ComponentChildren } from 'preact';

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
 * Portal component for rendering content outside the current component tree
 * Useful for modals, tooltips, and popovers
 * 
 * @example
 * ```tsx
 * <Portal>
 *   <div>This will be rendered at document.body</div>
 * </Portal>
 * 
 * <Portal container={customElement}>
 *   <div>This will be rendered in customElement</div>
 * </Portal>
 * ```
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

  const targetContainer = container || defaultContainer.current;

  if (!targetContainer) {
    return null;
  }

  return createPortal(children, targetContainer);
};
