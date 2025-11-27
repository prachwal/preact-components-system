import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '../../test/test-utils';

import { TextField } from './TextField';

describe('TextField', () => {
  it('renders input correctly', () => {
    render(<TextField label='Test Label' />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<TextField placeholder='Enter text' />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders as multiline textarea', () => {
    const { container } = render(<TextField multiline label='Message' />);
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(<TextField variant='filled' />);
    expect(container.querySelector('.textfield')).toHaveClass('textfield-variant-filled');
  });

  it('applies size classes correctly', () => {
    const { container } = render(<TextField size='large' />);
    expect(container.querySelector('.textfield')).toHaveClass('textfield-size-large');
  });

  it('applies color classes correctly', () => {
    const { container } = render(<TextField color='secondary' />);
    expect(container.querySelector('.textfield')).toHaveClass('textfield-color-secondary');
  });

  it('shows error state correctly', () => {
    const { container } = render(<TextField error helperText='Error message' />);
    expect(container.querySelector('.textfield')).toHaveClass('textfield-error');
    expect(screen.getByText('Error message')).toHaveClass('textfield-helper-text-error');
  });

  it('shows success state correctly', () => {
    const { container } = render(<TextField success helperText='Success message' />);
    expect(container.querySelector('.textfield')).toHaveClass('textfield-success');
    expect(screen.getByText('Success message')).toHaveClass('textfield-helper-text-success');
  });

  it('shows warning state correctly', () => {
    const { container } = render(<TextField warning helperText='Warning message' />);
    expect(container.querySelector('.textfield')).toHaveClass('textfield-warning');
    expect(screen.getByText('Warning message')).toHaveClass('textfield-helper-text-warning');
  });

  it('is disabled when disabled prop is true', () => {
    render(<TextField disabled label='Disabled' />);
    const input = screen.getByLabelText('Disabled');
    expect(input).toBeDisabled();
  });

  it('shows required indicator', () => {
    render(<TextField required label='Required Field' />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders with start adornment', () => {
    const { container } = render(<TextField startAdornment={<span>$</span>} />);
    expect(container.querySelector('.textfield-start-adornment')).toBeInTheDocument();
  });

  it('renders with end adornment', () => {
    const { container } = render(<TextField endAdornment={<span>kg</span>} />);
    expect(container.querySelector('.textfield-end-adornment')).toBeInTheDocument();
  });

  it('applies full width class correctly', () => {
    const { container } = render(<TextField fullWidth />);
    expect(container.querySelector('.textfield')).toHaveClass('textfield-full-width');
  });

  it('renders helper text', () => {
    render(<TextField helperText='This is helper text' />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(<TextField onChange={handleChange} label='Test' />);
    const input = screen.getByLabelText('Test') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('sets textarea rows correctly', () => {
    const { container } = render(<TextField multiline rows={10} />);
    const textarea = container.querySelector('textarea');
    expect(textarea).toHaveAttribute('rows', '10');
  });

  it('is readonly when readOnly prop is true', () => {
    render(<TextField readOnly label='Readonly' />);
    const input = screen.getByLabelText('Readonly');
    expect(input).toHaveAttribute('readOnly');
  });

  it('sets correct aria attributes for error state', () => {
    render(<TextField error helperText='Error' label='Test' />);
    const input = screen.getByLabelText('Test');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });
});
