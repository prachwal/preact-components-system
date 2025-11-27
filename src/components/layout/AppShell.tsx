import { useState, useEffect } from 'preact/hooks';

import { SkipLink } from '../common/SkipLink';

import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { Sidebar } from './Sidebar';

export interface AppShellProps {}

/**
 * AppShell component - main application layout structure
 *
 * Provides the overall application shell with header, sidebar, main content area, and footer.
 * Manages responsive sidebar state and includes accessibility features like skip links.
 * Composes Header, Sidebar, Main, and Footer components into a complete page layout.
 *
 * @example
 * ```tsx
 * // Basic app shell usage
 * <AppShell />
 * ```
 *
 * Features:
 * - Responsive sidebar with mobile overlay
 * - Body scroll locking when sidebar is open
 * - Skip link for keyboard navigation
 * - Composed layout with header, sidebar, main, and footer
 */
export const AppShell = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div className="app-shell">
      <SkipLink />
      <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div className="app-content">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <Main />
      </div>
      <Footer />
    </div>
  );
};