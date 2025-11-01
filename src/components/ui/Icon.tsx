import type { FunctionComponent } from 'preact';
import * as LucideIcons from 'lucide-preact';
import type { LucideProps } from 'lucide-preact';
import clsx from 'clsx';

type IconSize = 'small' | 'medium' | 'large';

// Create a type for icon names
type LucideIconName = keyof typeof LucideIcons;

export type IconName = 
  | 'Home' 
  | 'Star' 
  | 'Info' 
  | 'Mail' 
  | 'Heart' 
  | 'Settings' 
  | 'User' 
  | 'Search' 
  | 'Menu' 
  | 'X'
  | 'Check'
  | 'ChevronRight'
  | 'ChevronLeft'
  | 'AlertCircle'
  | 'AlertTriangle'
  | 'HelpCircle'
  | 'Calendar'
  | 'Clock'
  | 'Download'
  | 'Upload'
  | 'Edit'
  | 'Trash2';

export interface IconProps extends Omit<LucideProps, 'size'> {
  /**
   * Name of the icon from lucide-preact
   */
  name: IconName;
  /**
   * Size of the icon
   */
  size?: IconSize | number;
  /**
   * Icon color (CSS color value)
   */
  color?: string;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Accessible label for the icon
   */
  'aria-label'?: string;
  /**
   * If true, icon is decorative and hidden from screen readers
   */
  decorative?: boolean;
}

const sizeMap: Record<IconSize, number> = {
  small: 16,
  medium: 24,
  large: 32,
};

/**
 * Icon component using lucide-preact icons
 * 
 * @example
 * ```tsx
 * <Icon name="Home" size="medium" />
 * <Icon name="Star" size={20} color="gold" />
 * <Icon name="Info" decorative />
 * ```
 */
export const Icon = ({
  name,
  size = 'medium',
  color,
  className,
  'aria-label': ariaLabel,
  decorative = false,
  ...rest
}: IconProps) => {
  const IconComponent = LucideIcons[name as LucideIconName] as FunctionComponent<LucideProps>;

  if (!IconComponent || typeof IconComponent !== 'function') {
    console.warn(`Icon "${name}" not found in lucide-preact`);
    return null;
  }

  const iconSize = typeof size === 'number' ? size : sizeMap[size];

  const iconProps: LucideProps = {
    size: iconSize,
    color,
    className: clsx('icon', className),
    ...(decorative ? { 'aria-hidden': true } : {}),
    ...(!decorative && ariaLabel ? { 'aria-label': ariaLabel } : {}),
    ...(!decorative && !ariaLabel ? { 'aria-label': name, role: 'img' } : {}),
    ...rest,
  };

  return <IconComponent {...iconProps} />;
};
