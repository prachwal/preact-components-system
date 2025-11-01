import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders with label', () => {
    render(<Chip label="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(<Chip label="Test" variant="outlined" />);
    const chip = container.querySelector('.chip');
    expect(chip).toHaveClass('chip-outlined');
  });

  it('applies color classes', () => {
    const { container } = render(<Chip label="Test" color="primary" />);
    const chip = container.querySelector('.chip');
    expect(chip).toHaveClass('chip-color-primary');
  });

  it('applies size classes', () => {
    const { container } = render(<Chip label="Test" size="small" />);
    const chip = container.querySelector('.chip');
    expect(chip).toHaveClass('chip-small');
  });

  it('renders with icon', () => {
    const { container } = render(<Chip label="Test" icon={<span>★</span>} />);
    expect(container.textContent).toContain('★');
  });

  it('renders delete icon when onDelete is provided', () => {
    const { container } = render(<Chip label="Test" onDelete={vi.fn()} />);
    const deleteIcon = container.querySelector('.chip-delete-icon');
    expect(deleteIcon).toBeInTheDocument();
  });

  it('calls onDelete when delete icon is clicked', async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();
    const { container } = render(<Chip label="Test" onDelete={handleDelete} />);
    
    const deleteIcon = container.querySelector('.chip-delete-icon');
    if (deleteIcon) {
      await user.click(deleteIcon);
      expect(handleDelete).toHaveBeenCalledTimes(1);
    }
  });

  it('is clickable when clickable prop is true', () => {
    const { container } = render(<Chip label="Test" clickable />);
    const chip = container.querySelector('.chip');
    expect(chip).toHaveClass('chip-clickable');
    expect(chip).toHaveAttribute('role', 'button');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const { container } = render(<Chip label="Test" onClick={handleClick} />);
    
    const chip = container.querySelector('.chip');
    if (chip) {
      await user.click(chip);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });
});
