import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Dialog, DialogTitle, DialogContent, DialogActions } from './Dialog';

describe('Dialog', () => {
  it('renders when open is true', () => {
    render(
      <Dialog open={true} onClose={vi.fn()}>
        <DialogTitle>Test Dialog</DialogTitle>
        <DialogContent>Test content</DialogContent>
      </Dialog>
    );
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(
      <Dialog open={false} onClose={vi.fn()}>
        <DialogTitle>Test Dialog</DialogTitle>
      </Dialog>
    );
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    
    render(
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Test Dialog</DialogTitle>
      </Dialog>
    );
    
    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when Escape key is pressed if disableEscapeKeyDown is true', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    
    render(
      <Dialog open={true} onClose={handleClose} disableEscapeKeyDown={true}>
        <DialogTitle>Test Dialog</DialogTitle>
      </Dialog>
    );
    
    await user.keyboard('{Escape}');
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('applies size classes', () => {
    render(
      <Dialog open={true} onClose={vi.fn()} size="lg">
        <DialogTitle>Test</DialogTitle>
      </Dialog>
    );
    
    const dialog = document.querySelector('.dialog');
    expect(dialog).toHaveClass('dialog-size-lg');
  });

  it('applies custom className', () => {
    render(
      <Dialog open={true} onClose={vi.fn()} className="custom-dialog">
        <DialogTitle>Test</DialogTitle>
      </Dialog>
    );
    
    const dialog = document.querySelector('.dialog');
    expect(dialog).toHaveClass('custom-dialog');
  });
});

describe('DialogTitle', () => {
  it('renders children', () => {
    render(<DialogTitle>Test Title</DialogTitle>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<DialogTitle className="custom-title">Test</DialogTitle>);
    const title = container.querySelector('.dialog-title');
    expect(title).toHaveClass('custom-title');
  });
});

describe('DialogContent', () => {
  it('renders children', () => {
    render(<DialogContent>Test Content</DialogContent>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<DialogContent className="custom-content">Test</DialogContent>);
    const content = container.querySelector('.dialog-content');
    expect(content).toHaveClass('custom-content');
  });
});

describe('DialogActions', () => {
  it('renders children', () => {
    render(<DialogActions><button>Action</button></DialogActions>);
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<DialogActions className="custom-actions">Test</DialogActions>);
    const actions = container.querySelector('.dialog-actions');
    expect(actions).toHaveClass('custom-actions');
  });
});
