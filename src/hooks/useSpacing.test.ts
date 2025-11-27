import { renderHook } from '@testing-library/preact';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { useSpacing } from './useSpacing';

// Mock the useBreakpoint hook
const mockUseBreakpoint = vi.fn();
vi.mock('./useBreakpoint', () => ({
  useBreakpoint: () => mockUseBreakpoint(),
}));

describe('useSpacing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('resolves spacing values correctly', () => {
    mockUseBreakpoint.mockReturnValue('md');

    const { result } = renderHook(() =>
      useSpacing({
        p: 2,
        mt: 1,
        mx: { xs: 1, md: 3 },
      })
    );

    expect(result.current).toEqual({
      p: 2,
      pt: undefined,
      pr: undefined,
      pb: undefined,
      pl: undefined,
      px: undefined,
      py: undefined,
      m: undefined,
      mt: 1,
      mr: undefined,
      mb: undefined,
      ml: undefined,
      mx: 3,
      my: undefined,
    });
  });

  it('handles responsive spacing values', () => {
    mockUseBreakpoint.mockReturnValue('sm');

    const { result } = renderHook(() =>
      useSpacing({
        p: { xs: 1, sm: 2, lg: 3 },
        mx: { xs: 0, md: 2 },
        py: { sm: 1, xl: 4 },
      })
    );

    expect(result.current).toEqual({
      p: 2,
      pt: undefined,
      pr: undefined,
      pb: undefined,
      pl: undefined,
      px: undefined,
      py: 1,
      m: undefined,
      mt: undefined,
      mr: undefined,
      mb: undefined,
      ml: undefined,
      mx: 0,
      my: undefined,
    });
  });

  it('returns undefined for unset values', () => {
    mockUseBreakpoint.mockReturnValue('md');

    const { result } = renderHook(() => useSpacing({}));

    expect(result.current).toEqual({
      p: undefined,
      pt: undefined,
      pr: undefined,
      pb: undefined,
      pl: undefined,
      px: undefined,
      py: undefined,
      m: undefined,
      mt: undefined,
      mr: undefined,
      mb: undefined,
      ml: undefined,
      mx: undefined,
      my: undefined,
    });
  });
});