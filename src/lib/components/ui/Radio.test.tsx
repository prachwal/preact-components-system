import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '../../../test/test-utils';

import { Radio, RadioGroup } from './Radio';

describe('Radio', () => {
  it('renders correctly', () => {
    const { container } = render(<Radio />);
    expect(container.querySelector('input[type="radio"]')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Radio label='Option A' />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { container } = render(<Radio size='large' />);
    expect(container.querySelector('.radio')).toHaveClass('radio-size-large');
  });

  it('applies color classes correctly', () => {
    const { container } = render(<Radio color='secondary' />);
    expect(container.querySelector('.radio')).toHaveClass('radio-color-secondary');
  });

  it('is checked when checked prop is true', () => {
    render(<Radio checked label='Checked' />);
    const radio = screen.getByLabelText('Checked') as HTMLInputElement;
    expect(radio).toBeChecked();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Radio disabled label='Disabled' />);
    const radio = screen.getByLabelText('Disabled');
    expect(radio).toBeDisabled();
  });

  it('shows required indicator', () => {
    render(<Radio required label='Required Field' />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(<Radio onChange={handleChange} label='Test' />);
    const radio = screen.getByLabelText('Test');
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies label placement correctly', () => {
    const { container } = render(<Radio labelPlacement='start' label='Start' />);
    expect(container.querySelector('.radio')).toHaveClass('radio-label-start');
  });

  it('applies default checked state', () => {
    render(<Radio defaultChecked label='Default Checked' />);
    const radio = screen.getByLabelText('Default Checked') as HTMLInputElement;
    expect(radio).toBeChecked();
  });

  it('sets name attribute correctly', () => {
    render(<Radio name='option' label='Option' />);
    const radio = screen.getByLabelText('Option');
    expect(radio).toHaveAttribute('name', 'option');
  });

  it('sets value attribute correctly', () => {
    render(<Radio value='yes' label='Yes' />);
    const radio = screen.getByLabelText('Yes');
    expect(radio).toHaveAttribute('value', 'yes');
  });

  it('applies custom id', () => {
    render(<Radio id='custom-id' label='Custom' />);
    const radio = screen.getByLabelText('Custom');
    expect(radio).toHaveAttribute('id', 'custom-id');
  });
});

describe('RadioGroup', () => {
  it('renders correctly', () => {
    const { container } = render(
      <RadioGroup name='test'>
        <Radio value='1' label='Option 1' />
        <Radio value='2' label='Option 2' />
      </RadioGroup>
    );
    expect(container.querySelector('.radio-group')).toBeInTheDocument();
  });

  it('applies row class when row prop is true', () => {
    const { container } = render(
      <RadioGroup name='test' row>
        <Radio value='1' label='Option 1' />
      </RadioGroup>
    );
    expect(container.querySelector('.radio-group')).toHaveClass('radio-group-row');
  });

  it('has radiogroup role', () => {
    const { container } = render(
      <RadioGroup name='test'>
        <Radio value='1' label='Option 1' />
      </RadioGroup>
    );
    expect(container.querySelector('[role="radiogroup"]')).toBeInTheDocument();
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup name='test' onChange={handleChange}>
        <Radio value='1' label='Option 1' />
        <Radio value='2' label='Option 2' />
      </RadioGroup>
    );
    const radio = screen.getByLabelText('Option 1');
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledWith('1');
  });
});
