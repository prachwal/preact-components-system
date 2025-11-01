import type { JSX } from 'preact';
import clsx from 'clsx';
import './Progress.scss';

type ProgressVariant = 'determinate' | 'indeterminate';
type ProgressColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
type ProgressSize = 'small' | 'medium' | 'large';

export interface CircularProgressProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant to use
   */
  variant?: ProgressVariant;
  /**
   * The value of the progress (0-100) for determinate variant
   */
  value?: number;
  /**
   * The color of the progress indicator
   */
  color?: ProgressColor;
  /**
   * The size of the progress indicator
   */
  size?: ProgressSize | number;
  /**
   * The thickness of the progress indicator
   */
  thickness?: number;
  /**
   * CSS class name
   */
  className?: string;
}

/**
 * Circular progress indicator
 * 
 * @example
 * ```tsx
 * <CircularProgress variant="indeterminate" />
 * <CircularProgress variant="determinate" value={75} />
 * ```
 */
export const CircularProgress = ({
  variant = 'indeterminate',
  value = 0,
  color = 'primary',
  size = 'medium',
  thickness = 3.6,
  className,
  ...rest
}: CircularProgressProps) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 56,
  };

  const actualSize = typeof size === 'number' ? size : sizeMap[size];
  const radius = (actualSize - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = variant === 'determinate' 
    ? circumference - (value / 100) * circumference 
    : 0;

  const classes = clsx(
    'circular-progress',
    `circular-progress-${variant}`,
    `circular-progress-color-${color}`,
    className
  );

  return (
    <div
      className={classes}
      role="progressbar"
      aria-valuenow={variant === 'determinate' ? value : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: actualSize, height: actualSize }}
      {...rest}
    >
      <svg viewBox={`0 0 ${actualSize} ${actualSize}`}>
        <circle
          className="circular-progress-track"
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
        />
        <circle
          className="circular-progress-circle"
          cx={actualSize / 2}
          cy={actualSize / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={variant === 'indeterminate' ? circumference * 0.75 : strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export interface LinearProgressProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant to use
   */
  variant?: ProgressVariant | 'buffer';
  /**
   * The value of the progress (0-100) for determinate variant
   */
  value?: number;
  /**
   * The value for the buffer (0-100) for buffer variant
   */
  valueBuffer?: number;
  /**
   * The color of the progress indicator
   */
  color?: ProgressColor;
  /**
   * CSS class name
   */
  className?: string;
}

/**
 * Linear progress indicator
 * 
 * @example
 * ```tsx
 * <LinearProgress variant="indeterminate" />
 * <LinearProgress variant="determinate" value={75} />
 * <LinearProgress variant="buffer" value={50} valueBuffer={75} />
 * ```
 */
export const LinearProgress = ({
  variant = 'indeterminate',
  value = 0,
  valueBuffer = 100,
  color = 'primary',
  className,
  ...rest
}: LinearProgressProps) => {
  const classes = clsx(
    'linear-progress',
    `linear-progress-${variant}`,
    `linear-progress-color-${color}`,
    className
  );

  return (
    <div
      className={classes}
      role="progressbar"
      aria-valuenow={variant !== 'indeterminate' ? value : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <div className="linear-progress-track" />
      {variant === 'buffer' && (
        <div 
          className="linear-progress-buffer" 
          style={{ transform: `translateX(-${100 - valueBuffer}%)` }}
        />
      )}
      <div 
        className="linear-progress-bar" 
        style={variant !== 'indeterminate' ? { transform: `translateX(-${100 - value}%)` } : undefined}
      />
    </div>
  );
};
