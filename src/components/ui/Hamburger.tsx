export interface HamburgerProps {
  onClick: () => void;
  isOpen: boolean;
}

export const Hamburger = ({ onClick, isOpen }: HamburgerProps) => (
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