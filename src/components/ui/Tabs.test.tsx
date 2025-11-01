import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { Tabs, Tab, TabPanel } from './Tabs';

describe('Tabs', () => {
  it('renders tabs correctly', () => {
    const { container } = render(
      <Tabs value={0} onChange={() => {}}>
        <Tab value={0} label="Tab 1" />
        <Tab value={1} label="Tab 2" />
        <Tab value={2} label="Tab 3" />
      </Tabs>
    );
    expect(container.querySelector('.tabs')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(
      <Tabs value={0} onChange={() => {}} variant="fullWidth">
        <Tab value={0} label="Tab 1" />
      </Tabs>
    );
    expect(container.querySelector('.tabs-variant-fullWidth')).toBeInTheDocument();
  });

  it('applies orientation classes correctly', () => {
    const { container } = render(
      <Tabs value={0} onChange={() => {}} orientation="vertical">
        <Tab value={0} label="Tab 1" />
      </Tabs>
    );
    expect(container.querySelector('.tabs-orientation-vertical')).toBeInTheDocument();
  });

  it('applies centered class when centered prop is true', () => {
    const { container } = render(
      <Tabs value={0} onChange={() => {}} centered>
        <Tab value={0} label="Tab 1" />
      </Tabs>
    );
    expect(container.querySelector('.tabs-centered')).toBeInTheDocument();
  });

  it('calls onChange when tab is clicked', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Tabs value={0} onChange={handleChange}>
        <Tab value={0} label="Tab 1" />
        <Tab value={1} label="Tab 2" />
      </Tabs>
    );

    const secondTab = container.querySelectorAll('.tab')[1];
    fireEvent.click(secondTab);

    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('marks active tab correctly', () => {
    const { container } = render(
      <Tabs value={1} onChange={() => {}}>
        <Tab value={0} label="Tab 1" />
        <Tab value={1} label="Tab 2" />
        <Tab value={2} label="Tab 3" />
      </Tabs>
    );

    const tabs = container.querySelectorAll('.tab');
    expect(tabs[1]).toHaveClass('tab-active');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('renders indicator with correct color', () => {
    const { container } = render(
      <Tabs value={0} onChange={() => {}} indicatorColor="secondary">
        <Tab value={0} label="Tab 1" />
      </Tabs>
    );
    expect(container.querySelector('.tabs-indicator-secondary')).toBeInTheDocument();
  });

  it('disables tab when disabled prop is true', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Tabs value={0} onChange={handleChange}>
        <Tab value={0} label="Tab 1" />
        <Tab value={1} label="Tab 2" disabled />
      </Tabs>
    );

    const disabledTab = container.querySelectorAll('.tab')[1];
    expect(disabledTab).toHaveClass('tab-disabled');
    expect(disabledTab).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(disabledTab);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders tab with icon at start position', () => {
    const { container } = render(
      <Tabs value={0} onChange={() => {}}>
        <Tab value={0} label="Tab 1" icon={<span>★</span>} iconPosition="start" />
      </Tabs>
    );
    expect(container.querySelector('.tab-icon-start')).toBeInTheDocument();
    expect(container.querySelector('.tab-icon')).toBeInTheDocument();
  });

  it('renders tab with icon at top position', () => {
    const { container } = render(
      <Tabs value={0} onChange={() => {}}>
        <Tab value={0} label="Tab 1" icon={<span>★</span>} iconPosition="top" />
      </Tabs>
    );
    expect(container.querySelector('.tab-icon-top')).toBeInTheDocument();
  });

  it('sets correct tabIndex for active and inactive tabs', () => {
    const { container } = render(
      <Tabs value={0} onChange={() => {}}>
        <Tab value={0} label="Tab 1" />
        <Tab value={1} label="Tab 2" />
      </Tabs>
    );

    const tabs = container.querySelectorAll('.tab');
    expect(tabs[0]).toHaveAttribute('tabIndex', '0');
    expect(tabs[1]).toHaveAttribute('tabIndex', '-1');
  });

  it('throws error when Tab is used outside Tabs', () => {
    expect(() => {
      render(<Tab value={0} label="Tab" />);
    }).toThrow('Tab must be used within Tabs component');
  });
});

describe('TabPanel', () => {
  it('renders active panel', () => {
    render(
      <TabPanel value={0} selectedValue={0}>
        Panel Content
      </TabPanel>
    );
    expect(screen.getByText('Panel Content')).toBeInTheDocument();
  });

  it('does not render inactive panel by default', () => {
    const { container } = render(
      <TabPanel value={0} selectedValue={1}>
        Panel Content
      </TabPanel>
    );
    expect(screen.queryByText('Panel Content')).not.toBeInTheDocument();
  });

  it('keeps inactive panel mounted when keepMounted is true', () => {
    const { container } = render(
      <TabPanel value={0} selectedValue={1} keepMounted>
        Panel Content
      </TabPanel>
    );
    expect(screen.getByText('Panel Content')).toBeInTheDocument();
    expect(container.querySelector('.tab-panel-hidden')).toBeInTheDocument();
  });

  it('applies correct aria-hidden attribute', () => {
    const { container, rerender } = render(
      <TabPanel value={0} selectedValue={0}>
        Panel Content
      </TabPanel>
    );
    expect(container.querySelector('.tab-panel')).toHaveAttribute('aria-hidden', 'false');

    rerender(
      <TabPanel value={0} selectedValue={1} keepMounted>
        Panel Content
      </TabPanel>
    );
    expect(container.querySelector('.tab-panel')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies active class to active panel', () => {
    const { container } = render(
      <TabPanel value={0} selectedValue={0}>
        Panel Content
      </TabPanel>
    );
    expect(container.querySelector('.tab-panel-active')).toBeInTheDocument();
  });
});
