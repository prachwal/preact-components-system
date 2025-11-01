import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders breadcrumb navigation', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem>Current Page</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(container.querySelector('nav[aria-label="breadcrumb"]')).toBeInTheDocument();
  });

  it('renders breadcrumb items', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem>Current Page</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('renders default separator', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>
    );
    const separators = container.querySelectorAll('.breadcrumb-separator');
    expect(separators).toHaveLength(1);
    expect(separators[0].textContent).toBe('/');
  });

  it('renders custom separator', () => {
    const { container } = render(
      <Breadcrumb separator=">">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>
    );
    const separators = container.querySelectorAll('.breadcrumb-separator');
    expect(separators[0].textContent).toBe('>');
  });

  it('collapses items when maxItems is set', () => {
    render(
      <Breadcrumb maxItems={3}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/level1">Level 1</BreadcrumbItem>
        <BreadcrumbItem href="/level2">Level 2</BreadcrumbItem>
        <BreadcrumbItem href="/level3">Level 3</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>
    );

    // Should show: Home ... Current
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    
    // These should be collapsed
    expect(screen.queryByText('Level 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Level 2')).not.toBeInTheDocument();
  });

  it('respects itemsBeforeCollapse and itemsAfterCollapse', () => {
    render(
      <Breadcrumb maxItems={4} itemsBeforeCollapse={2} itemsAfterCollapse={1}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/level1">Level 1</BreadcrumbItem>
        <BreadcrumbItem href="/level2">Level 2</BreadcrumbItem>
        <BreadcrumbItem href="/level3">Level 3</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>
    );

    // Should show: Home, Level 1, ..., Current
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Breadcrumb className="custom-breadcrumb">
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(container.querySelector('.custom-breadcrumb')).toBeInTheDocument();
  });
});

describe('BreadcrumbItem', () => {
  it('renders as link when href is provided', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/home">Home</BreadcrumbItem>
      </Breadcrumb>
    );
    const link = screen.getByText('Home').closest('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
  });

  it('renders as span when href is not provided', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem>Current Page</BreadcrumbItem>
      </Breadcrumb>
    );
    const item = screen.getByText('Current Page').closest('.breadcrumb-item-content');
    expect(item).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem icon={<span>🏠</span>}>Home</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(container.querySelector('.breadcrumb-item-icon')).toBeInTheDocument();
    expect(screen.getByText('🏠')).toBeInTheDocument();
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem disabled>Disabled</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(container.querySelector('.breadcrumb-item-disabled')).toBeInTheDocument();
  });

  it('does not render link when disabled even with href', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem href="/test" disabled>
          Disabled Link
        </BreadcrumbItem>
      </Breadcrumb>
    );
    expect(container.querySelector('a')).not.toBeInTheDocument();
  });

  it('has aria-current="page" on last non-disabled item', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Current Page</BreadcrumbItem>
      </Breadcrumb>
    );
    const items = container.querySelectorAll('.breadcrumb-item');
    expect(items[1]).toHaveAttribute('aria-current', 'page');
  });

  it('calls onClick when link is clicked', () => {
    const handleClick = vi.fn();
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/test" onClick={handleClick}>
          Test
        </BreadcrumbItem>
      </Breadcrumb>
    );
    screen.getByText('Test').click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not call onClick when disabled item is clicked', () => {
    const handleClick = vi.fn();
    render(
      <Breadcrumb>
        <BreadcrumbItem disabled onClick={handleClick}>
          Disabled
        </BreadcrumbItem>
      </Breadcrumb>
    );
    screen.getByText('Disabled').click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem className="custom-item">Test</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(container.querySelector('.custom-item')).toBeInTheDocument();
  });
});
