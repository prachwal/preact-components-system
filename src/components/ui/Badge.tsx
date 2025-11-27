import type { JSX, ComponentChildren } from 'preact';
import clsx from 'clsx';

type BadgeVariant = 'standard' | 'dot';
type BadgeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface BadgeProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  /**
   * The content of the badge
   */
  badgeContent?: ComponentChildren;
  /**
   * The variant to use
   */
  variant?: BadgeVariant;
  /**
   * The color of the badge
   */
  color?: BadgeColor;
  /**
   * The position of the badge
   */
  position?: BadgePosition;
  /**
   * Max count to display (e.g., 99+)
   */
  max?: number;
  /**
   * If true, the badge is invisible
   */
  invisible?: boolean;
  /**
   * If true, badge shows a dot instead of content
   */
  showZero?: boolean;
  /**
   * Children (the element being badged)
   */
  children: ComponentChildren;
  /**
   * CSS class name
   */
  className?: string;
}

/**
 * Badge component for displaying notification counts or status indicators
 * 
 * @example
 * ```tsx
 * <Badge badgeContent={4} color="error">
 *   <Icon name="Mail" />
 * </Badge>
 * <Badge variant="dot" color="success">
 *   <Avatar>JD</Avatar>
 * </Badge>
 * ```
 */
export const Badge = ({
  badgeContent,
  variant = 'standard',
  color = 'error',
  position = 'top-right',
  max = 99,
  invisible = false,
  showZero = false,
  children,
  className,
  ...rest
}: BadgeProps) => {
  const displayContent = () => {
    if (variant === 'dot') {
      return null;
    }
    
    if (typeof badgeContent === 'number') {
      if (badgeContent === 0 && !showZero) {
        return null;
      }
      return badgeContent > max ? `${max}+` : badgeContent;
    }
    
    return badgeContent;
  };

  const content = displayContent();
  const shouldShow = !invisible && (content !== null || variant === 'dot');

  const classes = clsx(
    'badge',
    className
  );

  const badgeClasses = clsx(
    'badge-badge',
    `badge-${variant}`,
    `badge-color-${color}`,
    `badge-position-${position}`,
    {
      'badge-invisible': !shouldShow,
    }
  );

  return (
    <span className={classes} {...rest}>
      {children}
      <span className={badgeClasses}>{content}</span>
    </span>
  );
};
