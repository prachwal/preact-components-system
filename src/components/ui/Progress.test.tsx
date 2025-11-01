import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/preact';
import { CircularProgress, LinearProgress } from './Progress';

describe('CircularProgress', () => {
  it('renders with default props', () => {
    const { container } = render(<CircularProgress />);
    const progress = container.querySelector('.circular-progress');
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveClass('circular-progress-indeterminate');
  });

  it('renders determinate variant', () => {
    const { container } = render(<CircularProgress variant="determinate" value={50} />);
    const progress = container.querySelector('.circular-progress');
    expect(progress).toHaveClass('circular-progress-determinate');
    expect(progress).toHaveAttribute('aria-valuenow', '50');
  });

  it('applies color classes', () => {
    const { container } = render(<CircularProgress color="success" />);
    const progress = container.querySelector('.circular-progress');
    expect(progress).toHaveClass('circular-progress-color-success');
  });

  it('applies custom size', () => {
    const { container } = render(<CircularProgress size={60} />);
    const progress = container.querySelector('.circular-progress');
    expect(progress).toHaveStyle({ width: '60px', height: '60px' });
  });

  it('applies size variants', () => {
    const { container: smallContainer } = render(<CircularProgress size="small" />);
    expect(smallContainer.querySelector('.circular-progress')).toHaveStyle({ width: '24px' });

    const { container: mediumContainer } = render(<CircularProgress size="medium" />);
    expect(mediumContainer.querySelector('.circular-progress')).toHaveStyle({ width: '40px' });

    const { container: largeContainer } = render(<CircularProgress size="large" />);
    expect(largeContainer.querySelector('.circular-progress')).toHaveStyle({ width: '56px' });
  });
});

describe('LinearProgress', () => {
  it('renders with default props', () => {
    const { container } = render(<LinearProgress />);
    const progress = container.querySelector('.linear-progress');
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveClass('linear-progress-indeterminate');
  });

  it('renders determinate variant', () => {
    const { container } = render(<LinearProgress variant="determinate" value={75} />);
    const progress = container.querySelector('.linear-progress');
    expect(progress).toHaveClass('linear-progress-determinate');
    expect(progress).toHaveAttribute('aria-valuenow', '75');
  });

  it('renders buffer variant', () => {
    const { container } = render(
      <LinearProgress variant="buffer" value={50} valueBuffer={75} />
    );
    const progress = container.querySelector('.linear-progress');
    expect(progress).toHaveClass('linear-progress-buffer');
    
    const buffer = container.querySelector('.linear-progress-buffer');
    expect(buffer).toBeInTheDocument();
  });

  it('applies color classes', () => {
    const { container } = render(<LinearProgress color="error" />);
    const progress = container.querySelector('.linear-progress');
    expect(progress).toHaveClass('linear-progress-color-error');
  });

  it('applies custom className', () => {
    const { container } = render(<LinearProgress className="custom-progress" />);
    const progress = container.querySelector('.linear-progress');
    expect(progress).toHaveClass('custom-progress');
  });
});
