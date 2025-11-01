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

export default Hamburger;