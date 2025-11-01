import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/preact';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with default props', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('skeleton-text');
    expect(skeleton).toHaveClass('skeleton-animation-pulse');
  });

  it('renders rectangular variant', () => {
    const { container } = render(<Skeleton variant="rectangular" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveClass('skeleton-rectangular');
  });

  it('renders circular variant', () => {
    const { container } = render(<Skeleton variant="circular" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveClass('skeleton-circular');
  });

  it('applies wave animation', () => {
    const { container } = render(<Skeleton animation="wave" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveClass('skeleton-animation-wave');
  });

  it('disables animation when animation is false', () => {
    const { container } = render(<Skeleton animation={false} />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).not.toHaveClass('skeleton-animation-pulse');
    expect(skeleton).not.toHaveClass('skeleton-animation-wave');
  });

  it('applies custom width', () => {
    const { container } = render(<Skeleton width={200} />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveStyle({ width: '200px' });
  });

  it('applies custom width as string', () => {
    const { container } = render(<Skeleton width="100%" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveStyle({ width: '100%' });
  });

  it('applies custom height', () => {
    const { container } = render(<Skeleton height={100} />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveStyle({ height: '100px' });
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-skeleton" />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveClass('custom-skeleton');
  });

  it('applies custom styles', () => {
    const { container } = render(<Skeleton style={{ margin: '10px' }} />);
    const skeleton = container.querySelector('.skeleton');
    expect(skeleton).toHaveStyle({ margin: '10px' });
  });
});
