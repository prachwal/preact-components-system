import { describe, expect, it } from 'vitest';

import { renderWithTheme, screen } from '../../test/test-utils';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders sidebar element', () => {
    const { container } = renderWithTheme(<Sidebar isOpen={true} onClose={() => {}} />);
    expect(container.querySelector('aside')).toBeInTheDocument();
  });

  it('applies correct role and aria-label', () => {
    const { container } = renderWithTheme(<Sidebar isOpen={true} onClose={() => {}} />);
    const aside = container.querySelector('aside');
    expect(aside).toHaveAttribute('role', 'navigation');
    expect(aside).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('applies is-open class when open', () => {
    const { container } = renderWithTheme(<Sidebar isOpen={true} onClose={() => {}} />);
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('app-sidebar', 'is-open');
  });

  it('does not apply is-open class when closed', () => {
    const { container } = renderWithTheme(<Sidebar isOpen={false} onClose={() => {}} />);
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('app-sidebar');
    expect(aside).not.toHaveClass('is-open');
  });

  it('renders backdrop', () => {
    const { container } = renderWithTheme(<Sidebar isOpen={true} onClose={() => {}} />);
    expect(container.querySelector('.sidebar-backdrop')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithTheme(<Sidebar isOpen={true} onClose={() => {}} />);
    expect(screen.getByLabelText('Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Features')).toBeInTheDocument();
    expect(screen.getByLabelText('About')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact')).toBeInTheDocument();
  });

  it('renders sidebar footer', () => {
    const { container } = renderWithTheme(<Sidebar isOpen={true} onClose={() => {}} />);
    expect(container.querySelector('.sidebar-footer')).toBeInTheDocument();
  });

  it('renders version text', () => {
    renderWithTheme(<Sidebar isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Version/)).toBeInTheDocument();
  });
});