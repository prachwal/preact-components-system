import type { ComponentChildren, JSX } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { Children, cloneElement, isValidElement } from 'preact/compat';
import { ChevronRight } from 'lucide-preact';
import clsx from 'clsx';

type AccordionVariant = 'elevation' | 'outlined' | 'filled';
type AccordionSize = 'small' | 'medium';

export interface AccordionProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'size' | 'onChange'> {
  /**
   * The content of the accordion
   */
  children: ComponentChildren;
  /**
   * If true, expands the accordion by default
   */
  defaultExpanded?: boolean;
  /**
   * If true, the accordion is expanded
   */
  expanded?: boolean;
  /**
   * Callback fired when the expand/collapse state changes
   */
  onChange?: (expanded: boolean) => void;
  /**
   * If true, the accordion cannot be expanded/collapsed
   */
  disabled?: boolean;
  /**
   * The variant of the accordion
   */
  variant?: AccordionVariant;
  /**
   * The size of the accordion
   */
  size?: AccordionSize;
  /**
   * If true, removes the border radius
   */
  square?: boolean;
  /**
   * CSS class name
   */
  className?: string;
}

export interface AccordionSummaryProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the summary
   */
  children: ComponentChildren;
  /**
   * CSS class name
   */
  className?: string;
}

export interface AccordionDetailsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the details
   */
  children: ComponentChildren;
  /**
   * CSS class name
   */
  className?: string;
}

export const AccordionSummary = ({
  children,
  className,
  ...rest
}: AccordionSummaryProps) => {
  return (
    <div
      className={clsx('accordion-summary', className)}
      {...rest}
    >
      <div className="accordion-summary-content">
        {children}
      </div>
      <div className="accordion-summary-expand-icon">
        <ChevronRight size={20} />
      </div>
    </div>
  );
};

AccordionSummary.displayName = 'AccordionSummary';

export const AccordionDetails = ({
  children,
  className,
  ...rest
}: AccordionDetailsProps) => {
  return (
    <div
      className={clsx('accordion-details', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

AccordionDetails.displayName = 'AccordionDetails';

export const Accordion = ({
  children,
  defaultExpanded = false,
  expanded: expandedProp,
  onChange,
  disabled = false,
  variant = 'elevation',
  size = 'medium',
  square = false,
  className,
  ...rest
}: AccordionProps) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isControlled = expandedProp !== undefined;
  const expanded = isControlled ? expandedProp : internalExpanded;

  const handleClick = useCallback(() => {
    if (disabled) return;

    if (!isControlled) {
      setInternalExpanded(!expanded);
    }
    onChange?.(!expanded);
  }, [disabled, expanded, isControlled, onChange]);

  return (
    <div
      className={clsx(
        'accordion',
        `accordion-variant-${variant}`,
        `accordion-size-${size}`,
        {
          'accordion-expanded': expanded,
          'accordion-disabled': disabled,
          'accordion-square': square,
        },
        className
      )}
      {...rest}
    >
      {Children.toArray(children).map((child) => {
        if (child && isValidElement(child) && (child as any).type === AccordionSummary) {
          return (
            <button
              type="button"
              className="accordion-trigger"
              onClick={handleClick}
              disabled={disabled}
              aria-expanded={expanded}
              key="summary"
            >
              {cloneElement(child as any)}
            </button>
          );
        }
        if (child && isValidElement(child)) {
          return cloneElement(child as any);
        }
        return child;
      })}
    </div>
  );
};