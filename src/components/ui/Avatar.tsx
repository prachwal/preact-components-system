import type { JSX } from 'preact';
import clsx from 'clsx';

type AvatarVariant = 'circular' | 'rounded' | 'square';
type AvatarSize = 'small' | 'medium' | 'large';

export interface AvatarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * Image source URL
   */
  src?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Shape variant
   */
  variant?: AvatarVariant;
  /**
   * Size of the avatar
   */
  size?: AvatarSize | number;
  /**
   * Children (fallback content, typically initials)
   */
  children?: any;
  /**
   * CSS class name
   */
  className?: string;
}

/**
 * Avatar component for displaying user profile images or initials
 * 
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="John Doe" />
 * <Avatar>JD</Avatar>
 * <Avatar variant="rounded" size="large">AB</Avatar>
 * ```
 */
export const Avatar = ({
  src,
  alt = '',
  variant = 'circular',
  size = 'medium',
  children,
  className,
  style,
  ...rest
}: AvatarProps) => {
  const sizeMap = {
    small: 32,
    medium: 40,
    large: 56,
  };

  const actualSize = typeof size === 'number' ? size : sizeMap[size];

  const classes = clsx(
    'avatar',
    `avatar-${variant}`,
    typeof size === 'string' && `avatar-${size}`,
    className
  );

  const inlineStyles: Record<string, any> = {};
  
  if (style && typeof style === 'object') {
    Object.assign(inlineStyles, style);
  }
  
  if (typeof size === 'number') {
    inlineStyles.width = `${actualSize}px`;
    inlineStyles.height = `${actualSize}px`;
    inlineStyles.fontSize = `${actualSize / 2}px`;
  }

  return (
    <div className={classes} style={inlineStyles} {...rest}>
      {src ? (
        <img src={src} alt={alt} className="avatar-img" />
      ) : (
        children
      )}
    </div>
  );
};
