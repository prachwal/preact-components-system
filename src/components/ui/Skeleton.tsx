import type { JSX } from 'preact';
import clsx from 'clsx';

type SkeletonVariant = 'text' | 'rectangular' | 'circular';
type SkeletonAnimation = 'pulse' | 'wave' | false;

export interface SkeletonProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * The type of content that will be rendered
   */
  variant?: SkeletonVariant;
  /**
   * The animation effect
   */
  animation?: SkeletonAnimation;
  /**
   * Width of the skeleton
   */
  width?: number | string;
  /**
   * Height of the skeleton
   */
  height?: number | string;
  /**
   * CSS class name
   */
  className?: string;
}

/**
 * Skeleton component for loading placeholders
 * Displays a placeholder preview while content is loading
 * 
 * @example
 * ```tsx
 * <Skeleton variant="text" width="100%" />
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * ```
 */
export const Skeleton = ({
  variant = 'text',
  animation = 'pulse',
  width,
  height,
  className,
  style,
  ...rest
}: SkeletonProps) => {
  const classes = clsx(
    'skeleton',
    `skeleton-${variant}`,
    animation && `skeleton-animation-${animation}`,
    className
  );

  const inlineStyles: Record<string, any> = {};

  if (style && typeof style === 'object') {
    Object.assign(inlineStyles, style);
  }

  if (width !== undefined) {
    inlineStyles.width = typeof width === 'number' ? `${width}px` : width;
  }

  if (height !== undefined) {
    inlineStyles.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <div
      className={classes}
      style={inlineStyles}
      {...rest}
    />
  );
};
