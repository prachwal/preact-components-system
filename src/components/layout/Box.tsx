import { h } from 'preact';
import type { ComponentChildren } from 'preact';
import clsx from 'clsx';
import type { ResponsiveValue } from '../../theme/types';
import { useResponsive } from '../../hooks/useResponsive';

export interface BoxProps {
  /**
   * Component to render as
   */
  component?: keyof h.JSX.IntrinsicElements;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: h.JSX.CSSProperties;
  /**
   * Padding (multiplier of spacing unit, default 8px)
   */
  p?: ResponsiveValue<number>;
  /**
   * Padding top
   */
  pt?: ResponsiveValue<number>;
  /**
   * Padding right
   */
  pr?: ResponsiveValue<number>;
  /**
   * Padding bottom
   */
  pb?: ResponsiveValue<number>;
  /**
   * Padding left
   */
  pl?: ResponsiveValue<number>;
  /**
   * Padding horizontal (left & right)
   */
  px?: ResponsiveValue<number>;
  /**
   * Padding vertical (top & bottom)
   */
  py?: ResponsiveValue<number>;
  /**
   * Margin (multiplier of spacing unit, default 8px)
   */
  m?: ResponsiveValue<number>;
  /**
   * Margin top
   */
  mt?: ResponsiveValue<number>;
  /**
   * Margin right
   */
  mr?: ResponsiveValue<number>;
  /**
   * Margin bottom
   */
  mb?: ResponsiveValue<number>;
  /**
   * Margin left
   */
  ml?: ResponsiveValue<number>;
  /**
   * Margin horizontal (left & right)
   */
  mx?: ResponsiveValue<number>;
  /**
   * Margin vertical (top & bottom)
   */
  my?: ResponsiveValue<number>;
  /**
   * Display property
   */
  display?: ResponsiveValue<string>;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

export const Box = ({
  component: Component = 'div',
  className,
  style = {},
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  display,
  children,
  ...rest
}: BoxProps) => {
  const resolvedP = useResponsive(p);
  const resolvedPt = useResponsive(pt);
  const resolvedPr = useResponsive(pr);
  const resolvedPb = useResponsive(pb);
  const resolvedPl = useResponsive(pl);
  const resolvedPx = useResponsive(px);
  const resolvedPy = useResponsive(py);
  const resolvedM = useResponsive(m);
  const resolvedMt = useResponsive(mt);
  const resolvedMr = useResponsive(mr);
  const resolvedMb = useResponsive(mb);
  const resolvedMl = useResponsive(ml);
  const resolvedMx = useResponsive(mx);
  const resolvedMy = useResponsive(my);
  const resolvedDisplay = useResponsive(display);

  const spacing = 8; // Default spacing unit

  const boxStyle: h.JSX.CSSProperties = {
    ...style,
  };

  // Apply padding
  if (resolvedP !== undefined) {
    boxStyle.padding = `${resolvedP * spacing}px`;
  }
  if (resolvedPt !== undefined) {
    boxStyle.paddingTop = `${resolvedPt * spacing}px`;
  }
  if (resolvedPr !== undefined) {
    boxStyle.paddingRight = `${resolvedPr * spacing}px`;
  }
  if (resolvedPb !== undefined) {
    boxStyle.paddingBottom = `${resolvedPb * spacing}px`;
  }
  if (resolvedPl !== undefined) {
    boxStyle.paddingLeft = `${resolvedPl * spacing}px`;
  }
  if (resolvedPx !== undefined) {
    boxStyle.paddingLeft = `${resolvedPx * spacing}px`;
    boxStyle.paddingRight = `${resolvedPx * spacing}px`;
  }
  if (resolvedPy !== undefined) {
    boxStyle.paddingTop = `${resolvedPy * spacing}px`;
    boxStyle.paddingBottom = `${resolvedPy * spacing}px`;
  }

  // Apply margin
  if (resolvedM !== undefined) {
    boxStyle.margin = `${resolvedM * spacing}px`;
  }
  if (resolvedMt !== undefined) {
    boxStyle.marginTop = `${resolvedMt * spacing}px`;
  }
  if (resolvedMr !== undefined) {
    boxStyle.marginRight = `${resolvedMr * spacing}px`;
  }
  if (resolvedMb !== undefined) {
    boxStyle.marginBottom = `${resolvedMb * spacing}px`;
  }
  if (resolvedMl !== undefined) {
    boxStyle.marginLeft = `${resolvedMl * spacing}px`;
  }
  if (resolvedMx !== undefined) {
    boxStyle.marginLeft = `${resolvedMx * spacing}px`;
    boxStyle.marginRight = `${resolvedMx * spacing}px`;
  }
  if (resolvedMy !== undefined) {
    boxStyle.marginTop = `${resolvedMy * spacing}px`;
    boxStyle.marginBottom = `${resolvedMy * spacing}px`;
  }

  // Apply display
  if (resolvedDisplay !== undefined) {
    boxStyle.display = resolvedDisplay;
  }

  return (
    <Component className={clsx('box', className)} style={boxStyle} {...rest}>
      {children}
    </Component>
  );
};
