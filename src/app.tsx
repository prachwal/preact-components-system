import { Fragment } from 'preact';
import { createContext } from 'preact';
import { useState, useEffect, useRef, useContext, useLayoutEffect } from 'preact/hooks';
import './app.scss';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.1" />
    <path d="M16 8v16M8 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="16" r="4" fill="currentColor" />
  </svg>
);

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const getNextTheme = (currentTheme: Theme): Theme => {
    switch (currentTheme) {
      case 'light': return 'dark';
      case 'dark': return 'system';
      case 'system': return 'light';
      default: return 'light';
    }
  };

  const getThemeIcon = (currentTheme: Theme) => {
    switch (currentTheme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'system': return '🖥️';
      default: return '☀️';
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(getNextTheme(theme))}
      aria-label={`Change theme to ${getNextTheme(theme)}`}
    >
      {getThemeIcon(theme)}
    </button>
  );
};

const SkipLink = () => (
  <a href="#main-content" className="skip-link">
    Skip to main content
  </a>
);

const Hamburger = ({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) => (
  <button
    className="hamburger"
    onClick={onClick}
    aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
    aria-controls="app-sidebar"
    aria-expanded={isOpen}
  >
    <span className="hamburger__line" />
    <span className="hamburger__line" />
    <span className="hamburger__line" />
  </button>
);

const Header = ({ onToggleSidebar, sidebarOpen }: { onToggleSidebar: () => void; sidebarOpen: boolean }) => (
  <header role="banner" className="app-header">
    <Hamburger onClick={onToggleSidebar} isOpen={sidebarOpen} />
    <Logo />
    <div className="brand-info">
      <h1 className="brand-text">App Name</h1>
      <p className="brand-subtext">Tagline goes here</p>
    </div>
    <ThemeToggle />
  </header>
);

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

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
          <p>Version 1.0.0</p>
        </footer>
      </aside>
    </Fragment>
  );
};

const Main = () => (
  <main id="main-content" role="main" className="app-main">
    <article>
      <h2>Welcome to our application</h2>
      <p>This is the main content area of the application.</p>
      <div className="features-grid">
        <div className="feature-card">
          <h3>Feature One</h3>
          <p>Description of feature one.</p>
        </div>
        <div className="feature-card">
          <h3>Feature Two</h3>
          <p>Description of feature two.</p>
        </div>
        <div className="feature-card">
          <h3>Feature Three</h3>
          <p>Description of feature three.</p>
        </div>
        <div className="feature-card">
          <h3>Feature Four</h3>
          <p>Description of feature four.</p>
        </div>
      </div>
    </article>
    <footer role="contentinfo" className="app-footer">
      <p>&copy; 2024 App Name. All rights reserved.</p>
    </footer>
  </main>
);

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

const ThemeProvider = ({ children }: { children: preact.ComponentChildren }) => {
  const [theme, setTheme] = useState<Theme>('system');

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('app:theme') as Theme | null;
    const initialTheme = savedTheme || 'system';
    setTheme(initialTheme);

    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', initialTheme);

    if (initialTheme === 'dark' || (initialTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      htmlElement.classList.add('is-dark');
    } else {
      htmlElement.classList.remove('is-dark');
    }

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        if (e.matches) {
          htmlElement.classList.add('is-dark');
        } else {
          htmlElement.classList.remove('is-dark');
        }
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', theme);

    if (theme === 'system') {
      localStorage.removeItem('app:theme');
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        htmlElement.classList.add('is-dark');
      } else {
        htmlElement.classList.remove('is-dark');
      }
    } else {
      localStorage.setItem('app:theme', theme);
      if (theme === 'dark') {
        htmlElement.classList.add('is-dark');
      } else {
        htmlElement.classList.remove('is-dark');
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <AppShell />
  </ThemeProvider>
);

export default App;
