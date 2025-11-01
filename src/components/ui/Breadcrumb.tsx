import type { ComponentChildren, JSX } from 'preact';
import clsx from 'clsx';
import './Breadcrumb.scss';

export interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * Custom separator element
   */
  separator?: ComponentChildren;
  /**
   * Maximum number of items to display
   */
  maxItems?: number;
  /**
   * Number of items to display before and after ellipsis
   */
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements (BreadcrumbItem components)
   */
  children?: ComponentChildren;
}

export const Breadcrumb = ({
  separator = '/',
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  className,
  children,
  ...rest
}: BreadcrumbProps) => {
  const classes = clsx('breadcrumb', className);

  // Convert children to array for processing
  const childrenArray = Array.isArray(children) ? children : [children];
  const items = childrenArray.filter(Boolean);

  let displayedItems = items;

  // Handle max items with ellipsis
  if (maxItems && items.length > maxItems) {
    const totalItems = items.length;
    const beforeItems = items.slice(0, itemsBeforeCollapse);
    const afterItems = items.slice(totalItems - itemsAfterCollapse);

    displayedItems = [
      ...beforeItems,
      <BreadcrumbItem key="ellipsis" disabled>
        ...
      </BreadcrumbItem>,
      ...afterItems,
    ];
  }

  // Add separators between items
  const itemsWithSeparators: any[] = [];
  displayedItems.forEach((item, index) => {
    itemsWithSeparators.push(item);
    if (index < displayedItems.length - 1) {
      itemsWithSeparators.push(
        <li key={`separator-${index}`} className="breadcrumb-separator" aria-hidden="true">
          {separator}
        </li>
      );
    }
  });

  return (
    <nav aria-label="breadcrumb" className={classes} {...rest}>
      <ol className="breadcrumb-list">{itemsWithSeparators}</ol>
    </nav>
  );
};

export interface BreadcrumbItemProps extends JSX.HTMLAttributes<HTMLLIElement> {
  /**
   * Href for link breadcrumb items
   */
  href?: string;
  /**
   * If true, item is disabled (no link)
   */
  disabled?: boolean;
  /**
   * Icon to display before the label
   */
  icon?: ComponentChildren;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

export const BreadcrumbItem = ({
  href,
  disabled = false,
  icon,
  className,
  children,
  onClick,
  ...rest
}: BreadcrumbItemProps) => {
  const classes = clsx(
    'breadcrumb-item',
    {
      'breadcrumb-item-disabled': disabled,
    },
    className
  );

  const handleClick = (event: MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (onClick) {
      onClick(event as any);
    }
  };

  const content = (
    <>
      {icon && <span className="breadcrumb-item-icon">{icon}</span>}
      <span className="breadcrumb-item-text">{children}</span>
    </>
  );

  // If href is provided and not disabled, render as link
  if (href && !disabled) {
    return (
      <li className={classes} {...rest}>
        <a href={href} className="breadcrumb-item-link" onClick={handleClick}>
          {content}
        </a>
      </li>
    );
  }

  // Otherwise render as plain text
  return (
    <li className={classes} aria-current={disabled ? undefined : 'page'} {...rest}>
      <span className="breadcrumb-item-content">{content}</span>
    </li>
  );
};
