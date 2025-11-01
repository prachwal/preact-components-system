import { Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useAppVersion } from '../../hooks/useAppVersion';
import Logo from '../common/Logo';

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const appVersion = useAppVersion();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const checkWidth = () => {
      setIsCollapsed(window.innerWidth >= 768 && window.innerWidth < 1024);
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
    <Fragment>
      <div
        className={`sidebar-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
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
              <a href="#home" title={isCollapsed ? "Home" : undefined}>
                <span style="margin-right: 8px;">🏠</span>
                {!isCollapsed && "Home"}
              </a>
            </li>
            <li className={activeSection === 'features' ? 'is-active' : ''}>
              <a href="#features" title={isCollapsed ? "Features" : undefined}>
                <span style="margin-right: 8px;">⭐</span>
                {!isCollapsed && "Features"}
              </a>
            </li>
            <li className={activeSection === 'about' ? 'is-active' : ''}>
              <a href="#about" title={isCollapsed ? "About" : undefined}>
                <span style="margin-right: 8px;">ℹ️</span>
                {!isCollapsed && "About"}
              </a>
            </li>
            <li className={activeSection === 'contact' ? 'is-active' : ''}>
              <a href="#contact" title={isCollapsed ? "Contact" : undefined}>
                <span style="margin-right: 8px;">📧</span>
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
    </Fragment>
  );
};

export default Sidebar;