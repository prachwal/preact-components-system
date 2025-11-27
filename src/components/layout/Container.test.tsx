import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';

import { render } from '../../test/test-utils';

import { Container } from './Container';

describe('Container', () => {
  it('renders children correctly', () => {
    const { container } = render(<Container>Test content</Container>);
    expect(container.textContent).toBe('Test content');
  });

  it('applies default classes', () => {
    const { container } = render(<Container>Content</Container>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('container');
    expect(div).toHaveClass('container-max-width-lg');
  });

  it('applies maxWidth class correctly', () => {
    const { container } = render(<Container maxWidth="sm">Content</Container>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('container-max-width-sm');
  });

  it('applies fixed class when fixed is true', () => {
    const { container } = render(<Container fixed>Content</Container>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('container-fixed');
  });

  it('applies disableGutters class when disableGutters is true', () => {
    const { container } = render(<Container disableGutters>Content</Container>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('container-disable-gutters');
  });

  it('applies custom className', () => {
    const { container } = render(<Container className="custom-class">Content</Container>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('container', 'custom-class');
  });

  it('applies inline styles', () => {
    const { container } = render(<Container style={{ marginTop: '10px' }}>Content</Container>);
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ marginTop: '10px' });
  });

  it('renders as different component', () => {
    const { container } = render(<Container component="section">Content</Container>);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('does not apply maxWidth class when maxWidth is false', () => {
    const { container } = render(<Container maxWidth={false}>Content</Container>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('container');
    expect(div).not.toHaveClass('container-max-width-lg');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Container>Accessible content</Container>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});