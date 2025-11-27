import { useEffect, useRef, useState } from 'preact/hooks';

import { useAppVersion } from '../../hooks/useAppVersion';
import { RESPONSIVE_BREAKPOINTS, SPACING_MULTIPLIERS } from '../../theme/constants';
import { Logo } from '../common/Logo';
import { Icon } from '../ui/Icon';

const MOBILE_BREAKPOINT = RESPONSIVE_BREAKPOINTS.MOBILE;
const TABLET_BREAKPOINT = RESPONSIVE_BREAKPOINTS.TABLET;
const ICON_MARGIN_RIGHT = `${SPACING_MULTIPLIERS.XXXL}px`;

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Helper function to handle Escape key press
 */
const handleEscapeKey = (onClose: () => void) => {
  onClose();
  const hamburger = document.querySelector('.hamburger') as HTMLElement | null;
  hamburger?.focus();
};

/**
 * Helper function to handle Tab key navigation with focus trapping
 */
const handleTabKey = (e: KeyboardEvent, sidebarRef: React.RefObject<HTMLDivElement>) => {
  const focusableElements = sidebarRef.current?.querySelectorAll(
    'a[href], button:not([disabled])'
  ) as NodeListOf<HTMLElement> | undefined;

  if (!focusableElements || focusableElements.length === 0) return;

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
};

/**
 * Helper function to create keyboard event handler
 */
const createKeyboardHandler = (
  onClose: () => void,
  sidebarRef: React.RefObject<HTMLDivElement>
) => {
  return (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleEscapeKey(onClose);
      return;
    }

    if (e.key === 'Tab') {
      handleTabKey(e, sidebarRef);
    }
  };
};

/**
 * Sidebar component - responsive navigation sidebar
 *
 * Provides a responsive sidebar navigation with mobile overlay, tablet collapse mode,
 * and desktop expanded mode. Includes accessibility features like keyboard navigation,
 * focus trapping, and ARIA attributes. Tracks active sections via hash routing.
 *
 * @example
 * ```tsx
 * <Sidebar
 *   isOpen={sidebarOpen}
 *   onClose={() => setSidebarOpen(false)}
 * />
 * ```
 *
 * Features:
 * - Responsive behavior: overlay (mobile), collapsed (tablet), expanded (desktop)
 * - Keyboard navigation with Tab trapping and Escape key handling
 * - Hash-based active section tracking
 * - Focus management for accessibility
 * - Backdrop overlay for mobile interactions
 * - Logo and version display in footer
 */
export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const appVersion = useAppVersion();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const checkWidth = () => {
      setIsCollapsed(
        window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT
      );
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setActiveSection(hash);
    };

    updateActiveSection();
    window.addEventListener('hashchange', updateActiveSection);
    return () => window.removeEventListener('hashchange', updateActiveSection);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const firstLink = sidebarRef.current?.querySelector('a') as HTMLElement | null;
    firstLink?.focus();

    const handleKeyDown = createKeyboardHandler(onClose, sidebarRef);

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose();
          }
        }}
        tabIndex={isOpen ? 0 : -1}
        role='button'
        aria-label='Close sidebar'
        aria-hidden={!isOpen}
      />
      <aside
        id='app-sidebar'
        role='navigation'
        aria-label='Main navigation'
        aria-hidden={!isOpen}
        className={`app-sidebar ${isOpen ? 'is-open' : ''} ${isCollapsed ? 'is-collapsed' : ''}`}
        ref={sidebarRef}
      >
        <nav>
          <ul>
            <li className={activeSection === 'home' ? 'is-active' : ''}>
              <a href='#home' title={isCollapsed ? 'Home' : undefined} aria-label='Home'>
                <Icon
                  name='Home'
                  size='small'
                  decorative
                  style={{ marginRight: ICON_MARGIN_RIGHT }}
                />
                {!isCollapsed && 'Home'}
              </a>
            </li>
            <li className={activeSection === 'features' ? 'is-active' : ''}>
              <a
                href='#features'
                title={isCollapsed ? 'Features' : undefined}
                aria-label='Features'
              >
                <Icon
                  name='Star'
                  size='small'
                  decorative
                  style={{ marginRight: ICON_MARGIN_RIGHT }}
                />
                {!isCollapsed && 'Features'}
              </a>
            </li>
            <li className={activeSection === 'about' ? 'is-active' : ''}>
              <a href='#about' title={isCollapsed ? 'About' : undefined} aria-label='About'>
                <Icon
                  name='Info'
                  size='small'
                  decorative
                  style={{ marginRight: ICON_MARGIN_RIGHT }}
                />
                {!isCollapsed && 'About'}
              </a>
            </li>
            <li className={activeSection === 'contact' ? 'is-active' : ''}>
              <a href='#contact' title={isCollapsed ? 'Contact' : undefined} aria-label='Contact'>
                <Icon
                  name='Mail'
                  size='small'
                  decorative
                  style={{ marginRight: ICON_MARGIN_RIGHT }}
                />
                {!isCollapsed && 'Contact'}
              </a>
            </li>
          </ul>
        </nav>
        <footer className='sidebar-footer'>
          <Logo />
          <p>Version {appVersion}</p>
        </footer>
      </aside>
    </>
  );
};
