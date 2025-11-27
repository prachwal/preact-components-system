import { render, screen } from '@testing-library/preact';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { Portal } from './Portal';

describe('Portal', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('renders children in a portal to document.body', () => {
    render(
      <Portal>
        <div data-testid="portal-content">Portal Content</div>
      </Portal>
    );

    const content = screen.getByTestId('portal-content');
    expect(content).toBeInTheDocument();
    expect(content.textContent).toBe('Portal Content');
  });

  it('renders children in a custom container', () => {
    const customContainer = document.createElement('div');
    document.body.appendChild(customContainer);

    render(
      <Portal container={customContainer}>
        <div data-testid="portal-content">Custom Portal</div>
      </Portal>
    );

    const content = screen.getByTestId('portal-content');
    expect(content).toBeInTheDocument();
    expect(customContainer.contains(content)).toBe(true);

    document.body.removeChild(customContainer);
  });

  it('renders inline when disabled', () => {
    render(
      <div data-testid="wrapper">
        <Portal disabled>
          <div data-testid="portal-content">Inline Content</div>
        </Portal>
      </div>
    );

    const wrapper = screen.getByTestId('wrapper');
    const content = screen.getByTestId('portal-content');
    expect(wrapper.contains(content)).toBe(true);
  });

  it('cleans up portal container on unmount', () => {
    const { unmount } = render(
      <Portal>
        <div>Content</div>
      </Portal>
    );

    const portalContainers = document.querySelectorAll('.portal-container');
    expect(portalContainers.length).toBeGreaterThan(0);

    unmount();

    const portalContainersAfter = document.querySelectorAll('.portal-container');
    expect(portalContainersAfter.length).toBe(0);
  });
});
