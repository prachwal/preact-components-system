import { Logo } from '../common/Logo';
import { Hamburger } from '../ui/Hamburger';
import { ThemeToggle } from '../ui/ThemeToggle';

export interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

/**
 * Header component - application header with navigation controls
 *
 * Displays the application header with hamburger menu for sidebar toggle,
 * logo, branding information, and theme toggle. Provides the main navigation
 * controls and branding for the application.
 *
 * @example
 * ```tsx
 * <Header
 *   onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
 *   sidebarOpen={sidebarOpen}
 * />
 * ```
 *
 * Features:
 * - Hamburger menu for sidebar toggle
 * - Application logo and branding
 * - Theme toggle for light/dark mode switching
 * - Semantic header role for accessibility
 */
export const Header = ({ onToggleSidebar, sidebarOpen }: HeaderProps) => (
  <header role='banner' className='app-header'>
    <Hamburger onClick={onToggleSidebar} isOpen={sidebarOpen} />
    <Logo />
    <div className='brand-info'>
      <h1 className='brand-text'>App Name</h1>
      <p className='brand-subtext'>Tagline goes here</p>
    </div>
    <ThemeToggle />
  </header>
);
