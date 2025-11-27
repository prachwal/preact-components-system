import { describe, it, expect } from 'vitest';

import { renderWithTheme, screen } from '../../test/test-utils';

import { Main } from './Main';

describe('Main', () => {
  it('renders main element', () => {
    const { container } = renderWithTheme(<Main />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('has correct id', () => {
    const { container } = renderWithTheme(<Main />);
    const main = container.querySelector('main');
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('has correct role', () => {
    const { container } = renderWithTheme(<Main />);
    const main = container.querySelector('main');
    expect(main).toHaveAttribute('role', 'main');
  });

  it('applies app-main class', () => {
    const { container } = renderWithTheme(<Main />);
    const main = container.querySelector('main');
    expect(main).toHaveClass('app-main');
  });

  it('renders welcome title', () => {
    renderWithTheme(<Main />);
    expect(screen.getByText('Welcome to our application')).toBeInTheDocument();
  });

  it('renders welcome description', () => {
    renderWithTheme(<Main />);
    expect(
      screen.getByText('This is the main content area of the application.')
    ).toBeInTheDocument();
  });

  it('renders feature sections', () => {
    renderWithTheme(<Main />);
    expect(screen.getByText('Feature One')).toBeInTheDocument();
    expect(screen.getByText('Feature Two')).toBeInTheDocument();
    expect(screen.getByText('Feature Three')).toBeInTheDocument();
    expect(screen.getByText('Feature Four')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    renderWithTheme(<Main />);
    expect(screen.getByText('Description of feature one.')).toBeInTheDocument();
    expect(screen.getByText('Description of feature two.')).toBeInTheDocument();
    expect(screen.getByText('Description of feature three.')).toBeInTheDocument();
    expect(screen.getByText('Description of feature four.')).toBeInTheDocument();
  });
});
