import { renderHook } from '@testing-library/preact';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { useLayout } from './useLayout';

// Mock the useBreakpoint hook
const mockUseBreakpoint = vi.fn();
vi.mock('./useBreakpoint', () => ({
  useBreakpoint: () => mockUseBreakpoint(),
}));

describe('useLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('resolves layout values correctly', () => {
    mockUseBreakpoint.mockReturnValue('md');

    const { result } = renderHook(() =>
      useLayout({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'flex-start', md: 'center' },
      })
    );

    expect(result.current).toEqual({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: undefined,
    });
  });

  it('handles responsive layout values', () => {
    mockUseBreakpoint.mockReturnValue('lg');

    const { result } = renderHook(() =>
      useLayout({
        display: { xs: 'block', md: 'flex', lg: 'grid' },
        alignItems: { sm: 'center', xl: 'flex-end' },
      })
    );

    expect(result.current).toEqual({
      display: 'grid',
      flexDirection: undefined,
      justifyContent: undefined,
      alignItems: 'center',
    });
  });

  it('returns undefined for unset values', () => {
    mockUseBreakpoint.mockReturnValue('md');

    const { result } = renderHook(() => useLayout({}));

    expect(result.current).toEqual({
      display: undefined,
      flexDirection: undefined,
      justifyContent: undefined,
      alignItems: undefined,
    });
  });
});
