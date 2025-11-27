import clsx from 'clsx';
import {
  Home,
  Star,
  Info,
  Mail,
  Heart,
  Settings,
  User,
  Search,
  Menu,
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  Calendar,
  Clock,
  Download,
  Upload,
  Edit,
  Trash2,
  Book,
  FileText,
  Activity,
  Github,
  Package,
  type LucideProps,
} from 'lucide-preact';
import type { FunctionComponent } from 'preact';
// Import only the icons we need

export type IconSize = 'small' | 'medium' | 'large';

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
  | 'Trash2'
  | 'Book'
  | 'FileText'
  | 'Activity'
  | 'Github'
  | 'Package';

// Icon registry - maps icon names to their components
// This explicit mapping is necessary for proper tree-shaking.
// Dynamic resolution (e.g., LucideIcons[name]) would include ALL icons in the bundle.
// By explicitly importing and mapping only the icons we need, we reduce bundle size by ~96%.
const iconRegistry: Record<IconName, FunctionComponent<LucideProps>> = {
  Home,
  Star,
  Info,
  Mail,
  Heart,
  Settings,
  User,
  Search,
  Menu,
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  Calendar,
  Clock,
  Download,
  Upload,
  Edit,
  Trash2,
  Book,
  FileText,
  Activity,
  Github,
  Package,
};

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
  const IconComponent = iconRegistry[name];

  if (!IconComponent) {
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
