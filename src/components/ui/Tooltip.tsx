import type { ComponentChildren } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import clsx from 'clsx';
import { Portal } from '../utils/Portal';

type TooltipPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

export interface TooltipProps {
  /**
   * Tooltip content
   */
  title: ComponentChildren;
  /**
   * Placement of the tooltip
   */
  placement?: TooltipPlacement;
  /**
   * If true, adds an arrow to the tooltip
   */
  arrow?: boolean;
  /**
   * Delay in milliseconds before showing the tooltip
   */
  enterDelay?: number;
  /**
   * Delay in milliseconds before hiding the tooltip
   */
  leaveDelay?: number;
  /**
   * Children (the element triggering the tooltip)
   */
  children: ComponentChildren;
  /**
   * CSS class name
   */
  className?: string;
}

/**
 * Tooltip component for displaying helpful information on hover
 * 
 * @example
 * ```tsx
 * <Tooltip title="Delete">
 *   <Button icon={<Icon name="Trash" />} />
 * </Tooltip>
 * <Tooltip title="Info" placement="right" arrow>
 *   <Icon name="Info" />
 * </Tooltip>
 * ```
 */
export const Tooltip = ({
  title,
  placement = 'top',
  arrow = false,
  enterDelay = 100,
  leaveDelay = 0,
  children,
  className,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const childRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<number>();
  const leaveTimerRef = useRef<number>();

  const updatePosition = () => {
    if (!childRef.current || !tooltipRef.current) return;

    const childRect = childRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let top = 0;
    let left = 0;
    const offset = arrow ? 12 : 8;

    // Calculate position based on placement
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = childRect.top - tooltipRect.height - offset;
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = childRect.bottom + offset;
        break;
      case 'left':
      case 'left-start':
      case 'left-end':
        left = childRect.left - tooltipRect.width - offset;
        break;
      case 'right':
      case 'right-start':
      case 'right-end':
        left = childRect.right + offset;
        break;
    }

    // Calculate left position
    if (placement.startsWith('top') || placement.startsWith('bottom')) {
      if (placement.includes('start')) {
        left = childRect.left;
      } else if (placement.includes('end')) {
        left = childRect.right - tooltipRect.width;
      } else {
        left = childRect.left + (childRect.width - tooltipRect.width) / 2;
      }
    }

    // Calculate top position for left/right
    if (placement.startsWith('left') || placement.startsWith('right')) {
      if (placement.includes('start')) {
        top = childRect.top;
      } else if (placement.includes('end')) {
        top = childRect.bottom - tooltipRect.height;
      } else {
        top = childRect.top + (childRect.height - tooltipRect.height) / 2;
      }
    }

    setPosition({ top, left });
  };

  const handleMouseEnter = () => {
    clearTimeout(leaveTimerRef.current);
    enterTimerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, enterDelay);
  };

  const handleMouseLeave = () => {
    clearTimeout(enterTimerRef.current);
    leaveTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, leaveDelay);
  };

  useEffect(() => {
    if (open) {
      updatePosition();
      
      const handleScroll = () => updatePosition();
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [open]);

  useEffect(() => {
    return () => {
      clearTimeout(enterTimerRef.current);
      clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const tooltipClasses = clsx(
    'tooltip',
    `tooltip-placement-${placement}`,
    {
      'tooltip-arrow': arrow,
    },
    className
  );

  return (
    <>
      <span
        ref={childRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="tooltip-trigger"
      >
        {children}
      </span>
      
      {open && title && (
        <Portal>
          <div
            ref={tooltipRef}
            className={tooltipClasses}
            role="tooltip"
            style={{
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {arrow && <span className="tooltip-arrow-element" />}
            <div className="tooltip-content">{title}</div>
          </div>
        </Portal>
      )}
    </>
  );
};
