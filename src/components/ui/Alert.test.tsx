import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '../../test/test-utils';

import { Alert, AlertTitle } from './Alert';

describe('Alert', () => {
  it('renders children correctly', () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('applies severity class', () => {
    const { container } = render(<Alert severity="error">Error message</Alert>);
    expect(container.querySelector('.alert-severity-error')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Alert variant="filled">Message</Alert>);
    expect(container.querySelector('.alert-variant-filled')).toBeInTheDocument();
  });

  it('renders close button when onClose is provided', () => {
    const onClose = vi.fn();
    render(<Alert onClose={onClose}>Message</Alert>);
    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Alert onClose={onClose}>Message</Alert>);
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders default icon for each severity', () => {
    const severities = ['error', 'warning', 'info', 'success'] as const;
    severities.forEach(severity => {
      const { container } = render(<Alert severity={severity}>Message</Alert>);
      expect(container.querySelector('.alert-icon')).toBeInTheDocument();
    });
  });

  it('hides icon when icon prop is false', () => {
    const { container } = render(<Alert icon={false}>Message</Alert>);
    expect(container.querySelector('.alert-icon')).not.toBeInTheDocument();
  });

  it('renders custom icon', () => {
    const { container } = render(
      <Alert icon={<span data-testid="custom-icon">!</span>}>Message</Alert>
    );
    expect(container.querySelector('[data-testid="custom-icon"]')).toBeInTheDocument();
  });

  it('renders action element', () => {
    render(<Alert action={<button>Action</button>}>Message</Alert>);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});

describe('AlertTitle', () => {
  it('renders children correctly', () => {
    render(<AlertTitle>Title</AlertTitle>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<AlertTitle>Title</AlertTitle>);
    expect(container.querySelector('.alert-title')).toBeInTheDocument();
  });
});
