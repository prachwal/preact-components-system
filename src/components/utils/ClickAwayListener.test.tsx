import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { render, screen, fireEvent } from '../../test/test-utils';

import { ClickAwayListener } from './ClickAwayListener';

describe('ClickAwayListener', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children correctly', () => {
    const { container } = render(
      <ClickAwayListener onClickAway={() => {}}>
        <div>Test content</div>
      </ClickAwayListener>
    );
    expect(container.textContent).toBe('Test content');
  });

  it('renders wrapper div', () => {
    const { container } = render(
      <ClickAwayListener onClickAway={() => {}}>
        <div>Test</div>
      </ClickAwayListener>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('calls onClickAway when clicking outside', async () => {
    const mockClickAway = vi.fn();
    render(
      <ClickAwayListener onClickAway={mockClickAway}>
        <div>Test content</div>
      </ClickAwayListener>
    );

    // Advance timers to attach event listeners
    vi.runAllTimers();

    // Click on document body (outside the component)
    fireEvent.click(document.body);
    expect(mockClickAway).toHaveBeenCalledTimes(1);
  });

  it('does not call onClickAway when clicking inside', () => {
    const mockClickAway = vi.fn();
    render(
      <ClickAwayListener onClickAway={mockClickAway}>
        <button>Click me</button>
      </ClickAwayListener>
    );

    vi.runAllTimers();

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockClickAway).not.toHaveBeenCalled();
  });

  it('does not call onClickAway when disabled', () => {
    const mockClickAway = vi.fn();
    render(
      <ClickAwayListener onClickAway={mockClickAway} disabled>
        <div>Test</div>
      </ClickAwayListener>
    );

    vi.runAllTimers();

    fireEvent.click(document.body);
    expect(mockClickAway).not.toHaveBeenCalled();
  });

  it('supports different mouse events', () => {
    const mockClickAway = vi.fn();
    render(
      <ClickAwayListener onClickAway={mockClickAway} mouseEvent='onMouseDown'>
        <div>Test</div>
      </ClickAwayListener>
    );

    vi.runAllTimers();

    fireEvent.mouseDown(document.body);
    expect(mockClickAway).toHaveBeenCalledTimes(1);
  });

  it('supports touch events', () => {
    const mockClickAway = vi.fn();
    render(
      <ClickAwayListener onClickAway={mockClickAway} touchEvent='onTouchStart'>
        <div>Test</div>
      </ClickAwayListener>
    );

    vi.runAllTimers();

    fireEvent.touchStart(document.body);
    expect(mockClickAway).toHaveBeenCalledTimes(1);
  });
});
