import { useEffect, useRef, useState } from 'preact/hooks';

import { useAppVersion } from '../../hooks/useAppVersion';
import { Logo } from '../common/Logo';
import { Icon } from '../ui/Icon';

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      setIsCollapsed(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT);
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

    const firstLink = sidebarRef.current?.querySelector('a') as HTMLElement;
    firstLink?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        const hamburger = document.querySelector('.hamburger') as HTMLElement;
        hamburger?.focus();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = sidebarRef.current?.querySelectorAll(
          'a[href], button:not([disabled])'
        ) as NodeListOf<HTMLElement>;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

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
        role="button"
        aria-label="Close sidebar"
        aria-hidden={!isOpen}
      />
      <aside
        id="app-sidebar"
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        className={`app-sidebar ${isOpen ? 'is-open' : ''} ${isCollapsed ? 'is-collapsed' : ''}`}
        ref={sidebarRef}
      >
        <nav>
          <ul>
            <li className={activeSection === 'home' ? 'is-active' : ''}>
              <a href="#home" title={isCollapsed ? "Home" : undefined} aria-label="Home">
                <Icon name="Home" size="small" decorative style={{ marginRight: '8px' }} />
                {!isCollapsed && "Home"}
              </a>
            </li>
            <li className={activeSection === 'features' ? 'is-active' : ''}>
              <a href="#features" title={isCollapsed ? "Features" : undefined} aria-label="Features">
                <Icon name="Star" size="small" decorative style={{ marginRight: '8px' }} />
                {!isCollapsed && "Features"}
              </a>
            </li>
            <li className={activeSection === 'about' ? 'is-active' : ''}>
              <a href="#about" title={isCollapsed ? "About" : undefined} aria-label="About">
                <Icon name="Info" size="small" decorative style={{ marginRight: '8px' }} />
                {!isCollapsed && "About"}
              </a>
            </li>
            <li className={activeSection === 'contact' ? 'is-active' : ''}>
              <a href="#contact" title={isCollapsed ? "Contact" : undefined} aria-label="Contact">
                <Icon name="Mail" size="small" decorative style={{ marginRight: '8px' }} />
                {!isCollapsed && "Contact"}
              </a>
            </li>
          </ul>
        </nav>
        <footer className="sidebar-footer">
          <Logo />
          <p>Version {appVersion}</p>
        </footer>
      </aside>
    </>
  );
};