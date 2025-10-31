import { h, render, Fragment } from 'preact';
import { createContext } from 'preact';
import { forwardRef } from 'preact/compat';
import { useState, useEffect, useContext, useRef } from 'preact/hooks';
import './app.css';

// Types
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: 'light' | 'dark';
}

// Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Component
function ThemeProvider({ children }: { children: any }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('app:theme') as Theme | null;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      setThemeState(stored);
    } else {
      setThemeState('system');
    }
  }, []);

  // Update effective theme based on selection and system preference
  useEffect(() => {
    const updateEffectiveTheme = () => {
      let effective: 'light' | 'dark';
      
      if (theme === 'system') {
        effective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        effective = theme;
      }
      
      setEffectiveTheme(effective);
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.toggle('is-dark', effective === 'dark');
    };

    updateEffectiveTheme();

    // Listen for system theme changes when in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateEffectiveTheme);
      return () => mediaQuery.removeEventListener('change', updateEffectiveTheme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (newTheme === 'system') {
      localStorage.removeItem('app:theme');
    } else {
      localStorage.setItem('app:theme', newTheme);
    }
  };

  return h(ThemeContext.Provider, { value: { theme, setTheme, effectiveTheme } }, children);
}

// Logo Component
function Logo({ size = 32 }: { size?: number }) {
  return h('svg', {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true'
  }, [
    h('rect', { x: 4, y: 4, width: 24, height: 24, rx: 6, fill: 'var(--accent)' }),
    h('path', {
      d: 'M12 10h8v2h-8v-2zm0 5h8v2h-8v-2zm0 5h5v2h-5v-2z',
      fill: 'var(--bg)'
    })
  ]);
}

// Theme Toggle Component
function ThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context) return null;

  const { theme, setTheme } = context;

  const cycleTheme = () => {
    const cycle: Theme[] = ['system', 'light', 'dark'];
    const currentIndex = cycle.indexOf(theme);
    const nextTheme = cycle[(currentIndex + 1) % cycle.length];
    setTheme(nextTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'system': return '🖥️';
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light': return 'Light theme';
      case 'dark': return 'Dark theme';
      case 'system': return 'System theme';
    }
  };

  return h('button', {
    className: 'theme-toggle',
    onClick: cycleTheme,
    'aria-label': `Current theme: ${getLabel()}. Click to change`,
    title: getLabel(),
    type: 'button'
  }, getIcon());
}

// Header Component
const Header = forwardRef<HTMLButtonElement, { onMenuToggle: () => void; isMenuOpen: boolean }>(({ onMenuToggle, isMenuOpen }, ref) => {
  return h('header', { className: 'app-header', role: 'banner' }, [
    h('div', { className: 'header-content' }, [
      h('button', {
        ref,
        className: 'hamburger',
        onClick: onMenuToggle,
        'aria-label': isMenuOpen ? 'Close navigation' : 'Open navigation',
        'aria-controls': 'app-sidebar',
        'aria-expanded': isMenuOpen,
        type: 'button'
      }, [
        h('span', { className: 'hamburger-line' }),
        h('span', { className: 'hamburger-line' }),
        h('span', { className: 'hamburger-line' })
      ]),
      h('div', { className: 'header-logo' }, [
        h(Logo, { size: 40 }),
        h('div', { className: 'header-text' }, [
          h('h1', { className: 'header-title' }, 'My App'),
        ])
      ]),
      h(ThemeToggle, null)
    ])
  ]);
});

// Sidebar Component
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#settings', label: 'Settings' },
    { href: '#help', label: 'Help' }
  ];

  return h(Fragment, null, [
    isOpen && h('div', {
      className: 'sidebar-overlay',
      onClick: onClose,
      'aria-hidden': 'true'
    }),
    h('aside', {
      id: 'app-sidebar',
      className: `app-sidebar ${isOpen ? 'is-open' : ''}`,
      role: 'navigation',
      'aria-label': 'Main navigation'
    }, [
      h('nav', { className: 'sidebar-nav' }, [
        h('ul', { className: 'nav-list' }, 
          navItems.map((item, index) => 
            h('li', { key: item.href }, 
              h('a', {
                href: item.href,
                className: 'nav-link',
                onClick: onClose,
                ref: index === 0 ? firstLinkRef : undefined
              }, item.label)
            )
          )
        )
      ]),
      h('footer', { className: 'sidebar-footer' }, [
        h(Logo, { size: 24 }),
        h('span', { className: 'version' }, 'v1.0.0')
      ])
    ])
  ]);
}

// Main Content Component
function MainContent() {
  return h('main', { id: 'main-content', className: 'app-main', role: 'main' }, [
    h('article', { className: 'content' }, [
      h('h2', null, 'Welcome to Your App'),
      h('p', null, 'This is a fully accessible, responsive layout built with Preact and TypeScript. It features a comprehensive theme system with light, dark, and system preferences.'),
      h('section', null, [
        h('h3', null, 'Features'),
        h('p', null, 'This layout includes the following accessibility features:'),
        h('ul', null, [
          h('li', null, 'WCAG 2.1 AA compliant color contrasts'),
          h('li', null, 'Keyboard navigation support (Tab, ESC)'),
          h('li', null, 'Screen reader friendly with proper ARIA labels'),
          h('li', null, 'Skip link for quick content access'),
          h('li', null, 'Focus management and visual indicators'),
          h('li', null, 'Responsive design (mobile-first approach)')
        ])
      ]),
      h('section', null, [
        h('h3', null, 'Theme System'),
        h('p', null, 'The theme toggle in the header allows you to switch between light mode (☀️), dark mode (🌙), and system preference (🖥️). Your choice is saved in localStorage and persists across sessions.'),
        h('p', null, 'When using system preference, the theme automatically adapts to your operating system settings.')
      ])
    ]),
    h('footer', { className: 'main-footer', role: 'contentinfo' }, [
      h('p', null, '© 2025 My App. Built with accessibility in mind.')
    ])
  ]);
}

// App Shell Component
function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
    // Return focus to hamburger button
    setTimeout(() => {
      if (hamburgerRef.current) {
        hamburgerRef.current.focus();
      }
    }, 100);
  };

  return h('div', { className: 'app-shell' }, [
    h('a', { href: '#main-content', className: 'skip-link' }, 'Skip to main content'),
    h(Header, {
      onMenuToggle: handleMenuToggle,
      isMenuOpen: isSidebarOpen,
      ref: hamburgerRef
    }),
    h(Sidebar, { isOpen: isSidebarOpen, onClose: handleSidebarClose }),
    h(MainContent, null)
  ]);
}

// Main App Component
function App() {
  return h(ThemeProvider, null, h(AppShell, null));
}

// Render app
const root = document.getElementById('root');
if (root) {
  render(h(App, null), root);
}

export default App;