import type { ComponentChildren, JSX } from 'preact';
import { createContext } from 'preact';
import { useContext, useState, useEffect, useRef } from 'preact/hooks';
import clsx from 'clsx';
import './Tabs.scss';

type TabsVariant = 'standard' | 'fullWidth' | 'scrollable';
type TabsOrientation = 'horizontal' | 'vertical';

interface TabsContextValue {
  value: number | string;
  onChange: (value: number | string) => void;
  orientation: TabsOrientation;
  variant: TabsVariant;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Currently selected tab value
   */
  value: number | string;
  /**
   * Callback when tab changes
   */
  onChange: (value: number | string) => void;
  /**
   * Tabs variant
   */
  variant?: TabsVariant;
  /**
   * Tabs orientation
   */
  orientation?: TabsOrientation;
  /**
   * If true, tabs indicator will be shown
   */
  indicatorColor?: 'primary' | 'secondary';
  /**
   * If true, tabs will be centered
   */
  centered?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements (Tab components)
   */
  children?: ComponentChildren;
}

export const Tabs = ({
  value,
  onChange,
  variant = 'standard',
  orientation = 'horizontal',
  indicatorColor = 'primary',
  centered = false,
  className,
  children,
  ...rest
}: TabsProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState<Record<string, string>>({});
  const tabsRef = useRef<HTMLDivElement>(null);

  const updateIndicator = () => {
    if (!tabsRef.current) return;

    const activeTab = tabsRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (!activeTab) return;

    if (orientation === 'horizontal') {
      setIndicatorStyle({
        left: `${activeTab.offsetLeft}px`,
        width: `${activeTab.offsetWidth}px`,
      });
    } else {
      setIndicatorStyle({
        top: `${activeTab.offsetTop}px`,
        height: `${activeTab.offsetHeight}px`,
      });
    }
  };

  useEffect(() => {
    updateIndicator();

    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [value, children, orientation]);

  const classes = clsx(
    'tabs',
    `tabs-variant-${variant}`,
    `tabs-orientation-${orientation}`,
    {
      'tabs-centered': centered,
    },
    className
  );

  return (
    <TabsContext.Provider value={{ value, onChange, orientation, variant }}>
      <div className={classes} {...rest}>
        <div className="tabs-scroller">
          <div className="tabs-flexContainer" ref={tabsRef}>
            {children}
            <span
              className={clsx('tabs-indicator', `tabs-indicator-${indicatorColor}`)}
              style={indicatorStyle}
            />
          </div>
        </div>
      </div>
    </TabsContext.Provider>
  );
};

export interface TabProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'value'> {
  /**
   * Tab value (used for identification)
   */
  value: number | string;
  /**
   * Tab label
   */
  label: ComponentChildren;
  /**
   * Icon to display
   */
  icon?: ComponentChildren;
  /**
   * Icon position
   */
  iconPosition?: 'start' | 'end' | 'top' | 'bottom';
  /**
   * If true, tab is disabled
   */
  disabled?: boolean;
  /**
   * CSS class name
   */
  className?: string;
}

export const Tab = ({
  value,
  label,
  icon,
  iconPosition = 'start',
  disabled = false,
  className,
  ...rest
}: TabProps) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tab must be used within Tabs component');
  }

  const { value: selectedValue, onChange } = context;
  const isActive = selectedValue === value;

  const handleClick = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  const classes = clsx(
    'tab',
    {
      'tab-active': isActive,
      'tab-disabled': disabled,
      [`tab-icon-${iconPosition}`]: icon,
    },
    className
  );

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      className={classes}
      onClick={handleClick}
      data-active={isActive}
      {...rest}
    >
      <span className="tab-wrapper">
        {icon && (iconPosition === 'start' || iconPosition === 'top') && (
          <span className="tab-icon">{icon}</span>
        )}
        <span className="tab-label">{label}</span>
        {icon && (iconPosition === 'end' || iconPosition === 'bottom') && (
          <span className="tab-icon">{icon}</span>
        )}
      </span>
    </button>
  );
};

export interface TabPanelProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * Tab panel value (should match Tab value)
   */
  value: number | string;
  /**
   * Currently selected tab value
   */
  selectedValue: number | string;
  /**
   * If true, panel will be kept in DOM when hidden
   */
  keepMounted?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

export const TabPanel = ({
  value,
  selectedValue,
  keepMounted = false,
  className,
  children,
  ...rest
}: TabPanelProps) => {
  const isActive = selectedValue === value;

  if (!isActive && !keepMounted) {
    return null;
  }

  const classes = clsx(
    'tab-panel',
    {
      'tab-panel-active': isActive,
      'tab-panel-hidden': !isActive,
    },
    className
  );

  return (
    <div
      role="tabpanel"
      aria-hidden={!isActive}
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};
