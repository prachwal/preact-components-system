import { renderHook } from '@testing-library/preact';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { useResponsiveBatch } from './useResponsiveBatch';

// Mock the useBreakpoint hook
const mockUseBreakpoint = vi.fn();
vi.mock('./useBreakpoint', () => ({
  useBreakpoint: () => mockUseBreakpoint(),
}));

describe('useResponsiveBatch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('resolves static values correctly', () => {
    mockUseBreakpoint.mockReturnValue('md');

    const { result } = renderHook(() =>
      useResponsiveBatch({
        padding: 2,
        margin: '10px',
        display: 'flex',
      })
    );

    expect(result.current).toEqual({
      padding: 2,
      margin: '10px',
      display: 'flex',
    });
  });

  it('resolves responsive values for md breakpoint', () => {
    mockUseBreakpoint.mockReturnValue('md');

    const { result } = renderHook(() =>
      useResponsiveBatch({
        padding: { xs: 1, sm: 2, md: 3, lg: 4 },
        margin: { xs: '5px', lg: '20px' },
        display: { xs: 'block', md: 'flex' },
      })
    );

    expect(result.current).toEqual({
      padding: 3,
      margin: '5px',
      display: 'flex',
    });
  });

  it('resolves responsive values for xs breakpoint', () => {
    mockUseBreakpoint.mockReturnValue('xs');

    const { result } = renderHook(() =>
      useResponsiveBatch({
        padding: { xs: 1, sm: 2, md: 3 },
        margin: { sm: '10px', lg: '20px' },
        display: { md: 'flex' },
      })
    );

    expect(result.current).toEqual({
      padding: 1,
      margin: '10px', // Falls back to smallest defined breakpoint
      display: 'flex', // Falls back to smallest defined breakpoint
    });
  });

  it('falls back to smaller breakpoints when current breakpoint has no value', () => {
    mockUseBreakpoint.mockReturnValue('lg');

    const { result } = renderHook(() =>
      useResponsiveBatch({
        padding: { xs: 1, sm: 2 },
        margin: { xs: '5px', md: '15px' },
      })
    );

    expect(result.current).toEqual({
      padding: 2,
      margin: '15px',
    });
  });

  it('uses smallest defined breakpoint as fallback', () => {
    mockUseBreakpoint.mockReturnValue('xl');

    const { result } = renderHook(() =>
      useResponsiveBatch({
        padding: { md: 3 },
        margin: { lg: '20px' },
      })
    );

    expect(result.current).toEqual({
      padding: 3,
      margin: '20px',
    });
  });

  it('handles empty responsive objects', () => {
    mockUseBreakpoint.mockReturnValue('md');

    const { result } = renderHook(() =>
      useResponsiveBatch({
        padding: {},
        margin: { xs: '5px' },
      })
    );

    expect(result.current).toEqual({
      padding: undefined,
      margin: '5px',
    });
  });

  it('memoizes results correctly', () => {
    mockUseBreakpoint.mockReturnValue('md');

    const values = {
      padding: { xs: 1, md: 3 },
      margin: { xs: '5px', lg: '20px' },
    };

    const { result, rerender } = renderHook(() => useResponsiveBatch(values));

    const firstResult = result.current;
    rerender();
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult);
  });

  it('recomputes when values change', () => {
    mockUseBreakpoint.mockReturnValue('md');

    const { result, rerender } = renderHook(
      (values) => useResponsiveBatch(values),
      {
        initialProps: {
          padding: { xs: 1, md: 3 },
          margin: '10px',
        },
      }
    );

    const firstResult = result.current;

    rerender({
      padding: { xs: 1, md: 4 },
      margin: '10px',
    });

    expect(firstResult.padding).toBe(3);
    expect(result.current.padding).toBe(4);
  });

  it('recomputes when breakpoint changes', () => {
    mockUseBreakpoint.mockReturnValue('sm');

    const { result } = renderHook(() =>
      useResponsiveBatch({
        padding: { xs: 1, sm: 2, md: 3 },
      })
    );

    expect(result.current.padding).toBe(2);

    mockUseBreakpoint.mockReturnValue('md');

    const { result: newResult } = renderHook(() =>
      useResponsiveBatch({
        padding: { xs: 1, sm: 2, md: 3 },
      })
    );

    expect(newResult.current.padding).toBe(3);
  });
});