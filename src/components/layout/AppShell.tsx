import { useState, useEffect } from 'preact/hooks';
import SkipLink from '../common/SkipLink';
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';

const AppShell = () => {
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
    </div>
  );
};

export default AppShell;