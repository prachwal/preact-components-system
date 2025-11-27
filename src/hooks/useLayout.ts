import { useResponsiveBatch } from './useResponsiveBatch';
import type { ResponsiveValue } from '../theme/types';

type LayoutValues = {
  display?: ResponsiveValue<string>;
  flexDirection?: ResponsiveValue<string>;
  justifyContent?: ResponsiveValue<string>;
  alignItems?: ResponsiveValue<string>;
};

type ResolvedLayout = {
  [K in keyof LayoutValues]: string | undefined;
};

/**
 * Hook for resolving layout values efficiently
 */
export function useLayout(values: LayoutValues): ResolvedLayout {
  return useResponsiveBatch(values);
}