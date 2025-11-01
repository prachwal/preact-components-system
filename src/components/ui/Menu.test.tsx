import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import { Menu, MenuItem, MenuDivider } from './Menu';

describe('Menu', () => {
  let anchorEl: HTMLButtonElement;

  beforeEach(() => {
    anchorEl = document.createElement('button');
    anchorEl.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      left: 100,
      bottom: 120,
      right: 200,
      width: 100,
      height: 20,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));
    document.body.appendChild(anchorEl);
  });

  it('renders nothing when closed', () => {
    const { container } = render(
      <Menu open={false} onClose={() => {}}>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );
    expect(container.querySelector('.menu')).not.toBeInTheDocument();
  });

  it('renders menu when open', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders menu items correctly', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </Menu>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('applies variant class correctly', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl} variant="selectedMenu">
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );
    expect(document.querySelector('.menu-variant-selectedMenu')).toBeInTheDocument();
  });

  it('closes menu when item is clicked', async () => {
    const handleClose = vi.fn();
    render(
      <Menu open={true} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </Menu>
    );

    fireEvent.click(screen.getByText('Item 1'));
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('closes menu on Escape key', () => {
    const handleClose = vi.fn();
    render(
      <Menu open={true} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('closes menu on Tab key', () => {
    const handleClose = vi.fn();
    render(
      <Menu open={true} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem>Item 1</MenuItem>
      </Menu>
    );

    fireEvent.keyDown(document, { key: 'Tab' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('marks selected item correctly', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl} selectedValue="item2">
        <MenuItem value="item1">Item 1</MenuItem>
        <MenuItem value="item2">Item 2</MenuItem>
      </Menu>
    );

    const items = screen.getAllByRole('menuitem');
    expect(items[1]).toHaveClass('menu-item-selected');
  });
});

describe('MenuItem', () => {
  let anchorEl: HTMLButtonElement;

  beforeEach(() => {
    anchorEl = document.createElement('button');
    anchorEl.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      left: 100,
      bottom: 120,
      right: 200,
      width: 100,
      height: 20,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));
    document.body.appendChild(anchorEl);
  });

  it('renders menu item with text', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem>Test Item</MenuItem>
      </Menu>
    );
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('renders menu item with icon', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem icon={<span>★</span>}>Item</MenuItem>
      </Menu>
    );
    expect(document.querySelector('.menu-item-icon')).toBeInTheDocument();
  });

  it('disables menu item when disabled prop is true', () => {
    const handleClick = vi.fn();
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem disabled onClick={handleClick}>
          Disabled Item
        </MenuItem>
      </Menu>
    );

    const item = screen.getByText('Disabled Item').parentElement;
    expect(item).toHaveClass('menu-item-disabled');
    expect(item).toHaveAttribute('aria-disabled', 'true');
    
    fireEvent.click(item!);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies selected class when selected prop is true', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem selected>Selected Item</MenuItem>
      </Menu>
    );

    const item = screen.getByText('Selected Item').parentElement;
    expect(item).toHaveClass('menu-item-selected');
  });

  it('applies divider class when divider prop is true', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem divider>Item with Divider</MenuItem>
      </Menu>
    );

    const item = screen.getByText('Item with Divider').parentElement;
    expect(item).toHaveClass('menu-item-divider');
  });

  it('handles keyboard navigation with ArrowDown', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </Menu>
    );

    const items = screen.getAllByRole('menuitem');
    items[0].focus();
    
    fireEvent.keyDown(items[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(items[1]);
  });

  it('handles keyboard navigation with ArrowUp', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </Menu>
    );

    const items = screen.getAllByRole('menuitem');
    items[1].focus();
    
    fireEvent.keyDown(items[1], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(items[0]);
  });

  it('handles keyboard navigation with Home', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </Menu>
    );

    const items = screen.getAllByRole('menuitem');
    items[2].focus();
    
    fireEvent.keyDown(items[2], { key: 'Home' });
    expect(document.activeElement).toBe(items[0]);
  });

  it('handles keyboard navigation with End', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </Menu>
    );

    const items = screen.getAllByRole('menuitem');
    items[0].focus();
    
    fireEvent.keyDown(items[0], { key: 'End' });
    expect(document.activeElement).toBe(items[2]);
  });

  it('handles keyboard activation with Enter', async () => {
    const handleClick = vi.fn();
    const handleClose = vi.fn();
    render(
      <Menu open={true} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={handleClick}>Item 1</MenuItem>
      </Menu>
    );

    const item = screen.getByRole('menuitem');
    fireEvent.keyDown(item, { key: 'Enter' });
    
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalled();
    });
  });

  it('handles keyboard activation with Space', async () => {
    const handleClick = vi.fn();
    const handleClose = vi.fn();
    render(
      <Menu open={true} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={handleClick}>Item 1</MenuItem>
      </Menu>
    );

    const item = screen.getByRole('menuitem');
    fireEvent.keyDown(item, { key: ' ' });
    
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalled();
    });
  });
});

describe('MenuDivider', () => {
  let anchorEl: HTMLButtonElement;

  beforeEach(() => {
    anchorEl = document.createElement('button');
    anchorEl.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      left: 100,
      bottom: 120,
      right: 200,
      width: 100,
      height: 20,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));
    document.body.appendChild(anchorEl);
  });

  it('renders menu divider', () => {
    render(
      <Menu open={true} onClose={() => {}} anchorEl={anchorEl}>
        <MenuItem>Item 1</MenuItem>
        <MenuDivider />
        <MenuItem>Item 2</MenuItem>
      </Menu>
    );
    expect(document.querySelector('.menu-divider')).toBeInTheDocument();
  });
});
