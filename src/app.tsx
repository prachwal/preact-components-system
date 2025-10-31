// app.tsx
// Wersja TypeScript/Preact (TSX) — single-file React-like layout using Preact.
// Główne wymagania: mobile-first, responsive, WCAG AA, theme provider (light|dark|system),
// saves to localStorage key "app:theme", accessible hamburger + sidebar, skip link, ESC handling.

import { createContext } from "preact";
import type { RefObject } from "preact";
import { useEffect, useState, useRef, useContext } from "preact/hooks";

/**
 * Typ theme'u - 'light' | 'dark' | 'system'
 */
type Theme = "light" | "dark" | "system";
const STORAGE_KEY = "app:theme";

/**
 * Theme context - udostępnia bieżący theme i setter
 */
const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({
  theme: "system",
  setTheme: () => {},
});

function usePrefersDark() {
  const [prefersDark, setPrefersDark] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia?.("(prefers-color-scheme: dark)").matches : false
  );
  useEffect(() => {
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setPrefersDark(e.matches);
    try {
      m.addEventListener("change", handler);
      return () => m.removeEventListener("change", handler);
    } catch {
      // older browsers
      // @ts-ignore
      m.addListener?.(handler);
      return () => {
        // @ts-ignore
        m.removeListener?.(handler);
      };
    }
  }, []);
  return prefersDark;
}

/**
 * ThemeProvider:
 * - zarządza theme,
 * - zapisuje do localStorage,
 * - ustawia [data-theme] na <html> (globalny hook),
 * - obsługuje priorytet: localStorage -> system -> light (fallback).
 */
function ThemeProvider({ children }: { children: preact.ComponentChildren }) {
  const prefersDark = usePrefersDark();

  const getInitialTheme = (): Theme => {
    try {
      const v = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (v === "light" || v === "dark" || v === "system") return v;
    } catch {}
    // fallback to system
    return "system";
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Apply theme to <html> as data attribute.
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    // Also expose boolean class for convenience (not required)
    html.classList.toggle("is-dark", theme === "dark" || (theme === "system" && prefersDark));
    // When theme === 'system' we do not write a value to localStorage (so the system remains authoritative).
    try {
      if (theme === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme, prefersDark]);

  const setTheme = (t: Theme) => setThemeState(t);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

/* ------------------------------
   Small UI helper components
   ------------------------------ */

/** Accessible SVG Logo - inline (no external assets) */
const Logo = ({ size = 28 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
    <path d="M7 9h10v2H7zM7 13h6v2H7z" fill="var(--bg)" />
  </svg>
);

/** Three-state theme toggle (light | dark | system) */
function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  // next state cycle order: system -> light -> dark -> system
  const cycle = (t: Theme) => {
    if (t === "system") return "light";
    if (t === "light") return "dark";
    return "system";
  };
  const handleClick = () => setTheme(cycle(theme));
  return (
    <button
      className="theme-toggle"
      aria-pressed="false"
      aria-label={`Theme: ${theme}`}
      title={`Theme: ${theme} (click to cycle)`}
      onClick={handleClick}
    >
      {/* Visual indicator: use text + aria */}
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "🖥️"}
      </span>
      <span className="visually-hidden">Theme: {theme}</span>
    </button>
  );
}

/* ------------------------------
   Main App layout
   ------------------------------ */

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

/**
 * AppShell - zawiera header, sidebar, main, footer
 * Wszystkie elementy dostępne z klawiatury; mobile-first layout.
 */
function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    // handle ESC to close sidebar
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
        // return focus to hamburger
        const hb = document.getElementById("hamburger-button") as HTMLButtonElement | null;
        hb?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sidebarOpen]);

  useEffect(() => {
    // focus management: when sidebar opens, focus first link
    if (sidebarOpen) {
      // small delay to ensure element present
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 50);
      // disable body scroll on mobile when sidebar open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  return (
    <div className="app-root">
      {/* Skip link for keyboard users */}
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header onHamburgerClick={() => setSidebarOpen((s) => !s)} isOpen={sidebarOpen} />

      <div className={`layout ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ref={sidebarRef}
          firstLinkRef={firstLinkRef}
        />

        <main id="main-content" className="main" tabIndex={-1} aria-live="polite">
          <article>
            <h1>Welcome to the App</h1>
            <p>
              This is a sample responsive layout implemented with Preact + TypeScript. It's mobile-first and built with
              accessibility (WCAG AA) in mind.
            </p>

            <section aria-labelledby="example-section">
              <h2 id="example-section">Example content</h2>
              <p>Put your page content here. The layout includes a header, collapsible sidebar and footer.</p>
            </section>
          </article>

          <footer className="main-footer" role="contentinfo">
            <small>© {new Date().getFullYear()} Example Company — App v1.0.0</small>
          </footer>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------
   Header component
   ------------------------------ */

function Header({ onHamburgerClick, isOpen }: { onHamburgerClick: () => void; isOpen: boolean }) {
  return (
    <header className="app-header" role="banner">
      <div className="header-left">
        <button
          id="hamburger-button"
          className="hamburger"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls="app-sidebar"
          onClick={onHamburgerClick}
        >
          <span className="hamburger-box" aria-hidden="true">
            <span className="hamburger-inner" />
          </span>
        </button>

        <div className="brand" role="img" aria-label="Application brand">
          <Logo />
          <div className="brand-text">
            <div className="app-title">My Preact App</div>
            <div className="app-subtitle">Lightweight accessible shell</div>
          </div>
        </div>
      </div>

      <div className="header-right">
        <ThemeToggle />
      </div>
    </header>
  );
}

/* ------------------------------
   Sidebar component (forwardRef pattern not necessary here)
   ------------------------------ */

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  ref?: RefObject<HTMLElement>;
  firstLinkRef: { current: HTMLAnchorElement | null };
};

const Sidebar = ({ open, onClose, ref, firstLinkRef }: SidebarProps) => {
  // simple array of nav items
  const navItems = [
    { id: "home", label: "Home", href: "#" },
    { id: "about", label: "About", href: "#" },
    { id: "settings", label: "Settings", href: "#" },
  ];

  return (
    <aside
      id="app-sidebar"
      ref={ref}
      className={`sidebar ${open ? "open" : ""}`}
      role="navigation"
      aria-hidden={open ? "false" : "true"}
      aria-label="Primary navigation"
    >
      <nav>
        <ul>
          {navItems.map((it, idx) => (
            <li key={it.id}>
              <a
                href={it.href}
                ref={idx === 0 ? firstLinkRef : undefined}
                onClick={() => {
                  // close sidebar on link click in mobile
                  onClose();
                }}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer" aria-hidden="false">
        <div className="app-meta">
          <div className="logo-small" aria-hidden="true">
            <Logo size={18} />
          </div>
          <div className="meta-text">
            <div className="meta-title">My Preact App</div>
            <div className="meta-version">v1.0.0</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
