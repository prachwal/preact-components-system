import { useResponsiveBatch } from './useResponsiveBatch';
import type { ResponsiveValue } from '../theme/types';

type SpacingValues = {
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
};

type ResolvedSpacing = {
  [K in keyof SpacingValues]: number | undefined;
};

/**
 * Hook for resolving spacing values efficiently
 */
export function useSpacing(values: SpacingValues): ResolvedSpacing {
  return useResponsiveBatch(values);
}