import clsx from 'clsx';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'fullWidth' | 'inset' | 'middle';
type DividerTextAlign = 'left' | 'center' | 'right';

export interface DividerProps {
  /**
   * The orientation of the divider
   */
  orientation?: DividerOrientation;
  /**
   * The variant to use
   */
  variant?: DividerVariant;
  /**
   * Text alignment when children are provided
   */
  textAlign?: DividerTextAlign;
  /**
   * If true, the divider will be thicker
   */
  bold?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Content for text dividers
   */
  children?: any;
}

/**
 * Divider component for separating content
 * Supports horizontal/vertical orientations and text dividers
 * 
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider>OR</Divider>
 * <Divider textAlign="left">Section Title</Divider>
 * ```
 */
export const Divider = ({
  orientation = 'horizontal',
  variant = 'fullWidth',
  textAlign = 'center',
  bold = false,
  className,
  children,
}: DividerProps) => {
  const classes = clsx(
    'divider',
    `divider-${orientation}`,
    `divider-${variant}`,
    {
      'divider-with-text': children,
      [`divider-text-${textAlign}`]: children,
      'divider-bold': bold,
    },
    className
  );

  if (children && orientation === 'horizontal') {
    return (
      <div className={classes} role="separator">
        <span className="divider-text">{children}</span>
      </div>
    );
  }

  return <hr className={classes} role="separator" />;
};
