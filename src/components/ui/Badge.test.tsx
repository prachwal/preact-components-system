import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/preact';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders with content', () => {
    const { container } = render(
      <Badge badgeContent={4}>
        <div>Child</div>
      </Badge>
    );
    expect(container.textContent).toContain('4');
    expect(container.textContent).toContain('Child');
  });

  it('renders dot variant', () => {
    const { container } = render(
      <Badge variant="dot">
        <div>Child</div>
      </Badge>
    );
    const badge = container.querySelector('.badge-dot');
    expect(badge).toBeInTheDocument();
  });

  it('applies color classes', () => {
    const { container } = render(
      <Badge badgeContent={1} color="error">
        <div>Child</div>
      </Badge>
    );
    const badge = container.querySelector('.badge-badge');
    expect(badge).toHaveClass('badge-color-error');
  });

  it('applies position classes', () => {
    const { container } = render(
      <Badge badgeContent={1} position="bottom-left">
        <div>Child</div>
      </Badge>
    );
    const badge = container.querySelector('.badge-badge');
    expect(badge).toHaveClass('badge-position-bottom-left');
  });

  it('shows max value', () => {
    const { container } = render(
      <Badge badgeContent={100} max={99}>
        <div>Child</div>
      </Badge>
    );
    expect(container.textContent).toContain('99+');
  });

  it('hides when invisible', () => {
    const { container } = render(
      <Badge badgeContent={1} invisible>
        <div>Child</div>
      </Badge>
    );
    const badge = container.querySelector('.badge-badge');
    expect(badge).toHaveClass('badge-invisible');
  });

  it('hides zero by default', () => {
    const { container } = render(
      <Badge badgeContent={0}>
        <div>Child</div>
      </Badge>
    );
    const badge = container.querySelector('.badge-badge');
    expect(badge).toHaveClass('badge-invisible');
  });

  it('shows zero when showZero is true', () => {
    const { container } = render(
      <Badge badgeContent={0} showZero>
        <div>Child</div>
      </Badge>
    );
    expect(container.textContent).toContain('0');
  });
});
