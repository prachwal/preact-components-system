import { Fragment } from 'preact';
import { createContext } from 'preact';
import { useState, useEffect, useRef, useContext, useLayoutEffect } from 'preact/hooks';
import './app.css';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider: preact.FunctionComponent<{ children: preact.ComponentChildren }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    const html = document.documentElement;
    if (newTheme === 'system') {
      localStorage.removeItem('app:theme');
      html.removeAttribute('data-theme');
      html.classList.remove('is-dark');
    } else {
      localStorage.setItem('app:theme', newTheme);
      html.setAttribute('data-theme', newTheme);
      html.classList.toggle('is-dark', newTheme === 'dark');
    }
  };

  useLayoutEffect(() => {
    const saved = localStorage.getItem('app:theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = saved || (systemPrefersDark ? 'dark' : 'light') || 'light';
    setTheme(initialTheme as Theme);
    const html = document.documentElement;
    if (initialTheme === 'system') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', initialTheme);
      html.classList.toggle('is-dark', initialTheme === 'dark');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        html.classList.toggle('is-dark', e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

const Logo: preact.FunctionComponent = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" aria-label="Logo aplikacji">
    <rect width="32" height="32" fill="var(--accent)" rx="4" />
    <text x="16" y="20" text-anchor="middle" fill="var(--bg)" font-size="12" font-weight="bold">MA</text>
  </svg>
);

const ThemeToggle: preact.FunctionComponent = () => {
  const { theme, setTheme } = useTheme();
  const currentIcon = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🖥️';
  const nextTheme = ({ light: 'dark', dark: 'system', system: 'light' } as const)[theme] as Theme;
  const handleClick = () => setTheme(nextTheme);

  return (
    <button
      class="theme-toggle"
      onClick={handleClick}
      aria-label={`Przełącz na motyw ${nextTheme}`}
      title={`Aktualny: ${theme}`}
    >
      {currentIcon}
    </button>
  );
};

const SkipLink: preact.FunctionComponent = () => (
  <a href="#main-content" class="skip-link">Przejdź do głównej treści</a>
);

const Header: preact.FunctionComponent<{ onToggleSidebar: () => void; sidebarOpen: boolean }> = ({ onToggleSidebar, sidebarOpen }) => (
  <header role="banner" class="header">
    <SkipLink />
    <div class="header-content">
      <button
        class="hamburger"
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Zamknij nawigację' : 'Otwórz nawigację'}
        aria-controls="app-sidebar"
        aria-expanded={sidebarOpen}
      >
        <span></span><span></span><span></span>
      </button>
      <div class="logo-title">
        <Logo />
        <div>
          <h1>Moja Aplikacja</h1>
        </div>
      </div>
      <ThemeToggle />
    </div>
  </header>
);

const Sidebar: preact.FunctionComponent<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const firstLink = sidebarRef.current?.querySelector('a') as HTMLElement;
      firstLink?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          (document.querySelector('.hamburger') as HTMLElement)?.focus();
        } else if (e.key === 'Tab') {
          const focusable = sidebarRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as NodeListOf<HTMLElement> || [];
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
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
    }
  }, [isOpen, onClose]);

  const links = [
    { text: 'Home', href: '#' },
    { text: 'About', href: '#about' },
    { text: 'Settings', href: '#settings' },
  ];

  return (
    <>
      {isOpen && <div class="overlay" onClick={onClose} />}
      <nav id="app-sidebar" role="navigation" class={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef} aria-hidden={!isOpen}>
        <ul>
          {links.map((link) => (
            <li key={link.text}>
              <a href={link.href} onClick={onClose}>{link.text}</a>
            </li>
          ))}
        </ul>
        <footer class="sidebar-footer">
          <Logo />
          <small>v1.0.0</small>
        </footer>
      </nav>
    </>
  );
};

const Main: preact.FunctionComponent = () => (
  <main id="main-content" role="main">
    <article>
      <h2>Główna treść</h2>
      <p>To jest przykładowy tekst demonstrujący layout. Kolory mają wysoki kontrast (4.5:1+).</p>
      <section>
        <h3>Sekcja 1</h3>
        <p>Duży tekst dla testu touch targets i responsywności.</p>
      </section>
      <section>
        <h3>Sekcja 2</h3>
        <p>Inny paragraf z różnymi rozmiarami czcionek.</p>
      </section>
    </article>
    <footer class="main-footer">
      <p>&copy; 2025 Moja Aplikacja. Stopka głównej treści.</p>
    </footer>
  </main>
);

const AppShell: preact.FunctionComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <Fragment>
      <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Main />
    </Fragment>
  );
};

export const App: preact.FunctionComponent = () => (
  <ThemeProvider>
    <AppShell />
  </ThemeProvider>
);
