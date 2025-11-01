import type { JSX } from 'preact';
import clsx from 'clsx';
import './Pagination.scss';

type PaginationVariant = 'text' | 'outlined' | 'contained';
type PaginationSize = 'small' | 'medium' | 'large';
type PaginationShape = 'rounded' | 'circular';

export interface PaginationProps extends Omit<JSX.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Current page number (1-based)
   */
  page: number;
  /**
   * Total number of pages
   */
  count: number;
  /**
   * Callback when page changes
   */
  onChange: (page: number) => void;
  /**
   * Variant style
   */
  variant?: PaginationVariant;
  /**
   * Size of pagination buttons
   */
  size?: PaginationSize;
  /**
   * Shape of pagination buttons
   */
  shape?: PaginationShape;
  /**
   * Number of sibling pages to show on each side
   */
  siblingCount?: number;
  /**
   * Number of boundary pages to show at start and end
   */
  boundaryCount?: number;
  /**
   * If true, show first and last page buttons
   */
  showFirstButton?: boolean;
  /**
   * If true, show previous and next page buttons
   */
  showLastButton?: boolean;
  /**
   * If true, pagination is disabled
   */
  disabled?: boolean;
  /**
   * CSS class name
   */
  className?: string;
}

export const Pagination = ({
  page,
  count,
  onChange,
  variant = 'text',
  size = 'medium',
  shape = 'circular',
  siblingCount = 1,
  boundaryCount = 1,
  showFirstButton = false,
  showLastButton = false,
  disabled = false,
  className,
  ...rest
}: PaginationProps) => {
  const handleClick = (newPage: number) => {
    if (!disabled && newPage >= 1 && newPage <= count && newPage !== page) {
      onChange(newPage);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = (): (number | 'ellipsis-start' | 'ellipsis-end')[] => {
    const items: (number | 'ellipsis-start' | 'ellipsis-end')[] = [];

    // Calculate ranges
    const startPages = Array.from({ length: Math.min(boundaryCount, count) }, (_, i) => i + 1);
    const endPages = Array.from(
      { length: Math.min(boundaryCount, count) },
      (_, i) => count - boundaryCount + i + 1
    ).filter(p => p > 0 && p <= count && p > boundaryCount);

    const siblingsStart = Math.max(
      Math.min(
        page - siblingCount,
        count - boundaryCount - siblingCount * 2 - 1
      ),
      boundaryCount + 2
    );

    const siblingsEnd = Math.min(
      Math.max(
        page + siblingCount,
        boundaryCount + siblingCount * 2 + 2
      ),
      endPages.length > 0 ? endPages[0] - 2 : count - 1
    );

    // Build the items array in order
    // Add start pages
    for (const p of startPages) {
      if (!items.includes(p)) {
        items.push(p);
      }
    }

    // Add ellipsis or gap filler
    if (siblingsStart > boundaryCount + 2) {
      items.push('ellipsis-start');
    } else if (boundaryCount + 1 < count - boundaryCount) {
      const gapPage = boundaryCount + 1;
      if (!items.includes(gapPage) && gapPage < siblingsStart) {
        items.push(gapPage);
      }
    }

    // Add sibling pages
    for (let i = siblingsStart; i <= siblingsEnd; i++) {
      if (i > boundaryCount && i < (endPages[0] || count + 1) && !items.includes(i)) {
        items.push(i);
      }
    }

    // Add ellipsis or gap filler
    if (siblingsEnd < count - boundaryCount - 1) {
      items.push('ellipsis-end');
    } else if (count - boundaryCount > boundaryCount) {
      const gapPage = count - boundaryCount;
      if (!items.includes(gapPage) && gapPage > siblingsEnd) {
        items.push(gapPage);
      }
    }

    // Add end pages
    for (const p of endPages) {
      if (!items.includes(p)) {
        items.push(p);
      }
    }

    return items;
  };

  const pageNumbers = getPageNumbers();

  const classes = clsx('pagination', className);

  return (
    <nav aria-label="pagination navigation" className={classes} {...rest}>
      <ul className="pagination-list">
        {showFirstButton && (
          <PaginationItem
            variant={variant}
            size={size}
            shape={shape}
            disabled={disabled || page === 1}
            onClick={() => handleClick(1)}
            aria-label="Go to first page"
          >
            «
          </PaginationItem>
        )}

        <PaginationItem
          variant={variant}
          size={size}
          shape={shape}
          disabled={disabled || page === 1}
          onClick={() => handleClick(page - 1)}
          aria-label="Go to previous page"
        >
          ‹
        </PaginationItem>

        {pageNumbers.map((item) => {
          if (typeof item === 'string') {
            return (
              <PaginationItem
                key={item}
                variant={variant}
                size={size}
                shape={shape}
                disabled
                aria-label="Ellipsis"
              >
                ...
              </PaginationItem>
            );
          }

          return (
            <PaginationItem
              key={item}
              variant={variant}
              size={size}
              shape={shape}
              selected={page === item}
              disabled={disabled}
              onClick={() => handleClick(item)}
              aria-label={`Go to page ${item}`}
              aria-current={page === item ? 'page' : undefined}
            >
              {item}
            </PaginationItem>
          );
        })}

        <PaginationItem
          variant={variant}
          size={size}
          shape={shape}
          disabled={disabled || page === count}
          onClick={() => handleClick(page + 1)}
          aria-label="Go to next page"
        >
          ›
        </PaginationItem>

        {showLastButton && (
          <PaginationItem
            variant={variant}
            size={size}
            shape={shape}
            disabled={disabled || page === count}
            onClick={() => handleClick(count)}
            aria-label="Go to last page"
          >
            »
          </PaginationItem>
        )}
      </ul>
    </nav>
  );
};

interface PaginationItemProps {
  variant: PaginationVariant;
  size: PaginationSize;
  shape: PaginationShape;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  children?: any;
  onClick?: (event: MouseEvent) => void;
  'aria-label'?: string;
  'aria-current'?: 'page' | undefined;
}

const PaginationItem = ({
  variant,
  size,
  shape,
  selected = false,
  disabled = false,
  className,
  children,
  onClick,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
}: PaginationItemProps) => {
  const classes = clsx(
    'pagination-item',
    `pagination-item-variant-${variant}`,
    `pagination-item-size-${size}`,
    `pagination-item-shape-${shape}`,
    {
      'pagination-item-selected': selected,
      'pagination-item-disabled': disabled,
    },
    className
  );

  const handleClick = (event: MouseEvent) => {
    if (!disabled && onClick) {
      onClick(event as any);
    }
  };

  return (
    <li className="pagination-list-item">
      <button
        type="button"
        className={classes}
        disabled={disabled}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
      >
        {children}
      </button>
    </li>
  );
};
