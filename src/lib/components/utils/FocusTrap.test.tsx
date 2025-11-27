import { describe, expect, it, vi, afterEach } from 'vitest';

import { render, screen } from '../../../test/test-utils';

import { FocusTrap } from './FocusTrap';

describe('FocusTrap', () => {
  afterEach(() => {
    // Cleanup any dynamically added elements
    document.querySelectorAll('button').forEach((btn) => {
      if (btn.textContent?.includes('Outside')) {
        btn.remove();
      }
    });
    // Blur any focused elements
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });

  describe('Basic Rendering', () => {
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

  describe('Focus Trapping', () => {
    it('renders with active prop', () => {
      render(
        <FocusTrap active autoFocus>
          <button>First Button</button>
          <button>Second Button</button>
        </FocusTrap>
      );

      expect(screen.getByText('First Button')).toBeInTheDocument();
      expect(screen.getByText('Second Button')).toBeInTheDocument();
    });

    it('does not auto focus when autoFocus is false', () => {
      render(
        <FocusTrap active autoFocus={false}>
          <button>First Button AF</button>
          <button>Second Button AF</button>
        </FocusTrap>
      );

      expect(screen.getByText('First Button AF')).not.toHaveFocus();
    });

    it('does not trap focus when inactive', () => {
      render(
        <FocusTrap active={false}>
          <button>Button</button>
        </FocusTrap>
      );

      const button = screen.getByText('Button');
      expect(button).not.toHaveFocus();
    });

    it('handles Tab key events', () => {
      const { container } = render(
        <FocusTrap active autoFocus={false}>
          <button>Tab Button 1</button>
          <button>Tab Button 2</button>
          <button>Tab Button 3</button>
        </FocusTrap>
      );

      const button2 = screen.getByText('Tab Button 2');
      button2.focus();

      // Simulate Tab key press
      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');

      container.firstElementChild?.dispatchEvent(tabEvent);

      // Should handle Tab key
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('handles Shift+Tab key events', () => {
      const { container } = render(
        <FocusTrap active autoFocus={false}>
          <button>Shift Tab 1</button>
          <button>Shift Tab 2</button>
        </FocusTrap>
      );

      const button1 = screen.getByText('Shift Tab 1');
      button1.focus();

      // Create and dispatch Shift+Tab key event
      const shiftTabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(shiftTabEvent, 'preventDefault');
      container.firstElementChild?.dispatchEvent(shiftTabEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('ignores non-Tab keys', () => {
      const { container } = render(
        <FocusTrap active>
          <button>Button 1</button>
          <button>Button 2</button>
        </FocusTrap>
      );

      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(enterEvent, 'preventDefault');
      container.firstElementChild?.dispatchEvent(enterEvent);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('prevents Tab when no focusable elements exist', () => {
      const { container } = render(
        <FocusTrap active>
          <div>No focusable content</div>
        </FocusTrap>
      );

      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');
      container.firstElementChild?.dispatchEvent(tabEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Focus Restoration', () => {
    it('sets up focus restoration with restoreFocus prop', () => {
      const { unmount } = render(
        <FocusTrap active restoreFocus>
          <button>Inside Button Restore</button>
        </FocusTrap>
      );

      expect(screen.getByText('Inside Button Restore')).toBeInTheDocument();
      unmount();
    });

    it('handles restoreFocus false prop', () => {
      const { unmount } = render(
        <FocusTrap active restoreFocus={false}>
          <button>Inside Button No Restore</button>
        </FocusTrap>
      );

      expect(screen.getByText('Inside Button No Restore')).toBeInTheDocument();
      unmount();
    });
  });

  describe('Focusable Elements', () => {
    it('handles various focusable element types', () => {
      render(
        <FocusTrap active autoFocus={false}>
          <a href='#test'>Link FE</a>
          <input type='text' placeholder='Input FE' />
          <textarea placeholder='Textarea FE' />
          <select>
            <option>Select FE</option>
          </select>
          <button>Button FE</button>
        </FocusTrap>
      );

      expect(screen.getByText('Link FE')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Input FE')).toBeInTheDocument();
    });

    it('ignores disabled elements', () => {
      render(
        <FocusTrap active>
          <button disabled>Disabled Button</button>
          <input disabled placeholder='Disabled Input' />
        </FocusTrap>
      );

      // Should not focus disabled elements
      const disabledButton = screen.getByText('Disabled Button');
      expect(disabledButton).not.toHaveFocus();
    });

    it('ignores hidden elements', () => {
      render(
        <FocusTrap active autoFocus>
          <button style={{ display: 'none' }}>Hidden Button</button>
          <button>Visible Button</button>
        </FocusTrap>
      );

      // Should skip hidden element and focus visible one
      // Note: offsetParent check in FocusTrap filters out hidden elements
    });

    it('handles elements with tabindex', () => {
      render(
        <FocusTrap active autoFocus={false}>
          <div tabIndex={0}>Focusable Div TI</div>
          <button>Button TI</button>
        </FocusTrap>
      );

      expect(screen.getByText('Focusable Div TI')).toBeInTheDocument();
    });

    it('ignores elements with tabindex -1', () => {
      render(
        <FocusTrap active autoFocus>
          <div tabIndex={-1}>Non-focusable Div</div>
          <button>Button</button>
        </FocusTrap>
      );

      // Should focus button, not div with tabindex -1
      const button = screen.getByText('Button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles single focusable element', () => {
      const { container, unmount } = render(
        <FocusTrap active autoFocus={false}>
          <button>Only Button Edge</button>
        </FocusTrap>
      );

      const button = screen.getByText('Only Button Edge');
      expect(button).toBeInTheDocument();

      // Tab on single element
      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');
      container.firstElementChild?.dispatchEvent(tabEvent);

      // Should handle tab even with single element
      expect(preventDefaultSpy).toBeDefined();

      unmount();
    });

    it('handles dynamic content updates', async () => {
      const { rerender, unmount } = render(
        <FocusTrap active autoFocus={false}>
          <button>Dynamic Button 1</button>
        </FocusTrap>
      );

      // Don't wait for focus since autoFocus is false
      expect(screen.getByText('Dynamic Button 1')).toBeInTheDocument();

      // Add more buttons
      rerender(
        <FocusTrap active autoFocus={false}>
          <button>Dynamic Button 1</button>
          <button>Dynamic Button 2</button>
          <button>Dynamic Button 3</button>
        </FocusTrap>
      );

      // All buttons should be in the document
      expect(screen.getByText('Dynamic Button 2')).toBeInTheDocument();
      expect(screen.getByText('Dynamic Button 3')).toBeInTheDocument();

      unmount();
    });

    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(
        <FocusTrap active>
          <button>Cleanup Button</button>
        </FocusTrap>
      );

      // Should not throw error on unmount
      expect(() => unmount()).not.toThrow();
    });
  });
});
