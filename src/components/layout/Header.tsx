import { Logo } from '../common/Logo';
import { Hamburger } from '../ui/Hamburger';
import { ThemeToggle } from '../ui/ThemeToggle';

export interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Header = ({ onToggleSidebar, sidebarOpen }: HeaderProps) => (
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