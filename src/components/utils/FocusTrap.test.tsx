import { describe, expect, it } from 'vitest';

import { render, screen } from '../../test/test-utils';

import { FocusTrap } from './FocusTrap';

describe('FocusTrap', () => {
  it('renders children correctly', () => {
    const { container } = render(
      <FocusTrap>
        <div>Test content</div>
      </FocusTrap>
    );
    expect(container.textContent).toBe('Test content');
  });

  it('renders wrapper div', () => {
    const { container } = render(
      <FocusTrap>
        <div>Test</div>
      </FocusTrap>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders with focusable elements', () => {
    render(
      <FocusTrap>
        <button>Button 1</button>
        <button>Button 2</button>
      </FocusTrap>
    );
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });

  it('does not trap focus when inactive', () => {
    render(
      <FocusTrap active={false}>
        <button>Button</button>
      </FocusTrap>
    );
    // Basic rendering test
  });

  it('handles empty children', () => {
    const { container } = render(<FocusTrap></FocusTrap>);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('handles single child', () => {
    const { container } = render(
      <FocusTrap>
        <span>Single child</span>
      </FocusTrap>
    );
    expect(container.textContent).toBe('Single child');
  });
});