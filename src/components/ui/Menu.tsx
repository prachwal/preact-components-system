import type { ComponentChildren, JSX } from 'preact';
import { createContext } from 'preact';
import { useContext, useState, useRef, useEffect } from 'preact/hooks';
import clsx from 'clsx';
import { Portal } from '../utils/Portal';
import { ClickAwayListener } from '../utils/ClickAwayListener';

type MenuVariant = 'menu' | 'selectedMenu';

interface MenuContextValue {
  onItemClick?: (event: MouseEvent) => void;
  selectedValue?: string | number;
}

const MenuContext = createContext<MenuContextValue>({});

export interface MenuProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * If true, the menu is visible
   */
  open: boolean;
  /**
   * Callback when menu closes
   */
  onClose: () => void;
  /**
   * Anchor element for positioning
   */
  anchorEl?: HTMLElement | null;
  /**
   * Menu variant
   */
  variant?: MenuVariant;
  /**
   * Selected value (for selectedMenu variant)
   */
  selectedValue?: string | number;
  /**
   * If true, auto focus first item when opened
   */
  autoFocus?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements (MenuItem components)
   */
  children?: ComponentChildren;
}

export const Menu = ({
  open,
  onClose,
  anchorEl,
  variant = 'menu',
  selectedValue,
  autoFocus = true,
  className,
  children,
  ...rest
}: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (open && anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      const menuHeight = menuRef.current?.offsetHeight || 0;
      const menuWidth = menuRef.current?.offsetWidth || 0;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let top = rect.bottom;
      let left = rect.left;

      // Flip menu if it goes below viewport
      if (top + menuHeight > viewportHeight) {
        top = rect.top - menuHeight;
      }

      // Flip menu if it goes beyond right edge
      if (left + menuWidth > viewportWidth) {
        left = rect.right - menuWidth;
      }

      // Ensure menu stays within viewport
      top = Math.max(0, Math.min(top, viewportHeight - menuHeight));
      left = Math.max(0, Math.min(left, viewportWidth - menuWidth));

      setPosition({ top, left });
    }
  }, [open, anchorEl]);

  useEffect(() => {
    if (open && autoFocus && menuRef.current) {
      const firstItem = menuRef.current.querySelector('[role="menuitem"]:not([aria-disabled="true"])') as HTMLElement;
      if (firstItem) {
        firstItem.focus();
      }
    }
  }, [open, autoFocus]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const handleItemClick = (_event: MouseEvent) => {
    onClose();
  };

  if (!open) {
    return null;
  }

  const classes = clsx('menu', `menu-variant-${variant}`, className);

  const menuContent = (
    <ClickAwayListener onClickAway={onClose} mouseEvent="onMouseDown">
      <div
        ref={menuRef}
        role="menu"
        className={classes}
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
        {...rest}
      >
        <MenuContext.Provider value={{ onItemClick: handleItemClick, selectedValue }}>
          <ul className="menu-list">{children}</ul>
        </MenuContext.Provider>
      </div>
    </ClickAwayListener>
  );

  return <Portal>{menuContent}</Portal>;
};

export interface MenuItemProps extends Omit<JSX.HTMLAttributes<HTMLLIElement>, 'value'> {
  /**
   * Menu item value (for selection)
   */
  value?: string | number;
  /**
   * If true, menu item is disabled
   */
  disabled?: boolean;
  /**
   * Icon to display
   */
  icon?: ComponentChildren;
  /**
   * If true, menu item is selected
   */
  selected?: boolean;
  /**
   * If true, shows divider after item
   */
  divider?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

export const MenuItem = ({
  value,
  disabled = false,
  icon,
  selected: selectedProp,
  divider = false,
  className,
  children,
  onClick,
  ...rest
}: MenuItemProps) => {
  const context = useContext(MenuContext);
  const { onItemClick, selectedValue } = context;
  const isSelected = selectedProp || (value !== undefined && value === selectedValue);

  const handleClick = (event: MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (onClick) {
      onClick(event as any);
    }

    if (onItemClick) {
      onItemClick(event);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const currentTarget = event.currentTarget as HTMLElement;
    const items = Array.from(
      currentTarget.parentElement?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])') || []
    ) as HTMLElement[];
    const currentIndex = items.indexOf(currentTarget);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      items[items.length - 1]?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      currentTarget.click();
    }
  };

  const classes = clsx(
    'menu-item',
    {
      'menu-item-disabled': disabled,
      'menu-item-selected': isSelected,
      'menu-item-divider': divider,
    },
    className
  );

  return (
    <li
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown as any}
      {...rest}
    >
      {icon && <span className="menu-item-icon">{icon}</span>}
      <span className="menu-item-text">{children}</span>
    </li>
  );
};

export interface MenuDividerProps extends JSX.HTMLAttributes<HTMLHRElement> {
  /**
   * CSS class name
   */
  className?: string;
}

export const MenuDivider = ({ className, ...rest }: MenuDividerProps) => {
  return <hr className={clsx('menu-divider', className)} {...rest} />;
};
