import { useMemo } from 'preact/hooks';

import type { ResponsiveValue, Breakpoint } from '../theme/types';

import { useBreakpoint } from './useBreakpoint';

export type SpacingProps = {
  p?: ResponsiveValue<number>;
  pt?: ResponsiveValue<number>;
  pr?: ResponsiveValue<number>;
  pb?: ResponsiveValue<number>;
  pl?: ResponsiveValue<number>;
  px?: ResponsiveValue<number>;
  py?: ResponsiveValue<number>;
  m?: ResponsiveValue<number>;
  mt?: ResponsiveValue<number>;
  mr?: ResponsiveValue<number>;
  mb?: ResponsiveValue<number>;
  ml?: ResponsiveValue<number>;
  mx?: ResponsiveValue<number>;
  my?: ResponsiveValue<number>;
  display?: ResponsiveValue<string>;
};

export type ResolvedStyles = {
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  display?: string;
};

export function useResponsiveStyles(props: SpacingProps): ResolvedStyles {
  const currentBreakpoint = useBreakpoint();

  return useMemo(() => {
    const spacing = 8; // Default spacing unit
    const styles: ResolvedStyles = {};

    // Helper function to resolve responsive value
    const resolveValue = <T>(value: ResponsiveValue<T> | undefined): T | undefined => {
      if (typeof value !== 'object' || value === null) return value as T;

      const responsiveValue = value as Partial<Record<Breakpoint, T>>;
      const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
      const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

      for (let i = currentIndex; i >= 0; i--) {
        const bp = breakpointOrder[i];
        if (responsiveValue[bp] !== undefined) {
          return responsiveValue[bp] as T;
        }
      }

      for (const bp of breakpointOrder) {
        if (responsiveValue[bp] !== undefined) {
          return responsiveValue[bp] as T;
        }
      }

      return undefined;
    };

    // Resolve all spacing values
    const p = resolveValue(props.p);
    const pt = resolveValue(props.pt);
    const pr = resolveValue(props.pr);
    const pb = resolveValue(props.pb);
    const pl = resolveValue(props.pl);
    const px = resolveValue(props.px);
    const py = resolveValue(props.py);
    const m = resolveValue(props.m);
    const mt = resolveValue(props.mt);
    const mr = resolveValue(props.mr);
    const mb = resolveValue(props.mb);
    const ml = resolveValue(props.ml);
    const mx = resolveValue(props.mx);
    const my = resolveValue(props.my);
    const display = resolveValue(props.display);

    // Apply padding
    if (p !== undefined) styles.padding = `${p * spacing}px`;
    if (pt !== undefined) styles.paddingTop = `${pt * spacing}px`;
    if (pr !== undefined) styles.paddingRight = `${pr * spacing}px`;
    if (pb !== undefined) styles.paddingBottom = `${pb * spacing}px`;
    if (pl !== undefined) styles.paddingLeft = `${pl * spacing}px`;
    if (px !== undefined) {
      styles.paddingLeft = `${px * spacing}px`;
      styles.paddingRight = `${px * spacing}px`;
    }
    if (py !== undefined) {
      styles.paddingTop = `${py * spacing}px`;
      styles.paddingBottom = `${py * spacing}px`;
    }

    // Apply margin
    if (m !== undefined) styles.margin = `${m * spacing}px`;
    if (mt !== undefined) styles.marginTop = `${mt * spacing}px`;
    if (mr !== undefined) styles.marginRight = `${mr * spacing}px`;
    if (mb !== undefined) styles.marginBottom = `${mb * spacing}px`;
    if (ml !== undefined) styles.marginLeft = `${ml * spacing}px`;
    if (mx !== undefined) {
      styles.marginLeft = `${mx * spacing}px`;
      styles.marginRight = `${mx * spacing}px`;
    }
    if (my !== undefined) {
      styles.marginTop = `${my * spacing}px`;
      styles.marginBottom = `${my * spacing}px`;
    }

    // Apply display
    if (display !== undefined) styles.display = display;

    return styles;
  }, [props, currentBreakpoint]);
}
