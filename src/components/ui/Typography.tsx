import clsx from 'clsx';
import type { ComponentChildren, JSX } from 'preact';

import { useTheme } from '../../contexts/ThemeContext';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'button' | 'caption' | 'overline';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify' | 'inherit';
export type TypographyColor = 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error' | 'inherit';

export interface TypographyProps extends Omit<JSX.HTMLAttributes<HTMLElement>, 'style'> {
  /**
   * Typography variant
   */
  variant?: TypographyVariant;
  /**
   * Component to render as
   */
  component?: keyof JSX.IntrinsicElements;
  /**
   * Text alignment
   */
  align?: TypographyAlign;
  /**
   * Text color
   */
  color?: TypographyColor;
  /**
   * If true, text will not wrap
   */
  noWrap?: boolean;
  /**
   * If true, text will have bottom margin
   */
  gutterBottom?: boolean;
  /**
   * If true, text will have top margin
   */
  paragraph?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: JSX.CSSProperties;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

const variantMapping: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  button: 'span',
  caption: 'span',
  overline: 'span',
};

export const Typography = ({
  variant = 'body1',
  component,
  align = 'inherit',
  color = 'inherit',
  noWrap = false,
  gutterBottom = false,
  paragraph = false,
  className,
  style = {},
  children,
  ...rest
}: TypographyProps) => {
  const theme = useTheme();
  const Component = (component ?? variantMapping[variant]) as any;

  const getColor = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'textPrimary':
        return theme.palette.text.primary;
      case 'textSecondary':
        return theme.palette.text.secondary;
      case 'error':
        return theme.palette.error.main;
      case 'inherit':
      default:
        return undefined;
    }
  };

  const typographyStyle: JSX.CSSProperties = {
    ...theme.typography[variant],
    textAlign: align !== 'inherit' ? align : undefined,
    color: getColor(),
    whiteSpace: noWrap ? 'nowrap' : undefined,
    overflow: noWrap ? 'hidden' : undefined,
    textOverflow: noWrap ? 'ellipsis' : undefined,
    marginBottom: gutterBottom ? '0.35em' : paragraph ? '16px' : undefined,
    ...style,
  };

  const classes = clsx(
    'typography',
    `typography-${variant}`,
    {
      'typography-nowrap': noWrap,
      'typography-gutter-bottom': gutterBottom,
      'typography-paragraph': paragraph,
    },
    className
  );

  return (
    <Component className={classes} style={typographyStyle} {...rest}>
      {children}
    </Component>
  );
};
