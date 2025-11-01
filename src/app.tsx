import { h, createContext, type ComponentProps } from 'preact'
import { useContext, useState, useEffect, useRef } from 'preact/hooks'
import './app.css'

// Types
type Theme = 'light' | 'dark' | 'system'

// Theme Context
interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  effectiveTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Theme Provider
export function ThemeProvider({ children }: { children: ComponentProps<'div'>['children'] }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light')

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('app:theme')
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      setThemeState(stored)
    }
  }, [])

  // Update effective theme based on theme and system preference
  useEffect(() => {
    const updateEffectiveTheme = () => {
      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setEffectiveTheme(systemPrefersDark ? 'dark' : 'light')
      } else {
        setEffectiveTheme(theme)
      }
    }

    updateEffectiveTheme()
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => updateEffectiveTheme()
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [theme])

  // Update DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.classList.toggle('is-dark', effectiveTheme === 'dark')
    
    if (theme === 'system') {
      localStorage.removeItem('app:theme')
    } else {
      localStorage.setItem('app:theme', theme)
    }
  }, [theme, effectiveTheme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook to use theme
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Logo Component
function Logo({ className = '', ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`logo ${className}`}
      aria-hidden="true"
      {...props}
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
  )
}

// Theme Toggle Component
function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    const nextTheme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system'
    setTheme(nextTheme)
  }

  const getIcon = () => {
    switch (theme) {
      case 'light': return '☀️'
      case 'dark': return '🌙'
      case 'system': return '🖥️'
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light': return 'Light theme'
      case 'dark': return 'Dark theme'
      case 'system': return 'System theme'
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycleTheme}
      aria-label={`Current theme: ${getLabel()}. Click to cycle themes.`}
      title={`Current: ${getLabel()}`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">{getIcon()}</span>
      <span className="theme-toggle__text visually-hidden">{getLabel()}</span>
    </button>
  )
}

// Header Component
function Header({ onMenuToggle, isMenuOpen }: { onMenuToggle: () => void; isMenuOpen: boolean }) {
  return (
    <header className="app-header" role="banner">
      <div className="app-header__content">
        <div className="app-header__start">
          <button
            type="button"
            className="hamburger"
            onClick={onMenuToggle}
            aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-controls="app-sidebar"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger__line" />
            <span className="hamburger__line" />
            <span className="hamburger__line" />
          </button>
          <div className="app-header__brand">
            <Logo />
            <div className="app-header__titles">
              <h1 className="app-header__title">Preact App</h1>
              <p className="app-header__subtitle">Accessible & Responsive</p>
            </div>
          </div>
        </div>
        <div className="app-header__end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

// Sidebar Component
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const sidebarRef = useRef<HTMLElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Focus management
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus()
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside
        ref={sidebarRef}
        id="app-sidebar"
        className={`app-sidebar ${isOpen ? 'is-open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="app-sidebar__content">
          <nav className="app-sidebar__nav">
            <ul className="app-sidebar__list">
              <li className="app-sidebar__item">
                <a
                  ref={firstLinkRef}
                  href="#home"
                  className="app-sidebar__link"
                  onClick={onClose}
                >
                  Home
                </a>
              </li>
              <li className="app-sidebar__item">
                <a href="#about" className="app-sidebar__link" onClick={onClose}>
                  About
                </a>
              </li>
              <li className="app-sidebar__item">
                <a href="#settings" className="app-sidebar__link" onClick={onClose}>
                  Settings
                </a>
              </li>
              <li className="app-sidebar__item">
                <a href="#help" className="app-sidebar__link" onClick={onClose}>
                  Help
                </a>
              </li>
            </ul>
          </nav>
          <footer className="app-sidebar__footer" role="contentinfo">
            <div className="app-sidebar__footer-content">
              <Logo className="app-sidebar__logo" />
              <span className="app-sidebar__version">v1.0.0</span>
            </div>
          </footer>
        </div>
      </aside>
    </>
  )
}

// Skip Link Component
function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  )
}

// App Shell Component
function AppShell({ children }: { children: ComponentProps<'div'>['children'] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="app-shell">
      <SkipLink />
      <Header onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className="app-content">
        <main id="main-content" className="app-main" role="main">
          {children}
        </main>
        <footer className="app-footer" role="contentinfo">
          <div className="app-footer__content">
            <p className="app-footer__text">
              © 2024 Preact Components System. Built with accessibility in mind.
            </p>
            <div className="app-footer__links">
              <a href="#privacy" className="app-footer__link">Privacy</a>
              <a href="#terms" className="app-footer__link">Terms</a>
              <a href="#contact" className="app-footer__link">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

// Main App Component
export function App() {
  return (
    <ThemeProvider>
      <AppShell>
        <article className="content-article">
          <header className="content-header">
            <h1 className="content-title">Welcome to Your Accessible Preact App</h1>
            <p className="content-subtitle">
              This application demonstrates WCAG 2.1 AA compliance with responsive design
              and theme switching capabilities.
            </p>
          </header>
          
          <section className="content-section">
            <h2>Features</h2>
            <ul>
              <li>✅ Full keyboard navigation support</li>
              <li>✅ Screen reader compatibility with proper ARIA labels</li>
              <li>✅ High contrast themes (light/dark/system)</li>
              <li>✅ Responsive design with mobile-first approach</li>
              <li>✅ Focus management and skip links</li>
              <li>✅ Reduced motion support</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Theme System</h2>
            <p>
              The theme switcher in the header allows you to cycle through three modes:
              Light, Dark, and System. Your preference is automatically saved and will
              persist across browser sessions.
            </p>
          </section>

          <section className="content-section">
            <h2>Navigation</h2>
            <p>
              Use the hamburger menu to open the sidebar navigation. On mobile devices,
              the sidebar appears as an overlay. On larger screens, it's always visible.
              You can also use the Tab key to navigate through all interactive elements.
            </p>
          </section>

          <section className="content-section">
            <h2>Accessibility</h2>
            <p>
              This application meets WCAG 2.1 AA standards with proper color contrast,
              keyboard navigation, focus indicators, and semantic HTML structure.
              Try using only your keyboard to navigate!
            </p>
          </section>
        </article>
      </AppShell>
    </ThemeProvider>
  )
}
