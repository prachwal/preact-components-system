import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';

import { renderWithTheme } from '../../../test/test-utils';

import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children correctly', () => {
    const { container } = renderWithTheme(<Stack>Content</Stack>);
    expect(container.textContent).toBe('Content');
  });

  it('applies default classes', () => {
    const { container } = renderWithTheme(<Stack>Content</Stack>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('stack');
  });

  it('applies direction class', () => {
    const { container } = renderWithTheme(<Stack direction='row'>Content</Stack>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('stack-direction-row');
  });

  it('applies spacing class', () => {
    const { container } = renderWithTheme(<Stack spacing={2}>Content</Stack>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('stack-spacing-2');
  });

  it('applies alignItems class', () => {
    const { container } = renderWithTheme(<Stack alignItems='center'>Content</Stack>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('stack-align-center');
  });

  it('applies justifyContent class', () => {
    const { container } = renderWithTheme(<Stack justifyContent='space-between'>Content</Stack>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('stack-justify-space-between');
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(<Stack className='custom-class'>Content</Stack>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('stack', 'custom-class');
  });

  it('applies inline styles', () => {
    const { container } = renderWithTheme(<Stack style={{ marginTop: '10px' }}>Content</Stack>);
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ marginTop: '10px' });
  });

  it('renders as different component', () => {
    const { container } = renderWithTheme(<Stack component='section'>Content</Stack>);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('renders divider between children', () => {
    const { container } = renderWithTheme(
      <Stack divider={<span>-</span>}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stack>
    );
    const div = container.querySelector('div');
    expect(div?.children).toHaveLength(5); // 3 items + 2 dividers
    expect(div?.querySelectorAll('.stack-divider')).toHaveLength(2);
  });

  it('filters out null/undefined children', () => {
    const { container } = renderWithTheme(
      <Stack>
        <div>Item 1</div>
        {null}
        <div>Item 2</div>
        {undefined}
      </Stack>
    );
    const div = container.querySelector('div');
    expect(div?.children).toHaveLength(2);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<Stack>Accessible content</Stack>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
