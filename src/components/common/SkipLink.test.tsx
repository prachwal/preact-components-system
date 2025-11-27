import { describe, it, expect } from 'vitest';

import { render, screen } from '../../test/test-utils';

import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('renders skip link with correct text', () => {
    render(<SkipLink />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders as anchor element', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
  });

  it('has correct href attribute', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('has correct className', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link).toHaveClass('skip-link');
  });
});
