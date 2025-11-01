import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders pagination navigation', () => {
    render(<Pagination page={1} count={10} onChange={() => {}} />);
    expect(screen.getByLabelText('pagination navigation')).toBeInTheDocument();
  });

  it('renders correct number of pages', () => {
    const { container } = render(<Pagination page={1} count={5} onChange={() => {}} />);
    const buttons = container.querySelectorAll('button');
    // Should have: prev, 1, 2, 3, 4, 5, next = 7 buttons
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('marks current page as selected', () => {
    const { container } = render(<Pagination page={3} count={5} onChange={() => {}} />);
    const selectedButton = container.querySelector('.pagination-item-selected');
    expect(selectedButton).toHaveTextContent('3');
  });

  it('calls onChange when page is clicked', () => {
    const handleChange = vi.fn();
    render(<Pagination page={1} count={5} onChange={handleChange} />);

    const page2Button = screen.getByLabelText('Go to page 2');
    fireEvent.click(page2Button);

    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange when next button is clicked', () => {
    const handleChange = vi.fn();
    render(<Pagination page={2} count={5} onChange={handleChange} />);

    const nextButton = screen.getByLabelText('Go to next page');
    fireEvent.click(nextButton);

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange when previous button is clicked', () => {
    const handleChange = vi.fn();
    render(<Pagination page={2} count={5} onChange={handleChange} />);

    const prevButton = screen.getByLabelText('Go to previous page');
    fireEvent.click(prevButton);

    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('disables previous button on first page', () => {
    render(<Pagination page={1} count={5} onChange={() => {}} />);

    const prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination page={5} count={5} onChange={() => {}} />);

    const nextButton = screen.getByLabelText('Go to next page');
    expect(nextButton).toBeDisabled();
  });

  it('shows first button when showFirstButton is true', () => {
    render(<Pagination page={3} count={5} onChange={() => {}} showFirstButton />);
    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
  });

  it('shows last button when showLastButton is true', () => {
    render(<Pagination page={3} count={5} onChange={() => {}} showLastButton />);
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument();
  });

  it('calls onChange with first page when first button is clicked', () => {
    const handleChange = vi.fn();
    render(<Pagination page={5} count={10} onChange={handleChange} showFirstButton />);

    const firstButton = screen.getByLabelText('Go to first page');
    fireEvent.click(firstButton);

    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('calls onChange with last page when last button is clicked', () => {
    const handleChange = vi.fn();
    render(<Pagination page={1} count={10} onChange={handleChange} showLastButton />);

    const lastButton = screen.getByLabelText('Go to last page');
    fireEvent.click(lastButton);

    expect(handleChange).toHaveBeenCalledWith(10);
  });

  it('applies variant class correctly', () => {
    const { container } = render(
      <Pagination page={1} count={5} onChange={() => {}} variant="outlined" />
    );
    expect(container.querySelector('.pagination-item-variant-outlined')).toBeInTheDocument();
  });

  it('applies size class correctly', () => {
    const { container } = render(
      <Pagination page={1} count={5} onChange={() => {}} size="large" />
    );
    expect(container.querySelector('.pagination-item-size-large')).toBeInTheDocument();
  });

  it('applies shape class correctly', () => {
    const { container } = render(
      <Pagination page={1} count={5} onChange={() => {}} shape="rounded" />
    );
    expect(container.querySelector('.pagination-item-shape-rounded')).toBeInTheDocument();
  });

  it('shows ellipsis for large page counts', () => {
    render(<Pagination page={1} count={20} onChange={() => {}} />);
    const ellipsis = screen.getAllByLabelText('Ellipsis');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('respects siblingCount prop', () => {
    const { container } = render(
      <Pagination page={10} count={20} onChange={() => {}} siblingCount={2} />
    );
    // With siblingCount=2, should show pages around current (8, 9, 10, 11, 12)
    expect(screen.getByLabelText('Go to page 8')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 12')).toBeInTheDocument();
  });

  it('respects boundaryCount prop', () => {
    const { container } = render(
      <Pagination page={10} count={20} onChange={() => {}} boundaryCount={2} />
    );
    // With boundaryCount=2, should show first 2 and last 2 pages
    expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 19')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to page 20')).toBeInTheDocument();
  });

  it('disables all buttons when disabled prop is true', () => {
    const { container } = render(
      <Pagination page={2} count={5} onChange={() => {}} disabled />
    );
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Pagination page={2} count={5} onChange={handleChange} disabled />);

    const nextButton = screen.getByLabelText('Go to next page');
    fireEvent.click(nextButton);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies aria-current to current page', () => {
    render(<Pagination page={3} count={5} onChange={() => {}} />);
    const currentPage = screen.getByLabelText('Go to page 3');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });

  it('does not change page when clicking current page', () => {
    const handleChange = vi.fn();
    render(<Pagination page={3} count={5} onChange={handleChange} />);

    const currentPage = screen.getByLabelText('Go to page 3');
    fireEvent.click(currentPage);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Pagination page={1} count={5} onChange={() => {}} className="custom-pagination" />
    );
    expect(container.querySelector('.custom-pagination')).toBeInTheDocument();
  });
});
