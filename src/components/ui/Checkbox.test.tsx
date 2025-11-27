import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '../../test/test-utils';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const { container } = render(<Checkbox />);
    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Checkbox label='Accept terms' />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { container } = render(<Checkbox size='large' />);
    expect(container.querySelector('.checkbox')).toHaveClass('checkbox-size-large');
  });

  it('applies color classes correctly', () => {
    const { container } = render(<Checkbox color='secondary' />);
    expect(container.querySelector('.checkbox')).toHaveClass('checkbox-color-secondary');
  });

  it('is checked when checked prop is true', () => {
    render(<Checkbox checked label='Checked' />);
    const checkbox = screen.getByLabelText('Checked') as HTMLInputElement;
    expect(checkbox).toBeChecked();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox disabled label='Disabled' />);
    const checkbox = screen.getByLabelText('Disabled');
    expect(checkbox).toBeDisabled();
  });

  it('shows required indicator', () => {
    render(<Checkbox required label='Required Field' />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} label='Test' />);
    const checkbox = screen.getByLabelText('Test');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies label placement correctly', () => {
    const { container } = render(<Checkbox labelPlacement='start' label='Start' />);
    expect(container.querySelector('.checkbox')).toHaveClass('checkbox-label-start');
  });

  it('sets indeterminate state correctly', () => {
    const { container } = render(<Checkbox indeterminate label='Indeterminate' />);
    expect(container.querySelector('.checkbox')).toHaveClass('checkbox-indeterminate');
  });

  it('sets correct aria-checked for indeterminate state', () => {
    render(<Checkbox indeterminate label='Indeterminate' />);
    const checkbox = screen.getByLabelText('Indeterminate');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('applies default checked state', () => {
    render(<Checkbox defaultChecked label='Default Checked' />);
    const checkbox = screen.getByLabelText('Default Checked') as HTMLInputElement;
    expect(checkbox).toBeChecked();
  });

  it('sets name attribute correctly', () => {
    render(<Checkbox name='agree' label='Agree' />);
    const checkbox = screen.getByLabelText('Agree');
    expect(checkbox).toHaveAttribute('name', 'agree');
  });

  it('sets value attribute correctly', () => {
    render(<Checkbox value='yes' label='Yes' />);
    const checkbox = screen.getByLabelText('Yes');
    expect(checkbox).toHaveAttribute('value', 'yes');
  });

  it('applies custom id', () => {
    render(<Checkbox id='custom-id' label='Custom' />);
    const checkbox = screen.getByLabelText('Custom');
    expect(checkbox).toHaveAttribute('id', 'custom-id');
  });
});
