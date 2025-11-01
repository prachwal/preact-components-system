import { createContext } from 'preact';
import { useState, useEffect, useRef, useContext, useLayoutEffect } from 'preact/hooks';
import './app.css';

// ============================================
// Types & Interfaces
// ============================================

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}

// ============================================
// Theme Context & Provider
// ============================================

const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider: preact.FunctionComponent<{ children: preact.ComponentChildren }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system');

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    const html = document.documentElement;
    
    if (newTheme === 'system') {
      localStorage.removeItem('app:theme');
      html.setAttribute('data-theme', 'system');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.toggle('is-dark', prefersDark);
    } else {
      localStorage.setItem('app:theme', newTheme);
      html.setAttribute('data-theme', newTheme);
      html.classList.toggle('is-dark', newTheme === 'dark');
    }
  };

  useLayoutEffect(() => {
    const saved = localStorage.getItem('app:theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = saved || 'system';
    
    setTheme(initialTheme);
    
    const html = document.documentElement;
    html.setAttribute('data-theme', initialTheme);
    
    if (initialTheme === 'system') {
      html.classList.toggle('is-dark', systemPrefersDark);
    } else {
      html.classList.toggle('is-dark', initialTheme === 'dark');
    }

    // Listen to system theme changes
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

// ============================================
// Logo Component (SVG Inline)
// ============================================

const Logo: preact.FunctionComponent<{ className?: string }> = ({ className = '' }) => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    aria-hidden="true"
    role="img"
  >
    <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.1" />
    <path 
      d="M16 8L24 16L16 24L8 16L16 8Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="16" cy="16" r="4" fill="currentColor" />
  </svg>
);

// ============================================
// Theme Toggle Component
// ============================================

const ThemeToggle: preact.FunctionComponent = () => {
  const { theme, setTheme } = useTheme();
  
  const themeConfig = {
    light: { icon: '☀️', label: 'Light theme', next: 'dark' as Theme },
    dark: { icon: '🌙', label: 'Dark theme', next: 'system' as Theme },
    system: { icon: '🖥️', label: 'System theme', next: 'light' as Theme },
  };
  
  const current = themeConfig[theme];
  const nextConfig = themeConfig[current.next];
  
  const handleClick = () => setTheme(current.next);

  return (
    <button
      type="button"
      class="theme-toggle"
      onClick={handleClick}
      aria-label={`Current theme: ${current.label}. Click to switch to ${nextConfig.label}`}
      title={`Current: ${current.label}`}
    >
      <span class="theme-toggle__icon" aria-hidden="true">
        {current.icon}
      </span>
      <span class="visually-hidden">{current.label}</span>
    </button>
  );
};

// ============================================
// Skip Link Component
// ============================================

const SkipLink: preact.FunctionComponent = () => (
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
);

// ============================================
// Header Component
// ============================================

const Header: preact.FunctionComponent<{
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}> = ({ onToggleSidebar, sidebarOpen }) => (
  <header class="app-header" role="banner">
    <div class="header-content">
      <div class="header-start">
        <button
          type="button"
          class="hamburger"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
          aria-controls="app-sidebar"
          aria-expanded={sidebarOpen}
        >
          <span class="hamburger__line" aria-hidden="true" />
          <span class="hamburger__line" aria-hidden="true" />
          <span class="hamburger__line" aria-hidden="true" />
        </button>
        
        <div class="header-brand">
          <Logo className="header-logo" />
          <div class="header-titles">
            <h1 class="header-title">Preact App</h1>
            <p class="header-subtitle">Accessible & Responsive</p>
          </div>
        </div>
      </div>
      
      <div class="header-end">
        <ThemeToggle />
      </div>
    </div>
  </header>
);

// ============================================
// Sidebar Component
// ============================================

const Sidebar: preact.FunctionComponent<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLElement>(null);

  // Focus management and keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const firstLink = sidebarRef.current?.querySelector('a') as HTMLElement;
    firstLink?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC closes sidebar
      if (e.key === 'Escape') {
        onClose();
        const hamburger = document.querySelector('.hamburger') as HTMLElement;
        hamburger?.focus();
        return;
      }

      // Tab trap
      if (e.key === 'Tab') {
        const focusableElements = sidebarRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        
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
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navigationLinks = [
    { text: 'Home', href: '#home' },
    { text: 'About', href: '#about' },
    { text: 'Services', href: '#services' },
    { text: 'Portfolio', href: '#portfolio' },
    { text: 'Contact', href: '#contact' },
    { text: 'Settings', href: '#settings' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          class="sidebar-backdrop" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <aside
        id="app-sidebar"
        ref={sidebarRef}
        class={`app-sidebar ${isOpen ? 'is-open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <div class="sidebar-content">
          <nav class="sidebar-nav">
            <ul class="nav-list">
              {navigationLinks.map((link) => (
                <li key={link.text} class="nav-item">
                  <a 
                    href={link.href} 
                    class="nav-link"
                    onClick={onClose}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <footer class="sidebar-footer" role="contentinfo">
            <div class="sidebar-footer-content">
              <Logo className="sidebar-logo" />
              <span class="sidebar-version">v1.0.0</span>
            </div>
          </footer>
        </div>
      </aside>
    </>
  );
};

// ============================================
// Main Content Component
// ============================================

const Main: preact.FunctionComponent = () => (
  <main id="main-content" class="app-main" role="main">
    <article class="content-article">
      <header class="content-header">
        <h1 class="content-title">Welcome to Your Accessible Preact App</h1>
        <p class="content-subtitle">
          This application demonstrates WCAG 2.1 AA compliance with responsive design 
          and theme switching capabilities.
        </p>
      </header>

      <section class="content-section">
        <h2>Key Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>🎨 Theme System</h3>
            <p>
              Dynamic light/dark/system themes with localStorage persistence. 
              Your preference is remembered across sessions.
            </p>
          </div>
          
          <div class="feature-card">
            <h3>♿ Accessibility First</h3>
            <p>
              Built with WCAG 2.1 AA compliance. Full keyboard navigation, 
              screen reader support, and proper contrast ratios.
            </p>
          </div>
          
          <div class="feature-card">
            <h3>📱 Responsive Design</h3>
            <p>
              Mobile-first approach with breakpoints for all screen sizes. 
              Optimized for phones, tablets, and desktops.
            </p>
          </div>
          
          <div class="feature-card">
            <h3>⚡ Preact Performance</h3>
            <p>
              Built with Preact for fast loading and efficient rendering. 
              Minimal bundle size with maximum functionality.
            </p>
          </div>
        </div>
      </section>

      <section class="content-section">
        <h2>Accessible Navigation</h2>
        <p>This application includes several accessibility features:</p>
        <ul class="feature-list">
          <li>Full keyboard navigation support</li>
          <li>Screen reader compatibility with proper ARIA labels</li>
          <li>High contrast themes (light/dark/system)</li>
          <li>Responsive design with mobile-first approach</li>
          <li>Focus management and skip links</li>
          <li>Reduced motion support</li>
        </ul>
      </section>

      <section class="content-section">
        <h2>Theme System</h2>
        <p>
          The theme switcher in the header allows you to cycle through three modes: 
          Light, Dark, and System. Your preference is automatically saved and will 
          persist across browser sessions.
        </p>
        <p>
          When using system preference, the theme automatically adapts to your 
          operating system settings.
        </p>
      </section>

      <section class="content-section">
        <h2>Navigation</h2>
        <p>
          Use the hamburger menu to open the sidebar navigation. On mobile devices, 
          the sidebar appears as an overlay. On larger screens, it's always visible. 
          You can also use the Tab key to navigate through all interactive elements.
        </p>
      </section>
    </article>

    <footer class="main-footer" role="contentinfo">
      <div class="main-footer-content">
        <p class="footer-text">
          © 2024 Preact Components System. Built with accessibility in mind.
        </p>
        <div class="footer-links">
          <a href="#privacy" class="footer-link">Privacy</a>
          <a href="#terms" class="footer-link">Terms</a>
          <a href="#contact" class="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  </main>
);

// ============================================
// App Shell Component
// ============================================

const AppShell: preact.FunctionComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // Prevent body scroll when sidebar is open on mobile
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
    <div class="app-shell">
      <SkipLink />
      <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div class="app-body">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <Main />
      </div>
    </div>
  );
};

// ============================================
// Main App Component (Export)
// ============================================

export const App: preact.FunctionComponent = () => (
  <ThemeProvider>
    <AppShell />
  </ThemeProvider>
);