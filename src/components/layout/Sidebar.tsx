import { Fragment } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useAppVersion } from '../../hooks/useAppVersion';
import Logo from '../common/Logo';

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const appVersion = useAppVersion();

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
        className={`app-sidebar ${isOpen ? 'is-open' : ''}`}
        ref={sidebarRef}
      >
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
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