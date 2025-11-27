import { render, screen, fireEvent } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';

import { Switch } from './Switch';

describe('Switch', () => {
  it('renders correctly', () => {
    const { container } = render(<Switch />);
    expect(container.querySelector('input[type="checkbox"][role="switch"]')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { container } = render(<Switch size="large" />);
    expect(container.querySelector('.switch')).toHaveClass('switch-size-large');
  });

  it('applies color classes correctly', () => {
    const { container } = render(<Switch color="secondary" />);
    expect(container.querySelector('.switch')).toHaveClass('switch-color-secondary');
  });

  it('is checked when checked prop is true', () => {
    render(<Switch checked label="Checked" />);
    const switchInput = screen.getByLabelText('Checked') as HTMLInputElement;
    expect(switchInput).toBeChecked();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Switch disabled label="Disabled" />);
    const switchInput = screen.getByLabelText('Disabled');
    expect(switchInput).toBeDisabled();
  });

  it('shows required indicator', () => {
    render(<Switch required label="Required Field" />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(<Switch onChange={handleChange} label="Test" />);
    const switchInput = screen.getByLabelText('Test');
    fireEvent.click(switchInput);
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies label placement correctly', () => {
    const { container } = render(<Switch labelPlacement="start" label="Start" />);
    expect(container.querySelector('.switch')).toHaveClass('switch-label-start');
  });

  it('applies default checked state', () => {
    render(<Switch defaultChecked label="Default Checked" />);
    const switchInput = screen.getByLabelText('Default Checked') as HTMLInputElement;
    expect(switchInput).toBeChecked();
  });

  it('sets name attribute correctly', () => {
    render(<Switch name="notifications" label="Notifications" />);
    const switchInput = screen.getByLabelText('Notifications');
    expect(switchInput).toHaveAttribute('name', 'notifications');
  });

  it('sets value attribute correctly', () => {
    render(<Switch value="enabled" label="Enable" />);
    const switchInput = screen.getByLabelText('Enable');
    expect(switchInput).toHaveAttribute('value', 'enabled');
  });

  it('applies custom id', () => {
    render(<Switch id="custom-id" label="Custom" />);
    const switchInput = screen.getByLabelText('Custom');
    expect(switchInput).toHaveAttribute('id', 'custom-id');
  });

  it('has role switch', () => {
    render(<Switch label="Test Switch" />);
    const switchInput = screen.getByLabelText('Test Switch');
    expect(switchInput).toHaveAttribute('role', 'switch');
  });

  it('sets correct aria-checked attribute', () => {
    render(<Switch checked label="Checked Switch" />);
    const switchInput = screen.getByLabelText('Checked Switch');
    expect(switchInput).toHaveAttribute('aria-checked', 'true');
  });
});
