import type { JSX, ComponentChildren } from 'preact';
import clsx from 'clsx';

type ChipVariant = 'filled' | 'outlined';
type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
type ChipSize = 'small' | 'medium';

export interface ChipProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onDelete'> {
  /**
   * Chip label content
   */
  label: ComponentChildren;
  /**
   * The variant to use
   */
  variant?: ChipVariant;
  /**
   * The color of the chip
   */
  color?: ChipColor;
  /**
   * The size of the chip
   */
  size?: ChipSize;
  /**
   * Icon element to display at the start
   */
  icon?: ComponentChildren;
  /**
   * If true, the chip will be clickable
   */
  clickable?: boolean;
  /**
   * Callback when the delete icon is clicked
   */
  onDelete?: () => void;
  /**
   * CSS class name
   */
  className?: string;
}

/**
 * Chip component for tags, filters, or compact information display
 * 
 * @example
 * ```tsx
 * <Chip label="Tag" />
 * <Chip label="Deletable" onDelete={() => {}} />
 * <Chip label="Clickable" clickable onClick={() => {}} />
 * <Chip label="With Icon" icon={<Icon name="Star" />} color="primary" />
 * ```
 */
export const Chip = ({
  label,
  variant = 'filled',
  color = 'default',
  size = 'medium',
  icon,
  clickable = false,
  onDelete,
  className,
  onClick,
  ...rest
}: ChipProps) => {
  const classes = clsx(
    'chip',
    `chip-${variant}`,
    `chip-color-${color}`,
    `chip-${size}`,
    {
      'chip-clickable': clickable || onClick,
      'chip-deletable': onDelete,
    },
    className
  );

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div
      className={classes}
      onClick={onClick}
      role={clickable || onClick ? 'button' : undefined}
      tabIndex={clickable || onClick ? 0 : undefined}
      {...rest}
    >
      {icon && <span className="chip-icon">{icon}</span>}
      <span className="chip-label">{label}</span>
      {onDelete && (
        <span 
          className="chip-delete-icon" 
          onClick={handleDelete}
          role="button"
          tabIndex={0}
        >
          ×
        </span>
      )}
    </div>
  );
};
